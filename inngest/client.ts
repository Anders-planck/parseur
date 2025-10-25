/**
 * Inngest Client
 *
 * Centralized Inngest client for event-driven functions
 */

import { Inngest, EventSchemas } from 'inngest'
import { config } from '@/lib/config'
import type { DocumentType } from '@prisma/client'

/**
 * Event schemas for type-safe events
 */
type Events = {
  /**
   * Document uploaded event
   * Triggered when a document is uploaded to storage
   */
  'document/uploaded': {
    data: {
      documentId: string
      userId: string
      s3Key: string
      s3Bucket: string
      mimeType: string
      fileSize: number
    }
  }

  /**
   * Document classified event
   * Triggered after document type classification
   */
  'document/classified': {
    data: {
      documentId: string
      documentType: DocumentType
      confidence: number
      reasoning: string
    }
  }

  /**
   * Data extracted event
   * Triggered after structured data extraction
   */
  'document/extracted': {
    data: {
      documentId: string
      extractedData: Record<string, unknown>
      confidence: number
    }
  }

  /**
   * Validation completed event
   * Triggered after data validation
   */
  'document/validated': {
    data: {
      documentId: string
      isValid: boolean
      issues: Array<{
        field: string
        issue: string
        severity: 'error' | 'warning' | 'info'
      }>
    }
  }

  /**
   * Correction completed event
   * Triggered after auto-correction
   */
  'document/corrected': {
    data: {
      documentId: string
      correctedData: Record<string, unknown>
      confidence: number
    }
  }

  /**
   * Processing completed event
   * Triggered when entire pipeline completes
   */
  'document/completed': {
    data: {
      documentId: string
      status: 'COMPLETED' | 'FAILED' | 'NEEDS_REVIEW'
      finalConfidence: number
    }
  }

  /**
   * Processing failed event
   * Triggered when pipeline fails
   */
  'document/failed': {
    data: {
      documentId: string
      stage: string
      error: string
      errorCode?: string
    }
  }

  /**
   * Batch ready event
   * Triggered when documents are ready for batch processing
   */
  'document/batch.ready': {
    data: {
      documentId: string
      documentType: DocumentType
      confidence: number
      s3Key: string
      mimeType: string
    }
  }
}

/**
 * Inngest client instance
 *
 * Configured with app name and event schemas for type safety
 */
export const inngest = new Inngest({
  id: config.inngest.appId,
  name: 'Smart Document Parser',
  schemas: new EventSchemas().fromRecord<Events>(),
  eventKey: config.inngest.eventKey,
})

/**
 * Type-safe event sender
 */
export const sendEvent = inngest.send.bind(inngest)

/**
 * Type exports for use in functions
 */
export type { Events }
