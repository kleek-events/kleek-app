import * as z from 'zod'

const MAX_FILE_SIZE = 500000
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
    .any()
    .refine((files) => files?.length == 1, 'Event thumbnail is required.')
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.',
    ),
  location: z
    .string({
      required_error: 'A location is required.',
    })
    .min(10, {
      message: 'Description must be at least 10 characters.',
    })
    .max(500, {
      message: 'Bio must not be longer than 200 characters.',
    }),
})
