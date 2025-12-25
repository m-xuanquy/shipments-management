import apiClient from "../lib/api-client";
import type { User, UpdateUserData } from "../types/user.interface";

export const userService = {
  async getUsers(): Promise<User[]> {
    const response = await apiClient.get<User[]>("/users");
    return response.data;
  },
  async getUserById(id: string): Promise<User> {
    const response = await apiClient.get<User>(`/users/${id}`);
    return response.data;
  },
  async updateUser(id: string, data: UpdateUserData): Promise<User> {
    const response = await apiClient.put<User>(`/users/${id}`, data);
    return response.data;
  },
  async deleteUser(id: string): Promise<void> {
    await apiClient.delete(`/users/${id}`);
  },
  async changePassword(currentPassword: string, newPassword: string): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>("/users/change-password", {
      currentPassword,
      newPassword,
    });
    return response.data;
  },
};
