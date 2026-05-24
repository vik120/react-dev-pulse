import * as z from "zod";

export type RegisterSchema = z.infer<typeof registerSchema>

export const registerSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
    termsCondition: z.boolean().refine(value => value === true, "You must accept the terms and conditions"),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});