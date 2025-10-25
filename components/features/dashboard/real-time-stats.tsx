/**
 * Real-Time Dashboard Stats Component
 *
 * Provides real-time updates for dashboard statistics using SSE
 */

'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, CheckCircle, Upload, AlertCircle, Loader2 } from 'lucide-react'
import { useSSE, DocumentSSEEvent } from '@/hooks/use-sse'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface DashboardStatsProps {
  initialStats: {
    total: number
    completed: number
    processing: number
    needsReview: number
    failed: number
  }
  translations: {
    totalDocuments: string
    totalDescription: string
    completed: string
    completedDescription: string
    processing: string
    processingDescription: string
    needsReview: string
    needsReviewDescription: string
    failed: string
    failedDescription: string
  }
}

/**
 * Real-time dashboard stats component
 */
export function RealTimeDashboardStats({ initialStats, translations }: DashboardStatsProps) {
  const [stats, setStats] = useState(initialStats)
  const router = useRouter()

  /**
   * Handle SSE events and update stats
   */
  const handleEvent = useCallback((event: DocumentSSEEvent) => {
    if (event.type === 'connected') {
      console.log('✅ Real-time updates connected')
      return
    }

    // Update stats based on event type
    setStats((prev) => {
      const newStats = { ...prev }

      switch (event.type) {
        case 'document.created':
          // New document created
          newStats.total += 1
          newStats.processing += 1
          toast.success('Document uploaded', {
            description: event.data?.originalFilename,
          })
          break

        case 'document.completed':
          // Document completed processing
          newStats.processing = Math.max(0, newStats.processing - 1)
          newStats.completed += 1
          toast.success('Document processed', {
            description: event.data?.originalFilename,
          })
          // Refresh router to update UI
          router.refresh()
          break

        case 'document.failed':
          // Document failed processing
          newStats.processing = Math.max(0, newStats.processing - 1)
          newStats.failed += 1
          toast.error('Processing failed', {
            description: event.data?.originalFilename,
          })
          // Refresh router to update UI
          router.refresh()
          break

        case 'document.updated':
          // Document status updated (e.g., needs review)
          if (event.data?.status === 'NEEDS_REVIEW') {
            newStats.processing = Math.max(0, newStats.processing - 1)
            newStats.needsReview += 1
            toast.info('Review needed', {
              description: event.data.originalFilename,
            })
          }
          // Refresh router to update UI
          router.refresh()
          break

        case 'document.deleted':
          // Document deleted
          newStats.total = Math.max(0, newStats.total - 1)
          // Also decrement from the appropriate status count
          if (event.data?.status === 'COMPLETED') {
            newStats.completed = Math.max(0, newStats.completed - 1)
          } else if (event.data?.status === 'PROCESSING') {
            newStats.processing = Math.max(0, newStats.processing - 1)
          } else if (event.data?.status === 'NEEDS_REVIEW') {
            newStats.needsReview = Math.max(0, newStats.needsReview - 1)
          } else if (event.data?.status === 'FAILED') {
            newStats.failed = Math.max(0, newStats.failed - 1)
          }
          toast.info('Document deleted')
          // Refresh router to update UI
          router.refresh()
          break
      }

      return newStats
    })
  }, [router])

  /**
   * Setup SSE connection
   */
  const { status, isConnected } = useSSE({
    onEvent: handleEvent,
    autoReconnect: true,
    reconnectDelay: 3000,
    enabled: true,
  })

  return (
    <>
      {/* Connection Status Indicator (hidden when connected) */}
      {!isConnected && (
        <div className="flex items-center gap-2 rounded-lg border border-orange-200 bg-orange-50 px-4 py-2 text-sm text-orange-800 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-200">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>
            {status === 'connecting' && 'Connecting to real-time updates...'}
            {status === 'error' && 'Reconnecting to real-time updates...'}
            {status === 'disconnected' && 'Disconnected from real-time updates'}
          </span>
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Documents */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{translations.totalDocuments}</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">{translations.totalDescription}</p>
          </CardContent>
        </Card>

        {/* Completed */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{translations.completed}</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completed}</div>
            <p className="text-xs text-muted-foreground">{translations.completedDescription}</p>
          </CardContent>
        </Card>

        {/* Processing */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{translations.processing}</CardTitle>
            <Upload className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.processing}</div>
            <p className="text-xs text-muted-foreground">{translations.processingDescription}</p>
          </CardContent>
        </Card>

        {/* Needs Review */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{translations.needsReview}</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.needsReview}</div>
            <p className="text-xs text-muted-foreground">{translations.needsReviewDescription}</p>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
