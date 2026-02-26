import { z } from "zod";

export const createCategoryRequestSchema = z.object({
    name: z.string(),
});

export type CreateCategoryRequest = z.infer<typeof createCategoryRequestSchema>;