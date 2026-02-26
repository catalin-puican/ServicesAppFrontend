import { z } from "zod";

export const getReviewImagesResponseSchema = z.object({
    id: z.string(),
    reviewId: z.string(),
    url: z.string(),
});

export type GetReviewImagesResponse = z.infer<typeof getReviewImagesResponseSchema>;