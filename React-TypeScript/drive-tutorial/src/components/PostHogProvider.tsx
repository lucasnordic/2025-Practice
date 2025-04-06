'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider, usePostHog } from 'posthog-js/react'
import { Suspense, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { env } from '~/env'
import { useUser } from '@clerk/nextjs'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: '/ingest',
      ui_host: 'https://eu.posthog.com',
      // person_profiles: 'identified_only', // 'identified_only' or 'always' to profile anonymous users
      capture_pageview: false, // Disable automatic pageview capture, as we capture manually
    })
  }, [])

  return (
    <PHProvider client={posthog}>
      <SuspendedPostHogPageView />
      {children}
    </PHProvider>
  )
}

function PostHogPageViewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const posthog = usePostHog()
  const userInfo = useUser()

  // Identify user
  useEffect(() => {
    if (userInfo.user?.id) {
      posthog.identify(userInfo.user.id, {
        email: userInfo.user.emailAddresses[0]?.emailAddress,
      })
    }
  }, [posthog, userInfo.user])

  // Capture searchParams for tracking page views
  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname
      const search = searchParams.toString()
      if (search) {
        url += '?' + search
      }
      posthog.capture('$pageview', { $current_url: url })
    }
  }, [pathname, searchParams, posthog])

  return null
}

// Wrap PostHogPageView in Suspense to avoid the useSearchParams usage above
// from de-opting the whole app into client-side rendering
// See: https://nextjs.org/docs/messages/deopted-into-client-rendering
function SuspendedPostHogPageView() {
  return (
    // TODO: import dynamicLoader from 'next/dynamic' instead of using suspense?
    <Suspense fallback={null}>
      <PostHogPageViewTracker />
    </Suspense>
  )
}
