'use client'

/**
 * Global Error Page
 *
 * Displayed when a critical error occurs in the root layout
 * Must be a Client Component
 */

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to logging service
    console.error('Global error:', error)
  }, [error])

  return (
    <html>
      <body>
        <div className="container flex min-h-screen items-center justify-center p-4">
          <Card className="w-full max-w-md border-destructive">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
                <AlertCircle className="h-10 w-10 text-destructive" />
              </div>
              <CardTitle className="text-2xl">Critical Error</CardTitle>
              <CardDescription>
                A critical error occurred. Please try again or contact support if the problem persists.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {process.env.NODE_ENV === 'development' && (
                <div className="rounded-md bg-muted p-3">
                  <p className="text-xs font-mono text-destructive">{error.message}</p>
                </div>
              )}
              <div className="flex flex-col gap-2">
                <Button onClick={() => reset()}>
                  Try Again
                </Button>
                <Button asChild variant="outline">
                  <Link href="/">Go to Home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </body>
    </html>
  )
}
