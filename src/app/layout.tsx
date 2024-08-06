// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";

import { wagmiConfig } from "@/config/wagmi";
import Web3Provider from "@/context/Web3Provider";

export const metadata: Metadata = {
  title: "Kleek",
  description:
    "Blockchain-powered event platform that turns no-shows into go-shows",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(
    wagmiConfig,
    headers().get("cookie")
  );
  return (
    <html lang="en">
      <body>
        <Web3Provider initialState={initialState}>{children}</Web3Provider>
      </body>
    </html>
  );
}
