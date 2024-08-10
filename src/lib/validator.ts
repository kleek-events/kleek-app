import * as z from 'zod'

const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export const formSchema = z.object({
  groupId: z.string({
    required_error: 'A group is required',
  }),
  name: z.string().min(10, {
    message: 'Name must be at least 10 characters',
  }),
  description: z
    .string({
      required_error: 'A description is required',
    })
    .min(10, {
      message: 'Description must be at least 10 characters',
    })
    .max(500, {
      message: 'Bio must not be longer than 500 characters',
    }),
  startDate: z.date({
    required_error: 'A start date is required',
  }),
  endDate: z.date({
    required_error: 'An end date is required',
  }),
  timezone: z.string({
    required_error: 'A timezone is required',
  }),
  thumbnail: z
    .instanceof(File)
    .optional()
    .refine((file) => {
      return !file || file.size <= MAX_FILE_SIZE
    }, 'File size must be less than 3MB')
    .refine((file) => {
      return ACCEPTED_IMAGE_TYPES.includes(file.type)
    }, 'File must be a PNG'),
  location: z
    .string({
      required_error: 'A location is required.',
    })
    .min(10, {
      message: 'Location must be at least 10 characters.',
    }),
  registrationDeadline: z.date().nullable(),
})
