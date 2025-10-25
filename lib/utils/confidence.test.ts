/**
 * Test Suite for Confidence Calculation Module
 *
 * Covers:
 * - Basic weighted calculation
 * - Error/warning penalties
 * - Correction integration
 * - Edge cases (NaN, empty extraction, etc.)
 * - Review thresholds
 */

import { describe, it, expect } from 'vitest'
import {
  calculateOverallConfidence,
  formatConfidence,
  getConfidenceLevel,
  CONFIDENCE_THRESHOLDS,
  type ConfidenceCalculationParams,
} from './confidence'

describe('calculateOverallConfidence', () => {
  describe('Basic Weighted Calculation', () => {
    it('should calculate confidence with correct weights when all stages pass', () => {
      const params: ConfidenceCalculationParams = {
        classification: { confidence: 0.95 },
        extraction: { confidence: 0.90, fieldsExtracted: 10 },
        validation: { confidence: 0.85, isValid: true, issues: [] },
      }

      const result = calculateOverallConfidence(params)

      // Expected: 0.95*0.10 + 0.90*0.50 + 0.85*0.30 = 0.095 + 0.45 + 0.255 = 0.80
      expect(result.overallConfidence).toBeCloseTo(0.80, 2)
      expect(result.needsReview).toBe(true) // 0.80 < 0.95 threshold
    })

    it('should require review when confidence below threshold even if valid', () => {
      const params: ConfidenceCalculationParams = {
        classification: { confidence: 0.80 },
        extraction: { confidence: 0.75, fieldsExtracted: 5 },
        validation: { confidence: 0.70, isValid: true, issues: [] },
      }

      const result = calculateOverallConfidence(params)

      // Expected: 0.80*0.10 + 0.75*0.50 + 0.70*0.30 = 0.08 + 0.375 + 0.21 = 0.665
      expect(result.overallConfidence).toBeCloseTo(0.665, 2)
      expect(result.needsReview).toBe(true) // Below 0.95 threshold
    })

    it('should not require review only when confidence >= 0.95 AND validation valid', () => {
      const params: ConfidenceCalculationParams = {
        classification: { confidence: 0.99 },
        extraction: { confidence: 0.98, fieldsExtracted: 15 },
        validation: { confidence: 0.96, isValid: true, issues: [] },
      }

      const result = calculateOverallConfidence(params)

      // Expected: 0.99*0.10 + 0.98*0.50 + 0.96*0.30 = 0.099 + 0.49 + 0.288 = 0.877
      expect(result.overallConfidence).toBeCloseTo(0.877, 2)
      expect(result.needsReview).toBe(true) // Still below 0.95
    })
  })

  describe('Validation Penalties', () => {
    it('should penalize confidence for validation errors', () => {
      const params: ConfidenceCalculationParams = {
        classification: { confidence: 0.95 },
        extraction: { confidence: 0.90, fieldsExtracted: 10 },
        validation: {
          confidence: 0.85,
          isValid: false,
          issues: [
            { field: 'total', issue: 'Invalid format', severity: 'error' },
            { field: 'date', issue: 'Missing', severity: 'error' },
          ],
        },
      }

      const result = calculateOverallConfidence(params)

      // Validation score: 0.85 - (2 errors * 0.15) = 0.85 - 0.30 = 0.55
      // Expected: 0.95*0.10 + 0.90*0.50 + 0.55*0.30 = 0.095 + 0.45 + 0.165 = 0.71
      // Global penalty (no correction): 0.71 * 0.70 = 0.497
      expect(result.overallConfidence).toBeCloseTo(0.497, 2)
      expect(result.needsReview).toBe(true)
      expect(result.breakdown.penalties.errorCount).toBe(2)
    })

    it('should apply smaller penalty for warnings', () => {
      const params: ConfidenceCalculationParams = {
        classification: { confidence: 0.95 },
        extraction: { confidence: 0.90, fieldsExtracted: 10 },
        validation: {
          confidence: 0.90,
          isValid: false,
          issues: [
            { field: 'currency', issue: 'Unusual value', severity: 'warning' },
            { field: 'address', issue: 'Format unusual', severity: 'warning' },
          ],
        },
      }

      const result = calculateOverallConfidence(params)

      // Validation score: 0.90 - (2 warnings * 0.05) = 0.90 - 0.10 = 0.80
      // Expected: 0.95*0.10 + 0.90*0.50 + 0.80*0.30 = 0.095 + 0.45 + 0.24 = 0.785
      // Global penalty: 0.785 * 0.70 = 0.5495
      expect(result.overallConfidence).toBeCloseTo(0.5495, 2)
      expect(result.breakdown.penalties.warningCount).toBe(2)
    })

    it('should cap error penalty at maximum', () => {
      const params: ConfidenceCalculationParams = {
        classification: { confidence: 0.95 },
        extraction: { confidence: 0.90, fieldsExtracted: 10 },
        validation: {
          confidence: 0.95,
          isValid: false,
          issues: Array(10).fill({ field: 'test', issue: 'error', severity: 'error' }),
        },
      }

      const result = calculateOverallConfidence(params)

      // 10 errors * 0.15 = 1.50, but capped at 0.75
      expect(result.breakdown.penalties.errorPenalty).toBe(0.75)
    })
  })

  describe('Correction Integration', () => {
    it('should integrate correction confidence when applied', () => {
      const params: ConfidenceCalculationParams = {
        classification: { confidence: 0.95 },
        extraction: { confidence: 0.85, fieldsExtracted: 10 },
        validation: {
          confidence: 0.70,
          isValid: false,
          issues: [{ field: 'total', issue: 'error', severity: 'error' }],
        },
        correction: {
          confidence: 0.80,
          isApplied: true,
        },
      }

      const result = calculateOverallConfidence(params)

      // Validation: 0.70 - 0.15 = 0.55
      // Base: 0.95*0.10 + 0.85*0.50 + 0.55*0.30 = 0.095 + 0.425 + 0.165 = 0.685
      // Correction: 0.80*0.10 = 0.08
      // Total: 0.685 + 0.08 = 0.765
      expect(result.overallConfidence).toBeCloseTo(0.765, 2)
      expect(result.breakdown.correctionScore).toBeCloseTo(0.08, 2)
    })

    it('should cap confidence when correction fails', () => {
      const params: ConfidenceCalculationParams = {
        classification: { confidence: 0.95 },
        extraction: { confidence: 0.90, fieldsExtracted: 10 },
        validation: {
          confidence: 0.80,
          isValid: false,
          issues: [{ field: 'total', issue: 'error', severity: 'error' }],
        },
        correction: {
          confidence: 0.00,
          isApplied: false,
          correctionFailed: true,
        },
      }

      const result = calculateOverallConfidence(params)

      // Should be capped at 0.30
      expect(result.overallConfidence).toBe(CONFIDENCE_THRESHOLDS.correctionFailed)
      expect(result.needsReview).toBe(true)
      expect(result.reason).toContain('Correction failed')
    })

    it('should apply global penalty when validation fails without correction', () => {
      const params: ConfidenceCalculationParams = {
        classification: { confidence: 0.95 },
        extraction: { confidence: 0.90, fieldsExtracted: 10 },
        validation: {
          confidence: 0.85,
          isValid: false,
          issues: [{ field: 'total', issue: 'error', severity: 'error' }],
        },
        // No correction provided
      }

      const result = calculateOverallConfidence(params)

      // Validation: 0.85 - 0.15 = 0.70
      // Base: 0.95*0.10 + 0.90*0.50 + 0.70*0.30 = 0.095 + 0.45 + 0.21 = 0.755
      // Global penalty: 0.755 * 0.70 = 0.5285
      expect(result.overallConfidence).toBeCloseTo(0.5285, 2)
      expect(result.breakdown.penalties.globalPenalty).toBeGreaterThan(0)
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty extraction (zero fields)', () => {
      const params: ConfidenceCalculationParams = {
        classification: { confidence: 0.95 },
        extraction: { confidence: 0.00, fieldsExtracted: 0 },
        validation: { confidence: 0.00, isValid: false, issues: [] },
      }

      const result = calculateOverallConfidence(params)

      expect(result.overallConfidence).toBe(CONFIDENCE_THRESHOLDS.emptyExtraction)
      expect(result.needsReview).toBe(true)
      expect(result.reason).toContain('No fields extracted')
    })

    it('should sanitize NaN confidence values', () => {
      const params: ConfidenceCalculationParams = {
        classification: { confidence: NaN },
        extraction: { confidence: 0.90, fieldsExtracted: 10 },
        validation: { confidence: 0.85, isValid: true, issues: [] },
      }

      const result = calculateOverallConfidence(params)

      // NaN should be treated as 0
      // Expected: 0*0.10 + 0.90*0.50 + 0.85*0.30 = 0 + 0.45 + 0.255 = 0.705
      expect(result.overallConfidence).toBeCloseTo(0.705, 2)
      expect(Number.isNaN(result.overallConfidence)).toBe(false)
    })

    it('should clamp confidence values > 1', () => {
      const params: ConfidenceCalculationParams = {
        classification: { confidence: 1.5 }, // Invalid
        extraction: { confidence: 0.90, fieldsExtracted: 10 },
        validation: { confidence: 0.85, isValid: true, issues: [] },
      }

      const result = calculateOverallConfidence(params)

      // 1.5 should be clamped to 1.0
      // Expected: 1.0*0.10 + 0.90*0.50 + 0.85*0.30 = 0.10 + 0.45 + 0.255 = 0.805
      expect(result.overallConfidence).toBeCloseTo(0.805, 2)
    })

    it('should clamp negative confidence values to 0', () => {
      const params: ConfidenceCalculationParams = {
        classification: { confidence: -0.5 }, // Invalid
        extraction: { confidence: 0.90, fieldsExtracted: 10 },
        validation: { confidence: 0.85, isValid: true, issues: [] },
      }

      const result = calculateOverallConfidence(params)

      // -0.5 should be clamped to 0
      // Expected: 0*0.10 + 0.90*0.50 + 0.85*0.30 = 0 + 0.45 + 0.255 = 0.705
      expect(result.overallConfidence).toBeCloseTo(0.705, 2)
    })

    it('should handle Infinity values', () => {
      const params: ConfidenceCalculationParams = {
        classification: { confidence: Infinity },
        extraction: { confidence: 0.90, fieldsExtracted: 10 },
        validation: { confidence: 0.85, isValid: true, issues: [] },
      }

      const result = calculateOverallConfidence(params)

      // Infinity should be treated as 0
      expect(Number.isFinite(result.overallConfidence)).toBe(true)
    })
  })

  describe('Review Decision Logic', () => {
    it('should require review when confidence below threshold', () => {
      const params: ConfidenceCalculationParams = {
        classification: { confidence: 0.80 },
        extraction: { confidence: 0.75, fieldsExtracted: 5 },
        validation: { confidence: 0.70, isValid: true, issues: [] },
      }

      const result = calculateOverallConfidence(params)

      expect(result.needsReview).toBe(true)
    })

    it('should require review when validation fails regardless of confidence', () => {
      const params: ConfidenceCalculationParams = {
        classification: { confidence: 0.99 },
        extraction: { confidence: 0.98, fieldsExtracted: 10 },
        validation: { confidence: 0.97, isValid: false, issues: [] },
      }

      const result = calculateOverallConfidence(params)

      expect(result.needsReview).toBe(true) // Due to validation failure
    })

    it('should require review when correction failed', () => {
      const params: ConfidenceCalculationParams = {
        classification: { confidence: 0.95 },
        extraction: { confidence: 0.90, fieldsExtracted: 10 },
        validation: { confidence: 0.85, isValid: true, issues: [] },
        correction: {
          confidence: 0.00,
          isApplied: false,
          correctionFailed: true,
        },
      }

      const result = calculateOverallConfidence(params)

      expect(result.needsReview).toBe(true)
    })
  })
})

describe('Helper Functions', () => {
  describe('formatConfidence', () => {
    it('should format confidence as percentage', () => {
      expect(formatConfidence(0.953)).toBe('95.3%')
      expect(formatConfidence(0.7)).toBe('70.0%')
      expect(formatConfidence(1.0)).toBe('100.0%')
      expect(formatConfidence(0.0)).toBe('0.0%')
    })
  })

  describe('getConfidenceLevel', () => {
    it('should return correct level categories', () => {
      expect(getConfidenceLevel(0.95)).toBe('high')
      expect(getConfidenceLevel(0.75)).toBe('medium')
      expect(getConfidenceLevel(0.50)).toBe('low')
      expect(getConfidenceLevel(0.20)).toBe('critical')
    })
  })
})
