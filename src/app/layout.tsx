// app/layout.tsx
import './globals.css'
import { Inter as FontSans } from 'next/font/google'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { cookieToInitialState } from 'wagmi'

import { cn } from '@/utils/string'
import { wagmiConfig } from '@/config/wagmi'
import Web3Provider from '@/context/Web3Provider'
import RootLayoutInner from '@/components/shared/RootLayoutInner'

export const metadata: Metadata = {
  title: 'Kleek',
  description: 'Blockchain-powered event platform that turns no-shows into go-shows',
}

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const initialState = cookieToInitialState(wagmiConfig, headers().get('cookie'))
  return (
    <html lang="en">
      <body className={cn('bg-background font-sans antialiased', fontSans.variable)}>
        <Web3Provider initialState={initialState}>
          <RootLayoutInner>{children}</RootLayoutInner>
        </Web3Provider>
      </body>
    </html>
  )
}
