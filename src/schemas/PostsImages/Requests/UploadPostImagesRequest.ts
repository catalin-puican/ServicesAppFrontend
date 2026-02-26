import { z } from "zod";

export const uploadPostImagesRequestSchema = z.object({
    postId: z.string().optional(),
    files: z.array(z.instanceof(File)),
});

export type UploadPostImagesRequest = z.infer<typeof uploadPostImagesRequestSchema>;