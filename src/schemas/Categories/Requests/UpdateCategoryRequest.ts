import { z } from "zod";

export const updateCategoryRequestSchema = z.object({
    id: z.string(),
    name: z.string(),
});

export type UpdateCategoryRequest = z.infer<typeof updateCategoryRequestSchema>;