/**
 * Document Detail Page
 *
 * Displays:
 * - Document metadata
 * - Processing status with pipeline stages
 * - Confidence score
 * - Parsed results
 * - Action buttons (download, delete)
 */

import { getTranslations } from 'next-intl/server'
import { setRequestLocale } from 'next-intl/server'
import { notFound, redirect } from 'next/navigation'
import { auth } from '@/lib/auth/config'
import { getDocumentById } from '@/lib/actions/document-actions'
import { DocumentStatusCard } from '@/components/features/documents/document-status-card'
import { DocumentActions } from '@/components/features/documents/document-actions'
import { DocumentResultsWrapper } from '@/components/features/documents/document-results-wrapper'

type Props = {
  params: Promise<{ locale: string; id: string }>
}

export default async function DocumentDetailPage({ params }: Props) {
  const { locale, id } = await params

  // Enable static rendering
  setRequestLocale(locale)

  // Check authentication
  const session = await auth()
  if (!session?.user?.id) {
    redirect('/login')
  }

  // Load translations
  const t = await getTranslations('status')

  // Fetch document using server action
  const documentResult = await getDocumentById(id)

  // Check if document exists or user is unauthorized
  if (!documentResult.success || !documentResult.data) {
    notFound()
  }

  const document = documentResult.data

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{document.originalFilename}</h1>
        <p className="text-muted-foreground">{t('title')}</p>
      </div>

      <DocumentStatusCard document={document} />

      {/* Results */}
      {(document.status === 'COMPLETED' ||
        document.status === 'NEEDS_REVIEW' ||
        document.status === 'PROCESSING') &&
       document.parsedData &&
       typeof document.parsedData === 'object' &&
       !Array.isArray(document.parsedData) && (
        <DocumentResultsWrapper
          documentId={document.id}
          data={document.parsedData as Record<string, unknown>}
          documentType={document.documentType?.toString() ?? 'UNKNOWN'}
          status={document.status}
        />
      )}

      {/* Actions */}
      <DocumentActions documentId={document.id} status={document.status} />
    </div>
  )
}
