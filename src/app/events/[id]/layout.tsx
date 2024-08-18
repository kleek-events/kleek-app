import React from 'react'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:py-12">
      <div className="absolute left-0 top-0 -z-10 h-72 w-full bg-gradient-to-b from-fuchsia-100" />
      {children}
    </div>
  )
}
