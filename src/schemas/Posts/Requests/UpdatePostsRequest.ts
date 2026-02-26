import { z } from "zod";

export const updatePostRequestSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    imageUrls: z.array(z.string()).optional(),
});

export type UpdatePostRequest = z.infer<typeof updatePostRequestSchema>;