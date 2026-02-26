import { z } from "zod";

export const getUsersResponseSchema = z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    phoneNumber: z.string().nullable().optional(),
    addressLine1: z.string(),
    addressLine2: z.string().optional().nullable(),
    locality: z.string(),
    state: z.string(),
    postalCode: z.string(),
    country: z.string(),
    profileImageUrl: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
});

export type GetUsersResponse = z.infer<typeof getUsersResponseSchema>;