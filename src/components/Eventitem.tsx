import Image from 'next/image'
import Link from 'next/link'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { Calendar, MapPin, Users, Clock, HeartHandshakeIcon } from 'lucide-react'

import { getEventMetadata } from '@/services/ipfs'
import { PINATA_GATEWAY_URL } from '@/utils/pinata'
import { getTokenByAddress } from '@/utils/blockchain'

dayjs.extend(utc)
dayjs.extend(timezone)

export default async function EventItem({
  event,
}: Readonly<{
  event: {
    eventId: number
    owner: string
    contentUri: string
    endDate: number
    timestamp: number
    transactionHash: string
  }
}>) {
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
    <Link
      href={`/events/${event.eventId}`}
      className="block overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:border-fuchsia-400 hover:shadow-md"
    >
      <div className="flex p-4">
        <div className="relative size-48 flex-shrink-0">
          <Image
            fill
            alt={metadata.name}
            src={`https://${PINATA_GATEWAY_URL}/ipfs/${metadata.thumbnail}`}
            className="rounded-lg object-cover"
          />
          <div className="absolute left-2 top-2 inline-flex gap-1 rounded bg-white px-2 py-1 text-sm font-semibold text-gray-700 shadow-sm">
            Deposit: {metadata.depositFee}
            <Image
              src={getTokenByAddress(metadata.depositToken)?.logo}
              width={16}
              height={16}
              alt="token logo"
              className="size-5"
            />
          </div>
        </div>
        <div className="flex flex-1 flex-col px-4">
          <div className="mb-2 flex items-start justify-between">
            <h3 className="w-3/5 text-xl font-bold text-gray-900">{metadata.name}</h3>
            <span className="ml-2 inline-flex rounded-full bg-fuchsia-100 px-2 py-1 text-xs font-semibold leading-5 text-fuchsia-600">
              {metadata.shareDeposit && (
                <div className="inline-flex items-center gap-1">
                  <HeartHandshakeIcon className="size-4" /> Shared Deposit
                </div>
              )}
            </span>
          </div>
          <p className="mb-4 line-clamp-2 text-sm text-gray-600">{metadata.description}</p>
          <div className="mt-auto grid grid-cols-2 gap-2 text-sm text-gray-600">
            <div className="col-span-2 flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <span className="truncate">
                {startDate} - {endDate}
              </span>
            </div>
            <div className="col-span-2 flex items-center text-fuchsia-400">
              <Clock className="mr-2 h-4 w-4" />
              <span className="truncate">Register by: {registrationDeadline}</span>
            </div>
            <div className="col-span-2 flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              <span className="truncate">{metadata.location}</span>
            </div>
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              <span>
                Capacity: {metadata.capacity === 0 ? 'Unlimited' : `${metadata.capacity} attendees`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
