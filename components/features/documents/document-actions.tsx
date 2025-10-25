'use client'

/**
 * Document Actions Component
 *
 * Action buttons for document management:
 * - View original document
 * - Download results
 * - Delete document
 *
 * Uses server actions for all operations
 */

import { useState, useTransition } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/navigation'
import { Download, Eye, Trash2, Loader2, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { toast } from 'sonner'
import { getDocumentDownloadUrls, deleteDocument, retryDocumentProcessing, approveDocumentReview } from '@/lib/actions/document-actions'

interface DocumentActionsProps {
  documentId: string
  status: string
}

/**
 * Main DocumentActions component
 */
export function DocumentActions({ documentId, status }: DocumentActionsProps) {
  const t = useTranslations('documents')
  const tResults = useTranslations('results')
  const tCommon = useTranslations('common')
  const tErrors = useTranslations('errors')
  const tReview = useTranslations('review')
  const router = useRouter()
  const [isPendingDelete, startDeleteTransition] = useTransition()
  const [isPendingDownload, startDownloadTransition] = useTransition()
  const [isPendingRetry, startRetryTransition] = useTransition()
  const [isPendingApprove, startApproveTransition] = useTransition()
  const [isPendingReprocess, startReprocessTransition] = useTransition()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  /**
   * View original document in new tab
   */
  const handleViewOriginal = async () => {
    startDownloadTransition(async () => {
      const result = await getDocumentDownloadUrls(documentId, 'original')

      if (!result.success) {
        toast.error(tErrors('serverError'), {
          description: result.error,
        })
        return
      }

      // Open in new tab
      window.open(result.data.originalFileUrl, '_blank')
    })
  }

  /**
   * Download parsed results as JSON
   */
  const handleDownload = async () => {
    startDownloadTransition(async () => {
      const result = await getDocumentDownloadUrls(documentId, 'json')

      if (!result.success) {
        toast.error(tErrors('serverError'), {
          description: result.error,
        })
        return
      }

      const { parsedDataJson, filename } = result.data

      if (!parsedDataJson) {
        toast.error(tErrors('serverError'), {
          description: 'No parsed data available',
        })
        return
      }

      // Create blob and download
      const blob = new Blob([parsedDataJson], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${filename.replace(/\.[^/.]+$/, '')}-parsed.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast.success(tResults('download'), {
        description: 'JSON file downloaded successfully',
      })
    })
  }

  /**
   * Delete document (soft delete)
   */
  const handleDelete = async () => {
    startDeleteTransition(async () => {
      const result = await deleteDocument(documentId)

      if (!result.success) {
        toast.error(tErrors('serverError'), {
          description: result.error,
        })
        setShowDeleteDialog(false)
        return
      }

      toast.success(t('deleteDocument'), {
        description: 'Document deleted successfully',
      })

      setShowDeleteDialog(false)

      // Redirect to documents list
      router.push('/dashboard/documents')
    })
  }

  /**
   * Retry processing for failed document
   */
  const handleRetry = async () => {
    startRetryTransition(async () => {
      const result = await retryDocumentProcessing(documentId)

      if (!result.success) {
        toast.error(tErrors('serverError'), {
          description: result.error,
        })
        return
      }

      toast.success(tCommon('success'), {
        description: 'Document reprocessing started',
      })

      // Refresh the page to show updated status
      router.refresh()
    })
  }

  /**
   * Approve document review (mark as COMPLETED)
   */
  const handleApprove = async () => {
    startApproveTransition(async () => {
      const result = await approveDocumentReview(documentId)

      if (!result.success) {
        toast.error(tErrors('serverError'), {
          description: result.error,
        })
        return
      }

      toast.success(tReview('approved'), {
        description: tReview('approvedDescription'),
      })

      router.refresh()
    })
  }

  /**
   * Reprocess document (retry pipeline)
   */
  const handleReprocess = async () => {
    startReprocessTransition(async () => {
      const result = await retryDocumentProcessing(documentId)

      if (!result.success) {
        toast.error(tErrors('serverError'), {
          description: result.error,
        })
        return
      }

      toast.success(tReview('reprocessed'), {
        description: tReview('reprocessedDescription'),
      })

      router.refresh()
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{tCommon('actions')}</CardTitle>
        <CardDescription>{t('manageDocuments')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Review Actions for NEEDS_REVIEW status */}
        {status === 'NEEDS_REVIEW' && (
          <Alert className="bg-yellow-50 border-yellow-200">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-900">
              <strong>{tReview('title')}:</strong> {tReview('description')}
            </AlertDescription>
          </Alert>
        )}

        <div className="flex flex-wrap gap-3">
          {/* Review Actions - Only for NEEDS_REVIEW status */}
          {status === 'NEEDS_REVIEW' && (
            <>
              <Button
                variant="default"
                onClick={handleApprove}
                disabled={isPendingApprove}
                className="bg-green-600 hover:bg-green-700"
              >
                {isPendingApprove ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {tReview('approving')}
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    {tReview('approve')}
                  </>
                )}
              </Button>

              <Button variant="outline" onClick={handleReprocess} disabled={isPendingReprocess}>
                {isPendingReprocess ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {tReview('reprocessing')}
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    {tReview('reprocess')}
                  </>
                )}
              </Button>
            </>
          )}

          {/* View Original */}
          <Button variant="outline" onClick={handleViewOriginal} disabled={isPendingDownload}>
            {isPendingDownload ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {tCommon('loading')}
              </>
            ) : (
              <>
                <Eye className="mr-2 h-4 w-4" />
                {tResults('viewOriginal')}
              </>
            )}
          </Button>

          {/* Download */}
          {status === 'COMPLETED' && (
            <Button variant="outline" onClick={handleDownload} disabled={isPendingDownload}>
              {isPendingDownload ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {tCommon('loading')}
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  {tResults('download')}
                </>
              )}
            </Button>
          )}

          {/* Retry */}
          {status === 'FAILED' && (
            <Button variant="default" onClick={handleRetry} disabled={isPendingRetry}>
              {isPendingRetry ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {tCommon('loading')}
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  {tCommon('retry')}
                </>
              )}
            </Button>
          )}

          {/* Delete */}
          <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" disabled={isPendingDelete}>
                {isPendingDelete ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {tCommon('loading')}
                  </>
                ) : (
                  <>
                    <Trash2 className="mr-2 h-4 w-4" />
                    {t('deleteDocument')}
                  </>
                )}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t('confirmDelete')}</AlertDialogTitle>
                <AlertDialogDescription>{t('confirmDelete')}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{tCommon('cancel')}</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  {tCommon('delete')}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  )
}
