import { z } from "zod";

export const uploadReviewImageRequestSchema = z.object({
    reviewId: z.string().optional(),
    files: z.array(z.instanceof(File)),
});

export type UploadReviewImageRequest = z.infer<typeof uploadReviewImageRequestSchema>;