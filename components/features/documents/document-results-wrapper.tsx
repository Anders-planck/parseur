'use client'

/**
 * Document Results Wrapper Component
 *
 * Client component wrapper that handles the onSave callback
 * for DocumentResults. Separated to keep page as Server Component.
 */

import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import { DocumentResults } from './document-results'
import { saveCorrectedData } from '@/lib/actions/document-actions'
import type { DocumentStatus } from '@prisma/client'

interface DocumentResultsWrapperProps {
  documentId: string
  data: Record<string, unknown>
  documentType: string
  status: DocumentStatus
  confidence?: Record<string, number>
}

export function DocumentResultsWrapper({
  documentId,
  data,
  documentType,
  status,
  confidence,
}: DocumentResultsWrapperProps) {
  const tErrors = useTranslations('errors')
  const tReview = useTranslations('review')

  /**
   * Handle saving corrected data
   */
  const handleSave = async (correctedData: Record<string, unknown>) => {
    const result = await saveCorrectedData(documentId, correctedData)

    if (!result.success) {
      toast.error(tErrors('serverError'), {
        description: result.error,
      })
      return
    }

    toast.success(tReview('changesSaved'), {
      description: tReview('changesSavedDescription'),
    })
  }

  return (
    <DocumentResults
      documentId={documentId}
      data={data}
      documentType={documentType}
      status={status}
      confidence={confidence}
      onSave={handleSave}
    />
  )
}
