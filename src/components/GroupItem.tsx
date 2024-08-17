import React from 'react'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'

import { cn } from '@/utils/string'

export default function GroupItem({
  group,
}: Readonly<{
  group: {
    id: string
    name: string
  }
}>) {
  return (
    <Link key={group.id} href={group.name} className="font-medium text-gray-900">
      <li className="col-span-1 flex rounded-md shadow-sm">
        <div
          className={cn(
            'bg-fuchsia-500',
            'flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white',
          )}
        >
          {group.name[0]}
        </div>
        <div className="flex flex-1 cursor-pointer items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white transition-all duration-150 hover:border-fuchsia-400">
          <div className="flex-1 truncate px-4 py-2 text-sm">
            {group.name}

            <p className="text-gray-500">16 Events</p>
          </div>
          <div className="flex-shrink-0 pr-4">
            <Eye className="size-5 text-gray-500" />
          </div>
        </div>
      </li>
    </Link>
  )
}
