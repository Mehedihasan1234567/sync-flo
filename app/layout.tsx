import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono,Plus_Jakarta_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { cn } from "@/lib/utils"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
// Setup the font
const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Load necessary weights
  variable: "--font-sans", // Define a CSS variable
});

export const metadata: Metadata = {
   title: "SyncFlow - Client Status Updates",
  description: "The frictionless way to keep clients in the loop.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

import { AuthProvider } from "@/context/AuthContext"
import { Toaster } from "@/components/ui/sonner"

// ... imports

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body  className={cn(
          "min-h-screen bg-background font-sans antialiased", // Apply font-sans
          fontSans.variable // Inject the variable
        )}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
