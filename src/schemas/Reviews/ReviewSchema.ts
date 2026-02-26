import { z } from "zod";
import { getPostsResponseSchema } from "../Posts/Responses/GetPostsResponse";
import { getUsersResponseSchema } from "../Users/DTOs/GetUsersResponse";
import { getReviewImagesResponseSchema } from "../ReviewImages/Responses/GetReviewImagesResponse";

export const reviewSchema = z.object({
    id: z.string(),
    postId: z.string(),
    rating: z.number(),
    comment: z.string(),
    userId: z.string(),
    post: z.array(getPostsResponseSchema),
    user: z.array(getUsersResponseSchema),
    reviewImages: z.array(getReviewImagesResponseSchema),
});

export type Review = z.infer<typeof reviewSchema>;