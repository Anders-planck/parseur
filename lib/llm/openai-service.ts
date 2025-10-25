/**
 * OpenAI LLM Service
 *
 * Implementation of LLM service using OpenAI's GPT-4o with vision
 */

import OpenAI from 'openai'
import type { ChatCompletionMessageParam, ChatCompletionContentPart } from 'openai/resources/chat/completions'
import { zodResponseFormat } from 'openai/helpers/zod'
import { z } from 'zod/v3'
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
 * OpenAI Service Implementation
 */
export class OpenAIService extends BaseLLMService {
  protected provider: LLMProvider = 'openai'

  protected model: LLMModel = {
    provider: 'openai',
    model: config.openai.model,
    supportsVision: true,
    maxTokens: 4096,
    costPer1kInputTokens: 0.0025, // GPT-4o pricing (as of 2024)
    costPer1kOutputTokens: 0.01,
  }

  private client: OpenAI

  constructor() {
    super()
    this.client = new OpenAI({
      apiKey: config.openai.apiKey,
    })
  }

  /**
   * Classify document type from image
   */
  async classify(request: ClassificationRequest): Promise<ClassificationResult> {
    const startTime = Date.now()

    try {
      // Define Zod schema for structured output
      const ClassificationSchema = z.object({
        documentType: z.enum([
          'INVOICE',
          'RECEIPT',
          'PAYSLIP',
          'BANK_STATEMENT',
          'TAX_FORM',
          'CONTRACT',
          'OTHER',
        ]),
        confidence: z.number().min(0).max(1),
        reasoning: z.string(),
      }) satisfies z.ZodType

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

Provide your confidence level (0-1) and reasoning.`.trim()

      // Use structured output with Zod for type-safe parsing
      const completion = await this.client.chat.completions.parse({
        model: this.model.model,
        messages: [
          {
            role: 'system',
            content:
              'You are a document classification expert. Analyze documents and classify them accurately.',
          },
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              {
                type: 'image_url',
                image_url: {
                  url: this.imageToDataUrl(request.image, request.mimeType),
                },
              },
            ],
          },
        ],
        response_format: zodResponseFormat(ClassificationSchema, 'classification'),
        max_tokens: 1000,
        temperature: 0.1, // Low temperature for consistent classification
      })

      const parsed = completion.choices[0]?.message.parsed
      if (!parsed) {
        throw new Error('No parsed response from OpenAI')
      }

      const processingTimeMs = Date.now() - startTime
      const usage = completion.usage || { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 }

      const metadata: LLMResponseMetadata = {
        requestId: completion.id,
        model: completion.model,
        provider: this.provider,
        usage: {
          inputTokens: usage.prompt_tokens,
          outputTokens: usage.completion_tokens,
          totalTokens: usage.total_tokens,
          estimatedCost: this.calculateCost(usage.prompt_tokens, usage.completion_tokens),
        },
        processingTimeMs,
        finishReason: completion.choices[0]?.finish_reason,
      }

      this.logMetrics('classify', metadata)

      return {
        documentType: parsed.documentType as DocumentType,
        confidence: parsed.confidence,
        reasoning: parsed.reasoning,
        model: completion.model,
        provider: this.provider,
        tokensUsed: usage.total_tokens,
        processingTimeMs,
      }
    } catch (error) {
      return this.handleOpenAIError(error, { operation: 'classify' })
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

Return the extracted data as JSON with field names as keys and extracted values.
For each field, include a confidence score (0-1).`.trim()

      // Use JSON mode for flexible extraction
      const completion = await this.client.chat.completions.create({
        model: this.model.model,
        messages: [
          {
            role: 'system',
            content: 'You are a data extraction expert. Extract structured data from documents accurately.',
          },
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              {
                type: 'image_url',
                image_url: {
                  url: this.imageToDataUrl(request.image, request.mimeType),
                },
              },
            ],
          },
        ],
        response_format: { type: 'json_object' },
        max_tokens: 2000,
        temperature: 0.2, // Low temperature for accurate extraction
      })

      const content = completion.choices[0]?.message.content
      if (!content) {
        throw new Error('No content in OpenAI response')
      }

      const extractedData = this.parseJsonResponse(content)
      const processingTimeMs = Date.now() - startTime
      const usage = completion.usage || { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 }

      const metadata: LLMResponseMetadata = {
        requestId: completion.id,
        model: completion.model,
        provider: this.provider,
        usage: {
          inputTokens: usage.prompt_tokens,
          outputTokens: usage.completion_tokens,
          totalTokens: usage.total_tokens,
          estimatedCost: this.calculateCost(usage.prompt_tokens, usage.completion_tokens),
        },
        processingTimeMs,
        finishReason: completion.choices[0]?.finish_reason,
      }

      this.logMetrics('extract', metadata)

      // Convert to field format
      const fields = Object.entries(extractedData).map(([name, value]) => ({
        name,
        value,
        confidence: typeof value === 'object' && value !== null && 'confidence' in value
          ? (value as { confidence: number }).confidence
          : 0.9,
      }))

      return {
        fields,
        rawData: extractedData,
        confidence: fields.reduce((sum, f) => sum + f.confidence, 0) / fields.length,
        model: completion.model,
        provider: this.provider,
        tokensUsed: usage.total_tokens,
        processingTimeMs,
      }
    } catch (error) {
      return this.handleOpenAIError(error, { operation: 'extract' })
    }
  }

  /**
   * Validate extracted data
   */
  async validate(request: ValidationRequest): Promise<ValidationResult> {
    const startTime = Date.now()

    try {
      const ValidationSchema = z.object({
        isValid: z.boolean(),
        issues: z.array(
          z.object({
            field: z.string(),
            issue: z.string(),
            severity: z.enum(['error', 'warning', 'info']),
            suggestedFix: z.string().nullable().optional(),
          })
        ),
        correctedData: z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()])).nullable().optional(),
        confidence: z.number().min(0).max(1),
      }) satisfies z.ZodType

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

Return validation results with any issues found and suggested corrections.`.trim()

      const messages: ChatCompletionMessageParam[] = [
        {
          role: 'system',
          content: 'You are a data validation expert. Validate extracted document data thoroughly.',
        },
      ]

      // If image provided, use multimodal content for visual cross-reference
      if (request.image && request.mimeType) {
        messages.push({
          role: 'user',
          content: [
            { type: 'text' as const, text: prompt },
            {
              type: 'image_url' as const,
              image_url: {
                url: this.imageToDataUrl(request.image, request.mimeType),
              },
            },
          ],
        })
      } else {
        messages.push({ role: 'user', content: prompt })
      }

      const completion = await this.client.chat.completions.parse({
        model: this.model.model,
        messages,
        response_format: zodResponseFormat(ValidationSchema, 'validation'),
        max_tokens: 1500,
        temperature: 0.1,
      })

      const parsed = completion.choices[0]?.message.parsed
      if (!parsed) {
        throw new Error('No parsed response from OpenAI')
      }

      const processingTimeMs = Date.now() - startTime
      const usage = completion.usage || { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 }

      const metadata: LLMResponseMetadata = {
        requestId: completion.id,
        model: completion.model,
        provider: this.provider,
        usage: {
          inputTokens: usage.prompt_tokens,
          outputTokens: usage.completion_tokens,
          totalTokens: usage.total_tokens,
          estimatedCost: this.calculateCost(usage.prompt_tokens, usage.completion_tokens),
        },
        processingTimeMs,
        finishReason: completion.choices[0]?.finish_reason,
      }

      this.logMetrics('validate', metadata)

      return {
        isValid: parsed.isValid,
        issues: parsed.issues,
        correctedData: parsed.correctedData ?? undefined,
        confidence: parsed.confidence,
        model: completion.model,
        provider: this.provider,
        tokensUsed: usage.total_tokens,
        processingTimeMs,
      }
    } catch (error) {
      return this.handleOpenAIError(error, { operation: 'validate' })
    }
  }

  /**
   * Auto-correct validation issues
   */
  async correct(request: CorrectionRequest): Promise<CorrectionResult> {
    const startTime = Date.now()

    try {
      const CorrectionSchema = z.object({
        correctedData: z.record(z.string(), z.unknown()),
        changes: z.array(
          z.object({
            field: z.string(),
            oldValue: z.unknown(),
            newValue: z.unknown(),
            reasoning: z.string(),
          })
        ),
        confidence: z.number().min(0).max(1),
      }) satisfies z.ZodType

      const prompt =
        request.promptTemplate ||
        `Correct the following data extracted from a ${request.documentType} document.

Original data:
${JSON.stringify(request.extractedData, null, 2)}

Issues found:
${request.validationIssues.map((issue) => `- ${issue.field}: ${issue.issue}`).join('\n')}

Provide corrected data and explain each change you made.`.trim()

      const messages: ChatCompletionMessageParam[] = [
        {
          role: 'system',
          content: 'You are a data correction expert. Fix data extraction errors accurately.',
        },
      ]

      // If image provided, use it for reference
      if (request.image && request.mimeType) {
        messages.push({
          role: 'user',
          content: [
            { type: 'text' as const, text: prompt },
            {
              type: 'image_url' as const,
              image_url: {
                url: this.imageToDataUrl(request.image, request.mimeType),
              },
            },
          ],
        })
      } else {
        messages.push({ role: 'user', content: prompt })
      }

      const completion = await this.client.chat.completions.parse({
        model: this.model.model,
        messages,
        response_format: zodResponseFormat(CorrectionSchema, 'correction'),
        max_tokens: 2000,
        temperature: 0.2,
      })

      const parsed = completion.choices[0]?.message.parsed
      if (!parsed) {
        throw new Error('No parsed response from OpenAI')
      }

      const processingTimeMs = Date.now() - startTime
      const usage = completion.usage || { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 }

      const metadata: LLMResponseMetadata = {
        requestId: completion.id,
        model: completion.model,
        provider: this.provider,
        usage: {
          inputTokens: usage.prompt_tokens,
          outputTokens: usage.completion_tokens,
          totalTokens: usage.total_tokens,
          estimatedCost: this.calculateCost(usage.prompt_tokens, usage.completion_tokens),
        },
        processingTimeMs,
        finishReason: completion.choices[0]?.finish_reason,
      }

      this.logMetrics('correct', metadata)

      return {
        correctedData: parsed.correctedData,
        changes: parsed.changes as CorrectionResult['changes'],
        confidence: parsed.confidence,
        model: completion.model,
        provider: this.provider,
        tokensUsed: usage.total_tokens,
        processingTimeMs,
      }
    } catch (error) {
      return this.handleOpenAIError(error, { operation: 'correct' })
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
      const completion = await this.client.chat.completions.create({
        model: this.model.model,
        messages: this.convertMessages(messages),
        max_tokens: options?.maxTokens || 1000,
        temperature: options?.temperature ?? 0.7,
        ...(options?.responseFormat === 'json' && {
          response_format: { type: 'json_object' },
        }),
      })

      const content = completion.choices[0]?.message.content || ''
      const processingTimeMs = Date.now() - startTime
      const usage = completion.usage || { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 }

      const metadata: LLMResponseMetadata = {
        requestId: completion.id,
        model: completion.model,
        provider: this.provider,
        usage: {
          inputTokens: usage.prompt_tokens,
          outputTokens: usage.completion_tokens,
          totalTokens: usage.total_tokens,
          estimatedCost: this.calculateCost(usage.prompt_tokens, usage.completion_tokens),
        },
        processingTimeMs,
        finishReason: completion.choices[0]?.finish_reason,
      }

      return { content, metadata }
    } catch (error) {
      return this.handleOpenAIError(error, { operation: 'chatCompletion' })
    }
  }

  /**
   * Convert internal message format to OpenAI format
   */
  private convertMessages(messages: LLMMessage[]): ChatCompletionMessageParam[] {
    return messages.map((msg) => {
      if (typeof msg.content === 'string') {
        return {
          role: msg.role,
          content: msg.content,
        }
      }

      // Handle multi-modal content (text + images)
      const content: ChatCompletionContentPart[] = msg.content.map((item: MessageContent) => {
        if (item.type === 'text') {
          return { type: 'text' as const, text: item.text }
        } else {
          return {
            type: 'image_url' as const,
            image_url: {
              url: this.imageToDataUrl(item.data, item.mimeType),
            },
          }
        }
      })

      return {
        role: msg.role,
        content,
      } as ChatCompletionMessageParam
    })
  }

  /**
   * Handle OpenAI-specific errors
   */
  private handleOpenAIError(error: unknown, context?: Record<string, unknown>): never {
    if (error instanceof OpenAI.APIError) {
      logger.error(
        {
          status: error.status,
          code: error.code,
          type: error.type,
          requestId: error.requestID,
          message: error.message,
          context,
        },
        'OpenAI API error'
      )

      // Handle specific error types
      if (error instanceof OpenAI.RateLimitError) {
        const retryAfter = error.headers?.get?.('retry-after')
        throw this.handleError(error, {
          ...context,
          retryAfter,
          suggestion: 'Rate limit exceeded. Please retry after delay.',
        })
      } else if (error instanceof OpenAI.AuthenticationError) {
        throw this.handleError(error, {
          ...context,
          suggestion: 'Invalid API key. Check OPENAI_API_KEY environment variable.',
        })
      } else if (error instanceof OpenAI.APIConnectionError) {
        throw this.handleError(error, {
          ...context,
          suggestion: 'Network connection error. Check internet connectivity.',
        })
      }
    }

    return this.handleError(error, context)
  }
}

/**
 * Export singleton instance
 */
export const openaiService = new OpenAIService()
