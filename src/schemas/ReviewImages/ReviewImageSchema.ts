import { z } from "zod";
import { getReviewsResponseSchema } from "../Reviews/Responses/GetReviewsResponse";

export const reviewImageSchema = z.object({
    id: z.string(),
    reviewId: z.string(),
    url: z.string(),
    review: z.array(getReviewsResponseSchema),
});

export type ReviewImage = z.infer<typeof reviewImageSchema>;