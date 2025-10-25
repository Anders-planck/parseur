/**
 * LLM Service Types
 *
 * Shared types and interfaces for LLM operations
 */

import type { DocumentType } from '@prisma/client'

/**
 * LLM Provider type
 */
export type LLMProvider = 'openai' | 'anthropic'

/**
 * LLM Model configuration
 */
export interface LLMModel {
  provider: LLMProvider
  model: string
  supportsVision: boolean
  maxTokens: number
  costPer1kInputTokens: number
  costPer1kOutputTokens: number
}

/**
 * Image content for vision models
 */
export interface ImageContent {
  type: 'image'
  data: Buffer
  mimeType: 'image/jpeg' | 'image/png' | 'image/webp' | 'application/pdf'
}

/**
 * Text content
 */
export interface TextContent {
  type: 'text'
  text: string
}

/**
 * Message content (text or image)
 */
export type MessageContent = TextContent | ImageContent

/**
 * LLM Request message
 */
export interface LLMMessage {
  role: 'system' | 'user' | 'assistant'
  content: string | MessageContent[]
}

/**
 * Document classification request
 */
export interface ClassificationRequest {
  image: Buffer
  mimeType: string
  promptTemplate?: string
}

/**
 * Document classification response
 */
export interface ClassificationResult {
  documentType: DocumentType
  confidence: number
  reasoning: string
  model: string
  provider: LLMProvider
  tokensUsed: number
  processingTimeMs: number
}

/**
 * Data extraction request
 */
export interface ExtractionRequest {
  image: Buffer
  mimeType: string
  documentType: DocumentType
  schema?: Record<string, unknown>
  promptTemplate?: string
}

/**
 * Extracted field
 */
export interface ExtractedField {
  name: string
  value: unknown
  confidence: number
  location?: {
    page?: number
    coordinates?: { x: number; y: number; width: number; height: number }
  }
}

/**
 * Data extraction response
 */
export interface ExtractionResult {
  fields: ExtractedField[]
  rawData: Record<string, unknown>
  confidence: number
  model: string
  provider: LLMProvider
  tokensUsed: number
  processingTimeMs: number
}

/**
 * Validation request
 */
export interface ValidationRequest {
  extractedData: Record<string, unknown>
  documentType: DocumentType
  image?: Buffer // Optional: original document image for visual cross-reference
  mimeType?: string // Required if image is provided
  rules?: string[]
  promptTemplate?: string
}

/**
 * Validation issue
 */
export interface ValidationIssue {
  field: string
  issue: string
  severity: 'error' | 'warning' | 'info'
  suggestedFix?: unknown
}

/**
 * Validation response
 */
export interface ValidationResult {
  isValid: boolean
  issues: ValidationIssue[]
  correctedData?: Record<string, unknown>
  confidence: number
  model: string
  provider: LLMProvider
  tokensUsed: number
  processingTimeMs: number
}

/**
 * Correction request
 */
export interface CorrectionRequest {
  extractedData: Record<string, unknown>
  validationIssues: ValidationIssue[]
  documentType: DocumentType
  image?: Buffer
  mimeType?: string
  promptTemplate?: string
}

/**
 * Correction response
 */
export interface CorrectionResult {
  correctedData: Record<string, unknown>
  changes: Array<{
    field: string
    oldValue: unknown
    newValue: unknown
    reasoning: string
  }>
  confidence: number
  model: string
  provider: LLMProvider
  tokensUsed: number
  processingTimeMs: number
}

/**
 * LLM usage statistics
 */
export interface LLMUsage {
  inputTokens: number
  outputTokens: number
  totalTokens: number
  estimatedCost: number
}

/**
 * LLM response metadata
 */
export interface LLMResponseMetadata {
  requestId?: string
  model: string
  provider: LLMProvider
  usage: LLMUsage
  processingTimeMs: number
  finishReason?: string
}
