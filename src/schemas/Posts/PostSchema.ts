import { z } from "zod";
import { getCategoryResponseSchema } from "../Categories/Responses/GetCategoryResponse";
import { getUsersResponseSchema } from "../Users/DTOs/GetUsersResponse";
import { getReviewsResponseSchema } from "../Reviews/Responses/GetReviewsResponse";
import { getPriceResponseSchema } from "../Prices/Responses/GetPricesResponse";

export const postSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    category: getCategoryResponseSchema.nullable().optional(),
    reviews: z.array(getReviewsResponseSchema).nullable().optional(),
    prices: z.array(getPriceResponseSchema).nullable().optional(),
    postImageUrls: z.array(z.string()).nullable().optional(),
    user: getUsersResponseSchema.nullable().optional(),
});

export type Post = z.infer<typeof postSchema>;