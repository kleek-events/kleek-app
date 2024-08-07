import React from 'react'

export default function Discover({ params }: { params: { group: string } }) {
  return (
    <main className="mx-auto max-w-5xl">
      <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
        {params.group}
      </h1>
    </main>
  )
}
