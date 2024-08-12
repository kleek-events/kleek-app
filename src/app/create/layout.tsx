'use client'

import React from 'react'
import { useAccount } from 'wagmi'

import SignInButton from '@/components/SignInButton'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const account = useAccount()
  return (
    <div className="mx-auto max-w-5xl sm:py-12">
      <div className="flex justify-between"></div>
      {account.isConnected ? (
        children
      ) : (
        <div className="mt-6 flex flex-col items-center justify-center gap-6 text-lg leading-8 text-gray-600">
          <p className="text-xl">You need an log in to create an event</p>
          <SignInButton />
        </div>
      )}
    </div>
  )
}
