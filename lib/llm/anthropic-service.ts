/**
 * Anthropic LLM Service
 *
 * Implementation of LLM service using Anthropic's Claude with vision
 */

import Anthropic from '@anthropic-ai/sdk'
import { config } from '@/lib/config'
import { BaseLLMService } from './base-service'
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
  MessageContent,
} from './types'
import { DocumentType } from '@prisma/client'
import { logger } from '@/lib/utils/logger'

/**
 * Anthropic Service Implementation
 */
export class AnthropicService extends BaseLLMService {
  protected provider: LLMProvider = 'anthropic'

  protected model: LLMModel = {
    provider: 'anthropic',
    model: config.anthropic.model,
    supportsVision: true,
    maxTokens: 4096,
    costPer1kInputTokens: 0.003, // Claude 3.5 Sonnet pricing (as of 2024)
    costPer1kOutputTokens: 0.015,
  }

  private client: Anthropic

  constructor() {
    super()
    this.client = new Anthropic({
      apiKey: config.anthropic.apiKey,
    })
  }

  /**
   * Classify document type from image
   */
  async classify(request: ClassificationRequest): Promise<ClassificationResult> {
    const startTime = Date.now()

    try {
      const prompt =
        request.promptTemplate ||
        `Analyze this document image and classify it into one of these categories:
- INVOICE: Commercial invoice for goods or services
- RECEIPT: Payment receipt (shopping, restaurant, etc.)
- PAYSLIP: Employee salary/wage statement
- BANK_STATEMENT: Bank account statement
- TAX_FORM: Tax-related document
- CONTRACT: Legal agreement or contract
- OTHER: Any other document type

Return your response as a JSON object with this exact structure:
{
  "documentType": "INVOICE" | "RECEIPT" | "PAYSLIP" | "BANK_STATEMENT" | "TAX_FORM" | "CONTRACT" | "OTHER",
  "confidence": 0.0 to 1.0,
  "reasoning": "explanation of classification"
}`.trim()

      // Determine if we're dealing with a PDF or an image
      const isPDF = request.mimeType === 'application/pdf'

      // Build content blocks based on file type
      const contentBlocks: Array<
        | {
            type: 'image'
            source: {
              type: 'base64'
              media_type: 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif'
              data: string
            }
          }
        | {
            type: 'document'
            source: {
              type: 'base64'
              media_type: 'application/pdf'
              data: string
            }
          }
        | {
            type: 'text'
            text: string
          }
      > = []

      if (isPDF) {
        contentBlocks.push({
          type: 'document',
          source: {
            type: 'base64',
            media_type: 'application/pdf',
            data: request.image.toString('base64'),
          },
        })
      } else {
        contentBlocks.push({
          type: 'image',
          source: {
            type: 'base64',
            media_type: request.mimeType as 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif',
            data: request.image.toString('base64'),
          },
        })
      }

      contentBlocks.push({
        type: 'text',
        text: prompt,
      })

      const response = await this.client.messages.create({
        model: this.model.model,
        max_tokens: 1000,
        temperature: 0.1, // Low temperature for consistent classification
        system: 'You are a document classification expert. Analyze documents and classify them accurately. Always return valid JSON.',
        messages: [
          {
            role: 'user',
            content: contentBlocks,
          },
        ],
      })

      // Extract text content from response
      const textContent = response.content.find((block) => block.type === 'text')
      if (!textContent || textContent.type !== 'text') {
        throw new Error('No text content in Anthropic response')
      }

      const parsed = this.parseJsonResponse(textContent.text)
      const processingTimeMs = Date.now() - startTime

      const metadata: LLMResponseMetadata = {
        requestId: response.id,
        model: response.model,
        provider: this.provider,
        usage: {
          inputTokens: response.usage.input_tokens,
          outputTokens: response.usage.output_tokens,
          totalTokens: response.usage.input_tokens + response.usage.output_tokens,
          estimatedCost: this.calculateCost(response.usage.input_tokens, response.usage.output_tokens),
        },
        processingTimeMs,
        finishReason: response.stop_reason ?? undefined,
      }

      this.logMetrics('classify', metadata)

      return {
        documentType: parsed.documentType as DocumentType,
        confidence: parsed.confidence as number,
        reasoning: parsed.reasoning as string,
        model: response.model,
        provider: this.provider,
        tokensUsed: response.usage.input_tokens + response.usage.output_tokens,
        processingTimeMs,
      }
    } catch (error) {
      return this.handleAnthropicError(error, { operation: 'classify' })
    }
  }

  /**
   * Extract structured data from document
   */
  async extract(request: ExtractionRequest): Promise<ExtractionResult> {
    const startTime = Date.now()

    try {
      const prompt =
        request.promptTemplate ||
        `Extract all relevant structured data from this ${request.documentType} document.

Extract fields such as:
- Document number/ID
- Date(s)
- Amounts and currency
- Party names (issuer, recipient, etc.)
- Line items (if applicable)
- Any other relevant fields

Return the extracted data as a JSON object with field names as keys and extracted values.
For each field that requires a confidence score, nest it as { "value": extractedValue, "confidence": 0.0-1.0 }.`.trim()

      // Determine if we're dealing with a PDF or an image
      const isPDF = request.mimeType === 'application/pdf'

      // Build content blocks based on file type
      const contentBlocks: Array<
        | {
            type: 'image'
            source: {
              type: 'base64'
              media_type: 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif'
              data: string
            }
          }
        | {
            type: 'document'
            source: {
              type: 'base64'
              media_type: 'application/pdf'
              data: string
            }
          }
        | {
            type: 'text'
            text: string
          }
      > = []

      if (isPDF) {
        contentBlocks.push({
          type: 'document',
          source: {
            type: 'base64',
            media_type: 'application/pdf',
            data: request.image.toString('base64'),
          },
        })
      } else {
        contentBlocks.push({
          type: 'image',
          source: {
            type: 'base64',
            media_type: request.mimeType as 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif',
            data: request.image.toString('base64'),
          },
        })
      }

      contentBlocks.push({
        type: 'text',
        text: prompt,
      })

      const response = await this.client.messages.create({
        model: this.model.model,
        max_tokens: 2000,
        temperature: 0.2, // Low temperature for accurate extraction
        system: 'You are a data extraction expert. Extract structured data from documents accurately. Always return valid JSON.',
        messages: [
          {
            role: 'user',
            content: contentBlocks,
          },
        ],
      })

      const textContent = response.content.find((block) => block.type === 'text')
      if (!textContent || textContent.type !== 'text') {
        throw new Error('No text content in Anthropic response')
      }

      const extractedData = this.parseJsonResponse(textContent.text)
      const processingTimeMs = Date.now() - startTime

      const metadata: LLMResponseMetadata = {
        requestId: response.id,
        model: response.model,
        provider: this.provider,
        usage: {
          inputTokens: response.usage.input_tokens,
          outputTokens: response.usage.output_tokens,
          totalTokens: response.usage.input_tokens + response.usage.output_tokens,
          estimatedCost: this.calculateCost(response.usage.input_tokens, response.usage.output_tokens),
        },
        processingTimeMs,
        finishReason: response.stop_reason ?? undefined,
      }

      this.logMetrics('extract', metadata)

      // Convert to field format
      const fields = Object.entries(extractedData).map(([name, value]) => ({
        name,
        value,
        confidence:
          typeof value === 'object' && value !== null && 'confidence' in value
            ? (value as { confidence: number }).confidence
            : 0.9,
      }))

      return {
        fields,
        rawData: extractedData,
        confidence: fields.reduce((sum, f) => sum + f.confidence, 0) / fields.length,
        model: response.model,
        provider: this.provider,
        tokensUsed: response.usage.input_tokens + response.usage.output_tokens,
        processingTimeMs,
      }
    } catch (error) {
      return this.handleAnthropicError(error, { operation: 'extract' })
    }
  }

  /**
   * Validate extracted data
   */
  async validate(request: ValidationRequest): Promise<ValidationResult> {
    const startTime = Date.now()

    try {
      const prompt =
        request.promptTemplate ||
        `Validate this extracted data from a ${request.documentType} document:

${JSON.stringify(request.extractedData, null, 2)}

${request.image ? `
CRITICAL: You have access to the original document image. Use it to:
- Cross-reference extracted fields with what you see in the image
- Verify that values like totals, dates, and amounts are present and readable in their expected positions
- Check if extracted text matches the visible text in the document
- Identify any discrepancies between extracted data and visual content
- Confirm currency symbols, decimal separators, and number formats match the document
` : ''}

Check for:
- Missing required fields
- Invalid formats (dates, amounts, etc.)
- Inconsistencies
- Logical errors
${request.image ? '- Visual discrepancies between extracted data and document content' : ''}

Return a JSON object with this structure:
{
  "isValid": true | false,
  "issues": [
    {
      "field": "fieldName",
      "issue": "description of the issue",
      "severity": "error" | "warning" | "info",
      "suggestedFix": "suggested correction (optional)"
    }
  ],
  "correctedData": { ... } (optional, if corrections can be suggested),
  "confidence": 0.0-1.0
}`.trim()

      // Build content blocks for multimodal input (image/document + text)
      const contentBlocks: Array<
        | { type: 'text'; text: string }
        | {
            type: 'image'
            source: {
              type: 'base64'
              media_type: 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif'
              data: string
            }
          }
        | {
            type: 'document'
            source: {
              type: 'base64'
              media_type: 'application/pdf'
              data: string
            }
          }
      > = []

      // Add image/document first if provided (for visual cross-reference)
      if (request.image && request.mimeType) {
        const isPDF = request.mimeType === 'application/pdf'

        if (isPDF) {
          contentBlocks.push({
            type: 'document',
            source: {
              type: 'base64',
              media_type: 'application/pdf',
              data: request.image.toString('base64'),
            },
          })
        } else {
          contentBlocks.push({
            type: 'image',
            source: {
              type: 'base64',
              media_type: request.mimeType as 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif',
              data: request.image.toString('base64'),
            },
          })
        }
      }

      // Add text prompt
      contentBlocks.push({
        type: 'text',
        text: prompt,
      })

      const response = await this.client.messages.create({
        model: this.model.model,
        max_tokens: 1500,
        temperature: 0.1,
        system: 'You are a data validation expert. Validate extracted document data thoroughly. Always return valid JSON.',
        messages: [
          {
            role: 'user',
            content: contentBlocks,
          },
        ],
      })

      const textContent = response.content.find((block) => block.type === 'text')
      if (!textContent || textContent.type !== 'text') {
        throw new Error('No text content in Anthropic response')
      }

      const parsed = this.parseJsonResponse(textContent.text)
      const processingTimeMs = Date.now() - startTime

      const metadata: LLMResponseMetadata = {
        requestId: response.id,
        model: response.model,
        provider: this.provider,
        usage: {
          inputTokens: response.usage.input_tokens,
          outputTokens: response.usage.output_tokens,
          totalTokens: response.usage.input_tokens + response.usage.output_tokens,
          estimatedCost: this.calculateCost(response.usage.input_tokens, response.usage.output_tokens),
        },
        processingTimeMs,
        finishReason: response.stop_reason ?? undefined,
      }

      this.logMetrics('validate', metadata)

      return {
        isValid: parsed.isValid as boolean,
        issues: parsed.issues as ValidationResult['issues'],
        correctedData: parsed.correctedData as Record<string, unknown> | undefined,
        confidence: parsed.confidence as number,
        model: response.model,
        provider: this.provider,
        tokensUsed: response.usage.input_tokens + response.usage.output_tokens,
        processingTimeMs,
      }
    } catch (error) {
      return this.handleAnthropicError(error, { operation: 'validate' })
    }
  }

  /**
   * Auto-correct validation issues
   */
  async correct(request: CorrectionRequest): Promise<CorrectionResult> {
    const startTime = Date.now()

    try {
      const prompt =
        request.promptTemplate ||
        `Correct the following data extracted from a ${request.documentType} document.

Original data:
${JSON.stringify(request.extractedData, null, 2)}

Issues found:
${request.validationIssues.map((issue) => `- ${issue.field}: ${issue.issue}`).join('\n')}

Return a JSON object with this structure:
{
  "correctedData": { ... },
  "changes": [
    {
      "field": "fieldName",
      "oldValue": ...,
      "newValue": ...,
      "reasoning": "explanation"
    }
  ],
  "confidence": 0.0-1.0
}`.trim()

      // Build messages array based on whether image/document is provided
      const contentBlocks: Array<
        | { type: 'text'; text: string }
        | {
            type: 'image'
            source: {
              type: 'base64'
              media_type: 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif'
              data: string
            }
          }
        | {
            type: 'document'
            source: {
              type: 'base64'
              media_type: 'application/pdf'
              data: string
            }
          }
      > = []

      // If image/document provided, add it first for reference
      if (request.image && request.mimeType) {
        const isPDF = request.mimeType === 'application/pdf'

        if (isPDF) {
          contentBlocks.push({
            type: 'document',
            source: {
              type: 'base64',
              media_type: 'application/pdf',
              data: request.image.toString('base64'),
            },
          })
        } else {
          contentBlocks.push({
            type: 'image',
            source: {
              type: 'base64',
              media_type: request.mimeType as 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif',
              data: request.image.toString('base64'),
            },
          })
        }
      }

      contentBlocks.push({
        type: 'text',
        text: prompt,
      })

      const response = await this.client.messages.create({
        model: this.model.model,
        max_tokens: 2000,
        temperature: 0.2,
        system: 'You are a data correction expert. Fix data extraction errors accurately. Always return valid JSON.',
        messages: [
          {
            role: 'user',
            content: contentBlocks,
          },
        ],
      })

      const textContent = response.content.find((block) => block.type === 'text')
      if (!textContent || textContent.type !== 'text') {
        throw new Error('No text content in Anthropic response')
      }

      const parsed = this.parseJsonResponse(textContent.text)
      const processingTimeMs = Date.now() - startTime

      const metadata: LLMResponseMetadata = {
        requestId: response.id,
        model: response.model,
        provider: this.provider,
        usage: {
          inputTokens: response.usage.input_tokens,
          outputTokens: response.usage.output_tokens,
          totalTokens: response.usage.input_tokens + response.usage.output_tokens,
          estimatedCost: this.calculateCost(response.usage.input_tokens, response.usage.output_tokens),
        },
        processingTimeMs,
        finishReason: response.stop_reason ?? undefined,
      }

      this.logMetrics('correct', metadata)

      return {
        correctedData: parsed.correctedData as Record<string, unknown>,
        changes: parsed.changes as CorrectionResult['changes'],
        confidence: parsed.confidence as number,
        model: response.model,
        provider: this.provider,
        tokensUsed: response.usage.input_tokens + response.usage.output_tokens,
        processingTimeMs,
      }
    } catch (error) {
      return this.handleAnthropicError(error, { operation: 'correct' })
    }
  }

  /**
   * Send raw chat completion request (internal method)
   */
  protected async chatCompletion(
    messages: LLMMessage[],
    options?: {
      maxTokens?: number
      temperature?: number
      responseFormat?: 'text' | 'json'
    }
  ): Promise<{
    content: string
    metadata: LLMResponseMetadata
  }> {
    const startTime = Date.now()

    try {
      const systemMessage =
        options?.responseFormat === 'json'
          ? 'You are a helpful assistant. Always return valid JSON.'
          : 'You are a helpful assistant.'

      const response = await this.client.messages.create({
        model: this.model.model,
        max_tokens: options?.maxTokens || 1000,
        temperature: options?.temperature ?? 0.7,
        system: systemMessage,
        messages: this.convertMessages(messages),
      })

      const textContent = response.content.find((block) => block.type === 'text')
      const content = textContent && textContent.type === 'text' ? textContent.text : ''

      const processingTimeMs = Date.now() - startTime

      const metadata: LLMResponseMetadata = {
        requestId: response.id,
        model: response.model,
        provider: this.provider,
        usage: {
          inputTokens: response.usage.input_tokens,
          outputTokens: response.usage.output_tokens,
          totalTokens: response.usage.input_tokens + response.usage.output_tokens,
          estimatedCost: this.calculateCost(response.usage.input_tokens, response.usage.output_tokens),
        },
        processingTimeMs,
        finishReason: response.stop_reason ?? undefined,
      }

      return { content, metadata }
    } catch (error) {
      return this.handleAnthropicError(error, { operation: 'chatCompletion' })
    }
  }

  /**
   * Convert internal message format to Anthropic format
   */
  private convertMessages(
    messages: LLMMessage[]
  ): Array<{
    role: 'user' | 'assistant'
    content:
      | string
      | Array<
          | { type: 'text'; text: string }
          | {
              type: 'image'
              source: {
                type: 'base64'
                media_type: 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif'
                data: string
              }
            }
        >
  }> {
    return messages.map((msg) => {
      if (typeof msg.content === 'string') {
        return {
          role: msg.role === 'system' ? 'user' : (msg.role as 'user' | 'assistant'),
          content: msg.role === 'system' ? `[System]: ${msg.content}` : msg.content,
        }
      }

      // Handle multi-modal content (text + images)
      const content = msg.content.map((item: MessageContent) => {
        if (item.type === 'text') {
          return { type: 'text' as const, text: item.text }
        } else {
          return {
            type: 'image' as const,
            source: {
              type: 'base64' as const,
              media_type: item.mimeType as 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif',
              data: item.data.toString('base64'),
            },
          }
        }
      })

      return {
        role: msg.role === 'system' ? 'user' : (msg.role as 'user' | 'assistant'),
        content,
      }
    })
  }

  /**
   * Handle Anthropic-specific errors
   */
  private handleAnthropicError(error: unknown, context?: Record<string, unknown>): never {
    if (error instanceof Anthropic.APIError) {
      logger.error(
        {
          status: error.status,
          name: error.name,
          message: error.message,
          headers: error.headers,
          context,
        },
        'Anthropic API error'
      )

      // Handle specific error types based on status code
      if (error.status === 429) {
        // Rate limit error
        const retryAfter = error.headers?.['retry-after']
        throw this.handleError(error, {
          ...context,
          retryAfter,
          suggestion: 'Rate limit exceeded. Please retry after delay.',
        })
      } else if (error.status === 401) {
        // Authentication error
        throw this.handleError(error, {
          ...context,
          suggestion: 'Invalid API key. Check ANTHROPIC_API_KEY environment variable.',
        })
      } else if (error.status === 500 || error.status === 529) {
        // Server error or overloaded
        throw this.handleError(error, {
          ...context,
          suggestion: 'Anthropic API is experiencing issues. Please retry later.',
        })
      }
    }

    return this.handleError(error, context)
  }
}

/**
 * Export singleton instance
 */
export const anthropicService = new AnthropicService()
