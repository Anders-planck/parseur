/**
 * Upload Page
 *
 * Allows users to upload documents for processing.
 * Features:
 * - Drag-and-drop file upload
 * - File type and size validation
 * - Real-time upload progress
 */

import { getTranslations } from 'next-intl/server'
import { setRequestLocale } from 'next-intl/server'
import { UploadForm } from '@/components/features/upload/upload-form'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function UploadPage({ params }: Props) {
  const { locale } = await params

  // Enable static rendering
  setRequestLocale(locale)

  // Load translations
  const t = await getTranslations('upload')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>

      {/* Upload Form */}
      <div className="mx-auto max-w-2xl">
        <UploadForm />
      </div>
    </div>
  )
}
