import React from 'react'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="mx-auto max-w-5xl sm:py-12">{children}</div>
}
