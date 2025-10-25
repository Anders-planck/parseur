/**
 * File Validation Utilities
 *
 * Validates uploaded files for type, size, and content
 */

import { config } from '@/lib/config'
import { ValidationError } from '@/lib/utils/errors'

/**
 * Allowed MIME types for document uploads
 */
export const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
] as const

/**
 * Type for allowed MIME types
 */
export type AllowedMimeType = (typeof ALLOWED_MIME_TYPES)[number]

/**
 * Maximum file size (from config)
 */
export const MAX_FILE_SIZE = config.app.maxFileSize

/**
 * File extension to MIME type mapping
 */
const EXTENSION_TO_MIME: Record<string, AllowedMimeType> = {
  pdf: 'application/pdf',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
}

/**
 * MIME type to file extension mapping
 */
const MIME_TO_EXTENSION: Record<AllowedMimeType, string> = {
  'application/pdf': 'pdf',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
}

/**
 * File validation result
 */
export interface FileValidationResult {
  isValid: boolean
  mimeType: AllowedMimeType
  fileSize: number
  fileName: string
  extension: string
  errors: string[]
}

/**
 * Validate file for upload
 *
 * Checks:
 * - File exists
 * - File size within limits
 * - MIME type is allowed
 * - File extension matches MIME type
 *
 * @param file - File or Buffer to validate
 * @param fileName - Original file name
 * @returns Validation result
 */
export function validateFile(
  file: File | Buffer,
  fileName?: string
): FileValidationResult {
  const errors: string[] = []

  // Extract file properties
  let fileSize: number
  let mimeType: string
  let name: string

  if (file instanceof File) {
    fileSize = file.size
    mimeType = file.type
    name = fileName || file.name
  } else {
    // Buffer - need fileName and mimeType from caller
    if (!fileName) {
      throw new ValidationError('File name is required for Buffer uploads')
    }
    fileSize = file.length
    name = fileName

    // Infer MIME type from extension
    const extension = getFileExtension(name)
    mimeType = EXTENSION_TO_MIME[extension] || 'application/octet-stream'
  }

  // Validate file size
  if (fileSize === 0) {
    errors.push('File is empty')
  } else if (fileSize > MAX_FILE_SIZE) {
    const maxSizeMB = (MAX_FILE_SIZE / (1024 * 1024)).toFixed(2)
    const actualSizeMB = (fileSize / (1024 * 1024)).toFixed(2)
    errors.push(
      `File size (${actualSizeMB}MB) exceeds maximum allowed size (${maxSizeMB}MB)`
    )
  }

  // Validate MIME type
  if (!ALLOWED_MIME_TYPES.includes(mimeType as AllowedMimeType)) {
    errors.push(
      `File type '${mimeType}' is not supported. Allowed types: ${ALLOWED_MIME_TYPES.join(', ')}`
    )
  }

  // Validate file extension
  const extension = getFileExtension(name)
  const expectedMimeType = EXTENSION_TO_MIME[extension]

  if (expectedMimeType && expectedMimeType !== mimeType) {
    errors.push(
      `File extension '.${extension}' does not match MIME type '${mimeType}'`
    )
  }

  return {
    isValid: errors.length === 0,
    mimeType: mimeType as AllowedMimeType,
    fileSize,
    fileName: name,
    extension,
    errors,
  }
}

/**
 * Validate file and throw error if invalid
 *
 * @param file - File or Buffer to validate
 * @param fileName - Original file name (required for Buffer)
 * @throws ValidationError if file is invalid
 */
export function validateFileOrThrow(
  file: File | Buffer,
  fileName?: string
): void {
  const result = validateFile(file, fileName)

  if (!result.isValid) {
    throw new ValidationError('File validation failed', {
      errors: result.errors,
      fileName: result.fileName,
      fileSize: result.fileSize,
      mimeType: result.mimeType,
    })
  }
}

/**
 * Get file extension from filename
 *
 * @param fileName - File name
 * @returns File extension (lowercase, without dot)
 */
export function getFileExtension(fileName: string): string {
  const parts = fileName.split('.')
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : ''
}

/**
 * Get MIME type from file extension
 *
 * @param extension - File extension (with or without dot)
 * @returns MIME type or undefined if not recognized
 */
export function getMimeTypeFromExtension(
  extension: string
): AllowedMimeType | undefined {
  const ext = extension.replace(/^\./, '').toLowerCase()
  return EXTENSION_TO_MIME[ext]
}

/**
 * Get file extension from MIME type
 *
 * @param mimeType - MIME type
 * @returns File extension (without dot) or undefined if not recognized
 */
export function getExtensionFromMimeType(
  mimeType: string
): string | undefined {
  return MIME_TO_EXTENSION[mimeType as AllowedMimeType]
}

/**
 * Check if file type is an image
 *
 * @param mimeType - MIME type to check
 * @returns True if MIME type is an image
 */
export function isImageFile(mimeType: string): boolean {
  return mimeType.startsWith('image/')
}

/**
 * Check if file type is a PDF
 *
 * @param mimeType - MIME type to check
 * @returns True if MIME type is PDF
 */
export function isPdfFile(mimeType: string): boolean {
  return mimeType === 'application/pdf'
}

/**
 * Generate safe filename for storage
 *
 * Replaces special characters with underscores and adds timestamp
 *
 * @param fileName - Original file name
 * @param addTimestamp - Whether to add timestamp prefix (default: true)
 * @returns Safe filename for storage
 */
export function generateSafeFileName(
  fileName: string,
  addTimestamp = true
): string {
  const extension = getFileExtension(fileName)
  const nameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.')) || fileName

  // Remove special characters and spaces
  const safeName = nameWithoutExt
    .replace(/[^a-zA-Z0-9-_]/g, '_')
    .replace(/_+/g, '_')
    .toLowerCase()

  if (addTimestamp) {
    const timestamp = Date.now()
    return `${timestamp}_${safeName}.${extension}`
  }

  return `${safeName}.${extension}`
}
