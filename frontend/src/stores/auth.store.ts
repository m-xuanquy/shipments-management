import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types/user.interface";
import type { LoginData, RegisterData } from "../types/auth.interface";
import { authService } from "../services/auth.service";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  verifyToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      async login(data: LoginData) {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.login(data);
          authService.setToken(response.token);
          set({ user: response.user, isAuthenticated: true, isLoading: false });
        } catch (error: any) {
          set({ error: "Login failed", isLoading: false });
        }
      },

      async register(data: RegisterData) {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.register(data);
          authService.setToken(response.token);
          set({ user: response.user, isAuthenticated: true, isLoading: false });
        } catch (error: any) {
          set({
            error: error.message || "Registration failed",
            isLoading: false,
          });
        }
      },

      logout() {
        authService.removeToken();
        set({ user: null, isAuthenticated: false });
      },

      async verifyToken() {
        set({ isLoading: true, error: null });
        try {
          const user = await authService.verifyToken();
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error: any) {
          authService.removeToken();
          set({ user: null, isAuthenticated: false, isLoading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
