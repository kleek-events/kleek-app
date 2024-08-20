import { useState } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import tz from 'dayjs/plugin/timezone'
import { encodeAbiParameters } from 'viem'
import { writeContract, simulateContract } from '@wagmi/core'
import Lottie from 'react-lottie'

dayjs.extend(utc)
dayjs.extend(tz)

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { formSchema } from '@/lib/schema'
import { toast } from '@/components/ui/use-toast'
import { contracts, getTokenByName } from '@/utils/blockchain'
import { KleekProtocolABI } from '@/lib/abi'
import { wagmiConfig } from '@/config/wagmi'

import animationData from '@/assets/animations/create-loading.json'

const defaultLottieOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}

export function CreateEventButton({ form, className }: { form: any; className?: string }) {
  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)

  const onSubmit = async (values: z.infer<typeof formSchema>): Promise<void> => {
    setLoading(true)

    try {
      //get deposit token address
      const token = getTokenByName(values.depositToken)
      if (!token) {
        throw new Error('Invalid token')
      }

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

      //revalidate subgraph query
      const resp = await fetch('/api/revalidate', {
        method: 'POST',
        body: JSON.stringify({ tag: 'eventCreateds' }),
      })

      if (!resp.ok) {
        const data = await resp.json()
        throw new Error(data.error)
      }
      //reset form
      setOpen(false)
      toast({
        variant: 'default',
        title: 'Event created!',
        description: 'Your event has been successfully created.',
      })
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
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className={className} disabled={!form.formState.isValid}>
          Create Event
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          {loading ? (
            <div className="relative flex h-full w-full flex-col items-center justify-end">
              <span className="absolute z-10 mb-20 text-xl font-semibold text-white">
                Publishing event...
              </span>
              <p className="my-4 text-gray-600">Please do not leave this page</p>
              <Lottie options={defaultLottieOptions} height={400} width={400} className="size-96" />
            </div>
          ) : (
            <>
              {' '}
              <AlertDialogTitle>Have you checked your event details?</AlertDialogTitle>
              <AlertDialogDescription>
                You cannot modify your event once it is created. Please make sure all the details
                are correct.
              </AlertDialogDescription>
            </>
          )}
        </AlertDialogHeader>
        {!loading && (
          <AlertDialogFooter>
            <AlertDialogAction onClick={form.handleSubmit(onSubmit)}>Continue</AlertDialogAction>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  )
}
