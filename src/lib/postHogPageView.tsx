// app/PostHogPageView.tsx
'use client'

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, Suspense } from "react"
import { usePostHog } from 'posthog-js/react'
import { useAuth, useUser } from "@clerk/nextjs"

function PostHogPageView() : null {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const posthog = usePostHog()
  const{isSignedIn}=useAuth()
  const {user}=useUser()

  // Track pageviews
  useEffect(() => {
    if (pathname && posthog && isSignedIn && user && !posthog._isIdentified()) {
      
      const email=user.primaryEmailAddress?.emailAddress
      posthog.identify(email,{email,name:user.fullName})
      
      let url = window.origin + pathname
      if (searchParams?.toString()) {
        url = url + `?${searchParams?.toString()}`
      }

      posthog.capture('$pageview', { '$current_url': url })
    }
    if(!isSignedIn && posthog._isIdentified()){
        posthog.reset()
    }
  }, [pathname, searchParams, posthog,isSignedIn,user])
  
  return null
}

// Wrap this in Suspense to avoid the `useSearchParams` usage above
// from de-opting the whole app into client-side rendering
// See: https://nextjs.org/docs/messages/deopted-into-client-rendering
export default function SuspendedPostHogPageView() {
  return <Suspense fallback={null}>
    <PostHogPageView />
  </Suspense>
}