import { getReviewImagesResponseSchema } from "@/schemas/ReviewImages/Responses/GetReviewImagesResponse";
import { getUsersResponseSchema } from "@/schemas/Users/DTOs/GetUsersResponse";
import { z } from "zod";

export const getReviewsResponseSchema = z.object({
    id: z.string(),
    rating: z.number(),
    comment: z.string(),
    reviewImages: z.array(getReviewImagesResponseSchema).nullable().optional(),
    user: getUsersResponseSchema.nullable().optional(),
});

export type GetReviewsResponse = z.infer<typeof getReviewsResponseSchema>;