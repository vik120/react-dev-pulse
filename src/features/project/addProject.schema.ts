import * as z from "zod"

export type AddProjectSchema = z.infer<typeof addProjectSchema>

export const addProjectSchema = z.object({
    projectName: z.string().min(1, "Project name is required"),
    websiteUrl: z.url("Invalid URL"),
    developmentType: z.string().min(1, "Development type is required"),
})