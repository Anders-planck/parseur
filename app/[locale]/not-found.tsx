/**
 * 404 Not Found Page
 *
 * Displayed when a page or resource is not found
 */

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileQuestion } from 'lucide-react'

export default function NotFound() {
  const t = useTranslations('errors')

  return (
    <div className="container flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <FileQuestion className="h-10 w-10 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl">404 - {t('notFound')}</CardTitle>
          <CardDescription>
            {t('pageNotFound')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2">
            <Button asChild>
              <Link href="/dashboard">{t('backToDashboard')}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">{t('goHome')}</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
