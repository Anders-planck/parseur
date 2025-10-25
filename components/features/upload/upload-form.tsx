'use client'

/**
 * Document Upload Form Component
 *
 * Features:
 * - Drag and drop file upload
 * - File validation (type, size)
 * - Upload progress tracking
 * - Error handling with toast notifications
 * - Server action integration
 */

import { useState, useCallback, useTransition, useEffect } from 'react'
import { useRouter, Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Upload, FileText, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { uploadDocument } from '@/lib/actions/document-actions'

/**
 * Form validation schema factory
 */
const createUploadFormSchema = (t: (key: string) => string) =>
  z.object({
    file: z
      .custom<File>()
      .refine((file) => file?.size <= 10 * 1024 * 1024, t('fileTooLarge'))
      .refine(
        (file) => ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'].includes(file?.type),
        t('invalidFileType')
      ),
  })

type UploadFormData = {
  file: File
}

/**
 * Upload state type
 */
interface UploadState {
  status: 'idle' | 'uploading' | 'success' | 'error'
  progress: number
  fileName?: string
  documentId?: string
  error?: string
}

/**
 * UploadForm Component
 */
export function UploadForm() {
  const router = useRouter()
  const t = useTranslations('upload')
  const [isPending, startTransition] = useTransition()
  const [uploadState, setUploadState] = useState<UploadState>({
    status: 'idle',
    progress: 0,
  })
  const [countdown, setCountdown] = useState(10)
  const [redirectTimer, setRedirectTimer] = useState<NodeJS.Timeout | null>(null)

  // Create schema with translated messages
  const uploadFormSchema = createUploadFormSchema(t)

  const {
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UploadFormData>({
    resolver: zodResolver(uploadFormSchema),
  })

  /**
   * Handle file drop
   */
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        setValue('file', file, { shouldValidate: true })
        setUploadState({
          status: 'idle',
          progress: 0,
          fileName: file.name,
        })
      }
    },
    [setValue]
  )

  /**
   * Configure dropzone
   */
  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    maxFiles: 1,
    multiple: false,
  })

  /**
   * Handle form submission
   */
  const onSubmit = async (data: UploadFormData) => {
    setUploadState({
      status: 'uploading',
      progress: 0,
      fileName: data.file.name,
    })

    // Upload with progress simulation (actual progress would need backend support)
    const progressInterval = setInterval(() => {
      setUploadState((prev) => ({
        ...prev,
        progress: Math.min(prev.progress + 10, 90),
      }))
    }, 200)

    startTransition(async () => {
      try {
        // Create form data
        const formData = new FormData()
        formData.append('file', data.file)

        // Upload file using server action
        const result = await uploadDocument(formData)

        clearInterval(progressInterval)

        if (!result.success) {
          throw new Error(result.error)
        }

        // Update state to success
        setUploadState({
          status: 'success',
          progress: 100,
          fileName: data.file.name,
          documentId: result.data.id,
        })

        // Show success toast
        toast.success(t('uploadSuccess'), {
          description: t('uploadSuccessDescription', { filename: data.file.name }),
        })

        // Start countdown for redirect
        setCountdown(10)
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer)
              // Redirect to document status page
              router.push(`/dashboard/documents/${result.data.id}`)
              return 0
            }
            return prev - 1
          })
        }, 1000)
        setRedirectTimer(timer)
      } catch (error) {
        clearInterval(progressInterval)
        const errorMessage = error instanceof Error ? error.message : t('uploadFailed')

        setUploadState({
          status: 'error',
          progress: 0,
          fileName: data.file.name,
          error: errorMessage,
        })

        toast.error(t('uploadFailed'), {
          description: errorMessage,
        })
      }
    })
  }

  /**
   * Cancel automatic redirect
   */
  const handleCancelRedirect = () => {
    if (redirectTimer) {
      clearInterval(redirectTimer)
      setRedirectTimer(null)
    }
  }

  /**
   * Upload another document
   */
  const handleUploadAnother = () => {
    if (redirectTimer) {
      clearInterval(redirectTimer)
      setRedirectTimer(null)
    }
    reset()
    setUploadState({ status: 'idle', progress: 0 })
    setCountdown(10)
  }

  /**
   * Cleanup timer on unmount
   */
  useEffect(() => {
    return () => {
      if (redirectTimer) {
        clearInterval(redirectTimer)
      }
    }
  }, [redirectTimer])

  /**
   * Get dropzone border color based on state
   */
  const getDropzoneBorderColor = () => {
    if (uploadState.status === 'error' || errors.file || fileRejections.length > 0) {
      return 'border-destructive'
    }
    if (uploadState.status === 'success') {
      return 'border-green-500'
    }
    if (isDragActive) {
      return 'border-primary'
    }
    return 'border-border'
  }

  /**
   * Render upload status
   */
  const renderUploadStatus = () => {
    switch (uploadState.status) {
      case 'uploading':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {t('uploading', { filename: uploadState.fileName || '' })}
                </p>
                <Progress value={uploadState.progress} className="mt-2" />
              </div>
            </div>
          </div>
        )

      case 'success':
        return (
          <Card className="border-green-500">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto" />
                <div>
                  <h3 className="text-lg font-semibold text-green-900">{t('successTitle')}</h3>
                  <p className="text-sm text-green-700">
                    {t('successMessage', { filename: uploadState.fileName || '' })}
                  </p>
                </div>

                <div className="flex gap-3 justify-center">
                  <Button asChild>
                    <Link href={`/dashboard/documents/${uploadState.documentId}`}>
                      {t('viewStatus')}
                    </Link>
                  </Button>
                  <Button variant="outline" onClick={handleUploadAnother}>
                    {t('uploadAnother')}
                  </Button>
                </div>

                {redirectTimer && countdown > 0 && (
                  <p className="text-xs text-muted-foreground">
                    {t('redirecting', { seconds: countdown })}{' '}
                    <Button
                      variant="link"
                      size="sm"
                      onClick={handleCancelRedirect}
                      className="h-auto p-0 text-xs"
                    >
                      {t('cancelRedirect')}
                    </Button>
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )

      case 'error':
        return (
          <div className="flex items-center gap-3 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <div>
              <p className="text-sm font-medium">{t('uploadFailed')}</p>
              <p className="text-xs text-muted-foreground">{uploadState.error}</p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Dropzone */}
          <div
            {...getRootProps()}
            className={cn(
              'relative cursor-pointer rounded-lg border-2 border-dashed p-12 text-center transition-colors',
              getDropzoneBorderColor(),
              (uploadState.status === 'uploading' || isPending) && 'pointer-events-none opacity-60',
              uploadState.status === 'success' && 'pointer-events-none'
            )}
          >
            <input {...getInputProps()} />

            <div className="flex flex-col items-center gap-4">
              {uploadState.fileName ? (
                <>
                  <FileText className="h-12 w-12 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{uploadState.fileName}</p>
                    <p className="text-sm text-muted-foreground">
                      {isDragActive ? t('dropToReplace') : t('clickToReplace')}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <Upload className="h-12 w-12 text-muted-foreground" />
                  <div>
                    <p className="font-medium">
                      {isDragActive ? t('dropHere') : t('dragAndDrop')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t('or')} {t('clickToBrowse')}
                    </p>
                  </div>
                </>
              )}

              <div className="text-xs text-muted-foreground">{t('supportedFormats')}</div>
            </div>
          </div>

          {/* Error messages */}
          {errors.file && (
            <div className="flex items-center gap-2 rounded-md border border-destructive bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              <p>{errors.file.message as string}</p>
            </div>
          )}

          {fileRejections.length > 0 && (
            <div className="flex items-center gap-2 rounded-md border border-destructive bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              <p>{fileRejections[0].errors[0].message}</p>
            </div>
          )}

          {/* Upload status */}
          {uploadState.status !== 'idle' && (
            <div className="rounded-md border bg-muted/50 p-4">{renderUploadStatus()}</div>
          )}

          {/* Submit button */}
          <Button
            type="submit"
            className="w-full"
            disabled={!uploadState.fileName || uploadState.status === 'uploading' || isPending}
          >
            {uploadState.status === 'uploading' || isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('uploading', { filename: '...' })}
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                {t('uploadButton')}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
