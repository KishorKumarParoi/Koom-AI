import { z } from "zod";

export const createCommentSchema = z.object({
  comment: z.string().min(1, { message: "Comment can't be empty!" }),
});
