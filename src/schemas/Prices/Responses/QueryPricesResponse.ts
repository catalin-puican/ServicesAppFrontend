import { z } from "zod";
import { getPricesResponseSchema } from "./GetPricesResponse";

export const queryPricesResponseSchema = z.object({
    pageCount: z.number(),
    totalCount: z.number(),
    prices: z.array(getPricesResponseSchema),
});

export type QueryPricesResponse = z.infer<typeof queryPricesResponseSchema>;
