import * as z from 'zod'

export const formSchema = z.object({
  name: z.string().min(20, {
    message: 'Name must be at least 20 characters.',
  }),
  description: z
    .string()
    .min(10, {
      message: 'Description must be at least 10 characters.',
    })
    .max(500, {
      message: 'Bio must not be longer than 500 characters.',
    }),
  startDate: z.date({
    required_error: 'A start date is required.',
  }),
  endDate: z.date({
    required_error: 'An end date is required.',
  }),
  timezone: z.string({
    required_error: 'A timezone is required.',
  }),
  thumbnail: z.instanceof(File),
})
