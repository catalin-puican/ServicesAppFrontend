import { z } from "zod";

export const getPriceResponseSchema = z.object({
    id: z.string(),
    value: z.number(),
    description: z.string(),
});

export type GetPriceResponse = z.infer<typeof getPriceResponseSchema>;