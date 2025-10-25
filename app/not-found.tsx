/**
 * Root 404 Not Found Page
 *
 * This is the fallback 404 page when no locale context is available.
 * For localized 404 pages, see app/[locale]/not-found.tsx
 */

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileQuestion } from 'lucide-react'

export default function RootNotFound() {
  return (
    <div className="container flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <FileQuestion className="h-10 w-10 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl">404 - Not Found</CardTitle>
          <CardDescription>
            The page you are looking for does not exist or has been moved.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2">
            <Button asChild>
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Go Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
