/**
 * Test Suite for Multi-Provider Weighted Voting Strategy
 *
 * Covers:
 * - Weighted consensus validation algorithm
 * - Provider weight normalization
 * - Agreement level calculation
 * - Edge cases (single provider, equal weights, disagreement)
 */

import { describe, it, expect } from 'vitest'
import type { LLMProvider } from '@/lib/llm/types'
import { DEFAULT_PROVIDER_WEIGHTS } from './multi-provider'

describe('Weighted Voting Strategy', () => {
  describe('DEFAULT_PROVIDER_WEIGHTS', () => {
    it('should have weights that sum to 1.0', () => {
      const sum = Object.values(DEFAULT_PROVIDER_WEIGHTS).reduce((a, b) => a + b, 0)
      expect(sum).toBeCloseTo(1.0, 2)
    })

    it('should have Anthropic with higher weight than OpenAI', () => {
      expect(DEFAULT_PROVIDER_WEIGHTS.anthropic).toBeGreaterThan(DEFAULT_PROVIDER_WEIGHTS.openai)
    })

    it('should have all weights between 0 and 1', () => {
      Object.values(DEFAULT_PROVIDER_WEIGHTS).forEach((weight) => {
        expect(weight).toBeGreaterThan(0)
        expect(weight).toBeLessThanOrEqual(1)
      })
    })
  })

  describe('Weighted Consensus Algorithm (Unit)', () => {
    // Helper to simulate weighted validation logic
    function calculateWeightedConsensus(
      results: Array<{
        provider: LLMProvider
        isValid: boolean
        confidence: number
      }>,
      weights: Record<LLMProvider, number>
    ) {
      // Normalize weights
      const totalWeight = results.reduce((sum, r) => sum + (weights[r.provider] || 0), 0)
      const normalizedWeights = Object.fromEntries(
        Object.entries(weights).map(([provider, weight]) => [provider, weight / totalWeight])
      ) as Record<LLMProvider, number>

      // Calculate weighted confidence
      const finalWeightedConfidence = results.reduce(
        (sum, result) => sum + result.confidence * normalizedWeights[result.provider],
        0
      )

      // Calculate weighted valid score
      const finalWeightedValidScore = results.reduce(
        (sum, result) => sum + (result.isValid ? 1.0 : 0.0) * normalizedWeights[result.provider],
        0
      )

      // Determine final isValid
      const isValid = finalWeightedValidScore >= 0.5

      return {
        finalWeightedConfidence,
        finalWeightedValidScore,
        isValid,
      }
    }

    it('should correctly calculate weighted confidence when both providers agree', () => {
      const results = [
        { provider: 'anthropic' as LLMProvider, isValid: true, confidence: 0.9 },
        { provider: 'openai' as LLMProvider, isValid: true, confidence: 0.85 },
      ]

      const { finalWeightedConfidence, isValid } = calculateWeightedConsensus(
        results,
        DEFAULT_PROVIDER_WEIGHTS
      )

      // Expected: 0.9 * 0.55 + 0.85 * 0.45 = 0.495 + 0.3825 = 0.8775
      expect(finalWeightedConfidence).toBeCloseTo(0.8775, 3)
      expect(isValid).toBe(true)
    })

    it('should use higher weighted provider when providers disagree', () => {
      const results = [
        { provider: 'anthropic' as LLMProvider, isValid: true, confidence: 0.8 },
        { provider: 'openai' as LLMProvider, isValid: false, confidence: 0.6 },
      ]

      const { finalWeightedValidScore, isValid } = calculateWeightedConsensus(
        results,
        DEFAULT_PROVIDER_WEIGHTS
      )

      // Anthropic (0.55 weight) says valid, OpenAI (0.45 weight) says invalid
      // Weighted valid score: 1.0 * 0.55 + 0.0 * 0.45 = 0.55
      expect(finalWeightedValidScore).toBeCloseTo(0.55, 2)
      expect(isValid).toBe(true) // >= 0.5 threshold
    })

    it('should mark as invalid when lower weighted provider alone says valid', () => {
      const results = [
        { provider: 'anthropic' as LLMProvider, isValid: false, confidence: 0.85 },
        { provider: 'openai' as LLMProvider, isValid: true, confidence: 0.9 },
      ]

      const { finalWeightedValidScore, isValid } = calculateWeightedConsensus(
        results,
        DEFAULT_PROVIDER_WEIGHTS
      )

      // Anthropic (0.55 weight) says invalid, OpenAI (0.45 weight) says valid
      // Weighted valid score: 0.0 * 0.55 + 1.0 * 0.45 = 0.45
      expect(finalWeightedValidScore).toBeCloseTo(0.45, 2)
      expect(isValid).toBe(false) // < 0.5 threshold
    })

    it('should handle equal weights correctly', () => {
      const results = [
        { provider: 'anthropic' as LLMProvider, isValid: true, confidence: 0.8 },
        { provider: 'openai' as LLMProvider, isValid: false, confidence: 0.7 },
      ]

      const equalWeights = { anthropic: 0.5, openai: 0.5 }
      const { finalWeightedValidScore, isValid } = calculateWeightedConsensus(results, equalWeights)

      // With equal weights: 1.0 * 0.5 + 0.0 * 0.5 = 0.5
      expect(finalWeightedValidScore).toBeCloseTo(0.5, 2)
      expect(isValid).toBe(true) // >= 0.5 threshold (tie goes to valid)
    })

    it('should normalize weights that do not sum to 1.0', () => {
      const results = [
        { provider: 'anthropic' as LLMProvider, isValid: true, confidence: 0.9 },
        { provider: 'openai' as LLMProvider, isValid: true, confidence: 0.8 },
      ]

      // Weights that sum to 2.0 (should be normalized to 0.5 each)
      const unnormalizedWeights = { anthropic: 1.0, openai: 1.0 }
      const { finalWeightedConfidence } = calculateWeightedConsensus(results, unnormalizedWeights)

      // After normalization: 0.9 * 0.5 + 0.8 * 0.5 = 0.45 + 0.4 = 0.85
      expect(finalWeightedConfidence).toBeCloseTo(0.85, 2)
    })

    it('should handle extreme confidence differences', () => {
      const results = [
        { provider: 'anthropic' as LLMProvider, isValid: true, confidence: 0.99 },
        { provider: 'openai' as LLMProvider, isValid: false, confidence: 0.3 },
      ]

      const { finalWeightedConfidence, isValid } = calculateWeightedConsensus(
        results,
        DEFAULT_PROVIDER_WEIGHTS
      )

      // Weighted confidence: 0.99 * 0.55 + 0.3 * 0.45 = 0.5445 + 0.135 = 0.6795
      expect(finalWeightedConfidence).toBeCloseTo(0.6795, 3)
      // Anthropic's higher weight (0.55) wins
      expect(isValid).toBe(true)
    })
  })

  describe('Agreement Level Calculation', () => {
    function calculateAgreementLevel(confidences: number[]) {
      const avgConfidence = confidences.reduce((sum, c) => sum + c, 0) / confidences.length
      const variance =
        confidences.reduce((sum, c) => sum + Math.pow(c - avgConfidence, 2), 0) / confidences.length
      return 1 - Math.min(variance * 4, 1)
    }

    it('should return 1.0 when providers perfectly agree', () => {
      const confidences = [0.9, 0.9, 0.9]
      const agreement = calculateAgreementLevel(confidences)
      expect(agreement).toBe(1.0)
    })

    it('should return lower value when providers disagree', () => {
      const confidences = [0.9, 0.5, 0.7]
      const agreement = calculateAgreementLevel(confidences)
      expect(agreement).toBeLessThan(1.0)
      expect(agreement).toBeGreaterThan(0.5)
    })

    it('should return very low value for extreme disagreement', () => {
      const confidences = [0.95, 0.2]
      const agreement = calculateAgreementLevel(confidences)
      expect(agreement).toBeLessThan(0.5)
    })

    it('should handle single confidence value', () => {
      const confidences = [0.85]
      const agreement = calculateAgreementLevel(confidences)
      expect(agreement).toBe(1.0) // No variance with single value
    })
  })

  describe('Edge Cases', () => {
    function calculateWeightedConsensus(
      results: Array<{
        provider: LLMProvider
        isValid: boolean
        confidence: number
      }>,
      weights: Record<LLMProvider, number>
    ) {
      const totalWeight = results.reduce((sum, r) => sum + (weights[r.provider] || 0), 0)
      const normalizedWeights = Object.fromEntries(
        Object.entries(weights).map(([provider, weight]) => [provider, weight / totalWeight])
      ) as Record<LLMProvider, number>

      const finalWeightedConfidence = results.reduce(
        (sum, result) => sum + result.confidence * normalizedWeights[result.provider],
        0
      )

      const finalWeightedValidScore = results.reduce(
        (sum, result) => sum + (result.isValid ? 1.0 : 0.0) * normalizedWeights[result.provider],
        0
      )

      return {
        finalWeightedConfidence,
        finalWeightedValidScore,
        isValid: finalWeightedValidScore >= 0.5,
      }
    }

    it('should handle single provider result', () => {
      const results = [{ provider: 'anthropic' as LLMProvider, isValid: true, confidence: 0.9 }]

      const { finalWeightedConfidence, isValid } = calculateWeightedConsensus(
        results,
        DEFAULT_PROVIDER_WEIGHTS
      )

      // With single provider, confidence is used directly (weight normalizes to 1.0)
      expect(finalWeightedConfidence).toBeCloseTo(0.9, 2)
      expect(isValid).toBe(true)
    })

    it('should handle zero confidence from one provider', () => {
      const results = [
        { provider: 'anthropic' as LLMProvider, isValid: false, confidence: 0.0 },
        { provider: 'openai' as LLMProvider, isValid: true, confidence: 0.9 },
      ]

      const { finalWeightedConfidence, isValid } = calculateWeightedConsensus(
        results,
        DEFAULT_PROVIDER_WEIGHTS
      )

      // 0.0 * 0.55 + 0.9 * 0.45 = 0.405
      expect(finalWeightedConfidence).toBeCloseTo(0.405, 3)
      // OpenAI (0.45 weight) says valid, not enough to reach 0.5
      expect(isValid).toBe(false)
    })

    it('should handle extreme weight imbalance', () => {
      const results = [
        { provider: 'anthropic' as LLMProvider, isValid: true, confidence: 0.8 },
        { provider: 'openai' as LLMProvider, isValid: false, confidence: 0.7 },
      ]

      const imbalancedWeights = { anthropic: 0.9, openai: 0.1 }
      const { finalWeightedValidScore, isValid } = calculateWeightedConsensus(
        results,
        imbalancedWeights
      )

      // Anthropic dominates: 1.0 * 0.9 + 0.0 * 0.1 = 0.9
      expect(finalWeightedValidScore).toBeCloseTo(0.9, 2)
      expect(isValid).toBe(true)
    })
  })

  describe('Realistic Scenarios', () => {
    function calculateWeightedConsensus(
      results: Array<{
        provider: LLMProvider
        isValid: boolean
        confidence: number
      }>,
      weights: Record<LLMProvider, number>
    ) {
      const totalWeight = results.reduce((sum, r) => sum + (weights[r.provider] || 0), 0)
      const normalizedWeights = Object.fromEntries(
        Object.entries(weights).map(([provider, weight]) => [provider, weight / totalWeight])
      ) as Record<LLMProvider, number>

      const finalWeightedConfidence = results.reduce(
        (sum, result) => sum + result.confidence * normalizedWeights[result.provider],
        0
      )

      const finalWeightedValidScore = results.reduce(
        (sum, result) => sum + (result.isValid ? 1.0 : 0.0) * normalizedWeights[result.provider],
        0
      )

      return {
        finalWeightedConfidence,
        finalWeightedValidScore,
        isValid: finalWeightedValidScore >= 0.5,
      }
    }

    it('scenario: high-quality invoice - both providers agree with high confidence', () => {
      const results = [
        { provider: 'anthropic' as LLMProvider, isValid: true, confidence: 0.95 },
        { provider: 'openai' as LLMProvider, isValid: true, confidence: 0.92 },
      ]

      const { finalWeightedConfidence, isValid } = calculateWeightedConsensus(
        results,
        DEFAULT_PROVIDER_WEIGHTS
      )

      // 0.95 * 0.55 + 0.92 * 0.45 = 0.5225 + 0.414 = 0.9365
      expect(finalWeightedConfidence).toBeCloseTo(0.9365, 3)
      expect(finalWeightedConfidence).toBeGreaterThan(0.90) // High confidence maintained
      expect(isValid).toBe(true)
    })

    it('scenario: ambiguous receipt - providers disagree, Anthropic more confident', () => {
      const results = [
        { provider: 'anthropic' as LLMProvider, isValid: false, confidence: 0.85 },
        { provider: 'openai' as LLMProvider, isValid: true, confidence: 0.6 },
      ]

      const { finalWeightedValidScore, isValid } = calculateWeightedConsensus(
        results,
        DEFAULT_PROVIDER_WEIGHTS
      )

      // Anthropic (0.55) says invalid with high confidence, OpenAI (0.45) says valid with low confidence
      // Valid score: 0.0 * 0.55 + 1.0 * 0.45 = 0.45
      expect(finalWeightedValidScore).toBeCloseTo(0.45, 2)
      expect(isValid).toBe(false) // Anthropic's weight prevails
    })

    it('scenario: borderline case - exactly at threshold', () => {
      // Engineer weights so weighted valid score = 0.5 exactly
      const results = [
        { provider: 'anthropic' as LLMProvider, isValid: true, confidence: 0.8 },
        { provider: 'openai' as LLMProvider, isValid: false, confidence: 0.7 },
      ]

      const balancedWeights = { anthropic: 0.5, openai: 0.5 }
      const { finalWeightedValidScore, isValid } = calculateWeightedConsensus(
        results,
        balancedWeights
      )

      expect(finalWeightedValidScore).toBeCloseTo(0.5, 2)
      expect(isValid).toBe(true) // >= 0.5 threshold (tie goes to valid)
    })
  })
})
