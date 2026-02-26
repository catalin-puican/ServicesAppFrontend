import { z } from "zod";

export const getPostImagesResponseSchema = z.object({
    id: z.string(),
    postId: z.string(),
    url: z.string(),
});

export type GetPostImagesResponse = z.infer<typeof getPostImagesResponseSchema>;