'use client'

/**
 * Document Status Card Component
 *
 * Displays:
 * - Current processing status
 * - Pipeline stages with progress
 * - Confidence score
 * - Processing timestamps
 */

import { useState, useEffect, useCallback } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import {
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Upload,
  FileSearch,
  FileText,
  ShieldCheck,
  Wrench,
  Check,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import type { DocumentStatus, DocumentType, PipelineStage } from '@prisma/client'
import { getDocumentAuditLogs } from '@/lib/actions/document-actions'
import { useSSE, DocumentSSEEvent } from '@/hooks/use-sse'
import { useRouter } from 'next/navigation'

/**
 * Document type for status card
 */
interface Document {
  id: string
  originalFilename: string
  status: DocumentStatus
  documentType?: DocumentType | string | null
  confidence?: number | null
  createdAt: Date | string
  completedAt?: Date | string | null
}

/**
 * Pipeline stage status type (local UI state)
 */
type StageStatus = 'pending' | 'running' | 'completed' | 'failed'

interface PipelineStageData {
  stage: PipelineStage
  status: StageStatus
  icon: React.ComponentType<{ className?: string }>
}

interface DocumentStatusCardProps {
  document: Document
}

/**
 * Status badge component
 */
function StatusBadge({ status }: { status: Document['status'] }) {
  const t = useTranslations('documents.status')

  const config: Record<DocumentStatus, {
    label: string
    icon: React.ComponentType<{ className?: string }>
    variant: 'default' | 'destructive'
    className: string
  }> = {
    UPLOADING: {
      label: t('processing'),
      icon: Upload,
      variant: 'default' as const,
      className: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    },
    PROCESSING: {
      label: t('processing'),
      icon: Clock,
      variant: 'default' as const,
      className: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    },
    NEEDS_REVIEW: {
      label: t('needsReview'),
      icon: AlertCircle,
      variant: 'default' as const,
      className: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
    },
    COMPLETED: {
      label: t('completed'),
      icon: CheckCircle2,
      variant: 'default' as const,
      className: 'bg-green-500/10 text-green-600 border-green-500/20',
    },
    FAILED: {
      label: t('failed'),
      icon: XCircle,
      variant: 'destructive' as const,
      className: '',
    },
    ARCHIVED: {
      label: 'Archived',
      icon: FileText,
      variant: 'default' as const,
      className: 'bg-muted text-muted-foreground border-muted',
    },
  }

  const { label, icon: Icon, variant, className } = config[status]

  return (
    <Badge variant={variant} className={cn('gap-1', className)}>
      <Icon className="h-3 w-3" />
      {label}
    </Badge>
  )
}

/**
 * Pipeline stage component
 */
function StageItem({ stageData, isLast }: { stageData: PipelineStageData; isLast: boolean }) {
  const t = useTranslations('status.stages')
  const tStatus = useTranslations('status.stageStatus')

  const { stage, status, icon: Icon } = stageData

  const statusConfig = {
    pending: {
      iconClass: 'text-muted-foreground',
      lineClass: 'bg-muted',
      label: tStatus('pending'),
    },
    running: {
      iconClass: 'text-blue-600 animate-pulse',
      lineClass: 'bg-blue-500',
      label: tStatus('running'),
    },
    completed: {
      iconClass: 'text-green-600',
      lineClass: 'bg-green-500',
      label: tStatus('completed'),
    },
    failed: {
      iconClass: 'text-destructive',
      lineClass: 'bg-destructive',
      label: tStatus('failed'),
    },
  }

  const config = statusConfig[status]

  return (
    <div className="relative flex gap-4">
      {/* Icon and Line */}
      <div className="flex flex-col items-center">
        <div
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-full border-2 bg-background',
            status === 'completed' && 'border-green-500 bg-green-500/10',
            status === 'running' && 'border-blue-500 bg-blue-500/10',
            status === 'failed' && 'border-destructive bg-destructive/10',
            status === 'pending' && 'border-muted'
          )}
        >
          {status === 'completed' ? (
            <Check className="h-5 w-5 text-green-600" />
          ) : (
            <Icon className={cn('h-5 w-5', config.iconClass)} />
          )}
        </div>
        {!isLast && (
          <div className={cn('h-full w-0.5 flex-1 min-h-8', config.lineClass)} />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-medium">{t(`${stage.toLowerCase()}.title`)}</h4>
          <span className="text-sm text-muted-foreground">{config.label}</span>
        </div>
        <p className="text-sm text-muted-foreground">{t(`${stage.toLowerCase()}.description`)}</p>
      </div>
    </div>
  )
}

/**
 * Main DocumentStatusCard component
 */
export function DocumentStatusCard({ document }: DocumentStatusCardProps) {
  const t = useTranslations('status')
  const locale = useLocale()
  const router = useRouter()

  // State for audit logs
  const [completedStages, setCompletedStages] = useState<Set<PipelineStage>>(new Set())

  // Fetch audit logs (reusable function for initial load and SSE updates)
  const fetchAuditLogs = useCallback(async () => {
    try {
      const result = await getDocumentAuditLogs(document.id)

      if (result.success && result.data) {
        // Extract completed stages from audit logs
        const completed = new Set(result.data.map(log => log.stage))
        setCompletedStages(completed)
      }
    } catch (error) {
      console.error('Failed to fetch audit logs:', error)
    }
  }, [document.id])

  // Fetch audit logs on mount
  useEffect(() => {
    // Run async to avoid calling setState synchronously inside the effect body
    void (async () => {
      await fetchAuditLogs()
    })()
  }, [fetchAuditLogs])

  // Polling fallback when document is PROCESSING
  // (Because SSE events don't work across Inngest worker <-> Next.js processes)
  useEffect(() => {
    if (document.status !== 'PROCESSING' && document.status !== 'UPLOADING') {
      return
    }

    // Poll every 2 seconds while processing
    const pollInterval = setInterval(() => {
      fetchAuditLogs()
      router.refresh() // Refresh server components to get updated document status
    }, 2000)

    return () => {
      clearInterval(pollInterval)
    }
  }, [document.status, fetchAuditLogs, router])

  // Handle SSE events for real-time updates
  const handleSSEEvent = useCallback((event: DocumentSSEEvent) => {
    if (event.type === 'connected') {
      return
    }

    // Only handle events for this document
    if (event.data?.id !== document.id) {
      return
    }

    // Refresh audit logs when document is updated
    if (
      event.type === 'document.updated' ||
      event.type === 'document.completed' ||
      event.type === 'document.failed'
    ) {
      fetchAuditLogs()
      router.refresh() // Refresh server components to get updated document data
    }
  }, [document.id, fetchAuditLogs, router])

  // Setup SSE connection
  const { status: sseStatus } = useSSE({
    onEvent: handleSSEEvent,
    autoReconnect: true,
    reconnectDelay: 3000,
  })

  // Define all pipeline stages with icons
  const allStages: Array<{ stage: PipelineStage; icon: React.ComponentType<{ className?: string }> }> = [
    { stage: 'UPLOAD', icon: Upload },
    { stage: 'CLASSIFICATION', icon: FileSearch },
    { stage: 'EXTRACTION', icon: FileText },
    { stage: 'VALIDATION', icon: ShieldCheck },
    { stage: 'CORRECTION', icon: Wrench },
    { stage: 'FINALIZE', icon: Check },
  ]

  // Calculate stage status based on completed stages and document status
  const getStageStatus = (stage: PipelineStage, index: number): StageStatus => {
    // If stage is completed in audit logs
    if (completedStages.has(stage)) {
      return 'completed'
    }

    // If document failed, mark remaining stages as failed
    if (document.status === 'FAILED') {
      return 'failed'
    }

    // If document is completed, all stages should be completed
    if (document.status === 'COMPLETED' || document.status === 'NEEDS_REVIEW') {
      return 'completed'
    }

    // If document is processing, determine running vs pending
    if (document.status === 'PROCESSING') {
      // Find the last completed stage
      const lastCompletedIndex = allStages.findIndex((s, i) =>
        i > index || !completedStages.has(s.stage)
      )

      // Current stage is the first non-completed one
      const currentStageIndex = lastCompletedIndex === -1 ? 0 : lastCompletedIndex

      if (index === currentStageIndex) {
        return 'running'
      }

      return index < currentStageIndex ? 'completed' : 'pending'
    }

    return 'pending'
  }

  // Build stages with status
  const stages: PipelineStageData[] = allStages.map((s, index) => ({
    stage: s.stage,
    status: getStageStatus(s.stage, index),
    icon: s.icon,
  }))

  // Calculate progress percentage
  const progress = (completedStages.size / allStages.length) * 100

  // Calculate estimated time remaining (only for PROCESSING status)
  const calculateETA = (): number | null => {
    if (document.status !== 'PROCESSING' && document.status !== 'UPLOADING') {
      return null
    }

    const AVERAGE_TIME_PER_STAGE = 10 // seconds per stage
    const TOTAL_STAGES = allStages.length
    const completedCount = completedStages.size
    const remainingStages = TOTAL_STAGES - completedCount

    if (remainingStages <= 0) {
      return null
    }

    // Estimate remaining time based on remaining stages
    return remainingStages * AVERAGE_TIME_PER_STAGE
  }

  const estimatedSecondsRemaining = calculateETA()

  // Format ETA display
  const formatETA = (seconds: number): string => {
    if (seconds < 60) {
      return t('lessThanMinute')
    }
    return t('aboutSeconds', { seconds: Math.round(seconds) })
  }

  // Format dates with consistent locale
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return dateObj.toLocaleString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{t('title')}</CardTitle>
            <CardDescription>{t('progress')}</CardDescription>
          </div>
          <div className="flex flex-col items-end gap-2">
            <StatusBadge status={document.status} />
            {/* SSE Connection Status */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div
                className={cn(
                  'h-2 w-2 rounded-full',
                  sseStatus === 'connected' && 'bg-green-500 animate-pulse',
                  sseStatus === 'connecting' && 'bg-gray-400 animate-pulse',
                  (sseStatus === 'disconnected' || sseStatus === 'error') && 'bg-red-500'
                )}
              />
              <span>
                {sseStatus === 'connected' && 'Live'}
                {sseStatus === 'connecting' && 'Connecting...'}
                {sseStatus === 'disconnected' && 'Disconnected'}
                {sseStatus === 'error' && 'Connection error'}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{t('progress')}</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} />
          {estimatedSecondsRemaining !== null && (
            <div className="flex items-center justify-between text-sm pt-1">
              <span className="text-muted-foreground">{t('estimatedTimeRemaining')}</span>
              <span className="font-medium text-blue-600">
                {formatETA(estimatedSecondsRemaining)}
              </span>
            </div>
          )}
        </div>

        {/* Metadata Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {document.documentType && (
            <div>
              <div className="text-sm text-muted-foreground">{t('documentType')}</div>
              <div className="font-medium">{document.documentType}</div>
            </div>
          )}
          {document.confidence !== undefined && document.confidence !== null && (
            <div>
              <div className="text-sm text-muted-foreground">{t('confidence')}</div>
              <div className="font-medium">{Math.round(document.confidence * 100)}%</div>
            </div>
          )}
          <div>
            <div className="text-sm text-muted-foreground">{t('createdAt')}</div>
            <div className="font-medium">{formatDate(document.createdAt)}</div>
          </div>
          {document.completedAt && (
            <div>
              <div className="text-sm text-muted-foreground">{t('completedAt')}</div>
              <div className="font-medium">{formatDate(document.completedAt)}</div>
            </div>
          )}
        </div>

        {/* Pipeline Stages */}
        <div>
          <h3 className="mb-4 font-semibold">Processing Pipeline</h3>
          <div>
            {stages.map((stageData, index) => (
              <StageItem
                key={stageData.stage}
                stageData={stageData}
                isLast={index === stages.length - 1}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
