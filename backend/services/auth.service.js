import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import users from "../data/users.js";
import config from "../config/index.js";
import { getUserWithoutPassword } from "../utils/index.js";

const authService = {
  generateToken(userId) {
    return jwt.sign({ userId }, config.jwtSecret, { expiresIn: "7d" });
  },

  async register(userData) {
    const { fullName, email, phone, password } = userData;

    const isExistingUser = users.find((user) => user.email === email);
    if (isExistingUser) {
      throw new Error("Email already existed");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = Math.random().toFixed(16).toString();

    const newUser = {
      id: userId,
      fullName,
      email,
      phone,
      password: hashedPassword,
    };

    users.push(newUser);

    const token = this.generateToken(userId);

    return {
      user: getUserWithoutPassword(newUser),
      token,
    };
  },

  async login(email, password) {
    const user = users.find((user) => user.email === email);
    if (!user) {
      throw new Error("Invalid account input");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error("Invalid account input");
    }

    const token = this.generateToken(user.id);

    return {
      user: getUserWithoutPassword(user),
      token,
    };
  },

  async verifyToken(token) {
    const decoded = jwt.verify(token, config.jwtSecret);
    const user = users.find(user => user.id === decoded.userId);

    if (!user) {
        throw new Error('User not  found');
    }

    return getUserWithoutPassword(user);
  }
};

export default authService;