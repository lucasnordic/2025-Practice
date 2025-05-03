import '~/styles/globals.css'

import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next/dist/lib/metadata/types/metadata-interface'
import Script from 'next/script'
import { PostHogProvider } from '~/components/PostHogProvider'
import { ClerkProvider } from '@clerk/nextjs'

const USE_SCAN = false

export const metadata: Metadata = {
  title: 'Drive App',
  description: 'Upload files to your drive',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={GeistSans.variable}>
        <head>
          <script

          />
          {USE_SCAN && (
            <Script
              src="//unpkg.com/react-scan/dist/auto.global.js"
              crossOrigin="anonymous"
              strategy="beforeInteractive"
            />
          )}
        </head>
        <body>
          {process.env.DEVELOPMENT ? 
          children
          : <PostHogProvider>{children}</PostHogProvider>}
        </body>
      </html>
      </ClerkProvider>
  )
}
