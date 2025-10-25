/**
 * LLM Module
 *
 * Exports all LLM-related services, types, and utilities
 */

// Base service
export { BaseLLMService } from './base-service'

// Service implementations
export { OpenAIService, openaiService } from './openai-service'
export { AnthropicService, anthropicService } from './anthropic-service'

// Factory
export { LLMServiceFactory, llmService, getLLMService } from './factory'

// Types
export type {
  LLMProvider,
  LLMModel,
  ClassificationRequest,
  ClassificationResult,
  ExtractionRequest,
  ExtractionResult,
  ExtractedField,
  ValidationRequest,
  ValidationResult,
  ValidationIssue,
  CorrectionRequest,
  CorrectionResult,
  LLMMessage,
  LLMUsage,
  LLMResponseMetadata,
  MessageContent,
  ImageContent,
  TextContent,
} from './types'
