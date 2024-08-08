'use client'
import { useState } from 'react'
import Image from 'next/image'
import { z } from 'zod'
import { useAccount } from 'wagmi'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import SignInButton from '@/components/SignInButton'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { formSchema } from '@/lib/validator'
import { Textarea } from '@/components/ui/textarea'
import { DateTimePicker } from '@/components/ui/datetime-picker'
import { Combobox } from '@/components/ui/combobox'

export default function Create() {
  const account = useAccount()
  const [thumbnailPreview, setThumbnailPreview] = useState<File | null>(null)

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
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 px-4 sm:grid-cols-3 sm:gap-12">
              <div className="order-2 sm:order-1">
                {thumbnailPreview ? (
                  <Image
                    src={URL.createObjectURL(thumbnailPreview)}
                    alt="Thumbnail preview"
                    width={400}
                    height={400}
                    className="mb-4 aspect-square rounded-lg object-center"
                  />
                ) : (
                  <div className="mb-4 aspect-square rounded-lg bg-fuchsia-100" />
                )}
                <FormField
                  control={form.control}
                  name="thumbnail"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem className="flex flex-col">
                      <Input
                        {...fieldProps}
                        className="cursor-pointer"
                        placeholder="Picture"
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                          onChange(event.target.files && event.target.files[0])
                          setThumbnailPreview(event.target.files[0])
                        }}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="order-1 flex w-full flex-col gap-4 sm:order-2 sm:col-span-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <textarea
                          maxLength={140}
                          rows={2}
                          placeholder="Event name"
                          className="w-full text-3xl font-semibold placeholder:opacity-60 hover:placeholder:opacity-80 focus:outline-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Start Date</FormLabel>
                        <DateTimePicker field={{ ...field }} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="timezone"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Timezone</FormLabel>
                        <Combobox form={form} field={{ ...field }} />
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
                        <DateTimePicker field={{ ...field }} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell more about your event"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button className="order-last sm:col-span-2 sm:col-start-2" type="submit">
                Create Event
              </Button>
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
