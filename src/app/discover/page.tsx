import React, { Suspense } from 'react'

import { createClient } from '@/utils/supabase/server'
import { getAllEvents } from '@/services/subgraph'
import GroupItem from '@/components/GroupItem'
import EventItem from '@/components/Eventitem'
import { Skeleton } from '@/components/ui/skeleton'

function EventSkeleton() {
  return (
    <div className="relative flex items-center space-x-3 rounded-lg border border-gray-200 bg-white px-6 py-5 shadow-sm">
      <div className="flex-shrink-0">
        <Skeleton className="size-20 rounded-full" />
      </div>
      <div className="min-w-0 flex-1 space-y-2">
        <Skeleton className="h-6 w-1/2 rounded-md" />
        <Skeleton className="h-12 w-full rounded-md" />
      </div>
    </div>
  )
}

function EventSkeletons() {
  return (
    <div className="mt-3 flex flex-col gap-4">
      <EventSkeleton />
      <EventSkeleton />
    </div>
  )
}

async function Discover() {
  const { data: groups, error } = await createClient().from('groups').select('*')
  const events = await getAllEvents()
  console.log('events', events)
  console.log('groups', groups)

  return (
    <>
      <div className="mb-10">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Discover Events
        </h1>
        <p className="text-lg text-gray-700">Discover the latest events created by the community</p>
      </div>
      <div className="grid gap-10 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
            Recently Created
          </h2>
          <ul role="list" className="mt-3 flex flex-col gap-4">
            <Suspense fallback={<EventSkeletons />}>
              {events?.map((event) => <EventItem key={event.id} event={event} />)}
            </Suspense>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
            Featured Groups
          </h2>
          <ul role="list" className="mt-3 flex flex-col gap-4">
            {groups?.map((group) => <GroupItem key={group.id} group={group} />)}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Discover
