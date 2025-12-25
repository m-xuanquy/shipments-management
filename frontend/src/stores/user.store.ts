import { create } from "zustand";
import type { User } from "../types/user.interface";
import { userService } from "../services/user.service";

interface UserState {
  users: User[];
  isLoading: boolean;
  error: string | null;

  fetchUsers: () => Promise<void>;
  updateUser: (
    id: string,
    userData: Partial<User>
  ) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  isLoading: false,
  error: null,

  async fetchUsers() {
    set({ isLoading: true, error: null });
    try {
      const users = await userService.getUsers();
      set({ users, isLoading: false });
    } catch (error: any) {
      set({ error: "Failed to fetch users", isLoading: false });
    }
  },

  async updateUser(id, data) {
    set({ isLoading: true, error: null });
    try {
      const updatedUser = await userService.updateUser(id, data);
      set({
        users: get().users.map((user) =>
          user.id === id ? updatedUser : user
        ),
        isLoading: false,
      });
    } catch (error: any) {
      set({ error: "Failed to update user", isLoading: false });
    }
  },

  async deleteUser(id) {
    set({ isLoading: true, error: null });
    try {
      await userService.deleteUser(id);
      set({
        users: get().users.filter((user) => user.id !== id),
        isLoading: false,
      });
    } catch (error: any) {
      set({ error: "Failed to delete user", isLoading: false });
      throw error;
    }
  },

  async changePassword(currentPassword, newPassword) {
    set({ isLoading: true, error: null });
    try {
      await userService.changePassword(currentPassword, newPassword);
      set({ isLoading: false });
    } catch (error: any) {
      set({ error: "Failed to change password", isLoading: false });
      throw error;
    }
  },
}));
