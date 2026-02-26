import { z } from "zod";

export const updatePostImagesRequestSchema = z.object({
    id: z.string(),
    postId: z.string(),
    url: z.string(),
});

export type UpdatePostImagesRequest = z.infer<typeof updatePostImagesRequestSchema>;