import React from 'react'
import Image from 'next/image'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Eye,
  Share2,
  ArrowRight,
  HeartHandshake,
} from 'lucide-react'

import { getEvent } from '@/services/subgraph'
import { getEventMetadata } from '@/services/ipfs'
import { PINATA_GATEWAY_URL } from '@/utils/pinata'
import { RegisterButton } from '@/components/RegisterButton'
import { formatDate } from '@/utils/date'

dayjs.extend(utc)
dayjs.extend(timezone)

async function Event({ params }: { params: { id: number } }) {
  const event = await getEvent(params.id)
  if (event.contentUri == 'http://ipfs' || !event.contentUri) return

  const metadata = await getEventMetadata(event.contentUri.replace('ipfs://', ''))

  if (!metadata) return null
  if (metadata.visibility === 'private') return null

  const startDate = formatDate(metadata.startDate, metadata.timezone)
  const endDate = formatDate(metadata.endDate, metadata.timezone)
  const registrationDeadline = formatDate(metadata.registrationDeadline, metadata.timezone)

  return (
    <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-3">
      <div className="flex flex-col gap-4 md:col-span-1">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg">
          <Image
            fill
            alt={metadata.name}
            src={`https://${PINATA_GATEWAY_URL}/ipfs/${metadata.thumbnail}`}
            className="object-cover"
          />
          <div className="absolute left-4 top-4 rounded bg-white px-3 py-1 text-sm font-semibold text-gray-700">
            Deposit: {metadata.visibility}
          </div>
        </div>
        <RegisterButton event={event} />
      </div>

      <div className="md:col-span-2">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">{metadata.name}</h1>
        <p className="mb-6 text-lg text-gray-700">{metadata.description}</p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="flex items-center text-gray-700">
            <Calendar className="mr-3 h-6 w-6" />
            <div>
              <p className="font-semibold">Start</p>
              <p>{startDate}</p>
            </div>
          </div>
          <div className="flex items-center text-gray-700">
            <Calendar className="mr-3 h-6 w-6" />
            <div>
              <p className="font-semibold">End</p>
              <p>{endDate}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2 text-gray-700">
          <div className="col-span-2 flex items-center text-fuchsia-500">
            <Clock className="mr-2 h-4 w-4" />
            <span>Register by: {registrationDeadline}</span>
          </div>
          <div className="col-span-2 flex items-center">
            <MapPin className="mr-2 h-4 w-4" />
            <span>{metadata.location}</span>
          </div>
          <div className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            <span>
              Capacity: {metadata.capacity === 0 ? 'Unlimited' : `${metadata.capacity} attendees`}
            </span>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center">
            <HeartHandshake className="mr-2 h-5 w-5 text-fuchsia-500" />
            <span className="text-fuchsia-500">
              {metadata.shareDeposit ? 'Shared Deposit' : 'Transfer Deposit'}
            </span>
          </div>
          <p className="text-gray-700">
            If you attend the event, you will receive your deposit back and a share of the deposits
            of those who did not attend.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Event
