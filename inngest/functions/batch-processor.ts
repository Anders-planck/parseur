/**
 * Batch Document Processing
 *
 * Processes multiple documents of the same type in batches
 * to optimize LLM token usage and reduce costs
 */

import { inngest } from '../client'
import { documentRepository } from '@/lib/repositories/document-repository'
import { getLLMService } from '@/lib/llm'
import { storageService } from '@/lib/storage'
import { logger } from '@/lib/utils/logger'
import type { DocumentType, Prisma } from '@prisma/client'

/**
 * Batch configuration
 */
const BATCH_CONFIG = {
  maxSize: 5, // Maximum documents per batch
  timeout: '30s' as const, // Wait up to 30s to fill batch
  minSize: 3, // Minimum documents to trigger batch processing
}

/**
 * Batch Document Processor
 *
 * Waits for multiple documents of the same type and processes them together
 */
export const batchDocumentProcessor = inngest.createFunction(
  {
    id: 'batch-document-processor',
    name: 'Batch Document Processor',
    batchEvents: {
      maxSize: BATCH_CONFIG.maxSize,
      timeout: BATCH_CONFIG.timeout,
    },
  },
  { event: 'document/batch.ready' },
  async ({ events, step }) => {
    // Events contains all batched documents
    const documentCount = events.length

    logger.info({ documentCount }, 'Processing document batch')

    // Group documents by type (they should already be same type, but verify)
    const documentsByType = new Map<DocumentType, BatchDocumentEvent[]>()

    for (const event of events) {
      const { documentType } = event.data
      const existing = documentsByType.get(documentType) || []
      documentsByType.set(documentType, [...existing, event.data])
    }

    // Process each type group
    const results = await Promise.all(
      Array.from(documentsByType.entries()).map(([documentType, typeEvents]) =>
        step.run(`batch-extract-${documentType}`, async () =>
          processBatchByType(documentType, typeEvents)
        )
      )
    )

    logger.info(
      {
        documentCount,
        typeCount: documentsByType.size,
        successCount: results.flat().filter((r) => r.success).length,
      },
      'Batch processing completed'
    )

    return {
      totalDocuments: documentCount,
      results: results.flat(),
    }
  }
)

/**
 * Process a batch of documents of the same type
 */
async function processBatchByType(
  documentType: DocumentType,
  events: Array<BatchDocumentEvent>
): Promise<Array<{ documentId: string; success: boolean; error?: string }>> {
  logger.info({ documentType, count: events.length }, 'Processing batch by type')

  // Download all documents
  const documents = await Promise.all(
    events.map(async (eventData) => {
      const { documentId, s3Key, mimeType } = eventData

      try {
        const { buffer } = await storageService.downloadFile(s3Key)

        return {
          documentId,
          buffer,
          mimeType,
          s3Key,
        }
      } catch (error) {
        logger.error({ error, documentId, s3Key }, 'Failed to download document for batch')
        return null
      }
    })
  )

  // Filter out failed downloads
  const validDocuments = documents.filter((d): d is NonNullable<typeof d> => d !== null)

  if (validDocuments.length === 0) {
    return events.map((eventData) => ({
      documentId: eventData.documentId,
      success: false,
      error: 'Download failed',
    }))
  }

  // Use LLM to extract data from batch
  const llm = getLLMService()

  try {
    // Create batch extraction prompt
    const batchPrompt = createBatchExtractionPrompt(documentType, validDocuments.length)

    // For MVP, process documents individually but in parallel
    // Future: Create true batch prompt that processes all at once
    const extractionResults = await Promise.all(
      validDocuments.map(async (doc) => {
        try {
          const result = await llm.extract({
            image: doc.buffer,
            mimeType: doc.mimeType,
            documentType,
            promptTemplate: batchPrompt,
          })

          // Update document in database
          await documentRepository.update(doc.documentId, {
            status: 'COMPLETED',
            documentType,
            parsedData: result.rawData as Prisma.InputJsonValue,
            confidence: result.confidence,
            completedAt: new Date(),
          })

          logger.info(
            { documentId: doc.documentId, confidence: result.confidence },
            'Batch document processed'
          )

          return {
            documentId: doc.documentId,
            success: true,
          }
        } catch (error) {
          logger.error({ error, documentId: doc.documentId }, 'Batch extraction failed')

          await documentRepository.update(doc.documentId, {
            status: 'FAILED',
          })

          return {
            documentId: doc.documentId,
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
          }
        }
      })
    )

    return extractionResults
  } catch (error) {
    logger.error({ error, documentType }, 'Batch processing failed')

    // Mark all as failed
    await Promise.all(
      validDocuments.map((doc) =>
        documentRepository.update(doc.documentId, {
          status: 'FAILED',
        })
      )
    )

    return validDocuments.map((doc) => ({
      documentId: doc.documentId,
      success: false,
      error: error instanceof Error ? error.message : 'Batch failed',
    }))
  }
}

/**
 * Create optimized extraction prompt for batch processing
 */
function createBatchExtractionPrompt(documentType: DocumentType, count: number): string {
  const basePrompt = `Extract structured data from this ${documentType} document.`

  // Add batch-specific instructions
  const batchInstructions = `
Note: This is document ${count} in a batch. Use consistent field naming and formats.

Extract the following fields with high accuracy:
- Document identifiers (number, ID, reference)
- Dates (issue date, due date, etc.)
- Amounts and currency
- Party information (names, addresses, IDs)
- Line items (if applicable)

Return as JSON with consistent field names.`

  return `${basePrompt}\n${batchInstructions}`
}

/**
 * Batch coordinator function
 *
 * Groups similar documents and triggers batch processing
 */
export const batchCoordinator = inngest.createFunction(
  {
    id: 'batch-coordinator',
    name: 'Batch Coordinator',
  },
  { event: 'document/classified' },
  async ({ event, step }) => {
    const { documentId, documentType, confidence } = event.data

    // Only batch if confidence is high (avoid batching uncertain docs)
    if (confidence < 0.9) {
      logger.info({ documentId, confidence }, 'Skipping batch - low confidence')
      return { batched: false, reason: 'low-confidence' }
    }

    // Check if document type is suitable for batching
    const batchableTypes: DocumentType[] = ['INVOICE', 'RECEIPT', 'PAYSLIP']

    if (!batchableTypes.includes(documentType)) {
      logger.info({ documentId, documentType }, 'Skipping batch - type not batchable')
      return { batched: false, reason: 'not-batchable' }
    }

    // Send to batch queue
    await step.sendEvent('send-to-batch', {
      name: 'document/batch.ready',
      data: {
        documentId,
        documentType,
        confidence,
        s3Key: '', // Will be filled from database
        mimeType: '', // Will be filled from database
      },
    })

    logger.info({ documentId, documentType }, 'Document queued for batch processing')

    return { batched: true, documentType }
  }
)

/**
 * Type for batch document event
 */
interface BatchDocumentEvent {
  documentId: string
  documentType: DocumentType
  confidence: number
  s3Key: string
  mimeType: string
}

/**
 * Helper to determine if batch processing should be used
 */
export function shouldUseBatchProcessing(options: {
  documentType?: DocumentType
  queueSize?: number
  userPreference?: string
}): boolean {
  // Use batch processing when:
  // 1. Document type is batchable (invoices, receipts, payslips)
  // 2. Queue has enough pending documents
  // 3. User hasn't opted for real-time processing

  const batchableTypes: DocumentType[] = ['INVOICE', 'RECEIPT', 'PAYSLIP']

  const isBatchable = options.documentType && batchableTypes.includes(options.documentType)
  const hasQueueSize = options.queueSize && options.queueSize >= BATCH_CONFIG.minSize
  const isRealtime = options.userPreference === 'realtime'

  return Boolean(isBatchable && hasQueueSize && !isRealtime)
}

/**
 * Get current batch queue size for a document type
 */
export async function getBatchQueueSize(documentType: DocumentType): Promise<number> {
  // Query database for processing documents of this type
  const processingDocs = await documentRepository.findByStatus('PROCESSING', {
    documentType,
    limit: BATCH_CONFIG.maxSize,
  })

  return processingDocs.length
}
