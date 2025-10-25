/**
 * LLM Service Factory
 *
 * Factory for creating and managing LLM service instances
 */

import { config } from '@/lib/config'
import { openaiService, OpenAIService } from './openai-service'
import { anthropicService, AnthropicService } from './anthropic-service'
import type { BaseLLMService } from './base-service'
import type { LLMProvider } from './types'
import { logger } from '@/lib/utils/logger'

/**
 * LLM Service Factory
 *
 * Provides access to LLM services with automatic provider selection
 */
export class LLMServiceFactory {
  /**
   * Service instances cache
   */
  private static instances: Map<LLMProvider, BaseLLMService> = new Map()

  /**
   * Get LLM service for specific provider
   *
   * @param provider - LLM provider to use
   * @returns LLM service instance
   */
  static getService(provider: LLMProvider): BaseLLMService {
    // Return cached instance if available
    if (this.instances.has(provider)) {
      return this.instances.get(provider)!
    }

    // Create new instance based on provider
    let service: BaseLLMService

    switch (provider) {
      case 'openai':
        service = openaiService
        break

      case 'anthropic':
        service = anthropicService
        break

      default:
        throw new Error(`Unsupported LLM provider: ${provider}`)
    }

    // Cache the instance
    this.instances.set(provider, service)

    logger.info({ provider }, 'LLM service initialized')

    return service
  }

  /**
   * Get default LLM service based on configuration
   *
   * @returns Default LLM service instance
   */
  static getDefaultService(): BaseLLMService {
    const provider = config.llm.defaultProvider as LLMProvider
    return this.getService(provider)
  }

  /**
   * Get appropriate LLM service based on MIME type
   *
   * - PDFs: Anthropic (supports native PDF processing)
   * - Images: Default provider from config (OpenAI by default)
   *
   * @param mimeType - Document MIME type
   * @returns Appropriate LLM service instance
   */
  static getServiceForMimeType(mimeType: string): BaseLLMService {
    // PDF files require Anthropic (OpenAI vision doesn't support PDFs)
    if (mimeType === 'application/pdf') {
      logger.info({ mimeType }, 'Using Anthropic for PDF processing')
      return this.getService('anthropic')
    }

    // Images can use default provider
    logger.info({ mimeType }, 'Using default provider for image processing')
    return this.getDefaultService()
  }

  /**
   * Get OpenAI service directly
   *
   * @returns OpenAI service instance
   */
  static getOpenAIService(): OpenAIService {
    return this.getService('openai') as OpenAIService
  }

  /**
   * Get Anthropic service directly
   *
   * @returns Anthropic service instance
   */
  static getAnthropicService(): AnthropicService {
    return this.getService('anthropic') as AnthropicService
  }

  /**
   * Clear service cache (useful for testing)
   */
  static clearCache(): void {
    this.instances.clear()
  }
}

/**
 * Convenience exports for direct service access
 */
export const llmService = LLMServiceFactory.getDefaultService()
export const getLLMService = (provider?: LLMProvider) =>
  provider ? LLMServiceFactory.getService(provider) : LLMServiceFactory.getDefaultService()
