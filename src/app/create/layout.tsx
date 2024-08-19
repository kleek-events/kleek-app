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
      <div className="absolute left-0 top-0 -z-10 h-72 w-full bg-gradient-to-b from-fuchsia-100" />
      <div className="flex justify-between"></div>
      {account.isConnected ? (
        children
      ) : (
        <div className="mt-6 flex flex-col items-center justify-center gap-6 leading-8 text-gray-600">
          <p className="text-base">Sign in to create an event.</p>
          <SignInButton />
        </div>
      )}
    </div>
  )
}
