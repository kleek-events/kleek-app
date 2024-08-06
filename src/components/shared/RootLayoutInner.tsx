import React from 'react'

import Footer from './Footer'
import Header from './Header'

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
