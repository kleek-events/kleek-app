import { NextRequest, NextResponse } from 'next/server'

import { createClient } from '@/utils/supabase/server'

type GroupEntry = {
  groupName: string
}

export async function POST(req: NextRequest, res: NextResponse) {
  //get groupName from request body
  const { groupName } = (await req.json()) as GroupEntry

  //save in database
  try {
    const { data, error } = await createClient()
      .from('groups')
      .insert({ name: groupName, wallet: req.headers.get('wallet-address') })
      .select()
      .limit(1)
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, data }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.details }, { status: 500 })
  }
}
