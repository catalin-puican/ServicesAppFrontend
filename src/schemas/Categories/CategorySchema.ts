import { z } from "zod";
import { getPostsResponseSchema } from "../Posts/Responses/GetPostsResponse";

export const categorySchema = z.object({
    id: z.string(),
    name: z.string(),
    post: z.array(getPostsResponseSchema).optional(),
});

export type Category = z.infer<typeof categorySchema>;