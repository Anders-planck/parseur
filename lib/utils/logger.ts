import pino from 'pino'

/**
 * Structured logging with pino
 * Provides consistent logging across the application
 */

const isDevelopment = process.env.NODE_ENV === 'development'

export const logger = pino({
  level: process.env.LOG_LEVEL || (isDevelopment ? 'debug' : 'info'),
  transport: isDevelopment
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
          singleLine: false,
        },
      }
    : undefined,
  formatters: {
    level: (label) => {
      return { level: label }
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
})

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
