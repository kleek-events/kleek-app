import { PINATA_GATEWAY_URL } from '@/utils/pinata'
import { HttpRequest } from '@/utils/request'

interface EventMetadata {
  groupId: string
  visibility: string
  name: string
  description: string
  startDate: number
  endDate: number
  timezone: string
  thumbnail: string
  location: string
  depositToken: string
  depositFee: number
  capacity: number
  registrationDeadline: number
  shareDeposit: boolean
}

export async function getEventMetadata(ipfsHash: string) {
  try {
    const resp = await HttpRequest.get<EventMetadata>(
      `https://${PINATA_GATEWAY_URL}/ipfs/${ipfsHash}`,
    )

    return resp
  } catch (error) {
    console.error('Failed to fetch metadata', error)
    throw new Error('Failed to fetch metadata from IPFS')
  }
}
