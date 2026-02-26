import { z } from "zod";
import { getReviewsResponseSchema } from "./GetReviewsResponse";

export const queryReviewsResponseSchema = z.object({
    pageCount: z.number(),
    totalCount: z.number(),
    reviews: z.array(getReviewsResponseSchema),
});

export type QueryReviewsResponse = z.infer<typeof queryReviewsResponseSchema>;