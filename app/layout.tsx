import type React from "react"
import "./globals.css"
import "@mysten/dapp-kit/dist/index.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { SoundProvider } from "@/components/sound-context"
import { MuteButton } from "@/components/mute-button"
import { OneChainProvider } from "@/providers/OneChainProvider"

export const metadata: Metadata = {
  title: "One Clash Fighters - Ultimate Fighting Championship",
  description: "OneChain blockchain fighting game - Play-to-Earn NFT battles",
  manifest: "/manifest.json",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-black min-h-screen">
        <OneChainProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
            <SoundProvider>
              <MuteButton />
              <main className="min-h-screen">{children}</main>
            </SoundProvider>
          </ThemeProvider>
        </OneChainProvider>
      </body>
    </html>
  )
}
