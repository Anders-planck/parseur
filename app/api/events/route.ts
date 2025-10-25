/**
 * Server-Sent Events (SSE) Endpoint
 *
 * Provides real-time updates for document status changes
 */

import { NextRequest } from 'next/server'
import { getSessionOrThrow } from '@/lib/auth/middleware'
import { documentEvents, DocumentEvent } from '@/lib/events/emitter'
import { logger } from '@/lib/utils/logger'

/**
 * SSE endpoint - GET only
 */
export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const session = await getSessionOrThrow()
    const userId = session.user.id

    logger.info({ userId }, 'SSE connection established')

    // Create readable stream for SSE
    const encoder = new TextEncoder()
    let closed = false

    const stream = new ReadableStream({
      start(controller) {
        // Send initial connection message
        const initialMessage = `data: ${JSON.stringify({
          type: 'connected',
          timestamp: new Date().toISOString(),
        })}\n\n`
        controller.enqueue(encoder.encode(initialMessage))

        // Subscribe to document events for this user
        const unsubscribe = documentEvents.onDocumentEvent(userId, (event: DocumentEvent) => {
          if (closed) return

          try {
            // Format SSE message
            const message = `data: ${JSON.stringify({
              type: event.type,
              data: {
                ...event.data,
                // Convert dates to ISO strings for JSON serialization
                createdAt: event.data.createdAt.toISOString(),
                completedAt: event.data.completedAt?.toISOString(),
              },
              timestamp: event.timestamp.toISOString(),
            })}\n\n`

            controller.enqueue(encoder.encode(message))

            logger.debug(
              { userId, eventType: event.type, documentId: event.data.id },
              'SSE event sent'
            )
          } catch (error) {
            logger.error({ error, userId }, 'Failed to send SSE event')
          }
        })

        // Send heartbeat every 30 seconds to keep connection alive
        const heartbeat = setInterval(() => {
          if (closed) {
            clearInterval(heartbeat)
            return
          }

          try {
            controller.enqueue(encoder.encode(': heartbeat\n\n'))
          } catch (error) {
            logger.error({ error, userId }, 'Failed to send heartbeat')
            clearInterval(heartbeat)
          }
        }, 30000)

        // Cleanup on close
        request.signal.addEventListener('abort', () => {
          closed = true
          clearInterval(heartbeat)
          unsubscribe()
          controller.close()
          logger.info({ userId }, 'SSE connection closed')
        })
      },
    })

    // Return SSE response
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no', // Disable nginx buffering
      },
    })
  } catch (error) {
    logger.error({ error }, 'SSE connection failed')
    return new Response('Unauthorized', { status: 401 })
  }
}

/**
 * Disable body parser for SSE
 */
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
