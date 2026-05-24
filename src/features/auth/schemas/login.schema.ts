import * as z from "zod"

export type LoginSchema = z.infer<typeof loginSchema>

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    rememberMe: z.boolean().optional(),
})