import { pinata } from '@/utils/pinata'

export async function getEventMetadata(ipfsHash: string) {
  try {
    //get main metadata
    const resp = await pinata.gateways.get(ipfsHash)

    return resp.data
  } catch (error) {
    console.error('Failed to fetch metadata', error)
    throw new Error('Failed to fetch metadata from IPFS')
  }
}
