import { z } from "zod";

export const updateReviewImagesRequestSchema = z.object({
    id: z.string(),
    reviewId: z.string(),
    url: z.string(),
});

export type UpdateReviewImagesRequest = z.infer<typeof updateReviewImagesRequestSchema>;