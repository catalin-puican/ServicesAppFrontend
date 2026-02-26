import { z } from "zod";
import { getPostsResponseSchema } from "../Posts/Responses/GetPostsResponse";

export const priceSchema = z.object({
    id: z.string(),
    postId: z.string(),
    value: z.number(),
    description: z.string(),
    post: z.array(getPostsResponseSchema),
});

export type Price = z.infer<typeof priceSchema>;
