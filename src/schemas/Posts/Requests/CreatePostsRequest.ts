import { z } from "zod";

export const createPostRequestSchema = z.object({
    title: z.string(),
    description: z.string(),
    categoryId: z.string(),
    imageUrls: z.array(z.string()),
    userId: z.string(),
});

export type CreatePostRequest = z.infer<typeof createPostRequestSchema>;