/**
 * Document Processing Pipeline
 *
 * Main Inngest function that orchestrates the entire document processing workflow:
 * 1. Classify document type
 * 2. Extract structured data
 * 3. Validate extracted data
 * 4. Auto-correct if needed
 * 5. Update final status
 */

import { inngest } from '../client'
import { documentRepository } from '@/lib/repositories/document-repository'
import { getLLMService } from '@/lib/llm'
import { selectProviderForMime } from '@/lib/llm/utils'
import { storageService } from '@/lib/storage'
import { logger } from '@/lib/utils/logger'
import { NonRetriableError } from 'inngest'
import type { Prisma } from '@prisma/client'
import {
  multiProviderClassify,
  multiProviderExtract,
  multiProviderValidate,
  shouldUseMultiProvider,
} from './strategies/multi-provider'
import { documentEvents } from '@/lib/events/emitter'
import { calculateOverallConfidence, adjustLlmConfidenceForBusinessRules } from '@/lib/utils/confidence'
import { validateBusinessRules, getBusinessRulesDescription } from '@/lib/validation/business-rules'

/**
 * Document Processing Pipeline
 *
 * Triggered when a document is uploaded
 */
export const documentPipeline = inngest.createFunction(
  {
    id: 'document-processing-pipeline',
    name: 'Document Processing Pipeline',
    retries: 3,
  },
  { event: 'document/uploaded' },
  async ({ event, step }) => {
    const { documentId, userId, s3Key, s3Bucket, mimeType, fileSize } = event.data

    logger.info({ documentId, userId, fileSize }, 'Starting document processing pipeline')

    // Step 1: Download document from S3
    // Note: We return base64 string instead of Buffer for serialization
    const documentBase64 = await step.run('download-document', async () => {
      try {
        logger.info({ s3Key, s3Bucket }, 'Downloading document from S3')
        const { buffer } = await storageService.downloadFile(s3Key)
        return buffer.toString('base64')
      } catch (error) {
        logger.error({ error, s3Key }, 'Failed to download document')
        throw new NonRetriableError('Failed to download document from storage', {
          cause: error,
        })
      }
    })

    // Convert base64 back to Buffer for processing
    const documentBuffer = Buffer.from(documentBase64, 'base64')

    // Step 2: Classify document type
    const classification = await step.run('classify-document', async () => {
      try {
        logger.info({ documentId }, 'Classifying document type')

        // Check if multi-provider should be used
        const useMultiProvider = shouldUseMultiProvider({
          fileSize,
        })

        const result = useMultiProvider
          ? await multiProviderClassify(
              { image: documentBuffer, mimeType },
              {
                providers: ['openai', 'anthropic'],
                strategy: 'highest-confidence',
              }
            )
          : await getLLMService(selectProviderForMime(mimeType)).classify({
              image: documentBuffer,
              mimeType,
            })

        logger.info(
          { documentId, documentType: result.documentType, confidence: result.confidence, useMultiProvider },
          'Document classified'
        )

        // Update document in database with classification
        await documentRepository.updateWithAudit(documentId, 'PROCESSING', {
          stage: 'CLASSIFICATION',
          llmProvider: result.provider,
          llmModel: result.model,
          promptUsed: 'Classification prompt v1',
          rawResponse: JSON.stringify({
            documentType: result.documentType,
            confidence: result.confidence,
            reasoning: result.reasoning,
          }),
          confidence: result.confidence,
          processingTime: result.processingTimeMs,
          tokensUsed: result.tokensUsed,
        })

        return result
      } catch (error) {
        logger.error({ error, documentId }, 'Classification failed')

        // Update document status to failed
        const failedDocument = await documentRepository.update(documentId, {
          status: 'FAILED',
        })

        // Emit SSE event for real-time updates
        documentEvents.emitDocumentEvent({
          type: 'document.failed',
          userId,
          data: {
            id: failedDocument.id,
            status: failedDocument.status,
            documentType: failedDocument.documentType,
            confidence: failedDocument.confidence,
            originalFilename: failedDocument.originalFilename,
            createdAt: failedDocument.createdAt,
            completedAt: failedDocument.completedAt,
          },
          timestamp: new Date(),
        })

        throw error
      }
    })

    // Step 3: Extract structured data
    const extraction = await step.run('extract-data', async () => {
      try {
        logger.info({ documentId, documentType: classification.documentType }, 'Extracting data')

        // Check if multi-provider should be used
        const useMultiProvider = shouldUseMultiProvider({
          documentType: classification.documentType,
          fileSize,
        })

        // OpenAI doesn't support PDFs - only use Anthropic for PDFs
        const isPDF = mimeType === 'application/pdf'

        const result = useMultiProvider && !isPDF
          ? await multiProviderExtract(
              {
                image: documentBuffer,
                mimeType,
                documentType: classification.documentType,
              },
              {
                providers: ['openai', 'anthropic'],
                strategy: 'highest-confidence',
              }
            )
          : await getLLMService(selectProviderForMime(mimeType)).extract({
              image: documentBuffer,
              mimeType,
              documentType: classification.documentType,
            })

        logger.info(
          { documentId, fieldCount: result.fields.length, confidence: result.confidence, useMultiProvider },
          'Data extracted'
        )

        // Update document in database with extraction
        await documentRepository.updateWithAudit(documentId, 'PROCESSING', {
          stage: 'EXTRACTION',
          llmProvider: result.provider,
          llmModel: result.model,
          promptUsed: 'Extraction prompt v1',
          rawResponse: JSON.stringify(result.rawData),
          extractedData: result.rawData as Prisma.InputJsonValue,
          confidence: result.confidence,
          processingTime: result.processingTimeMs,
          tokensUsed: result.tokensUsed,
        })

        return result
      } catch (error) {
        logger.error({ error, documentId }, 'Extraction failed')

        const failedDocument = await documentRepository.update(documentId, {
          status: 'FAILED',
        })

        // Emit SSE event for real-time updates
        documentEvents.emitDocumentEvent({
          type: 'document.failed',
          userId,
          data: {
            id: failedDocument.id,
            status: failedDocument.status,
            documentType: failedDocument.documentType,
            confidence: failedDocument.confidence,
            originalFilename: failedDocument.originalFilename,
            createdAt: failedDocument.createdAt,
            completedAt: failedDocument.completedAt,
          },
          timestamp: new Date(),
        })

        throw error
      }
    })

    // Step 4: Validate extracted data
    const validation = await step.run('validate-data', async () => {
      try {
        logger.info({ documentId }, 'Validating extracted data')

        // Step 4.1: Run business rules validation (deterministic, fast)
        const businessRuleIssues = validateBusinessRules(classification.documentType, extraction.rawData)

        logger.info(
          {
            documentId,
            businessRuleIssues: businessRuleIssues.length,
            errorCount: businessRuleIssues.filter((i) => i.severity === 'error').length,
          },
          'Business rules validation completed'
        )

        // Step 4.2: Run LLM validation with visual cross-reference
        // Include business rules description for consistency
        const businessRulesDescription = getBusinessRulesDescription(classification.documentType)

        // Check if multi-provider should be used
        const useMultiProvider = shouldUseMultiProvider({
          documentType: classification.documentType,
          fileSize,
        })

        // OpenAI doesn't support PDFs - only use Anthropic for PDFs
        const isPDF = mimeType === 'application/pdf'

        const llmValidationResult = useMultiProvider && !isPDF
          ? await multiProviderValidate(
              {
                extractedData: extraction.rawData,
                documentType: classification.documentType,
                image: documentBuffer,
                mimeType,
                // Pass business rules as context for LLM validation
                rules: businessRuleIssues.length > 0
                  ? [`Business rules found ${businessRuleIssues.length} issues`, businessRulesDescription]
                  : [businessRulesDescription],
              },
              {
                providers: ['openai', 'anthropic'],
                strategy: 'weighted-voting', // ✅ Use weighted voting for more reliable validation
                // providerWeights will use DEFAULT_PROVIDER_WEIGHTS (Anthropic: 0.55, OpenAI: 0.45)
              }
            )
          : await getLLMService(selectProviderForMime(mimeType)).validate({
              extractedData: extraction.rawData,
              documentType: classification.documentType,
              image: documentBuffer,
              mimeType,
              rules: businessRuleIssues.length > 0
                ? [`Business rules found ${businessRuleIssues.length} issues`, businessRulesDescription]
                : [businessRulesDescription],
            })

        // Step 4.3: Combine business rules issues with LLM validation issues
        const combinedIssues = [...businessRuleIssues, ...llmValidationResult.issues]

        // Overall validation is valid only if both pass
        const isValid = llmValidationResult.isValid && businessRuleIssues.length === 0

        // Apply severity-weighted penalties for business rule errors
        // Business rules are deterministic (always correct), so they get heavier penalties
        const adjustedConfidence = adjustLlmConfidenceForBusinessRules(
          llmValidationResult.confidence,
          businessRuleIssues
        )

        const result = {
          isValid,
          issues: combinedIssues,
          confidence: adjustedConfidence,
          model: llmValidationResult.model,
          provider: llmValidationResult.provider,
          tokensUsed: llmValidationResult.tokensUsed,
          processingTimeMs: llmValidationResult.processingTimeMs,
        }

        logger.info(
          {
            documentId,
            isValid: result.isValid,
            totalIssues: result.issues.length,
            businessRuleIssues: businessRuleIssues.length,
            llmIssues: llmValidationResult.issues.length,
            confidence: result.confidence,
            useMultiProvider,
          },
          'Data validated with business rules + LLM'
        )

        // Update document in database with combined validation
        await documentRepository.updateWithAudit(documentId, 'PROCESSING', {
          stage: 'VALIDATION',
          llmProvider: result.provider,
          llmModel: result.model,
          promptUsed: 'Validation prompt v1 + Business Rules',
          rawResponse: JSON.stringify({
            isValid: result.isValid,
            businessRuleIssues,
            llmIssues: llmValidationResult.issues,
            combinedIssues: result.issues,
          }),
          confidence: result.confidence,
          processingTime: result.processingTimeMs,
          tokensUsed: result.tokensUsed,
        })

        return result
      } catch (error) {
        logger.error({ error, documentId }, 'Validation failed')

        const failedDocument = await documentRepository.update(documentId, {
          status: 'FAILED',
        })

        // Emit SSE event for real-time updates
        documentEvents.emitDocumentEvent({
          type: 'document.failed',
          userId,
          data: {
            id: failedDocument.id,
            status: failedDocument.status,
            documentType: failedDocument.documentType,
            confidence: failedDocument.confidence,
            originalFilename: failedDocument.originalFilename,
            createdAt: failedDocument.createdAt,
            completedAt: failedDocument.completedAt,
          },
          timestamp: new Date(),
        })

        throw error
      }
    })

    // Step 5: Auto-correct if needed
    const correctionResult = await step.run('auto-correct', async () => {
      // If validation passed and no errors, use extracted data as-is
      if (validation.isValid) {
        logger.info({ documentId }, 'Validation passed, no correction needed')
        return {
          data: extraction.rawData,
          isApplied: false,
          confidence: extraction.confidence,
          correctionFailed: false,
        }
      }

      // Check if there are only warnings/info issues (no errors)
      const hasErrors = validation.issues.some((issue) => issue.severity === 'error')

      if (!hasErrors) {
        logger.info({ documentId }, 'Only warnings found, using extracted data')
        return {
          data: extraction.rawData,
          isApplied: false,
          confidence: extraction.confidence,
          correctionFailed: false,
        }
      }

      // Attempt auto-correction for errors
      try {
        logger.info({ documentId, issueCount: validation.issues.length }, 'Attempting auto-correction')
        const llm = getLLMService(selectProviderForMime(mimeType))

        const result = await llm.correct({
          extractedData: extraction.rawData,
          validationIssues: validation.issues,
          documentType: classification.documentType,
          image: documentBuffer,
          mimeType,
        })

        logger.info(
          {
            documentId,
            changeCount: result.changes.length,
            confidence: result.confidence,
          },
          'Data corrected'
        )

        // Update document in database with correction
        await documentRepository.updateWithAudit(documentId, 'PROCESSING', {
          stage: 'CORRECTION',
          llmProvider: result.provider,
          llmModel: result.model,
          promptUsed: 'Correction prompt v1',
          rawResponse: JSON.stringify({
            changes: result.changes,
            correctedData: result.correctedData,
          }),
          extractedData: result.correctedData as Prisma.InputJsonValue,
          confidence: result.confidence,
          processingTime: result.processingTimeMs,
          tokensUsed: result.tokensUsed,
        })

        // ✅ CRITICAL: Re-validate corrected data to verify correction quality
        logger.info({ documentId }, 'Re-validating corrected data')

        // Re-run business rules on corrected data
        const reBusinessIssues = validateBusinessRules(classification.documentType, result.correctedData)

        // Re-run LLM validation on corrected data (using same provider as correction for speed)
       const reLLMValidation = await llm.validate({
          extractedData: result.correctedData,
          documentType: classification.documentType,
          image: documentBuffer,
          mimeType,
          rules: reBusinessIssues.length > 0
            ? [`Business rules found ${reBusinessIssues.length} issues after correction`, getBusinessRulesDescription(classification.documentType)]
            : [getBusinessRulesDescription(classification.documentType)],
        })

        // Combine re-validation results
        const reCombinedIssues = [...reBusinessIssues, ...reLLMValidation.issues]
        const reIsValid = reLLMValidation.isValid && reBusinessIssues.length === 0

        // Apply penalties to re-validation confidence
        const reAdjustedConf = adjustLlmConfidenceForBusinessRules(
          reLLMValidation.confidence,
          reBusinessIssues
        )

        // Log re-validation results in audit
        await documentRepository.updateWithAudit(documentId, 'PROCESSING', {
          stage: 'REVALIDATION',
          llmProvider: reLLMValidation.provider,
          llmModel: reLLMValidation.model,
          promptUsed: 'Re-validation after correction',
          rawResponse: JSON.stringify({
            isValid: reIsValid,
            businessRuleIssues: reBusinessIssues,
            llmIssues: reLLMValidation.issues,
            combinedIssues: reCombinedIssues,
          }),
          confidence: reAdjustedConf,
          processingTime: reLLMValidation.processingTimeMs,
          tokensUsed: reLLMValidation.tokensUsed,
        })

        // If re-validation failed, mark correction as failed
        if (!reIsValid) {
          logger.warn(
            {
              documentId,
              reBusinessIssuesCount: reBusinessIssues.length,
              reLLMIssuesCount: reLLMValidation.issues.length,
            },
            'Re-validation failed after correction - correction did not fix all issues'
          )

          // Return with correctionFailed flag and capped confidence
          return {
            data: result.correctedData,
            isApplied: true,
            confidence: Math.min(result.confidence, 0.5), // Cap at 50% confidence
            correctionFailed: true,
          }
        }

        logger.info(
          {
            documentId,
            reValidationConf: reAdjustedConf,
          },
          'Re-validation passed - correction successful'
        )

        // Re-validation passed, use correction confidence
        return {
          data: result.correctedData,
          isApplied: true,
          confidence: result.confidence,
          correctionFailed: false,
        }
      } catch (error) {
        logger.error({ error, documentId }, 'Correction failed - will force human review')

        // ❌ CRITICAL: Correction failed with known errors
        // Do NOT use original data without severe penalty
        return {
          data: extraction.rawData,
          isApplied: false,
          confidence: 0.20, // Very low confidence for failed correction
          correctionFailed: true, // Flag for severe penalty in finalization
        }
      }
    })

    // Step 6: Finalize and determine final status
    const finalStatus = await step.run('finalize-document', async () => {
      // Calculate overall confidence using weighted algorithm with penalties
      const confidenceResult = calculateOverallConfidence({
        classification: {
          confidence: classification.confidence,
        },
        extraction: {
          confidence: extraction.confidence,
          fieldsExtracted: extraction.fields.length,
        },
        validation: {
          confidence: validation.confidence,
          isValid: validation.isValid,
          issues: validation.issues,
        },
        correction: correctionResult.isApplied || correctionResult.correctionFailed
          ? {
              confidence: correctionResult.confidence,
              isApplied: correctionResult.isApplied,
              correctionFailed: correctionResult.correctionFailed,
            }
          : undefined,
      })

      const overallConfidence = confidenceResult.overallConfidence
      const needsReview = confidenceResult.needsReview
      const status = needsReview ? 'NEEDS_REVIEW' : 'COMPLETED'

      logger.info(
        {
          documentId,
          status,
          overallConfidence,
          needsReview,
          breakdown: confidenceResult.breakdown,
          reason: confidenceResult.reason,
        },
        'Finalizing document with weighted confidence calculation'
      )

      // Update document with final status
      const updatedDocument = await documentRepository.update(documentId, {
        status,
        documentType: classification.documentType,
        parsedData: correctionResult.data as Prisma.InputJsonValue,
        confidence: overallConfidence,
        needsReview,
        completedAt: new Date(),
      })

      // Emit SSE event for real-time updates
      documentEvents.emitDocumentEvent({
        type: status === 'COMPLETED' ? 'document.completed' : 'document.updated',
        userId,
        data: {
          id: updatedDocument.id,
          status: updatedDocument.status,
          documentType: updatedDocument.documentType,
          confidence: updatedDocument.confidence,
          originalFilename: updatedDocument.originalFilename,
          createdAt: updatedDocument.createdAt,
          completedAt: updatedDocument.completedAt,
        },
        timestamp: new Date(),
      })

      return {
        status,
        confidence: overallConfidence,
        needsReview,
        documentType: classification.documentType,
        extractedData: correctionResult.data,
      }
    })

    logger.info({ documentId, finalStatus }, 'Document processing pipeline completed')

    return finalStatus
  }
)
