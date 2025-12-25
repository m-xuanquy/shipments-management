import type { User } from "./user.interface";

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    fullname: string;
    email: string;
    phone: string;
    password: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}
