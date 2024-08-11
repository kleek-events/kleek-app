import React from 'react'

import Footer from '@/components/shared/Footer'
import Header from '@/components/shared/Header'

function RootLayoutInner({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="h-full bg-white">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default RootLayoutInner
