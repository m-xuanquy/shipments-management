import apiClient from "../lib/api-client";
import type { LoginData, RegisterData, AuthResponse } from "../types/auth.interface";
import type { User } from "../types/user.interface";

export const authService = {
    async login(data: LoginData): Promise<AuthResponse> {
        const response =  await apiClient.post<AuthResponse>("/auth/login", data);
        return response.data;
    },

    async register(data: RegisterData): Promise<AuthResponse    > {
        const response =  await apiClient.post<AuthResponse>("/auth/register", data);
        return response.data;
    },

    async verifyToken(): Promise<User> {
        const response = await apiClient.get<User>("/auth/verify");
        return response.data;
    },

    setToken(token: string) {
        localStorage.setItem("client_token", token);
    },

    getToken() {
        return localStorage.getItem("client_token");
    },

    removeToken() {
        localStorage.removeItem("client_token");
    }
};