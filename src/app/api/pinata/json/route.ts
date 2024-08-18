import { NextResponse, NextRequest } from 'next/server'
import { pinata } from '@/utils/pinata'

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// }

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    const uploadData = await pinata.upload.json(data).group(process.env.PINATA_GROUP_ID)
    return NextResponse.json(uploadData, { status: 200 })
  } catch (e) {
    console.log(e)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
