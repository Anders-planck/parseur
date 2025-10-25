/**
 * LLM Utility Functions
 *
 * Helper utilities for LLM operations including provider selection,
 * retry logic, and error handling.
 */

import type { LLMProvider } from './types'
import { logger } from '@/lib/utils/logger'

/**
 * Select appropriate LLM provider based on MIME type
 *
 * OpenAI doesn't support PDFs, so we use Anthropic for PDFs.
 * For images, OpenAI is default (faster, cheaper for images).
 *
 * @param mimeType - Document MIME type
 * @param override - Optional tenant/config override
 * @returns Provider name
 */
export function selectProviderForMime(
  mimeType: string,
  override?: LLMProvider
): LLMProvider {
  // Respect explicit override (for tenant preferences)
  if (override) {
    return override
  }

  // PDFs require Anthropic (OpenAI doesn't support PDF input)
  if (mimeType === 'application/pdf') {
    return 'anthropic'
  }

  // Images default to OpenAI (faster, cheaper)
  return 'openai'
}

/**
 * Retry configuration options
 */
export interface RetryOptions {
  /** Maximum number of attempts (default: 3) */
  attempts?: number
  /** Initial delay in milliseconds (default: 200) */
  initialDelayMs?: number
  /** Maximum delay in milliseconds (default: 5000) */
  maxDelayMs?: number
  /** Jitter factor 0-1 (default: 0.2 = 20%) */
  jitter?: number
  /** Custom function to determine if error is retryable */
  isRetryable?: (err: unknown) => boolean
}

/**
 * Default retry configuration
 */
const DEFAULT_RETRY_OPTIONS: Required<RetryOptions> = {
  attempts: 3,
  initialDelayMs: 200,
  maxDelayMs: 5000,
  jitter: 0.2,
  isRetryable: (err: unknown): boolean => {
    const msg =
      err instanceof Error && err.message
        ? err.message.toLowerCase()
        : String(err).toLowerCase()

    // Retry on rate limits, timeouts, 5xx errors, network errors
    // Do NOT retry on 4xx client errors (except 429 rate limit)
    return /rate limit|429|timeout|5\d{2}|server error|network|econnreset|etimedout/i.test(
      msg
    )
  },
}

/**
 * Execute function with exponential backoff retry logic
 *
 * Implements jittered exponential backoff to handle transient LLM API errors.
 * Only retries on retryable errors (rate limits, timeouts, 5xx).
 *
 * @param fn - Async function to execute
 * @param options - Retry configuration
 * @returns Result of successful function execution
 * @throws Last error if all retries exhausted
 */
export async function callWithRetries<T>(
  fn: () => Promise<T>,
  options?: RetryOptions
): Promise<T> {
  const opts = { ...DEFAULT_RETRY_OPTIONS, ...options }

  let lastErr: unknown

  for (let attempt = 0; attempt < opts.attempts; attempt++) {
    try {
      const result = await fn()

      // Log successful retry
      if (attempt > 0) {
        logger.info(
          { attempt: attempt + 1, totalAttempts: opts.attempts },
          'LLM call succeeded after retry'
        )
      }

      return result
    } catch (err) {
      lastErr = err

      // Check if we should retry
      const shouldRetry = opts.isRetryable(err) && attempt < opts.attempts - 1

      if (!shouldRetry) {
        // Last attempt or non-retryable error
        if (attempt === opts.attempts - 1) {
          logger.error(
            {
              error: err instanceof Error ? err.message : String(err),
              attempts: attempt + 1,
            },
            'LLM call failed after all retry attempts'
          )
        } else {
          logger.error(
            {
              error: err instanceof Error ? err.message : String(err),
              reason: 'non-retryable error',
            },
            'LLM call failed with non-retryable error'
          )
        }
        break
      }

      // Calculate exponential backoff with jitter
      const exponentialDelay = Math.min(
        opts.maxDelayMs,
        opts.initialDelayMs * Math.pow(2, attempt)
      )

      // Add random jitter (±jitter%)
      const jitterMs = Math.floor(exponentialDelay * opts.jitter)
      const jitterDirection = Math.random() < 0.5 ? -1 : 1
      const delayMs = Math.max(
        0,
        exponentialDelay + jitterDirection * jitterMs * Math.random()
      )

      logger.warn(
        {
          attempt: attempt + 1,
          totalAttempts: opts.attempts,
          delayMs,
          error: err instanceof Error ? err.message : String(err),
        },
        'LLM call failed, retrying with backoff'
      )

      // Wait before retry
      await new Promise((resolve) => setTimeout(resolve, delayMs))
    }
  }

  // All retries exhausted
  throw lastErr
}

/**
 * Check if error is a rate limit error
 *
 * @param err - Error to check
 * @returns True if rate limit error
 */
export function isRateLimitError(err: unknown): boolean {
  const msg =
    err instanceof Error && err.message
      ? err.message.toLowerCase()
      : String(err).toLowerCase()

  return /rate limit|429|quota exceeded|too many requests/i.test(msg)
}

/**
 * Check if error is a timeout error
 *
 * @param err - Error to check
 * @returns True if timeout error
 */
export function isTimeoutError(err: unknown): boolean {
  const msg =
    err instanceof Error && err.message
      ? err.message.toLowerCase()
      : String(err).toLowerCase()

  return /timeout|timed out|etimedout|deadline exceeded/i.test(msg)
}

/**
 * Check if error is a server error (5xx)
 *
 * @param err - Error to check
 * @returns True if server error
 */
export function isServerError(err: unknown): boolean {
  const msg =
    err instanceof Error && err.message
      ? err.message.toLowerCase()
      : String(err).toLowerCase()

  return /5\d{2}|server error|internal error|service unavailable|bad gateway/i.test(
    msg
  )
}
