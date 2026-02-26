import { z } from "zod";
import { getCategoryResponseSchema } from "./GetCategoryResponse";

export const queryCategoryResponseSchema = z.object({
    pageCount: z.number(),
    totalCount: z.number(),
    categories: z.array(getCategoryResponseSchema),
});

export type QueryCategoryResponse = z.infer<typeof queryCategoryResponseSchema>;