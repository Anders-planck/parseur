/**
 * Event Emitter for SSE
 *
 * Simple in-memory event emitter for Server-Sent Events
 * For production, consider using Redis Pub/Sub for multi-instance support
 */

import { EventEmitter } from 'events'
import { DocumentStatus, DocumentType } from '@prisma/client'

/**
 * Document event types
 */
export type DocumentEventType =
  | 'document.created'
  | 'document.updated'
  | 'document.completed'
  | 'document.failed'
  | 'document.deleted'
  | 'document.processing'

/**
 * Document event payload
 */
export interface DocumentEvent {
  type: DocumentEventType
  userId: string
  data: {
    id: string
    status: DocumentStatus
    documentType?: DocumentType | null
    confidence?: number | null
    originalFilename: string
    createdAt: Date
    completedAt?: Date | null
  }
  timestamp: Date
}

/**
 * Global event emitter instance
 */
class DocumentEventEmitter extends EventEmitter {
  constructor() {
    super()
    // Set max listeners to avoid memory leak warnings
    this.setMaxListeners(100)
  }

  /**
   * Emit a document event
   */
  emitDocumentEvent(event: DocumentEvent): void {
    // Emit to all listeners
    this.emit('document', event)

    // Emit to user-specific listeners
    this.emit(`document:${event.userId}`, event)
  }

  /**
   * Subscribe to document events for a specific user
   */
  onDocumentEvent(userId: string, callback: (event: DocumentEvent) => void): () => void {
    this.on(`document:${userId}`, callback)

    // Return unsubscribe function
    return () => {
      this.off(`document:${userId}`, callback)
    }
  }

  /**
   * Subscribe to all document events (admin)
   */
  onAllDocumentEvents(callback: (event: DocumentEvent) => void): () => void {
    this.on('document', callback)

    // Return unsubscribe function
    return () => {
      this.off('document', callback)
    }
  }
}

// Export singleton instance
export const documentEvents = new DocumentEventEmitter()
