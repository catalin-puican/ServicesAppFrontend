import { z } from "zod";

export const usersUpdateRequestSchema = z.object({
    id: z.string(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    phoneNumber: z.string().optional(),
    addressLine1: z.string().optional(),
    addressLine2: z.string().optional().nullable(),
    locality: z.string().optional(),
    state: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().optional(),
    description: z.string().optional().nullable(),
});

export type UsersUpdateRequest = z.infer<typeof usersUpdateRequestSchema>;
