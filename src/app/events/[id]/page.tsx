import React from 'react'
import Image from 'next/image'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { Calendar, MapPin, Users, Clock, Eye, Share2, ArrowRight } from 'lucide-react'

import { getEvent } from '@/services/subgraph'
import { getEventMetadata } from '@/services/ipfs'
import { Button } from '@/components/ui/button'
import ButtonRegister from './ButtonRegister'
import { PINATA_GATEWAY_URL } from '@/utils/pinata'

dayjs.extend(utc)
dayjs.extend(timezone)

async function Event({ params }: { params: { id: number } }) {
  const event = await getEvent(params.id)

  if (event.contentUri == 'http://ipfs' || !event.contentUri) return

  const metadata = await getEventMetadata(event.contentUri.replace('ipfs://', ''))

  if (!metadata) return null
  if (metadata.visibility === 'private') return null

  const formatDate = (timestamp, tz) => {
    return dayjs.unix(timestamp).tz(tz).format('MMM D, YYYY h:mm A')
  }

  const startDate = formatDate(metadata.startDate, metadata.timezone)
  const endDate = formatDate(metadata.endDate, metadata.timezone)
  const registrationDeadline = formatDate(metadata.registrationDeadline, metadata.timezone)

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      <div className="flex flex-col gap-4 md:col-span-1">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg">
          <Image
            fill
            alt={metadata.name}
            src={`https://${PINATA_GATEWAY_URL}/ipfs/${metadata.thumbnail}`}
            className="object-cover"
          />
          <div className="absolute bottom-4 right-4 rounded bg-white px-3 py-1 text-sm font-semibold text-gray-700">
            <Eye className="mr-2 inline-block h-4 w-4" />
            {metadata.visibility}
          </div>
        </div>
        <ButtonRegister />
      </div>

      <div className="md:col-span-2">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">{metadata.name}</h1>
        <p className="mb-6 text-lg text-gray-600">{metadata.description}</p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="flex items-center text-gray-600">
            <Calendar className="mr-3 h-6 w-6" />
            <div>
              <p className="font-semibold">Start</p>
              <p>{startDate}</p>
            </div>
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar className="mr-3 h-6 w-6" />
            <div>
              <p className="font-semibold">End</p>
              <p>{endDate}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2 text-gray-600">
          <div className="col-span-2 flex items-center text-fuchsia-400">
            <Clock className="mr-2 h-4 w-4" />
            <span>Register by: {registrationDeadline}</span>
          </div>
          <div className="col-span-2 flex items-center">
            <MapPin className="mr-2 h-4 w-4" />
            <span>{metadata.location}</span>
          </div>
          <div className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            <span>{metadata.capacity === 0 ? 'Unlimited' : `${metadata.capacity} attendees`}</span>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center">
            <Share2 className="mr-2 h-5 w-5 text-fuchsia-600" />
            <span className="font-semibold text-fuchsia-600">
              {metadata.shareDeposit ? 'Shared Deposit' : 'Transfer Deposit'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Event
