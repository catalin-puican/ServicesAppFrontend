import { z } from "zod";

export const createPricesRequestSchema = z.object({
    postId: z.string(),
    value: z.number(),
    description: z.string(),
});

export type CreatePricesRequest = z.infer<typeof createPricesRequestSchema>;