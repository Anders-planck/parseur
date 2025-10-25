/**
 * Dashboard Home Page
 *
 * Overview page showing:
 * - Document statistics
 * - Recent documents
 * - Quick actions
 */

import { getTranslations } from 'next-intl/server'
import { setRequestLocale } from 'next-intl/server'
import { Link, redirect } from '@/i18n/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'
import { auth } from '@/lib/auth/config'
import { getDocumentStats } from '@/lib/actions/document-actions'
import { RealTimeDashboardStats } from '@/components/features/dashboard/real-time-stats'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function DashboardPage({ params }: Props) {
  const { locale } = await params

  // Enable static rendering
  setRequestLocale(locale)

  // Check authentication
  const session = await auth()
  if (!session?.user?.id) {
    redirect({ href: '/login', locale })
    return // This is unreachable but helps TypeScript
  }

  // Load translations
  const tNav = await getTranslations('nav')
  const tDashboard = await getTranslations('dashboard')
  const tStats = await getTranslations('dashboard.statistics')
  const tDocs = await getTranslations('documents')

  // Fetch statistics using server action
  const statsResult = await getDocumentStats()

  // Handle error case
  if (!statsResult.success) {
    redirect({ href: '/dashboard/upload', locale })
    return
  }

  const stats = statsResult.data

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{tNav('dashboard')}</h1>
        <p className="text-muted-foreground">{tDashboard('subtitle')}</p>
      </div>

      {/* Real-Time Statistics Cards */}
      <RealTimeDashboardStats
        initialStats={stats}
        translations={{
          totalDocuments: tStats('totalDocuments'),
          totalDescription: tStats('totalDescription'),
          completed: tStats('completed'),
          completedDescription: tStats('completedDescription'),
          processing: tStats('processing'),
          processingDescription: tStats('processingDescription'),
          needsReview: tStats('needsReview'),
          needsReviewDescription: tStats('needsReviewDescription'),
          failed: tStats('failed'),
          failedDescription: tStats('failedDescription'),
        }}
      />

      {/* Empty State - Only show when no documents */}
      {stats.total === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{tDocs('myDocuments')}</CardTitle>
            <CardDescription>{tDocs('noDocuments')}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Upload className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="mb-4 text-sm text-muted-foreground">{tDocs('noDocumentsDescription')}</p>
            <Button asChild>
              <Link href="/dashboard/upload">{tDocs('uploadFirst')}</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
