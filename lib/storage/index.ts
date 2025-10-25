/**
 * Storage Module
 *
 * Exports all storage-related utilities and services
 */

export { s3Client, bucketName, s3ClientInfo } from './client'
export { storageService, StorageService, type UploadOptions, type UploadResult } from './service'
export {
  validateFile,
  validateFileOrThrow,
  generateSafeFileName,
  getFileExtension,
  getMimeTypeFromExtension,
  getExtensionFromMimeType,
  isImageFile,
  isPdfFile,
  ALLOWED_MIME_TYPES,
  MAX_FILE_SIZE,
  type AllowedMimeType,
  type FileValidationResult,
} from './validation'
