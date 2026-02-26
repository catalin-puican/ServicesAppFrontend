import { z } from "zod";

export const updateReviewsRequestSchema = z.object({
    id: z.string(),
    postId: z.string(),
    rating: z.number().int(),
    comment: z.string(),
});

export type UpdateReviewsRequest = z.infer<typeof updateReviewsRequestSchema>;