import { z } from "zod";

export const loginUserRequestSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    isPersistent: z.boolean().default(false),
});
export type LoginUserRequest = z.infer<typeof loginUserRequestSchema>;