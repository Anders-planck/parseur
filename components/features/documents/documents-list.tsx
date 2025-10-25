'use client'

/**
 * Documents List Component
 *
 * Features:
 * - Status filters (All, Completed, Processing, Failed, Needs Review)
 * - Search functionality
 * - Document cards with status badges
 * - Empty states
 * - Pagination support
 */

import { useState, useEffect, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { useRouter, usePathname } from '@/i18n/navigation'
import {
  FileText,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Clock,
  XCircle,
  Upload as UploadIcon,
  Archive
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { getDocumentsList } from '@/lib/actions/document-actions'
import type { DocumentStatus, DocumentType } from '@prisma/client'

/**
 * Document type (matches server action return type)
 */
interface Document {
  id: string
  originalFilename: string
  status: DocumentStatus
  documentType: DocumentType | null
  confidence: number | null
  createdAt: Date
  completedAt: Date | null
}

/**
 * Status filter type
 */
type StatusFilter = 'all' | 'completed' | 'processing' | 'failed' | 'needsReview'

interface DocumentsListProps {
  initialStatus?: string
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
      icon: UploadIcon,
      variant: 'default' as const,
      className: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    },
    PROCESSING: {
      label: t('processing'),
      icon: Clock,
      variant: 'default' as const,
      className: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
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
    NEEDS_REVIEW: {
      label: t('needsReview'),
      icon: AlertCircle,
      variant: 'default' as const,
      className: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
    },
    ARCHIVED: {
      label: 'Archived',
      icon: Archive,
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
 * Document card component
 */
function DocumentCard({ document }: { document: Document }) {
  const t = useTranslations('documents')

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base truncate">{document.originalFilename}</CardTitle>
              <CardDescription className="mt-1">
                {new Date(document.createdAt).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </CardDescription>
            </div>
          </div>
          <StatusBadge status={document.status} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {document.documentType && (
              <span className="font-medium">{document.documentType}</span>
            )}
            {document.confidence && (
              <span className="ml-2">
                {Math.round(document.confidence * 100)}% confidence
              </span>
            )}
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href={`/dashboard/documents/${document.id}`}>
              {t('viewDetails')}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * Loading skeleton component
 */
function DocumentSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Skeleton className="h-5 w-5 rounded" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
          <Skeleton className="h-6 w-20" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-9 w-24" />
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * Empty state component
 */
function EmptyState({
  filtered,
  onClearFilters
}: {
  filtered: boolean
  onClearFilters: () => void
}) {
  const t = useTranslations('documents')

  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
        <p className="mb-2 text-lg font-medium">
          {filtered ? t('noResultsFound') : t('noDocuments')}
        </p>
        <p className="mb-4 text-sm text-muted-foreground">
          {filtered ? t('noResultsDescription') : t('noDocumentsDescription')}
        </p>
        {filtered ? (
          <Button variant="outline" onClick={onClearFilters}>
            <Filter className="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
        ) : (
          <Button asChild>
            <Link href="/dashboard/upload">
              <UploadIcon className="mr-2 h-4 w-4" />
              {t('uploadFirst')}
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

/**
 * Main DocumentsList component
 */
export function DocumentsList({ initialStatus }: DocumentsListProps) {
  const t = useTranslations('documents')
  const router = useRouter()
  const pathname = usePathname()

  const [statusFilter, setStatusFilter] = useState<StatusFilter>((initialStatus as StatusFilter) || 'all')
  const [searchQuery, setSearchQuery] = useState('')
  const [documents, setDocuments] = useState<Document[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch documents using server action
  useEffect(() => {
    async function fetchDocuments() {
      try {
        setIsLoading(true)
        setError(null)

        // Map status filter to server action parameter
        let status: 'UPLOADING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'NEEDS_REVIEW' | 'ARCHIVED' | undefined
        if (statusFilter !== 'all') {
          const statusMap: Record<Exclude<StatusFilter, 'all'>, typeof status> = {
            completed: 'COMPLETED',
            processing: 'PROCESSING',
            failed: 'FAILED',
            needsReview: 'NEEDS_REVIEW',
          }
          status = statusMap[statusFilter]
        }

        // Call server action
        const result = await getDocumentsList({
          status,
          limit: 50,
        })

        if (result.success) {
          setDocuments(result.data || [])
        } else {
          throw new Error(result.error || 'Failed to fetch documents')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load documents')
      } finally {
        setIsLoading(false)
      }
    }

    fetchDocuments()
  }, [statusFilter])

  // Update URL when filters change
  const updateFilters = (newStatus: StatusFilter) => {
    setStatusFilter(newStatus)
    const params = new URLSearchParams()
    if (newStatus !== 'all') {
      params.set('status', newStatus)
    }
    router.replace(`${pathname}?${params.toString()}`)
  }

  // Filter and search documents
  const filteredDocuments = useMemo(() => {
    let filtered = documents

    // Apply status filter
    if (statusFilter !== 'all') {
      const statusMap: Record<StatusFilter, Document['status']> = {
        all: 'PROCESSING', // Not used
        completed: 'COMPLETED',
        processing: 'PROCESSING',
        failed: 'FAILED',
        needsReview: 'NEEDS_REVIEW',
      }
      filtered = filtered.filter((doc) => doc.status === statusMap[statusFilter])
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((doc) =>
        doc.originalFilename.toLowerCase().includes(query) ||
        doc.documentType?.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [documents, statusFilter, searchQuery])

  const isFiltered = statusFilter !== 'all' || searchQuery !== ''

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Status Tabs */}
        <Tabs value={statusFilter} onValueChange={(value) => updateFilters(value as StatusFilter)}>
          <TabsList>
            <TabsTrigger value="all">{t('filter.all')}</TabsTrigger>
            <TabsTrigger value="completed">{t('filter.completed')}</TabsTrigger>
            <TabsTrigger value="processing">{t('filter.processing')}</TabsTrigger>
            <TabsTrigger value="failed">{t('filter.failed')}</TabsTrigger>
            <TabsTrigger value="needsReview">{t('filter.needsReview')}</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={t('search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Error State */}
      {error && (
        <Card className="border-destructive/50">
          <CardContent className="flex items-center justify-center py-8">
            <div className="text-center">
              <AlertCircle className="mx-auto mb-2 h-8 w-8 text-destructive" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Documents Grid */}
      {!error && isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <DocumentSkeleton key={i} />
          ))}
        </div>
      ) : !error && filteredDocuments.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredDocuments.map((document) => (
            <DocumentCard key={document.id} document={document} />
          ))}
        </div>
      ) : !error ? (
        <EmptyState
          filtered={isFiltered}
          onClearFilters={() => {
            setStatusFilter('all')
            setSearchQuery('')
            router.replace(pathname)
          }}
        />
      ) : null}
    </div>
  )
}
