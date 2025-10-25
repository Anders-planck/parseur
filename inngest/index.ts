/**
 * Inngest Module
 *
 * Exports all Inngest-related functionality
 */

// Client
export { inngest, sendEvent, type Events } from './client'

// Functions
export { documentPipeline } from './functions/document-pipeline'
export {
  batchDocumentProcessor,
  batchCoordinator,
  shouldUseBatchProcessing,
  getBatchQueueSize,
} from './functions/batch-processor'

// Strategies
export {
  multiProviderClassify,
  multiProviderExtract,
  multiProviderValidate,
  shouldUseMultiProvider,
  type SelectionStrategy,
  type MultiProviderConfig,
} from './functions/strategies/multi-provider'
