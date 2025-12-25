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

}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
})

export const createShipmentSchema = z.object({
    pickupLocation: z.string().min(2),
    deliveryLocation: z.string().min(2),
    deliveryPerson: z.string().min(2),
})

export const updateShipmentSchema = z.object({
    pickupLocation: z.string().min(2).optional(),
    deliveryLocation: z.string().min(2).optional(),
    deliveryPerson: z.string().min(2).optional(),
})

export const updateUserSchema = z.object({
    fullname: z.string().min(2).optional(),
    email: z.email().optional(),
    phone: z.string().min(10).optional(),
})

export const changePasswordSchema = z.object({
    currentPassword: z.string().min(6),
    newPassword: z.string().min(6),
    confirmPassword: z.string().min(6),
}).refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
})

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type CreateShipmentFormData = z.infer<typeof createShipmentSchema>;
export type UpdateShipmentFormData = z.infer<typeof updateShipmentSchema>;
export type UpdateUserFormData = z.infer<typeof updateUserSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;