import { NextRequest, NextResponse } from 'next/server'

import { createClient } from '@/utils/supabase/server'

// You might want to create a types file for your database schema
type GroupEntry = {
  groupName: string
}

export async function POST(req: NextRequest, res: NextResponse) {
  // Type assertion here because we expect searchTerm to be in the body
  const { groupName } = (await req.json()) as GroupEntry

  //verify unique group name

  try {
    const { data, error } = await createClient()
      .from('groups')
      .insert({ name: groupName, wallet: '0x123' })
      .select()
      .limit(1)
      .single()

    if (error) throw error
    console.log('data', error)
    return NextResponse.json({ success: true, data }, { status: 200 })
  } catch (error) {
    console.log('data', error)
    return NextResponse.json({ error: 'Databse Error' }, { status: 500 })
  }
}
