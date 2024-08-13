import * as z from 'zod'

const MAX_FILE_SIZE = 1024 * 1024 // 1MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png']

export const formSchema = z
  .object({
    groupId: z.string({
      required_error: 'A group is required',
    }),
    visibility: z.string({
      required_error: 'A visibility setting is required',
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
    startDate: z
      .date({
        required_error: 'A start date is required',
      })
      .refine((data) => data > new Date(), { message: 'Start date must be in the future' }),
    endDate: z.date({
      required_error: 'An end date is required',
    }),
    timezone: z.string({
      required_error: 'A timezone is required',
    }),
    thumbnail: z
      .instanceof(File)
      .refine((file) => {
        return !file || file.size <= MAX_FILE_SIZE
      }, 'File size must be less than 1MB')
      .refine((file) => {
        return ACCEPTED_IMAGE_TYPES.includes(file.type)
      }, 'File must be a valid image'),
    location: z
      .string({
        required_error: 'A location is required.',
      })
      .min(10, {
        message: 'Location must be at least 10 characters.',
      }),
    depositToken: z.string({
      required_error: 'A deposit token is required.',
    }),
    depositFee: z.preprocess(
      (args) => (args === '' ? undefined : args),
      z.coerce
        .number({ invalid_type_error: 'Fee must be a number' })
        .positive('Fee must be positive'),
    ),
    capacity: z.preprocess(
      (args) => (args === '' ? undefined : args),
      z.coerce
        .number({ invalid_type_error: 'Capacity must be a number' })
        .positive('Capacity must be positive')
        .optional(),
    ),
    registrationDeadline: z.date().nullable(),
    shareDeposit: z.boolean(),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: 'End date cannot be earlier than start date.',
    path: ['endDate'],
  })
