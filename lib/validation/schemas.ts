import { z } from 'zod'

/**
 * Validation schemas for all application data types
 * Using Zod for runtime type validation
 */

// ============================================
// User Schemas
// ============================================

export const createUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().optional(),
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email('Invalid email address').optional(),
  password: z.string().min(8, 'Password must be at least 8 characters').optional(),
})

// ============================================
// Document Schemas
// ============================================

export const documentTypeSchema = z.enum([
  'INVOICE',
  'RECEIPT',
  'PAYSLIP',
  'BANK_STATEMENT',
  'TAX_FORM',
  'CONTRACT',
  'OTHER',
])

export const documentStatusSchema = z.enum([
  'UPLOADING',
  'PROCESSING',
  'NEEDS_REVIEW',
  'COMPLETED',
  'FAILED',
  'ARCHIVED',
])

export const uploadDocumentSchema = z.object({
  file: z.custom<File>((file) => file instanceof File, {
    message: 'Invalid file',
  }),
})

export const documentQuerySchema = z.object({
  status: documentStatusSchema.optional(),
  type: documentTypeSchema.optional(),
  limit: z.coerce.number().int().positive().max(100).default(20),
  cursor: z.string().optional(),
})

// ============================================
// File Validation
// ============================================

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
]

export const fileValidationSchema = z.object({
  file: z
    .custom<File>()
    .refine((file) => file.size <= MAX_FILE_SIZE, 'File size must be less than 10MB')
    .refine(
      (file) => ALLOWED_FILE_TYPES.includes(file.type),
      'File must be PDF, JPEG, PNG, or WebP'
    ),
})

// ============================================
// Pipeline Schemas
// ============================================

export const pipelineStageSchema = z.enum([
  'UPLOAD',
  'CLASSIFICATION',
  'EXTRACTION',
  'VALIDATION',
  'CORRECTION',
  'FINALIZE',
])

export const stageStatusSchema = z.enum([
  'PENDING',
  'RUNNING',
  'SUCCESS',
  'FAILED',
  'RETRYING',
])

// ============================================
// LLM Response Schemas
// ============================================

export const classificationResponseSchema = z.object({
  documentType: documentTypeSchema,
  confidence: z.number().min(0).max(1),
  reasoning: z.string(),
})

export const extractionFieldSchema = z.object({
  name: z.string(),
  value: z.unknown(),
  confidence: z.number().min(0).max(1),
  type: z.enum(['string', 'number', 'date', 'boolean', 'currency']),
})

export const extractionResponseSchema = z.object({
  fields: z.array(extractionFieldSchema),
  confidence: z.number().min(0).max(1),
  rawData: z.record(z.string(), z.unknown()),
})

export const validationIssueSchema = z.object({
  field: z.string(),
  issue: z.string(),
  severity: z.enum(['error', 'warning', 'info']),
  suggestion: z.string().optional(),
})

export const validationResponseSchema = z.object({
  isValid: z.boolean(),
  issues: z.array(validationIssueSchema),
  confidence: z.number().min(0).max(1),
})

// ============================================
// API Response Schemas
// ============================================

export const apiErrorSchema = z.object({
  error: z.object({
    message: z.string(),
    code: z.string(),
    details: z.unknown().optional(),
  }),
})

export const paginationSchema = z.object({
  page: z.number().int().positive(),
  pageSize: z.number().int().positive(),
  total: z.number().int().nonnegative(),
  totalPages: z.number().int().nonnegative(),
})

export function paginatedResponseSchema<T extends z.ZodTypeAny>(dataSchema: T) {
  return z.object({
    data: z.array(dataSchema),
    pagination: paginationSchema,
  })
}

// ============================================
// Type Exports
// ============================================

export type CreateUserInput = z.infer<typeof createUserSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>

export type DocumentType = z.infer<typeof documentTypeSchema>
export type DocumentStatus = z.infer<typeof documentStatusSchema>
export type DocumentQuery = z.infer<typeof documentQuerySchema>

export type PipelineStage = z.infer<typeof pipelineStageSchema>
export type StageStatus = z.infer<typeof stageStatusSchema>

export type ClassificationResponse = z.infer<typeof classificationResponseSchema>
export type ExtractionField = z.infer<typeof extractionFieldSchema>
export type ExtractionResponse = z.infer<typeof extractionResponseSchema>
export type ValidationIssue = z.infer<typeof validationIssueSchema>
export type ValidationResponse = z.infer<typeof validationResponseSchema>

export type ApiError = z.infer<typeof apiErrorSchema>
export type Pagination = z.infer<typeof paginationSchema>
