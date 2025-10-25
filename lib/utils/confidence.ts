/**
 * Confidence Calculation Module
 *
 * Weighted confidence calculation with penalties for errors and edge case handling.
 * Based on production-ready best practices for LLM-based document processing.
 *
 * Key principles:
 * 1. Extraction is the most critical stage (50% weight)
 * 2. Validation errors penalize the final score
 * 3. Correction confidence is integrated only if applied
 * 4. Edge cases (NaN, empty fields, etc.) are handled gracefully
 * 5. Failed corrections with known errors result in very low confidence
 */

import type { ValidationIssue } from '@/lib/llm/types'
import { logger } from './logger'

/**
 * Configuration for confidence calculation weights
 * Total must sum to 1.0 when all stages are present
 */
export const CONFIDENCE_WEIGHTS = {
  classification: 0.10, // Document type classification (least critical)
  extraction: 0.50, // Data extraction (MOST CRITICAL - core of system)
  validation: 0.30, // Data validation quality
  correction: 0.10, // Auto-correction (if applied)
} as const

/**
 * Penalty configuration for validation issues
 */
export const VALIDATION_PENALTIES = {
  errorPenalty: 0.15, // Per error issue
  warningPenalty: 0.05, // Per warning issue
  maxErrorPenalty: 0.75, // Maximum total error penalty
  maxWarningPenalty: 0.20, // Maximum total warning penalty
  globalPenalty: 0.70, // Multiplier when validation fails without correction
} as const

/**
 * Confidence thresholds for decision making
 */
export const CONFIDENCE_THRESHOLDS = {
  autoApproval: 0.95, // Documents above this are auto-approved
  correctionFailed: 0.30, // Cap when correction fails with known errors
  emptyExtraction: 0.00, // Confidence when no fields extracted
} as const

/**
 * Parameters for overall confidence calculation
 */
export interface ConfidenceCalculationParams {
  classification: {
    confidence: number
  }
  extraction: {
    confidence: number
    fieldsExtracted: number
  }
  validation: {
    confidence: number
    isValid: boolean
    issues: ValidationIssue[]
  }
  correction?: {
    confidence: number
    isApplied: boolean
    correctionFailed?: boolean
  }
}

/**
 * Result of confidence calculation with metadata
 */
export interface ConfidenceCalculationResult {
  overallConfidence: number
  needsReview: boolean
  breakdown: {
    classificationScore: number
    extractionScore: number
    validationScore: number
    correctionScore?: number
    penalties: {
      errorCount: number
      warningCount: number
      errorPenalty: number
      warningPenalty: number
      globalPenalty: number
    }
  }
  reason?: string // Explanation for low confidence or review requirement
}

/**
 * Calculate overall confidence score with weighted contributions and penalties
 *
 * Algorithm:
 * 1. Start with weighted sum of classification + extraction
 * 2. Calculate validation score with error/warning penalties
 * 3. Add correction score if correction was applied
 * 4. Apply global penalty if validation failed without correction
 * 5. Handle edge cases (NaN, empty extraction, correction failed)
 * 6. Determine if human review is needed
 *
 * @param params - Confidence values from each pipeline stage
 * @returns Calculated overall confidence and review decision
 */
export function calculateOverallConfidence(
  params: ConfidenceCalculationParams
): ConfidenceCalculationResult {
  // Sanity check: handle empty extraction edge case
  if (params.extraction.fieldsExtracted === 0) {
    logger.warn(
      { documentId: 'unknown' },
      'Empty extraction detected - no fields extracted'
    )
    return {
      overallConfidence: CONFIDENCE_THRESHOLDS.emptyExtraction,
      needsReview: true,
      breakdown: {
        classificationScore: params.classification.confidence * CONFIDENCE_WEIGHTS.classification,
        extractionScore: 0,
        validationScore: 0,
        penalties: {
          errorCount: 0,
          warningCount: 0,
          errorPenalty: 0,
          warningPenalty: 0,
          globalPenalty: 0,
        },
      },
      reason: 'No fields extracted from document',
    }
  }

  // Sanity check: validate input confidences are in [0, 1] range
  const classificationConf = sanitizeConfidence(params.classification.confidence, 'classification')
  const extractionConf = sanitizeConfidence(params.extraction.confidence, 'extraction')
  const validationConf = sanitizeConfidence(params.validation.confidence, 'validation')

  // Start with weighted classification and extraction scores
  let score = classificationConf * CONFIDENCE_WEIGHTS.classification
  score += extractionConf * CONFIDENCE_WEIGHTS.extraction

  // Calculate validation score with penalties for issues
  const errorCount = params.validation.issues.filter((i) => i.severity === 'error').length
  const warningCount = params.validation.issues.filter((i) => i.severity === 'warning').length

  // Calculate penalties (capped to prevent over-penalization)
  const errorPenalty = Math.min(
    errorCount * VALIDATION_PENALTIES.errorPenalty,
    VALIDATION_PENALTIES.maxErrorPenalty
  )
  const warningPenalty = Math.min(
    warningCount * VALIDATION_PENALTIES.warningPenalty,
    VALIDATION_PENALTIES.maxWarningPenalty
  )

  // Apply penalties to validation confidence
  let validationScore = validationConf
  if (!params.validation.isValid) {
    validationScore = Math.max(0, validationConf - errorPenalty - warningPenalty)
    logger.info(
      {
        originalValidationConf: validationConf,
        errorCount,
        warningCount,
        errorPenalty,
        warningPenalty,
        adjustedValidationScore: validationScore,
      },
      'Validation confidence adjusted for issues'
    )
  }

  score += validationScore * CONFIDENCE_WEIGHTS.validation

  // Handle correction stage
  let correctionScore: number | undefined
  let globalPenalty = 0
  let reason: string | undefined

  if (params.correction) {
    if (params.correction.correctionFailed) {
      // Correction failed with known errors - severely penalize
      logger.warn(
        { originalScore: score },
        'Correction failed - applying severe confidence cap'
      )
      score = Math.min(score, CONFIDENCE_THRESHOLDS.correctionFailed)
      reason = 'Correction failed with known validation errors'
    } else if (params.correction.isApplied) {
      // Correction was successfully applied - integrate its confidence
      const correctionConf = sanitizeConfidence(params.correction.confidence, 'correction')
      correctionScore = correctionConf * CONFIDENCE_WEIGHTS.correction
      score += correctionScore

      logger.info(
        { correctionConf, correctionScore },
        'Correction confidence integrated'
      )
    }
  } else if (!params.validation.isValid) {
    // Validation failed but no correction was attempted/applied - global penalty
    const originalScore = score
    score *= VALIDATION_PENALTIES.globalPenalty
    globalPenalty = originalScore - score

    logger.warn(
      {
        originalScore,
        penalizedScore: score,
        globalPenalty,
      },
      'Global penalty applied - validation failed without correction'
    )
    reason = 'Validation failed without correction applied'
  }

  // Final clamp to [0, 1] range
  const finalConfidence = Math.min(1, Math.max(0, score))

  // Determine if human review is needed
  const needsReview =
    finalConfidence < CONFIDENCE_THRESHOLDS.autoApproval ||
    !params.validation.isValid ||
    params.correction?.correctionFailed === true

  return {
    overallConfidence: finalConfidence,
    needsReview,
    breakdown: {
      classificationScore: classificationConf * CONFIDENCE_WEIGHTS.classification,
      extractionScore: extractionConf * CONFIDENCE_WEIGHTS.extraction,
      validationScore: validationScore * CONFIDENCE_WEIGHTS.validation,
      correctionScore,
      penalties: {
        errorCount,
        warningCount,
        errorPenalty,
        warningPenalty,
        globalPenalty,
      },
    },
    reason,
  }
}

/**
 * Adjust LLM confidence based on business rule validation issues
 *
 * Applies severity-weighted penalties for business rule errors and warnings.
 * Business rules are deterministic (always correct) so they get heavier penalties
 * than LLM-detected issues.
 *
 * Algorithm:
 * - Base error penalty: 25%
 * - Additional penalty: 15% per error (capped at 80% total)
 * - Warning penalty: 5% per warning (capped at 20% total)
 * - Applied multiplicatively: llmConf * (1 - totalPenalty)
 *
 * @param llmConf - Original LLM confidence score (0-1)
 * @param businessIssues - Business rule validation issues
 * @returns Adjusted confidence score (0-1)
 */
export function adjustLlmConfidenceForBusinessRules(
  llmConf: number,
  businessIssues: ValidationIssue[]
): number {
  const errCount = businessIssues.filter((i) => i.severity === 'error').length
  const warnCount = businessIssues.filter((i) => i.severity === 'warning').length

  // No issues → no penalty
  if (errCount === 0 && warnCount === 0) {
    return llmConf
  }

  // Base penalty: 25% for any error
  const baseErrPenalty = errCount > 0 ? 0.25 : 0

  // Per-error penalty: 15% each, capped so base + perErr <= 0.8
  const perErrPenalty = Math.min(errCount * 0.15, 0.55)

  // Warning penalty: 5% each, capped at 20%
  const warnPenalty = Math.min(warnCount * 0.05, 0.2)

  // Total penalty capped at 80%
  const totalPenalty = Math.min(0.8, baseErrPenalty + perErrPenalty + warnPenalty)

  const adjustedConf = Math.max(0, llmConf * (1 - totalPenalty))

  logger.info(
    {
      originalConf: llmConf,
      errCount,
      warnCount,
      baseErrPenalty,
      perErrPenalty,
      warnPenalty,
      totalPenalty,
      adjustedConf,
    },
    'Applied business rule penalties to LLM confidence'
  )

  return adjustedConf
}

/**
 * Sanitize confidence value to ensure it's in valid [0, 1] range
 * Handles NaN, Infinity, and out-of-range values
 *
 * @param value - Raw confidence value
 * @param stageName - Name of the stage for logging
 * @returns Sanitized confidence value in [0, 1]
 */
function sanitizeConfidence(value: number, stageName: string): number {
  // Handle NaN
  if (Number.isNaN(value)) {
    logger.error(
      { stageName, value },
      'NaN confidence detected - defaulting to 0'
    )
    return 0
  }

  // Handle Infinity
  if (!Number.isFinite(value)) {
    logger.error(
      { stageName, value },
      'Infinite confidence detected - defaulting to 0'
    )
    return 0
  }

  // Clamp to [0, 1]
  if (value < 0) {
    logger.warn(
      { stageName, value },
      'Negative confidence detected - clamping to 0'
    )
    return 0
  }

  if (value > 1) {
    logger.warn(
      { stageName, value },
      'Confidence > 1 detected - clamping to 1'
    )
    return 1
  }

  return value
}

/**
 * Format confidence as percentage string for display
 *
 * @param confidence - Confidence value [0, 1]
 * @returns Formatted percentage string (e.g., "95.3%")
 */
export function formatConfidence(confidence: number): string {
  return `${(confidence * 100).toFixed(1)}%`
}

/**
 * Determine confidence level category for UI display
 *
 * @param confidence - Confidence value [0, 1]
 * @returns Category: 'high', 'medium', 'low', or 'critical'
 */
export function getConfidenceLevel(confidence: number): 'high' | 'medium' | 'low' | 'critical' {
  if (confidence >= 0.90) return 'high'
  if (confidence >= 0.70) return 'medium'
  if (confidence >= 0.40) return 'low'
  return 'critical'
}
