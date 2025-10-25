/**
 * Document Management Server Actions
 *
 * Server actions for document operations
 */

'use server'

import { revalidatePath } from 'next/cache'
import { DocumentStatus, DocumentType, Prisma, PipelineStage } from '@prisma/client'
import { getSessionOrThrow } from '@/lib/auth/middleware'
import { documentRepository } from '@/lib/repositories/document-repository'
import { storageService } from '@/lib/storage'
import { sendEvent } from '@/inngest/client'
import { fileValidationSchema } from '@/lib/validation/schemas'
import { logger } from '@/lib/utils/logger'
import { documentEvents } from '@/lib/events/emitter'

/**
 * Server action result type
 */
type ActionResult<T = unknown> =
  | { success: true; data: T; message?: string }
  | { success: false; error: string; field?: string }

/**
 * Upload document for processing
 */
export async function uploadDocument(
  formData: FormData
): Promise<
  ActionResult<{
    id: string
    filename: string
    status: string
    createdAt: Date
  }>
> {
  try {
    // Check authentication
    const session = await getSessionOrThrow()
    const userId = session.user.id

    // Get file from FormData
    const file = formData.get('file')

    // Validate file exists
    if (!file || !(file instanceof File)) {
      return {
        success: false,
        error: 'No file provided or invalid file type',
        field: 'file',
      }
    }

    // Validate file with Zod schema
    const validationResult = fileValidationSchema.safeParse({ file })
    if (!validationResult.success) {
      const errors = validationResult.error.issues.map((err) => err.message).join(', ')
      return {
        success: false,
        error: errors,
        field: 'file',
      }
    }

    logger.info(
      {
        userId,
        filename: file.name,
        mimeType: file.type,
        fileSize: file.size,
      },
      'Processing file upload'
    )

    // Convert File to Buffer for S3 upload
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload to S3
    const uploadResult = await storageService.uploadFile(buffer, file.name, {
      userId,
      folder: 'documents',
      metadata: {
        originalMimeType: file.type,
      },
    })

    logger.info(
      { s3Key: uploadResult.s3Key, s3Bucket: uploadResult.s3Bucket },
      'File uploaded to S3'
    )

    // Create document record in database
    const document = await documentRepository.create({
      userId,
      originalFilename: file.name,
      mimeType: uploadResult.mimeType,
      fileSize: uploadResult.fileSize,
      s3Key: uploadResult.s3Key,
      s3Bucket: uploadResult.s3Bucket,
    })

    logger.info({ documentId: document.id }, 'Document record created')

    // Trigger Inngest processing pipeline
    await sendEvent({
      name: 'document/uploaded',
      data: {
        documentId: document.id,
        userId,
        s3Key: uploadResult.s3Key,
        s3Bucket: uploadResult.s3Bucket,
        mimeType: uploadResult.mimeType,
        fileSize: uploadResult.fileSize,
      },
    })

    logger.info({ documentId: document.id }, 'Processing pipeline triggered')

    // Emit SSE event for real-time updates
    documentEvents.emitDocumentEvent({
      type: 'document.created',
      userId,
      data: {
        id: document.id,
        status: document.status,
        documentType: document.documentType,
        confidence: document.confidence,
        originalFilename: document.originalFilename,
        createdAt: document.createdAt,
        completedAt: document.completedAt,
      },
      timestamp: new Date(),
    })

    // Revalidate documents page
    revalidatePath('/dashboard/documents')

    // Return success response
    return {
      success: true,
      data: {
        id: document.id,
        filename: document.originalFilename,
        status: document.status,
        createdAt: document.createdAt,
      },
      message: 'Document uploaded successfully',
    }
  } catch (error) {
    logger.error({ error }, 'Upload failed')
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to upload document',
    }
  }
}

/**
 * Get download URLs for a document
 */
export async function getDocumentDownloadUrls(
  documentId: string,
  format: 'original' | 'json' = 'original'
): Promise<
  ActionResult<{
    originalFileUrl: string
    parsedDataJson?: string
    expiresAt: Date
    documentId: string
    filename: string
  }>
> {
  try {
    // Validate document ID
    if (!documentId || typeof documentId !== 'string') {
      return {
        success: false,
        error: 'Invalid document ID',
      }
    }

    // Check authentication
    const session = await getSessionOrThrow()
    const userId = session.user.id

    logger.info({ documentId, userId, format }, 'Generating download URLs')

    // Fetch document
    const document = await documentRepository.findById(documentId)

    if (!document) {
      return {
        success: false,
        error: 'Document not found',
      }
    }

    // Verify ownership
    if (document.userId !== userId) {
      return {
        success: false,
        error: 'You do not have permission to access this document',
      }
    }

    // Generate signed URL for original file (15 minutes expiration)
    const expiresIn = 900 // 15 minutes in seconds
    const originalFileUrl = await storageService.getSignedUrl(document.s3Key, expiresIn)

    // Calculate expiration timestamp
    const expiresAt = new Date(Date.now() + expiresIn * 1000)

    // Build response
    const response: {
      originalFileUrl: string
      parsedDataJson?: string
      expiresAt: Date
      documentId: string
      filename: string
    } = {
      originalFileUrl,
      expiresAt,
      documentId: document.id,
      filename: document.originalFilename,
    }

    // If JSON format requested and parsed data exists, include it
    if (format === 'json' && document.parsedData) {
      response.parsedDataJson = JSON.stringify(document.parsedData, null, 2)
    }

    logger.info(
      {
        documentId,
        format,
        hasOriginal: !!originalFileUrl,
        hasParsedData: !!response.parsedDataJson,
        expiresAt,
      },
      'Download URLs generated'
    )

    return {
      success: true,
      data: response,
    }
  } catch (error) {
    logger.error({ error }, 'Failed to generate download URLs')
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate download URLs',
    }
  }
}

/**
 * Delete a document (soft delete + S3 cleanup)
 */
export async function deleteDocument(documentId: string): Promise<ActionResult<null>> {
  try {
    // Validate document ID
    if (!documentId || typeof documentId !== 'string') {
      return {
        success: false,
        error: 'Invalid document ID',
      }
    }

    // Check authentication
    const session = await getSessionOrThrow()
    const userId = session.user.id

    logger.info({ documentId, userId }, 'Deleting document')

    // Fetch document to verify ownership and get S3 key
    const document = await documentRepository.findById(documentId)

    if (!document) {
      return {
        success: false,
        error: 'Document not found',
      }
    }

    // Verify ownership
    if (document.userId !== userId) {
      return {
        success: false,
        error: 'You do not have permission to delete this document',
      }
    }

    // Soft delete document (mark as ARCHIVED)
    await documentRepository.delete(documentId)

    // Delete file from S3 (async, don't block response)
    storageService
      .deleteFile(document.s3Key)
      .then(() => {
        logger.info(
          { documentId, s3Key: document.s3Key },
          'S3 file deleted successfully'
        )
      })
      .catch((error) => {
        logger.error(
          { error, documentId, s3Key: document.s3Key },
          'Failed to delete S3 file (document marked as deleted)'
        )
      })

    logger.info({ documentId, userId }, 'Document deleted successfully')

    // Emit SSE event for real-time updates
    documentEvents.emitDocumentEvent({
      type: 'document.deleted',
      userId,
      data: {
        id: document.id,
        status: 'ARCHIVED' as DocumentStatus,
        documentType: document.documentType,
        confidence: document.confidence,
        originalFilename: document.originalFilename,
        createdAt: document.createdAt,
        completedAt: document.completedAt,
      },
      timestamp: new Date(),
    })

    // Revalidate documents page
    revalidatePath('/dashboard/documents')

    return {
      success: true,
      data: null,
      message: 'Document deleted successfully',
    }
  } catch (error) {
    logger.error({ error }, 'Failed to delete document')
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete document',
    }
  }
}

/**
 * Get a single document by ID
 */
export async function getDocumentById(
  documentId: string
): Promise<ActionResult<{
  id: string
  originalFilename: string
  status: DocumentStatus
  documentType: DocumentType | null
  confidence: number | null
  parsedData: Prisma.JsonValue | null
  createdAt: Date
  completedAt: Date | null
}>> {
  try {
    // Validate document ID
    if (!documentId || typeof documentId !== 'string') {
      return {
        success: false,
        error: 'Invalid document ID',
      }
    }

    // Check authentication
    const session = await getSessionOrThrow()
    const userId = session.user.id

    logger.info({ documentId, userId }, 'Fetching document')

    // Fetch document
    const document = await documentRepository.findById(documentId)

    if (!document) {
      return {
        success: false,
        error: 'Document not found',
      }
    }

    // Verify ownership
    if (document.userId !== userId) {
      return {
        success: false,
        error: 'You do not have permission to access this document',
      }
    }

    return {
      success: true,
      data: {
        id: document.id,
        originalFilename: document.originalFilename,
        status: document.status,
        documentType: document.documentType,
        confidence: document.confidence,
        parsedData: document.parsedData,
        createdAt: document.createdAt,
        completedAt: document.completedAt,
      },
    }
  } catch (error) {
    logger.error({ error }, 'Failed to fetch document')
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch document',
    }
  }
}

/**
 * Get document statistics for the authenticated user
 */
export async function getDocumentStats(): Promise<ActionResult<{
  total: number
  completed: number
  processing: number
  needsReview: number
  failed: number
}>> {
  try {
    // Check authentication
    const session = await getSessionOrThrow()
    const userId = session.user.id

    logger.info({ userId }, 'Fetching document statistics')

    // Fetch statistics
    const stats = await documentRepository.getStatsByUserId(userId)

    return {
      success: true,
      data: stats,
    }
  } catch (error) {
    logger.error({ error }, 'Failed to fetch document statistics')
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch statistics',
    }
  }
}

/**
 * Get list of documents for the authenticated user
 */
export async function getDocumentsList(options: {
  status?: DocumentStatus
  limit?: number
  cursor?: string
} = {}): Promise<ActionResult<Array<{
  id: string
  originalFilename: string
  status: DocumentStatus
  documentType: DocumentType | null
  confidence: number | null
  createdAt: Date
  completedAt: Date | null
}>>> {
  try {
    // Check authentication
    const session = await getSessionOrThrow()
    const userId = session.user.id

    logger.info({ userId, options }, 'Fetching documents list')

    // Fetch documents
    const documents = await documentRepository.findByUserId(userId, {
      status: options.status,
      limit: options.limit || 50,
      cursor: options.cursor,
    })

    return {
      success: true,
      data: documents.map((doc) => ({
        id: doc.id,
        originalFilename: doc.originalFilename,
        status: doc.status,
        documentType: doc.documentType,
        confidence: doc.confidence,
        createdAt: doc.createdAt,
        completedAt: doc.completedAt,
      })),
    }
  } catch (error) {
    logger.error({ error }, 'Failed to fetch documents list')
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch documents',
    }
  }
}

/**
 * Retry processing for a failed document
 */
export async function retryDocumentProcessing(documentId: string): Promise<ActionResult<null>> {
  try {
    // Validate document ID
    if (!documentId || typeof documentId !== 'string') {
      return {
        success: false,
        error: 'Invalid document ID',
      }
    }

    // Check authentication
    const session = await getSessionOrThrow()
    const userId = session.user.id

    logger.info({ documentId, userId }, 'Retrying document processing')

    // Fetch document to verify ownership and status
    const document = await documentRepository.findById(documentId)

    if (!document) {
      return {
        success: false,
        error: 'Document not found',
      }
    }

    // Verify ownership
    if (document.userId !== userId) {
      return {
        success: false,
        error: 'You do not have permission to retry this document',
      }
    }

    // Check if document is in a retryable state
    if (document.status !== 'FAILED' && document.status !== 'NEEDS_REVIEW') {
      return {
        success: false,
        error: 'Only failed or needs review documents can be reprocessed',
      }
    }

    // Reset document status to PROCESSING
    await documentRepository.update(documentId, {
      status: 'PROCESSING',
      completedAt: undefined,
      confidence: undefined,
    })

    logger.info({ documentId, userId }, 'Document status reset to PROCESSING')

    // Trigger Inngest processing pipeline
    await sendEvent({
      name: 'document/uploaded',
      data: {
        documentId: document.id,
        userId: document.userId,
        s3Key: document.s3Key,
        s3Bucket: document.s3Bucket,
        mimeType: document.mimeType,
        fileSize: document.fileSize,
      },
    })

    logger.info({ documentId, userId }, 'Processing pipeline re-triggered')

    // Revalidate documents page
    revalidatePath('/dashboard/documents')
    revalidatePath(`/dashboard/documents/${documentId}`)

    return {
      success: true,
      data: null,
      message: 'Document reprocessing started',
    }
  } catch (error) {
    logger.error({ error }, 'Failed to retry document processing')
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to retry document processing',
    }
  }
}

/**
 * Get audit logs (pipeline stages) for a document
 */
export async function getDocumentAuditLogs(
  documentId: string
): Promise<ActionResult<Array<{
  stage: PipelineStage
  createdAt: Date
}>>> {
  try {
    // Validate document ID
    if (!documentId || typeof documentId !== 'string') {
      return {
        success: false,
        error: 'Invalid document ID',
      }
    }

    // Check authentication
    const session = await getSessionOrThrow()
    const userId = session.user.id

    logger.info({ documentId, userId }, 'Fetching document audit logs')

    // Verify document ownership first
    const document = await documentRepository.findById(documentId)

    if (!document) {
      return {
        success: false,
        error: 'Document not found',
      }
    }

    if (document.userId !== userId) {
      return {
        success: false,
        error: 'You do not have permission to access this document',
      }
    }

    // Fetch audit logs using repository
    const { auditRepository } = await import('@/lib/repositories/audit-repository')

    const auditLogs = await auditRepository.getStagesByDocumentId(documentId)

    return {
      success: true,
      data: auditLogs,
    }
  } catch (error) {
    logger.error({ error }, 'Failed to fetch document audit logs')
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch audit logs',
    }
  }
}

/**
 * Approve document review (mark as COMPLETED with optional corrections)
 */
export async function approveDocumentReview(
  documentId: string,
  correctedData?: Record<string, unknown>
): Promise<ActionResult<null>> {
  try {
    // Validate document ID
    if (!documentId || typeof documentId !== 'string') {
      return {
        success: false,
        error: 'Invalid document ID',
      }
    }

    // Check authentication
    const session = await getSessionOrThrow()
    const userId = session.user.id

    logger.info({ documentId, userId, hasCorrectedData: !!correctedData }, 'Approving document review')

    // Fetch document to verify ownership and status
    const document = await documentRepository.findById(documentId)

    if (!document) {
      return {
        success: false,
        error: 'Document not found',
      }
    }

    // Verify ownership
    if (document.userId !== userId) {
      return {
        success: false,
        error: 'You do not have permission to approve this document',
      }
    }

    // Check if document is in reviewable state
    if (document.status !== 'NEEDS_REVIEW') {
      return {
        success: false,
        error: 'Only documents with NEEDS_REVIEW status can be approved',
      }
    }

    // Update document status to COMPLETED
    const updateData: {
      status: DocumentStatus
      completedAt: Date
      parsedData?: Prisma.InputJsonValue
      confidence?: number
    } = {
      status: 'COMPLETED',
      completedAt: new Date(),
    }

    // Update parsedData if corrections provided
    if (correctedData) {
      updateData.parsedData = correctedData as Prisma.InputJsonValue
      updateData.confidence = 1.0 // User-corrected data has maximum confidence
    }

    await documentRepository.update(documentId, updateData)

    logger.info({ documentId, userId }, 'Document review approved')

    // Emit SSE event for real-time updates
    documentEvents.emitDocumentEvent({
      type: 'document.completed',
      userId,
      data: {
        id: document.id,
        status: 'COMPLETED',
        documentType: document.documentType,
        confidence: correctedData ? 1.0 : document.confidence,
        originalFilename: document.originalFilename,
        createdAt: document.createdAt,
        completedAt: new Date(),
      },
      timestamp: new Date(),
    })

    // Revalidate documents pages
    revalidatePath('/dashboard/documents')
    revalidatePath(`/dashboard/documents/${documentId}`)

    return {
      success: true,
      data: null,
      message: 'Document approved successfully',
    }
  } catch (error) {
    logger.error({ error }, 'Failed to approve document review')
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to approve document review',
    }
  }
}

/**
 * Save corrected data for a document in NEEDS_REVIEW status
 * Updates parsedData without changing document status
 */
export async function saveCorrectedData(
  documentId: string,
  correctedData: Record<string, unknown>
): Promise<ActionResult<null>> {
  try {
    // Validate inputs
    if (!documentId || typeof documentId !== 'string') {
      return { success: false, error: 'Invalid document ID' }
    }

    if (!correctedData || typeof correctedData !== 'object') {
      return { success: false, error: 'Invalid corrected data' }
    }

    // Authenticate user
    const session = await getSessionOrThrow()
    const userId = session.user.id

    logger.info({ documentId, userId }, 'Saving corrected data')

    // Fetch document and verify ownership
    const document = await documentRepository.findById(documentId)

    if (!document) {
      return { success: false, error: 'Document not found' }
    }

    if (document.userId !== userId) {
      return { success: false, error: 'You do not have permission to edit this document' }
    }

    // Check status - only allow editing NEEDS_REVIEW documents
    if (document.status !== 'NEEDS_REVIEW') {
      return {
        success: false,
        error: 'Only documents with NEEDS_REVIEW status can be edited',
      }
    }

    // Update document with corrected data
    await documentRepository.update(documentId, {
      parsedData: correctedData as Prisma.InputJsonValue,
      confidence: 0.95, // User-corrected but not yet approved
    })

    // Emit SSE event for real-time UI updates
    documentEvents.emitDocumentEvent({
      type: 'document.updated',
      userId,
      data: {
        id: document.id,
        status: document.status,
        documentType: document.documentType,
        confidence: 0.95,
        originalFilename: document.originalFilename,
        createdAt: document.createdAt,
      },
      timestamp: new Date(),
    })

    // Revalidate cached pages
    revalidatePath('/dashboard/documents')
    revalidatePath(`/dashboard/documents/${documentId}`)

    logger.info({ documentId }, 'Corrected data saved successfully')

    return { success: true, data: null, message: 'Changes saved successfully' }
  } catch (error) {
    logger.error({ error }, 'Failed to save corrected data')
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to save corrected data',
    }
  }
}
