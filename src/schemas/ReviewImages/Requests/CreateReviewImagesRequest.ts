import { z } from "zod";

export const createReviewImagesRequestSchema = z.object({
    reviewId: z.string(),
    url: z.string(),
});

export type CreateReviewImagesRequest = z.infer<typeof createReviewImagesRequestSchema>;