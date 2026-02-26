import { z } from "zod";
import { postSchema } from "../PostSchema";

export const queryPostsResponseSchema = z.object({
    pageCount: z.number(),
    totalCount: z.number().default(10), 
    minPrice: z.number().nullable().optional(),
    maxPrice: z.number().nullable().optional(),
    posts: z.array(postSchema)
});

export type QueryPostsResponse = z.infer<typeof queryPostsResponseSchema>;
