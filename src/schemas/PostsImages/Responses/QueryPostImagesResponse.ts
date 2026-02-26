import { z } from "zod";
import { getPostImagesResponseSchema } from "./GetPostImagesResponse";

export const queryPostImagesResponseSchema = z.object({
    pageCount: z.number(),
    totalCount: z.number(),
    postImages: z.array(getPostImagesResponseSchema),
});

export type QueryPostImagesResponse = z.infer<typeof queryPostImagesResponseSchema>;