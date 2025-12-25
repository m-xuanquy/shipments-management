import { z } from 'zod';

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
})

export const registerSchema = z.object({
    fullname: z.string().min(2),
    email: z.email(),
    phone: z.string().min(10),
    password: z.string().min(6),
    confirmPassword: z.string(),

}).refine(data => data.password === data.confirmPassword)

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;