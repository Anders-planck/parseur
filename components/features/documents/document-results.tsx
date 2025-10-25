'use client'

/**
 * Document Results Component
 *
 * Displays parsed document data in a structured format
 * Supports inline editing for NEEDS_REVIEW status
 * Shows confidence indicators and validation
 */

import { useState, useTransition, useEffect, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { Download, Edit2, Check, X, AlertCircle, Info, Cloud } from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { cn } from '@/lib/utils'
import type { DocumentStatus } from '@prisma/client'

interface DocumentResultsProps {
  documentId: string
  data: Record<string, unknown>
  documentType: string
  status: DocumentStatus
  confidence?: Record<string, number> // Confidence per campo
  onSave?: (correctedData: Record<string, unknown>) => Promise<void>
}

/**
 * Get confidence level from score with actionable labels
 */
function getConfidenceLevel(score: number, tReview: (key: string) => string): {
  level: 'high' | 'medium' | 'low'
  color: string
  borderColor: string
  bgColor: string
  label: string
  action: string
  icon: React.ComponentType<{ className?: string }>
} {
  if (score >= 0.8) {
    return {
      level: 'high',
      color: 'text-green-600',
      borderColor: 'border-green-500',
      bgColor: 'bg-green-50',
      label: tReview('confidence.high'),
      action: tReview('confidence.highAction'),
      icon: Check,
    }
  }
  if (score >= 0.5) {
    return {
      level: 'medium',
      color: 'text-yellow-600',
      borderColor: 'border-yellow-500',
      bgColor: 'bg-yellow-50',
      label: tReview('confidence.medium'),
      action: tReview('confidence.mediumAction'),
      icon: AlertCircle,
    }
  }
  return {
    level: 'low',
    color: 'text-red-600',
    borderColor: 'border-red-500',
    bgColor: 'bg-red-50',
    label: tReview('confidence.low'),
    action: tReview('confidence.lowAction'),
    icon: AlertCircle,
  }
}

/**
 * Format value for display
 */
function formatValue(value: unknown): string {
  if (value === null || value === undefined) {
    return 'N/A'
  }
  if (typeof value === 'object') {
    return JSON.stringify(value, null, 2)
  }
  return String(value)
}

/**
 * Format field name for display
 */
function formatFieldName(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .trim()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Editable Field Component
 */
interface EditableFieldProps {
  fieldKey: string
  value: unknown
  confidence?: number
  isEditing: boolean
  onEdit: () => void
  onSave: (newValue: string) => void
  onCancel: () => void
  canEdit: boolean
  tReview: (key: string) => string
}

function EditableField({
  fieldKey,
  value,
  confidence,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  canEdit,
  tReview,
}: EditableFieldProps) {
  const [editValue, setEditValue] = useState(formatValue(value))
  const [error, setError] = useState<string | null>(null)

  const confidenceInfo = confidence !== undefined ? getConfidenceLevel(confidence, tReview) : null

  const handleSave = () => {
    // Basic validation
    if (!editValue.trim()) {
      setError(tReview('validation.emptyField'))
      return
    }

    setError(null)
    onSave(editValue)
  }

  const handleCancel = () => {
    setEditValue(formatValue(value))
    setError(null)
    onCancel()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium">{formatFieldName(fieldKey)}</div>
          {confidenceInfo && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge
                    variant="outline"
                    className={cn('text-xs flex items-center gap-1', confidenceInfo.color, confidenceInfo.borderColor)}
                  >
                    <confidenceInfo.icon className="h-3 w-3" />
                    {Math.round(confidence! * 100)}%
                  </Badge>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-xs font-semibold mb-1">{confidenceInfo.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {confidenceInfo.action}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        {canEdit && !isEditing && (
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onEdit}>
            <Edit2 className="h-3 w-3" />
          </Button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className={cn(
                'text-sm',
                error && 'border-red-500 focus-visible:ring-red-500'
              )}
              autoFocus
            />
            <Button variant="default" size="icon" className="h-9 w-9" onClick={handleSave}>
              <Check className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9" onClick={handleCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          {error && (
            <p className="text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {error}
            </p>
          )}
        </div>
      ) : (
        <div
          className={cn(
            'rounded-md border p-3 text-sm',
            confidenceInfo ? cn(confidenceInfo.borderColor, confidenceInfo.bgColor) : 'bg-muted/50'
          )}
        >
          {formatValue(value)}
        </div>
      )}
    </div>
  )
}

/**
 * Main DocumentResults component
 */
export function DocumentResults({
  documentId,
  data,
  documentType,
  status,
  confidence,
  onSave,
}: DocumentResultsProps) {
  const t = useTranslations('results')
  const tReview = useTranslations('review')
  const [activeTab, setActiveTab] = useState<'structured' | 'raw'>('structured')
  const [editingField, setEditingField] = useState<string | null>(null)
  const [editedData, setEditedData] = useState<Record<string, unknown>>(data)
  const [hasChanges, setHasChanges] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  const canEdit = status === 'NEEDS_REVIEW'

  /**
   * Restore draft from localStorage on mount
   */
  useEffect(() => {
    if (!canEdit) return

    const draftKey = `draft_${documentId}`
    const stored = localStorage.getItem(draftKey)

    if (stored) {
      try {
        const { data: draftData, timestamp } = JSON.parse(stored)

        // Defer state updates to avoid calling setState synchronously inside the effect
        // which can cause cascading renders and triggers lint rules.
        setTimeout(() => {
          setEditedData(draftData)
          setHasChanges(true)
          setLastSaved(new Date(timestamp))

          toast.info(
            tReview('draftRestored', {
              time: new Date(timestamp).toLocaleTimeString(),
            })
          )
        }, 0)
      } catch (error) {
        console.error('Failed to restore draft:', error)
        localStorage.removeItem(draftKey)
      }
    }
  }, [documentId, canEdit, tReview])

  /**
   * Auto-save to localStorage every 30 seconds
   */
  useEffect(() => {
    if (!canEdit || !hasChanges) return

    const timer = setInterval(() => {
      const draftKey = `draft_${documentId}`
      const now = new Date()

      localStorage.setItem(
        draftKey,
        JSON.stringify({
          data: editedData,
          timestamp: now.toISOString()
        })
      )

      setLastSaved(now)
    }, 30000) // 30 seconds

    return () => clearInterval(timer)
  }, [documentId, editedData, hasChanges, canEdit])

  /**
   * Warn before leaving page with unsaved changes
   */
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault()
        // Modern browsers show a generic message, but we still need to set returnValue
        e.returnValue = ''
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [hasChanges])

  /**
   * Handlers for saving/discarding. Use `useCallback` so they are stable and can be
   * safely referenced from effects without causing unnecessary re-subscriptions.
   */
  const handleSaveAll = useCallback(() => {
    if (onSave) {
      startTransition(async () => {
        await onSave(editedData)
        setHasChanges(false)

        // Clear draft from localStorage after successful save
        const draftKey = `draft_${documentId}`
        localStorage.removeItem(draftKey)
        setLastSaved(null)
      })
    }
  }, [onSave, editedData, startTransition, documentId])

  const handleDiscardChanges = useCallback(() => {
    setEditedData(data)
    setHasChanges(false)
    setEditingField(null)
  }, [data])

  /**
   * Keyboard shortcuts for review workflow
   * - Cmd+S / Ctrl+S: Save changes
   * - Escape: Discard changes
   */
  useEffect(() => {
    if (!canEdit) return

    const handleKeyboard = (e: KeyboardEvent) => {
      // Save changes: Cmd+S / Ctrl+S
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault()
        if (hasChanges && !isPending) {
          handleSaveAll()
        }
      }

      // Discard changes: Escape (when not editing a field)
      if (e.key === 'Escape' && hasChanges && !editingField) {
        e.preventDefault()
        handleDiscardChanges()
      }
    }

    window.addEventListener('keydown', handleKeyboard)
    return () => window.removeEventListener('keydown', handleKeyboard)
  }, [canEdit, hasChanges, isPending, editingField, handleSaveAll, handleDiscardChanges])

  const handleDownloadJSON = () => {
    const blob = new Blob([JSON.stringify(editedData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${documentType.toLowerCase()}-data.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleFieldEdit = (fieldKey: string) => {
    setEditingField(fieldKey)
  }

  const handleFieldSave = (fieldKey: string, newValue: string) => {
    setEditedData((prev) => ({
      ...prev,
      [fieldKey]: newValue,
    }))
    setHasChanges(true)
    setEditingField(null)
  }

  const handleFieldCancel = () => {
    setEditingField(null)
  }

  // Handlers moved above and implemented using useCallback for stability

  // Calculate fields with low confidence
  const lowConfidenceFields = confidence
    ? Object.entries(confidence).filter(([, score]) => score < 0.7).length
    : 0

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{t('title')}</CardTitle>
            <CardDescription>{t('extractedFields')}</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={handleDownloadJSON}>
            <Download className="mr-2 h-4 w-4" />
            {t('downloadJSON')}
          </Button>
        </div>

        {/* Warning for low confidence */}
        {canEdit && lowConfidenceFields > 0 && (
          <Alert className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>{tReview('lowConfidenceWarning')}:</strong> {lowConfidenceFields}{' '}
              {lowConfidenceFields === 1
                ? tReview('lowConfidenceField')
                : tReview('lowConfidenceFields')}{' '}
              {tReview('lowConfidenceMessage')}
            </AlertDescription>
          </Alert>
        )}

        {/* Unsaved changes warning */}
        {hasChanges && (
          <Alert className="mt-2 bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-900">
              {tReview('unsavedChanges')}
            </AlertDescription>
          </Alert>
        )}

        {/* Draft save indicator */}
        {canEdit && lastSaved && (
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Cloud className="h-4 w-4" />
            <span>{tReview('draftSaved', { time: lastSaved.toLocaleTimeString() })}</span>
          </div>
        )}
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'structured' | 'raw')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="structured">{t('structuredData')}</TabsTrigger>
            <TabsTrigger value="raw">{t('rawData')}</TabsTrigger>
          </TabsList>

          <TabsContent value="structured" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {Object.entries(editedData).map(([key, value]) => (
                <EditableField
                  key={key}
                  fieldKey={key}
                  value={value}
                  confidence={confidence?.[key]}
                  isEditing={editingField === key}
                  onEdit={() => handleFieldEdit(key)}
                  onSave={(newValue) => handleFieldSave(key, newValue)}
                  onCancel={handleFieldCancel}
                  canEdit={canEdit}
                  tReview={tReview}
                />
              ))}
            </div>

            {/* Save/Discard buttons */}
            {canEdit && hasChanges && (
              <div className="flex gap-3 pt-4 border-t">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button onClick={handleSaveAll} disabled={isPending}>
                        {isPending ? tReview('saving') : tReview('saveChanges')}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">
                        {typeof navigator !== 'undefined' && navigator.platform.includes('Mac')
                          ? '⌘S'
                          : 'Ctrl+S'}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" onClick={handleDiscardChanges} disabled={isPending}>
                        {tReview('discardChanges')}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Esc</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </TabsContent>

          <TabsContent value="raw">
            <div className="rounded-md border bg-muted/50 p-4">
              <pre className="overflow-x-auto text-xs">
                <code>{JSON.stringify(editedData, null, 2)}</code>
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
