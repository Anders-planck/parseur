'use client'

/**
 * Error Page
 *
 * Displayed when a runtime error occurs
 * Must be a Client Component
 */

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'
import { logger } from '@/lib/utils/logger'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations('errors')

  useEffect(() => {
    // Log error to logging service
    logger.error(
      {
        error: error.message,
        stack: error.stack,
        digest: error.digest,
      },
      'Application error occurred'
    )
  }, [error])

  return (
    <div className="container flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md border-destructive">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-10 w-10 text-destructive" />
          </div>
          <CardTitle className="text-2xl">{t('serverError')}</CardTitle>
          <CardDescription>
            {t('somethingWentWrong')}
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
              {t('tryAgain')}
            </Button>
            <Button asChild variant="outline">
              <Link href="/dashboard">{t('backToDashboard')}</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/">{t('contactSupport')}</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
