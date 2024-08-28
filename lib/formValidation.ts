import { z } from "zod";
export const FormSchema = z.object({
	title: z.string().min(5, {
        message: "Title must be more than 2 characters.",
      })
      .max(25, {
        message: "Title must not be greater than 25 characters",
      }),
    entry: z
      .string()
      .min(5, {
        message: "Journal must be more than 5 characters.",
      })
      .max(250, {
        message: "Journal must not be greater than 250 characters",
      }),
      selection: z.string(),
      question: z.string().optional(),
      answer: z.string().optional(),
  })

export const CalendarMoodSchema = z.object({
  mood: z.string(),
  moodDate: z.string(),
})