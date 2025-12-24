import users from "../data/users.js";
import bcrypt from "bcryptjs";
import { getUserWithoutPassword } from "../utils/index.js";

const userService = {
    async getAllUsers() {
        return users.map(user => getUserWithoutPassword(user));
    },
    async getUserById(userId) {
        const user = users.find(user => user.id === userId);
        if (!user) {
            throw new Error("User not found");
        }

        return getUserWithoutPassword(user);
    },

    async updateUser(userId, userData) {
        const userIndedx = users.findIndex(user => user.id === userId);
        if (userIndedx === -1) {
            throw new Error("User not found");
        }

        const updatedData = getUserWithoutPassword(userData);

        users[userIndedx] = {
            ...users[userIndedx],
            ...updatedData,
        };

        return getUserWithoutPassword(users[userIndedx]);
    },

    async changePassword(userId, oldPassword, newPassword) {
        const user = users.find(user => user.id === userId);
        if (!user) {
            throw new Error("User not found");
        }

        const isValidPassword = await bcrypt.compare(oldPassword, user.password);
        if (!isValidPassword) {
            throw new Error("Old password is incorrect");
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        return true;
    },

    async deleteUser(userId) {
        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex === -1) {
            throw new Error("User not found");
        }
        users.splice(userIndex, 1);
        return true;
    }
}

export default userService;