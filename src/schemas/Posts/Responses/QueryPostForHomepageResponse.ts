import { z } from "zod";
import { postSchema } from "../PostSchema";

export const queryPostsForHomepageResponseSchema = z.object({
    pageCount: z.number(),
    totalCount: z.number(), 
    posts: z.array(postSchema)
});

export type QueryPostforHomepageResponse = z.infer<typeof queryPostsForHomepageResponseSchema>;
