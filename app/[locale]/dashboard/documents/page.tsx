/**
 * Documents List Page
 *
 * Displays all user documents with:
 * - Status filters (All, Completed, Processing, Failed, Needs Review)
 * - Search functionality
 * - Pagination
 * - Empty states
 */

import { getTranslations } from 'next-intl/server'
import { setRequestLocale } from 'next-intl/server'
import { DocumentsList } from '@/components/features/documents/documents-list'
import DocumentsListActions from '@/components/features/documents/documents-list-actions'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ status?: string }>
}

export default async function DocumentsPage({ params, searchParams }: Props) {
  const { locale } = await params
  const { status } = await searchParams

  // Enable static rendering
  setRequestLocale(locale)

  // Load translations
  const t = await getTranslations('documents')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('myDocuments')}</h1>
        <p className="text-muted-foreground">{t('manageDocuments')}</p>
      </div>

      {/* Actions */}
      <DocumentsListActions /> 
      {/* Documents List */}
      <DocumentsList initialStatus={status} />
    </div>
  )
}
