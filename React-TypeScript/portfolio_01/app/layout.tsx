import type React from "react"
import type { Metadata } from "next"
import { Baloo_2 } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { profile } from "@/lib/data"

const baloo = Baloo_2({ subsets: ["latin"], weight: ["400", "500", "600", "700"], style: ["normal"] })

export const metadata: Metadata = {
  // add name to title
  title: profile.name + " | " + profile.title,
  description: profile.description,
  keywords: [
    "software engineer",
    "digital artist",
    "web developer",
    "portfolio",
    "projects",
    "interactive experiences",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  publisher: profile.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={baloo.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
