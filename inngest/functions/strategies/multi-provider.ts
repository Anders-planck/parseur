// src/lib/multiProvider.ts
/**
 * Multi-provider orchestration (improved)
 * - Uses imported types (no local re-definitions)
 * - Strong TypeScript usage, no `any`
 * - Strategies: highest-confidence, fastest, cheapest, consensus, weighted-voting
 * - Provider timeout, requireAll, fastest fallback
 * - Weighted voting with normalization and tie-break
 * - Merge/dedupe issues, agreement level metric
 * - Sanity checks (zero-field extraction), logging
 */

import { getLLMService } from '@/lib/llm'
import type {
  ClassificationRequest,
  ClassificationResult,
  ExtractionRequest,
  ExtractionResult,
  ValidationRequest,
  ValidationResult,
  LLMProvider,
} from '@/lib/llm/types'
import { logger } from '@/lib/utils/logger'

export type SelectionStrategy =
  | 'highest-confidence'
  | 'fastest'
  | 'cheapest'
  | 'consensus'
  | 'weighted-voting'

export interface MultiProviderConfig {
  providers: LLMProvider[]
  strategy: SelectionStrategy
  timeoutMs?: number
  requireAll?: boolean
  providerWeights?: Record<LLMProvider, number>
}

export const DEFAULT_PROVIDER_WEIGHTS: Record<LLMProvider, number> = {
  openai: 0.5,
  anthropic: 0.5,
} 

/* Provider call wrapper */
type ProviderResult<T> = {
  result: T | null
  provider: LLMProvider
  durationMs: number
  error?: Error
}

function isSuccess<T>(r: ProviderResult<T>): r is ProviderResult<T> & { result: T; error: undefined } {
  return !r.error && r.result !== null
}

/* --- Utility: call provider with timeout --- */
async function callWithTimeout<T>(
  provider: LLMProvider,
  invoke: (svc: ReturnType<typeof getLLMService>) => Promise<T>,
  timeoutMs: number
): Promise<ProviderResult<T>> {
  const start = Date.now()
  try {
    const svc = getLLMService(provider)
    const call = invoke(svc)
    const timeout = new Promise<never>((_, rej) => setTimeout(() => rej(new Error('provider timeout')), timeoutMs))
    const result = (await Promise.race([call, timeout])) as T
    return { result, provider, durationMs: Date.now() - start }
  } catch (err) {
    const e = err instanceof Error ? err : new Error(String(err))
    logger.warn({ provider, err: e.message }, 'Provider call failed or timed out')
    return { result: null, provider, durationMs: Date.now() - start, error: e }
  }
}

/* --- Selection helpers --- */
function selectByHighestConfidence<T extends { confidence: number }>(items: Array<ProviderResult<T> & { result: T }>) {
  return items.reduce((a, b) => (b.result.confidence > a.result.confidence ? b : a))
}

/* function selectByFastest<T>(items: Array<ProviderResult<T> & { result: T }>) {
  return items.reduce((a, b) => (b.durationMs < a.durationMs ? b : a))
}
function selectByCheapest<T extends { tokensUsed?: number }>(items: Array<ProviderResult<T> & { result: T }>) {
  return items.reduce((a, b) =>
    (b.result.tokensUsed ?? Number.MAX_SAFE_INTEGER) < (a.result.tokensUsed ?? Number.MAX_SAFE_INTEGER) ? b : a
  )
} */

/* --- Issues merging & dedupe --- */
type Issue = { field: string; issue: string; severity: 'error' | 'warning' | 'info'; [k: string]: unknown }

// Make dedupeIssues generic over a minimal issue shape so external ValidationIssue types
// (which may lack an index signature) are accepted as long as they expose the required fields.
function dedupeIssues<T extends { field: string; issue: string; severity: 'error' | 'warning' | 'info' }>(issues: T[]): T[] {
  const map = new Map<string, T>()
  for (const it of issues) {
    const key = `${it.field}::${it.issue}::${it.severity}`
    if (!map.has(key)) map.set(key, it)
  }
  return Array.from(map.values()).sort((a, b) => {
    const rank: Record<string, number> = { error: 0, warning: 1, info: 2 }
    return (rank[a.severity] ?? 9) - (rank[b.severity] ?? 9)
  }) as T[]
}

/* --- Normalize provider weights for only-present providers --- */
function normalizeWeights(results: Array<ProviderResult<unknown>>, weights: Record<LLMProvider, number>) {
  const present = results.map((r) => r.provider)
  const sum = present.reduce((s, p) => s + (weights[p] ?? 0), 0)
  if (sum <= 0) {
    const equal = 1 / present.length
    return Object.fromEntries(present.map((p) => [p, equal])) as Record<LLMProvider, number>
  }
  return Object.fromEntries(present.map((p) => [p, (weights[p] ?? 0) / sum])) as Record<LLMProvider, number>
}

/* --- Weighted consensus for validation --- */
function weightedConsensusValidation(
  results: Array<ProviderResult<ValidationResult> & { result: ValidationResult }>,
  providerWeights: Record<LLMProvider, number>,
  totalMs: number
): ValidationResult {
  const weights = normalizeWeights(results, providerWeights)
  const votes = results.map((r) => {
    const w = weights[r.provider] ?? 0
    const conf = r.result.confidence ?? 0
    const validBit = r.result.isValid ? 1 : 0
    return { provider: r.provider, w, conf, validBit }
  })

  const totalWeight = votes.reduce((s, v) => s + v.w, 0) || 1
  const weightedConf = votes.reduce((s, v) => s + v.conf * v.w, 0) / totalWeight
  const weightedValid = votes.reduce((s, v) => s + v.validBit * v.w, 0) / totalWeight

  // stricter consensus when few providers: require >= 0.6
  const consensusThreshold = Math.max(0.5, 0.6)
  const finalIsValid = weightedValid >= consensusThreshold

  const avgConf = votes.reduce((s, v) => s + v.conf, 0) / votes.length
  const variance = votes.reduce((s, v) => s + Math.pow(v.conf - avgConf, 2), 0) / votes.length
  const agreementLevel = 1 - Math.min(variance * 4, 1)

  const allIssues = results.flatMap((r) => r.result.issues ?? ([] as Issue[]))
  const unique = dedupeIssues(allIssues)

  logger.info(
    {
      providers: results.map((r) => r.provider),
      weightedConf: Number(weightedConf.toFixed(3)),
      weightedValid: Number(weightedValid.toFixed(3)),
      finalIsValid,
      agreementLevel: Number(agreementLevel.toFixed(3)),
      uniqueIssues: unique.length,
    },
    'weightedConsensusValidation'
  )

  const topProvider = votes.slice().sort((a, b) => b.w - a.w)[0]?.provider ?? results[0].provider

  // return shape aligned to ValidationResult (augment if your real type differs)
  return {
    isValid: finalIsValid,
    issues: unique,
    confidence: weightedConf,
    model: `weighted-consensus (${results.map((r) => r.provider).join(',')})`,
    tokensUsed: results.reduce((s, r) => s + (r.result.tokensUsed ?? 0), 0),
    processingTimeMs: totalMs,
    provider: topProvider,
  } as ValidationResult
}

/* --- Simple consensus merge (majority) --- */
function mergeValidationResults(
  results: Array<ProviderResult<ValidationResult> & { result: ValidationResult }>,
  totalMs: number
): ValidationResult {
  const unique = dedupeIssues(results.flatMap((r) => r.result.issues ?? ([] as Issue[])))
  const avgConf = results.reduce((s, r) => s + r.result.confidence, 0) / results.length
  const validCount = results.filter((r) => r.result.isValid).length
  const isValid = validCount > results.length / 2

  return {
    isValid,
    issues: unique,
    confidence: avgConf,
    model: `consensus (${results.map((r) => r.provider).join(',')})`,
    tokensUsed: results.reduce((s, r) => s + (r.result.tokensUsed ?? 0), 0),
    processingTimeMs: totalMs,
    provider: results[0].provider,
  } as ValidationResult
}

/* --- Public: multiProviderClassify --- */
export async function multiProviderClassify(
  request: ClassificationRequest,
  config: MultiProviderConfig
): Promise<ClassificationResult> {
  const start = Date.now()
  const { providers, strategy, timeoutMs = 30_000, requireAll = false } = config
  logger.info({ providers, strategy, requireAll }, 'multiProviderClassify start')

  const calls = providers.map((p) => callWithTimeout<ClassificationResult>(p, (svc) => svc.classify(request), timeoutMs))

  if (requireAll) {
    const settled = await Promise.all(calls)
    const succ = settled.filter(isSuccess)
    if (succ.length === 0) throw new Error('All providers failed classification')
    const chosen = selectByHighestConfidence(succ as Array<ProviderResult<ClassificationResult> & { result: ClassificationResult }>)
    return { ...chosen.result, model: `${chosen.result.model} (multi:${providers.join(',')})` }
  }

  if (strategy === 'fastest') {
    try {
      const first = await Promise.any(calls)
      if (!isSuccess(first)) throw new Error('No successful classification in fastest mode')
      return { ...(first.result as ClassificationResult), model: `${first.result.model} (fastest:${first.provider})` }
    } catch (err) {
      logger.warn({ err: (err as Error).message }, 'fastest classification fallback - collecting all')
    }
  }

  // default collect all and choose
  const settled = await Promise.all(calls)
  const succ = settled.filter(isSuccess)
  if (succ.length === 0) throw new Error('All providers failed classification (collect)')
  const pick = selectByHighestConfidence(succ as Array<ProviderResult<ClassificationResult> & { result: ClassificationResult }>)
  const totalMs = Date.now() - start
  return { ...pick.result, model: `${pick.result.model} (multi:${providers.join(',')})`, processingTimeMs: totalMs }
}

/* --- Public: multiProviderExtract --- */
export async function multiProviderExtract(
  request: ExtractionRequest,
  config: MultiProviderConfig
): Promise<ExtractionResult> {
  const start = Date.now()
  const { providers, strategy, timeoutMs = 30_000, requireAll = false } = config
  logger.info({ providers, strategy, requireAll }, 'multiProviderExtract start')

  const calls = providers.map((p) => callWithTimeout<ExtractionResult>(p, (svc) => svc.extract(request), timeoutMs))

  if (requireAll) {
    const settled = await Promise.all(calls)
    const succ = settled.filter(isSuccess)
    if (succ.length === 0) throw new Error('All providers failed extraction')
    const chosen = selectByHighestConfidence(succ as Array<ProviderResult<ExtractionResult> & { result: ExtractionResult }>)
    const chosenRes = chosen.result
    if (!Array.isArray((chosenRes as ExtractionResult).fields) || (chosenRes as ExtractionResult).fields.length === 0) {
      logger.warn({ provider: chosen.provider }, 'extraction returned zero fields; force low confidence')
      chosenRes.confidence = Math.min(chosenRes.confidence, 0.05)
    }
    const totalMs = Date.now() - start
    return { ...chosenRes, model: `${chosenRes.model} (multi:${providers.join(',')})`, processingTimeMs: totalMs }
  }

  if (strategy === 'fastest') {
    try {
      const first = await Promise.any(calls)
      if (isSuccess(first)) {
        const res = first.result as ExtractionResult
        if (!Array.isArray(res.fields) || res.fields.length === 0) {
          logger.warn('fastest extraction returned zero fields; fallback to collect')
        } else {
          const totalMs = Date.now() - start
          return { ...res, model: `${res.model} (fastest:${first.provider})`, processingTimeMs: totalMs }
        }
      }
    } catch (err) {
      logger.info({ err: (err as Error).message }, 'fastest extraction did not produce a valid result')
    }
  }

  const settled = await Promise.all(calls)
  const succ = settled.filter(isSuccess)
  if (succ.length === 0) throw new Error('All providers failed extraction (collect)')
  const pick = selectByHighestConfidence(succ as Array<ProviderResult<ExtractionResult> & { result: ExtractionResult }>)
  const pickRes = pick.result
  if (!Array.isArray(pickRes.fields) || pickRes.fields.length === 0) {
    logger.warn('selected extraction returned zero fields - forcing low confidence')
    pickRes.confidence = Math.min(pickRes.confidence, 0.05)
  }
  const totalMs = Date.now() - start
  return { ...pickRes, model: `${pickRes.model} (multi:${providers.join(',')})`, processingTimeMs: totalMs }
}

/* --- Public: multiProviderValidate (image-aware) --- */
export async function multiProviderValidate(
  request: ValidationRequest,
  config: MultiProviderConfig
): Promise<ValidationResult> {
  const start = Date.now()
  const { providers, strategy, timeoutMs = 30_000, providerWeights } = config
  logger.info({ providers, strategy }, 'multiProviderValidate start')

  const calls = providers.map((p) => callWithTimeout<ValidationResult>(p, (svc) => svc.validate(request), timeoutMs))
  const settled = await Promise.all(calls)
  const succ = settled.filter(isSuccess)
  if (succ.length === 0) throw new Error('All providers failed validation')

  if (strategy === 'consensus') {
    return mergeValidationResults(succ as Array<ProviderResult<ValidationResult> & { result: ValidationResult }>, Date.now() - start)
  }

  if (strategy === 'weighted-voting') {
    const weights = providerWeights ?? DEFAULT_PROVIDER_WEIGHTS
    return weightedConsensusValidation(succ as Array<ProviderResult<ValidationResult> & { result: ValidationResult }>, weights, Date.now() - start)
  }

  // otherwise pick best result and merge issues for visibility
  const pick = selectByHighestConfidence(succ as Array<ProviderResult<ValidationResult> & { result: ValidationResult }>)
  const mergedIssues = dedupeIssues(succ.flatMap((r) => r.result.issues ?? ([] as Issue[])))
  const totalMs = Date.now() - start
  return { ...pick.result, issues: mergedIssues, model: `${pick.result.model} (selected:${pick.provider})`, processingTimeMs: totalMs }
}

/* --- Utility: overall confidence calculator (exported) --- */
export function calculateOverallConfidence(params: {
  classification: number
  extraction: number
  validation: { confidence: number; isValid: boolean; issues: Issue[] }
  correction?: { confidence: number; isApplied: boolean; correctionFailed?: boolean }
}): number {
  const WEIGHTS = { classification: 0.1, extraction: 0.5, validation: 0.3, correction: 0.1 }

  let score = params.classification * WEIGHTS.classification + params.extraction * WEIGHTS.extraction

  let valScore = params.validation.confidence
  if (!params.validation.isValid) {
    const errCount = params.validation.issues.filter((i) => i.severity === 'error').length
    const warnCount = params.validation.issues.filter((i) => i.severity === 'warning').length
    const errPenalty = Math.min(errCount * 0.15, 0.75)
    const warnPenalty = Math.min(warnCount * 0.05, 0.25)
    valScore = Math.max(0, valScore - errPenalty - warnPenalty)
  }
  score += valScore * WEIGHTS.validation

  if (params.correction && params.correction.isApplied) {
    score += params.correction.confidence * WEIGHTS.correction
  } else if (!params.validation.isValid) {
    // penalize if validation failed and no correction applied
    score *= 0.7
  }

  return Math.max(0, Math.min(1, score))
}

/* --- Helper: decide if multi-provider should be used --- */
export function shouldUseMultiProvider(options: { documentType?: string; fileSize?: number; userTier?: string }): boolean {
  const important = ['INVOICE', 'CONTRACT', 'TAX_FORM', 'BANK_STATEMENT']
  const isImportant = options.documentType ? important.includes(options.documentType) : false
  const isLarge = (options.fileSize ?? 0) > 5 * 1024 * 1024
  const isPremium = options.userTier === 'premium' || options.userTier === 'enterprise'
  return isImportant || isLarge || isPremium
}