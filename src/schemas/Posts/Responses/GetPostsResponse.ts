import { z } from "zod";
import { getCategoryResponseSchema } from "../../Categories/Responses/GetCategoryResponse";
import { getReviewsResponseSchema } from "../../Reviews/Responses/GetReviewsResponse";
import { getPriceResponseSchema } from "../../Prices/Responses/GetPricesResponse";
import { getUsersResponseSchema } from "../../Users/DTOs/GetUsersResponse";

export const getPostsResponseSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    category: getCategoryResponseSchema.nullable().optional(),
    reviews: z.array(getReviewsResponseSchema).nullable().optional(),
    prices: z.array(getPriceResponseSchema),
    postImageUrls: z.array(z.string()).nullable().optional(),
    user: getUsersResponseSchema.nullable().optional(),
});

export type GetPostsResponse = z.infer<typeof getPostsResponseSchema>;