import { z } from "zod";

export const getCategoryResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
});

export type GetCategoryResponse = z.infer<typeof getCategoryResponseSchema>;