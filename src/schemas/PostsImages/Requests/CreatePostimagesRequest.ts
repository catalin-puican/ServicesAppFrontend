import { z } from "zod";

export const createPostImagesRequestSchema = z.object({
    postId: z.string(),
    url: z.string(),
});

export type CreatePostImagesRequest = z.infer<typeof createPostImagesRequestSchema>;