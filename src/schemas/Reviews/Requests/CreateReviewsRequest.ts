import { z } from "zod"

export const createReviewsRequestSchema = z.object({
    userId: z.string(),
    postId: z.string(),
    comment: z.string(),
    rating: z.number().int()
});

export type CreateReviewsRequest = z.infer<typeof createReviewsRequestSchema>;
