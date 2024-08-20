import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

interface RevalidateRequest {
  tag: 'eventCreateds'
}

export async function POST(req: NextRequest) {
  try {
    const { tag } = (await req.json()) as RevalidateRequest

    revalidateTag(tag)

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error: any) {
    console.error(error)
    return new Response(error.message, { status: 500 })
  }
}
