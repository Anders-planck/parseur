/**
 * Base LLM Service
 *
 * Abstract base class for all LLM providers
 * Defines the interface that all LLM services must implement
 */

import type {
  LLMProvider,
  LLMModel,
  ClassificationRequest,
  ClassificationResult,
  ExtractionRequest,
  ExtractionResult,
  ValidationRequest,
  ValidationResult,
  CorrectionRequest,
  CorrectionResult,
  LLMMessage,
  LLMResponseMetadata,
} from './types'
import { logger } from '@/lib/utils/logger'
import { LLMError } from '@/lib/utils/errors'
import { callWithRetries, type RetryOptions } from './utils'

/**
 * Abstract base LLM service
 *
 * All LLM providers must extend this class and implement its abstract methods
 */
export abstract class BaseLLMService {
  /**
   * Provider name (openai, anthropic, etc.)
   */
  protected abstract provider: LLMProvider

  /**
   * Model configuration
   */
  protected abstract model: LLMModel

  /**
   * Classify document type from image
   *
   * @param request - Classification request with image
   * @returns Classification result with document type and confidence
   */
  abstract classify(request: ClassificationRequest): Promise<ClassificationResult>

  /**
   * Extract structured data from document image
   *
   * @param request - Extraction request with image and schema
   * @returns Extraction result with structured data
   */
  abstract extract(request: ExtractionRequest): Promise<ExtractionResult>

  /**
   * Validate extracted data
   *
   * @param request - Validation request with extracted data
   * @returns Validation result with issues and corrections
   */
  abstract validate(request: ValidationRequest): Promise<ValidationResult>

  /**
   * Auto-correct validation issues
   *
   * @param request - Correction request with validation issues
   * @returns Correction result with fixed data
   */
  abstract correct(request: CorrectionRequest): Promise<CorrectionResult>

  /**
   * Send raw chat completion request
   *
   * @param messages - Array of messages
   * @param options - Optional parameters
   * @returns Response with content and metadata
   */
  protected abstract chatCompletion(
    messages: LLMMessage[],
    options?: {
      maxTokens?: number
      temperature?: number
      responseFormat?: 'text' | 'json'
    }
  ): Promise<{
    content: string
    metadata: LLMResponseMetadata
  }>

  /**
   * Send chat completion request with retry logic
   *
   * Wraps chatCompletion with exponential backoff retry for transient errors.
   * Use this method in all concrete implementations instead of calling APIs directly.
   *
   * @param messages - Array of messages
   * @param options - Optional parameters
   * @param retryOptions - Retry configuration (optional)
   * @returns Response with content and metadata
   */
  protected async chatCompletionWithRetry(
    messages: LLMMessage[],
    options?: {
      maxTokens?: number
      temperature?: number
      responseFormat?: 'text' | 'json'
    },
    retryOptions?: RetryOptions
  ): Promise<{
    content: string
    metadata: LLMResponseMetadata
  }> {
    return callWithRetries(
      () => this.chatCompletion(messages, options),
      retryOptions
    )
  }

  /**
   * Convert image buffer to base64 data URL
   *
   * @param buffer - Image buffer
   * @param mimeType - Image MIME type
   * @returns Base64 data URL
   */
  protected imageToDataUrl(buffer: Buffer, mimeType: string): string {
    const base64 = buffer.toString('base64')
    return `data:${mimeType};base64,${base64}`
  }

  /**
   * Calculate estimated cost for LLM usage
   *
   * @param inputTokens - Number of input tokens
   * @param outputTokens - Number of output tokens
   * @returns Estimated cost in USD
   */
  protected calculateCost(inputTokens: number, outputTokens: number): number {
    const inputCost = (inputTokens / 1000) * this.model.costPer1kInputTokens
    const outputCost = (outputTokens / 1000) * this.model.costPer1kOutputTokens
    return inputCost + outputCost
  }

  /**
   * Parse JSON response safely
   *
   * @param content - Raw response content
   * @returns Parsed JSON object
   * @throws LLMError if JSON is invalid
   */
  protected parseJsonResponse(content: string): Record<string, unknown> {
    try {
      // Try to find JSON in markdown code blocks first
      const jsonMatch = content.match(/```(?:json)?\n?([\s\S]+?)\n?```/)
      const jsonString = jsonMatch ? jsonMatch[1] : content

      return JSON.parse(jsonString.trim())
    } catch (error) {
      logger.error({ error, content }, 'Failed to parse LLM JSON response')
      throw new LLMError(
        'Failed to parse LLM response as JSON',
        this.provider,
        { content }
      )
    }
  }

  /**
   * Handle LLM errors and convert to application errors
   *
   * @param error - Raw error from LLM provider
   * @param context - Additional context
   * @throws LLMError with provider-specific details
   */
  protected handleError(error: unknown, context?: Record<string, unknown>): never {
    logger.error(
      { error, provider: this.provider, context },
      'LLM operation failed'
    )

    if (error instanceof Error) {
      throw new LLMError(
        `LLM ${this.provider} error: ${error.message}`,
        this.provider,
        {
          originalError: error.message,
          ...context,
        }
      )
    }

    throw new LLMError(
      `LLM ${this.provider} error: Unknown error`,
      this.provider,
      context
    )
  }

  /**
   * Log LLM operation metrics
   *
   * @param operation - Operation name
   * @param metadata - Response metadata with usage stats
   */
  protected logMetrics(operation: string, metadata: LLMResponseMetadata): void {
    logger.info(
      {
        operation,
        provider: this.provider,
        model: metadata.model,
        inputTokens: metadata.usage.inputTokens,
        outputTokens: metadata.usage.outputTokens,
        totalTokens: metadata.usage.totalTokens,
        estimatedCost: metadata.usage.estimatedCost,
        processingTimeMs: metadata.processingTimeMs,
      },
      'LLM operation completed'
    )
  }

  /**
   * Get provider name
   */
  getProvider(): LLMProvider {
    return this.provider
  }

  /**
   * Get model configuration
   */
  getModel(): LLMModel {
    return this.model
  }
}
