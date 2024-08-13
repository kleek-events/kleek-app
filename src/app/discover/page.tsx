import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import React from 'react'

async function Discover() {
  const { data: groups, error } = await createClient().from('groups').select('*')

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Discover Events
      </h1>
      <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
        Recently created
      </h2>
      <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
        Featured Groups
      </h2>
      {groups?.map((group) => (
        <Link key={group.id} href={group.name}>
          {group.name}
        </Link>
      ))}
    </div>
  )
}

export default Discover
