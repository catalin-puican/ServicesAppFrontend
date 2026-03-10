import { z } from "zod";
import { getPriceResponseSchema } from "./GetPricesResponse";

export const queryPricesResponseSchema = z.object({
    pageCount: z.number(),
    totalCount: z.number(),
    prices: z.array(getPriceResponseSchema),
});

export type QueryPricesResponse = z.infer<typeof queryPricesResponseSchema>;
