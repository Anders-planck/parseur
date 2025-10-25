/**
 * useSSE Hook
 *
 * React hook for consuming Server-Sent Events (SSE)
 * Provides real-time updates for document status changes
 */

'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { logger } from '@/lib/utils/logger'
import { DocumentStatus, DocumentType } from '@prisma/client'

/**
 * Document event from SSE
 */
export interface DocumentSSEEvent {
  type:
    | 'connected'
    | 'document.created'
    | 'document.updated'
    | 'document.completed'
    | 'document.failed'
    | 'document.deleted'
    | 'document.processing'
  data?: {
    id: string
    status: DocumentStatus
    documentType?: DocumentType | null
    confidence?: number | null
    originalFilename: string
    createdAt: string
    completedAt?: string | null
  }
  timestamp: string
}

/**
 * SSE connection status
 */
export type SSEStatus = 'connecting' | 'connected' | 'disconnected' | 'error'

/**
 * useSSE hook options
 */
export interface UseSSEOptions {
  /**
   * Callback when an event is received
   */
  onEvent?: (event: DocumentSSEEvent) => void

  /**
   * Callback when connection status changes
   */
  onStatusChange?: (status: SSEStatus) => void

  /**
   * Auto-reconnect on disconnect
   */
  autoReconnect?: boolean

  /**
   * Reconnect delay in milliseconds
   */
  reconnectDelay?: number

  /**
   * Enable hook (can be used to conditionally enable SSE)
   */
  enabled?: boolean
}

/**
 * useSSE hook
 *
 * @param options - Hook options
 * @returns Connection status and latest event
 */
export function useSSE(options: UseSSEOptions = {}) {
  const {
    onEvent,
    onStatusChange,
    autoReconnect = true,
    reconnectDelay = 3000,
    enabled = true,
  } = options

  const [status, setStatus] = useState<SSEStatus>('disconnected')
  const [lastEvent, setLastEvent] = useState<DocumentSSEEvent | null>(null)
  const eventSourceRef = useRef<EventSource | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isUnmountedRef = useRef(false)
  const connectRef = useRef<() => void | null>(null)
  const disableTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  /**
   * Update status and notify callback
   */
  const updateStatus = useCallback(
    (newStatus: SSEStatus) => {
      setStatus(newStatus)
      onStatusChange?.(newStatus)
    },
    [onStatusChange]
  )
  /**
   * Connect to SSE endpoint
   */
  const connect = useCallback(() => {
    if (!enabled || isUnmountedRef.current) return

    // Close existing connection
    if (eventSourceRef.current) {
      eventSourceRef.current.close()
    }

    updateStatus('connecting')

    try {
      const eventSource = new EventSource('/api/events')
      eventSourceRef.current = eventSource

      // Handle connection open
      eventSource.onopen = () => {
        if (isUnmountedRef.current) return
        logger.info('SSE connection established')
        updateStatus('connected')

        // Clear any pending reconnect timeout
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current)
          reconnectTimeoutRef.current = null
        }
      }

      // Handle messages
      eventSource.onmessage = (event) => {
        if (isUnmountedRef.current) return

        try {
          const data: DocumentSSEEvent = JSON.parse(event.data)
          setLastEvent(data)
          onEvent?.(data)

          logger.debug({ type: data.type }, 'SSE event received')
        } catch (error) {
          logger.error({ error }, 'Failed to parse SSE event')
        }
      }

      // Handle errors
      eventSource.onerror = (error) => {
        if (isUnmountedRef.current) return

        logger.error({ error }, 'SSE connection error')
        updateStatus('error')

        // Close the connection
        eventSource.close()

        // Auto-reconnect if enabled
        if (autoReconnect && !isUnmountedRef.current) {
          logger.info({ reconnectDelay }, 'Reconnecting SSE in delay ms')
          reconnectTimeoutRef.current = setTimeout(() => {
            if (!isUnmountedRef.current) {
              connectRef.current?.()
            }
          }, reconnectDelay)
        } else {
          updateStatus('disconnected')
        }
      }
    } catch (error) {
      logger.error({ error }, 'Failed to create SSE connection')
      updateStatus('error')
    }
  }, [enabled, updateStatus, onEvent, autoReconnect, reconnectDelay])

  useEffect(() => {
    connectRef.current = connect
  }, [connect])

  /**
   * Disconnect from SSE endpoint
   */
  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
      reconnectTimeoutRef.current = null
    }

    if (eventSourceRef.current) {
      eventSourceRef.current.close()
      eventSourceRef.current = null
    }

    updateStatus('disconnected')
    logger.info('SSE connection closed')
  }, [updateStatus])
  /**
   * Setup and cleanup effect
   */
  useEffect(() => {
    if (!enabled) {
      // schedule disconnect asynchronously to avoid calling setState synchronously in the effect body
      disableTimeoutRef.current = setTimeout(() => {
        if (!isUnmountedRef.current) {
          disconnect()
        }
        if (disableTimeoutRef.current) {
          clearTimeout(disableTimeoutRef.current)
          disableTimeoutRef.current = null
        }
      }, 0)
      return
    }

    // schedule connect asynchronously to avoid calling setState synchronously in the effect body
    Promise.resolve().then(() => {
      if (!isUnmountedRef.current) {
        connect()
      }
    })
    
    return () => {
      // clear any pending scheduled disconnect
      if (disableTimeoutRef.current) {
        clearTimeout(disableTimeoutRef.current)
        disableTimeoutRef.current = null
      }

      isUnmountedRef.current = true
      disconnect()
    }
  }, [enabled, connect, disconnect])

  return {
    status,
    lastEvent,
    connect,
    disconnect,
    isConnected: status === 'connected',
    isConnecting: status === 'connecting',
    hasError: status === 'error',
  }
}
