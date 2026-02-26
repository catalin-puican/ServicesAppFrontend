import { getUsersResponseSchema } from "@/schemas/Users/DTOs/GetUsersResponse";
import { z } from "zod";

export const getReviewsResponseSchema = z.object({
    id: z.string(),
    rating: z.number(),
    comment: z.string(),
    user: getUsersResponseSchema.nullable().optional(),
});

export type GetReviewsResponse = z.infer<typeof getReviewsResponseSchema>;