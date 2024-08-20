'use client'
import { useEffect, useState } from 'react'
import { encodeAbiParameters } from 'viem'
import { writeContract, waitForTransactionReceipt, simulateContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import Image from 'next/image'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Calendar, HeartHandshake, UsersRound } from 'lucide-react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import tz from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(tz)

import {
  AutocompletePlacesInput,
  GroupSelect,
  TimezoneCombobox,
  TokenSelect,
  VisibilitySelect,
  RegisterDeadlineInput,
} from '@/components/form'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { DateTimePicker } from '@/components/ui/datetime-picker'
import AddGroupButton from '@/components/AddGroupButton'
import { Switch } from '@/components/ui/switch'
import EditCapacityInput from '@/components/form/EditCapacityInput'
import { formSchema } from '@/lib/schema'
import { createClient } from '@/utils/supabase/client'
import { useToast } from '@/components/ui/use-toast'
import { KleekProtocolABI } from '@/lib/abi'
import { wagmiConfig } from '@/config/wagmi'
import { contracts, getTokenByName } from '@/utils/blockchain'

export default function Create() {
  const account = useAccount()
  const { toast } = useToast()
  const [thumbnailPreview, setThumbnailPreview] = useState<File | null>(null)
  const [groups, setGroups] = useState<any[]>([])
  const [refreshGroups, setRefreshGroups] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      startDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 26 * 60 * 60 * 1000),
    },
  })

  const fetchGroups = async () => {
    try {
      const { data: groups, error } = await createClient()
        .from('groups')
        .select()
        .eq('wallet', account.address)
      if (error) throw error
      setGroups(groups)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (account.address) {
      fetchGroups()
    }
  }, [account.address, refreshGroups])

  const onSubmit = async (values: z.infer<typeof formSchema>): Promise<void> => {
    setLoading(true)

    try {
      //get deposit token address
      const token = getTokenByName(values.depositToken)
      if (!token) {
        throw new Error('Invalid token')
      }

      console.log('token', token)
      console.log('values', values)
      //upload thumbnail to IPFS
      const data = new FormData()
      data.set('file', values.thumbnail)
      const uploadThumbnailRequest = await fetch('/api/pinata/files', {
        method: 'POST',
        body: data,
      })
      const uploadFileResponse = await uploadThumbnailRequest.json()

      if (!uploadFileResponse.IpfsHash) {
        throw new Error('Failed to upload thumbnail')
      }

      const eventData: Omit<
        z.infer<typeof formSchema>,
        'startDate' | 'endDate' | 'registrationDeadline'
      > & {
        startDate: number
        endDate: number
        registrationDeadline: number | null
      } = {
        ...values,
        startDate: dayjs(values.startDate).tz(values.timezone).unix(),
        endDate: dayjs(values.endDate).tz(values.timezone).unix(),
        registrationDeadline: values.registrationDeadline
          ? dayjs(values.registrationDeadline).tz(values.timezone).unix()
          : dayjs(values.startDate).tz(values.timezone).unix(),
        thumbnail: uploadFileResponse.IpfsHash,
        capacity: values.capacity ?? 0,
        depositToken: token?.address,
      }

      console.log(eventData)

      //upload event data to IPFS
      const uploadEventResponse = await fetch('/api/pinata/json', {
        method: 'POST',
        body: JSON.stringify(eventData),
      })

      const uploadEventData = await uploadEventResponse.json()
      if (!uploadEventData.IpfsHash) {
        throw new Error('Failed to upload event data')
      }

      console.log(uploadEventData)

      //set params
      // const token = WHITELISTED_TOKENS.find((t) => t.address == props.conditions.tokenAddress)
      const depositFee = BigInt(eventData.depositFee * 10 ** (token?.decimals ?? 18))
      let params = encodeAbiParameters(
        [{ type: 'uint256' }, { type: 'address' }],
        [depositFee, token?.address],
      )
      console.log(params)

      //create event on chain
      const { request } = await simulateContract(wagmiConfig, {
        abi: KleekProtocolABI,
        address: contracts.KLEEK_PROXY.address.base,
        functionName: 'create',
        args: [
          `ipfs://${uploadEventData.IpfsHash}`,
          eventData.endDate,
          eventData.registrationDeadline,
          eventData.capacity,
          '0x8084071AE8A350cbecC1cdB29a45468E0e48B8dA',
          params,
        ],
      })
      console.log(request)
      const hash = await writeContract(wagmiConfig, request)

      //create event in database
      // const resp = await fetch('/api/events', {
      //   method: 'POST',
      //   body: JSON.stringify({ groupId, onChainEventId: result.id }),
      // })

      // if (!resp.ok) {
      //   const data = await resp.json()
      //   throw new Error(data.error)
      // }

      //revalidate subgraph query
      // revalidateTag('eventCreateds')
    } catch (e) {
      console.log(e)
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
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
                      if (event.target.files) {
                        form.setValue('thumbnail', event.target.files[0])
                        setThumbnailPreview(event.target.files[0])
                      }
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="order-1 flex w-full flex-col gap-4 sm:order-2 sm:col-span-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <FormField
                  control={form.control}
                  name="groupId"
                  render={({ field }) => (
                    <FormItem>
                      <GroupSelect form={form} field={{ ...field }} groups={groups} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <AddGroupButton onGroupCreated={() => setRefreshGroups((prev) => !prev)} />
              </div>
              <FormField
                control={form.control}
                defaultValue="public"
                name="visibility"
                render={({ field }) => (
                  <FormItem>
                    <VisibilitySelect form={form} field={{ ...field }} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
              defaultValue={Intl.DateTimeFormat().resolvedOptions().timeZone}
              control={form.control}
              name="timezone"
              render={({ field }) => (
                <FormItem className="">
                  <TimezoneCombobox form={form} field={{ ...field }} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormControl>
                    <Textarea
                      placeholder="Describe your event"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <AutocompletePlacesInput form={form} field={{ ...field }} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="depositToken"
                defaultValue="usdt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deposit Token</FormLabel>
                    <FormControl>
                      <TokenSelect form={form} field={{ ...field }} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="depositFee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deposit Fee</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Token quantity"
                        {...field}
                        step={0.1}
                        min={0}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border px-4 py-2">
                  <div className="space-y-0.5">
                    <FormLabel className="inline-flex gap-1 text-base">
                      <UsersRound /> Capacity
                    </FormLabel>
                  </div>
                  <FormControl>
                    <EditCapacityInput form={form} field={{ ...field }} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="registrationDeadline"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="inline-flex gap-1 text-base">
                      <Calendar /> Registration deadline
                    </FormLabel>
                    <FormDescription>
                      If not set, registration will be open until the event starts.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <RegisterDeadlineInput form={form} field={{ ...field }} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shareDeposit"
              defaultValue={true}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="inline-flex gap-1 text-base">
                      <HeartHandshake /> Sharing is caring
                    </FormLabel>
                    <FormDescription>
                      Share deposit fees of no-goers between attendees.
                      <br />
                      If disabled, you will keep all the deposit fees of no-goers.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} aria-readonly />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button
            className="order-last sm:col-span-2 sm:col-start-2"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <div className="inline-flex items-center gap-2">
                <svg
                  className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Creating Event</span>
              </div>
            ) : (
              'Create Event'
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
