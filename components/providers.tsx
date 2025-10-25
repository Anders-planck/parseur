'use client'

/**
 * Application Providers
 *
 * Centralized client-side providers for the application.
 * Includes:
 * - NextAuth SessionProvider
 * - Add other providers here as needed (Theme, etc.)
 */

import { SessionProvider } from 'next-auth/react'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
