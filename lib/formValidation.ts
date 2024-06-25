import { z } from "zod";
export const FormSchema = z.object({
    entry: z
      .string()
      .min(50, {
        message: "Journal must be more than 50 characters.",
      })
      .max(2000, {
        message: "Journal must not be greater than 2000 characters",
      }),
      selection: z.string(),
      mood: z.string().optional(),
  })