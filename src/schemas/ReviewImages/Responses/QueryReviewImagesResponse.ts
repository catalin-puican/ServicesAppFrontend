import { z } from "zod";
import { getReviewImagesResponseSchema } from "./GetReviewImagesResponse";

export const queryReviewImagesResponseSchema = z.object({
    pageCount: z.number(),
    totalCount: z.number(),
    reviewImages: z.array(getReviewImagesResponseSchema),
});

export type QueryReviewImagesResponse = z.infer<typeof queryReviewImagesResponseSchema>;