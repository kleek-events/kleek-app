import React from 'react'

import Footer from '@/components/shared/Footer'
import Header from '@/components/shared/Header'
import { Toaster } from '@/components/ui/toaster'

function RootLayoutInner({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="h-full">
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      <Toaster />
    </div>
  )
}

export default RootLayoutInner
