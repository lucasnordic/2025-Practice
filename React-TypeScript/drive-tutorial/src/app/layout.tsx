import '~/styles/globals.css'

import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next/dist/lib/metadata/types/metadata-interface'
import Script from 'next/script'
import { ClerkProvider } from '@clerk/nextjs'
import { PostHogProvider } from '~/components/PostHogProvider'

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
            dangerouslySetInnerHTML={{
              __html: `
              try {
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                  document.documentElement.classList.add('dark')
                }
              } catch (error) {
                console.error('Error setting dark mode', error)
              }
            `,
            }}
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
          <PostHogProvider>{children}</PostHogProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
