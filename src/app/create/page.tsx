'use client'

import { z } from 'zod'
import { useAccount } from 'wagmi'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import SignInButton from '@/components/SignInButton'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/DatePicker'

const formSchema = z.object({
  name: z.string().min(20, {
    message: 'Name must be at least 20 characters.',
  }),
  startDate: z.date({
    required_error: 'A start date is required.',
  }),
  endDate: z.date({
    required_error: 'An end date is required.',
  }),
  thumbnail: z.instanceof(File),
})

export default function Create() {
  const account = useAccount()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      startDate: new Date(),
      endDate: new Date(),
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <div className="mx-auto max-w-5xl sm:py-12">
      <div className="flex justify-between"></div>
      {account.isConnected ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mx-auto grid max-w-2xl grid-flow-row-dense grid-cols-3 gap-4">
              <div>
                <FormField
                  control={form.control}
                  name="thumbnail"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem className="flex flex-col">
                      <Input
                        {...fieldProps}
                        placeholder="Picture"
                        type="file"
                        accept="image/*"
                        onChange={(event) => onChange(event.target.files && event.target.files[0])}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-2 w-full">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <textarea
                          maxLength={140}
                          rows={2}
                          placeholder="Enter name"
                          className="w-full text-3xl font-semibold placeholder:opacity-60 hover:placeholder:opacity-80 focus:outline-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date</FormLabel>
                      <DatePicker field={{ ...field }} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Date</FormLabel>
                      <DatePicker field={{ ...field }} />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Submit</Button>
              </div>
            </div>
          </form>
        </Form>
      ) : (
        <div className="mt-6 flex flex-col items-center justify-center gap-6 text-lg leading-8 text-gray-600">
          <p className="text-xl">You need an log in to create an event</p>
          <SignInButton />
        </div>
      )}
    </div>
  )
}
