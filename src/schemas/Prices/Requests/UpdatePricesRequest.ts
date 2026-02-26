import { z } from "zod";

export const updatePricesRequestSchema = z.object({
    id: z.string(),
    postId: z.string(),
    value: z.number(),
    description: z.string(),
});

export type UpdatePricesRequest = z.infer<typeof updatePricesRequestSchema>;