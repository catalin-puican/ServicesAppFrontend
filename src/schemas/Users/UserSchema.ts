import { z } from "zod";

export const userSchema = z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    phoneNumber: z.string(),
    addressLine1: z.string(),
    addressLine2: z.string().optional().nullable(),
    state: z.string(),
    locality: z.string(),
    postalCode: z.string(),
    country: z.string(),
    profileImageUrl: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
});

export type User = z.infer<typeof userSchema>;