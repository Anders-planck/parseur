import pino, { Logger, LoggerOptions } from 'pino'

/**
 * Structured logging with pino
 * Provides consistent logging across the application
 *
 * This implementation avoids worker thread issues in Next.js/Turbopack by:
 * - Using try-catch around transport creation
 * - Providing a safe fallback logger
 * - Only using pino-pretty in development (not in production/SSR)
 */

const isDev = process.env.NODE_ENV === 'development'

/**
 * Safe fallback logger (no fancy transports)
 * Used when pino-pretty transport fails or in production
 */
function createFallbackLogger(): Logger {
  return pino({
    level: process.env.LOG_LEVEL || (isDev ? 'debug' : 'info'),
    formatters: {
      level: (label) => ({ level: label }),
    },
    timestamp: pino.stdTimeFunctions.isoTime,
  })
}

/**
 * Create logger with optional pretty transport
 * Gracefully falls back if transport creation fails
 */
export function makeLogger(): Logger {
  const baseOpts: LoggerOptions = {
    level: process.env.LOG_LEVEL || (isDev ? 'debug' : 'info'),
    formatters: {
      level: (label) => ({ level: label }),
    },
    timestamp: pino.stdTimeFunctions.isoTime,
  }

  // Only attach pretty transport in dev, not in production SSR
  if (isDev) {
    try {
      return pino({
        ...baseOpts,
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
            singleLine: false,
          },
        },
      })
    } catch (err: unknown) {
      console.error('Failed to use pino-pretty transport, falling back to base logger:', err)
      return createFallbackLogger()
    }
  } else {
    // Production mode: no fancy transport, use core pino (plain JSON)
    return pino(baseOpts)
  }
}

// Export singleton instance
export const logger = makeLogger()

/**
 * Log levels:
 * - trace: Very detailed, debugging-level information
 * - debug: Detailed information for debugging
 * - info: General informational messages
 * - warn: Warning messages for potentially harmful situations
 * - error: Error messages for error events
 * - fatal: Very severe error events that might cause application termination
 */

/**
 * Usage examples:
 *
 * logger.info({ userId, documentId }, 'Document uploaded successfully')
 * logger.error({ error, documentId }, 'Failed to process document')
 * logger.warn({ fileSize, maxSize }, 'File size exceeds recommended limit')
 * logger.debug({ query, results }, 'Database query executed')
 */

export default logger
