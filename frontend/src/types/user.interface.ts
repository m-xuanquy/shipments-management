export interface User {
    id: string;
    fullname: string;
    email: string;
    phone: string;
}

export interface UpdateUserData {
    fullname?: string;
    email?: string;
    phone?: string;
}