/**
 * Inngest API Route
 *
 * Serves Inngest functions for remote invocation
 * Endpoint: POST /api/inngest
 */

import { serve } from 'inngest/next'
import { inngest } from '@/inngest/client'
import { documentPipeline } from '@/inngest/functions/document-pipeline'
import {
  batchDocumentProcessor,
  batchCoordinator,
} from '@/inngest/functions/batch-processor'

/**
 * Serve Inngest functions
 *
 * This endpoint handles:
 * - Function registration
 * - Event reception
 * - Step execution
 * - Retries and error handling
 */
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    documentPipeline,
    batchDocumentProcessor,
    batchCoordinator,
  ],
})
