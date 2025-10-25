/**
 * Storage Service
 *
 * Provides high-level abstraction for S3 file operations
 * Works with both AWS S3 and MinIO
 */

import {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
  CopyObjectCommand,
  type PutObjectCommandInput,
  type GetObjectCommandOutput,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { Upload } from '@aws-sdk/lib-storage'
import { s3Client, bucketName } from './client'
import {
  validateFileOrThrow,
  generateSafeFileName,
  type AllowedMimeType,
} from './validation'
import { logger } from '@/lib/utils/logger'
import { StorageError, NotFoundError } from '@/lib/utils/errors'
import { Readable } from 'stream'

/**
 * File upload options
 */
export interface UploadOptions {
  userId: string
  folder?: string
  makePublic?: boolean
  metadata?: Record<string, string>
}

/**
 * File upload result
 */
export interface UploadResult {
  s3Key: string
  s3Bucket: string
  fileName: string
  mimeType: AllowedMimeType
  fileSize: number
  uploadedAt: Date
}

/**
 * Storage Service Class
 *
 * Handles all S3 operations with error handling and logging
 */
export class StorageService {
  /**
   * Upload file to S3
   *
   * @param file - File or Buffer to upload
   * @param fileName - Original file name
   * @param options - Upload options
   * @returns Upload result with S3 key and metadata
   */
  async uploadFile(
    file: File | Buffer,
    fileName: string,
    options: UploadOptions
  ): Promise<UploadResult> {
    try {
      // Validate file
      validateFileOrThrow(file, fileName)

      // Generate safe S3 key
      const safeFileName = generateSafeFileName(fileName)
      const s3Key = this.generateS3Key(safeFileName, options)

      // Get file buffer and metadata
      const buffer = file instanceof File ? Buffer.from(await file.arrayBuffer()) : file
      const mimeType = this.getMimeType(file, fileName)
      const fileSize = buffer.length

      // Prepare upload parameters
      const uploadParams: PutObjectCommandInput = {
        Bucket: bucketName,
        Key: s3Key,
        Body: buffer,
        ContentType: mimeType,
        Metadata: {
          userId: options.userId,
          originalFileName: fileName,
          uploadedAt: new Date().toISOString(),
          ...options.metadata,
        },
        ...(options.makePublic && { ACL: 'public-read' }),
      }

      // Use multipart upload for large files (>5MB)
      if (fileSize > 5 * 1024 * 1024) {
        logger.info({ s3Key, fileSize }, 'Using multipart upload for large file')
        const upload = new Upload({
          client: s3Client,
          params: uploadParams,
        })

        await upload.done()
      } else {
        // Standard upload for smaller files
        await s3Client.send(new PutObjectCommand(uploadParams))
      }

      logger.info(
        { s3Key, s3Bucket: bucketName, userId: options.userId, fileSize },
        'File uploaded successfully'
      )

      return {
        s3Key,
        s3Bucket: bucketName,
        fileName: safeFileName,
        mimeType: mimeType as AllowedMimeType,
        fileSize,
        uploadedAt: new Date(),
      }
    } catch (error) {
      logger.error({ error, fileName, userId: options.userId }, 'File upload failed')

      if (error instanceof Error) {
        throw new StorageError(`Failed to upload file: ${error.message}`, {
          fileName,
          error: error.message,
        })
      }

      throw new StorageError('Failed to upload file', { fileName })
    }
  }

  /**
   * Download file from S3
   *
   * @param s3Key - S3 object key
   * @returns File buffer and metadata
   */
  async downloadFile(s3Key: string): Promise<{
    buffer: Buffer
    mimeType: string
    fileSize: number
    metadata?: Record<string, string>
  }> {
    try {
      const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: s3Key,
      })

      const response: GetObjectCommandOutput = await s3Client.send(command)

      if (!response.Body) {
        throw new NotFoundError(`File not found: ${s3Key}`)
      }

      // Convert stream to buffer
      const buffer = await this.streamToBuffer(response.Body as Readable)

      logger.info({ s3Key, fileSize: buffer.length }, 'File downloaded successfully')

      return {
        buffer,
        mimeType: response.ContentType || 'application/octet-stream',
        fileSize: response.ContentLength || buffer.length,
        metadata: response.Metadata,
      }
    } catch (error) {
      logger.error({ error, s3Key }, 'File download failed')

      if (error instanceof NotFoundError) {
        throw error
      }

      if (error instanceof Error) {
        throw new StorageError(`Failed to download file: ${error.message}`, {
          s3Key,
          error: error.message,
        })
      }

      throw new StorageError('Failed to download file', { s3Key })
    }
  }

  /**
   * Delete file from S3
   *
   * @param s3Key - S3 object key
   */
  async deleteFile(s3Key: string): Promise<void> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: bucketName,
        Key: s3Key,
      })

      await s3Client.send(command)

      logger.info({ s3Key }, 'File deleted successfully')
    } catch (error) {
      logger.error({ error, s3Key }, 'File deletion failed')

      if (error instanceof Error) {
        throw new StorageError(`Failed to delete file: ${error.message}`, {
          s3Key,
          error: error.message,
        })
      }

      throw new StorageError('Failed to delete file', { s3Key })
    }
  }

  /**
   * Check if file exists in S3
   *
   * @param s3Key - S3 object key
   * @returns True if file exists
   */
  async fileExists(s3Key: string): Promise<boolean> {
    try {
      const command = new HeadObjectCommand({
        Bucket: bucketName,
        Key: s3Key,
      })

      await s3Client.send(command)
      return true
    } catch (error) {
      logger.error({ error, s3Key }, 'Failed to delete file from S3')
      return false
    }
  }

  /**
   * Get file metadata from S3
   *
   * @param s3Key - S3 object key
   * @returns File metadata
   */
  async getFileMetadata(s3Key: string): Promise<{
    fileSize: number
    mimeType: string
    lastModified?: Date
    metadata?: Record<string, string>
  }> {
    try {
      const command = new HeadObjectCommand({
        Bucket: bucketName,
        Key: s3Key,
      })

      const response = await s3Client.send(command)

      return {
        fileSize: response.ContentLength || 0,
        mimeType: response.ContentType || 'application/octet-stream',
        lastModified: response.LastModified,
        metadata: response.Metadata,
      }
    } catch (error) {
      logger.error({ error, s3Key }, 'Failed to get file metadata')

      if (error instanceof Error) {
        throw new StorageError(`Failed to get file metadata: ${error.message}`, {
          s3Key,
          error: error.message,
        })
      }

      throw new StorageError('Failed to get file metadata', { s3Key })
    }
  }

  /**
   * Copy file within S3
   *
   * @param sourceKey - Source S3 key
   * @param destinationKey - Destination S3 key
   */
  async copyFile(sourceKey: string, destinationKey: string): Promise<void> {
    try {
      const command = new CopyObjectCommand({
        Bucket: bucketName,
        CopySource: `${bucketName}/${sourceKey}`,
        Key: destinationKey,
      })

      await s3Client.send(command)

      logger.info({ sourceKey, destinationKey }, 'File copied successfully')
    } catch (error) {
      logger.error({ error, sourceKey, destinationKey }, 'File copy failed')

      if (error instanceof Error) {
        throw new StorageError(`Failed to copy file: ${error.message}`, {
          sourceKey,
          destinationKey,
          error: error.message,
        })
      }

      throw new StorageError('Failed to copy file', { sourceKey, destinationKey })
    }
  }

  /**
   * Generate signed URL for temporary file access
   *
   * @param s3Key - S3 object key
   * @param expiresIn - URL expiration time in seconds (default: 900 = 15 minutes)
   * @returns Signed URL
   */
  async getSignedUrl(s3Key: string, expiresIn = 900): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: s3Key,
      })

      const signedUrl = await getSignedUrl(s3Client, command, { expiresIn })

      logger.info({ s3Key, expiresIn }, 'Generated signed URL')

      return signedUrl
    } catch (error) {
      logger.error({ error, s3Key }, 'Failed to generate signed URL')

      if (error instanceof Error) {
        throw new StorageError(`Failed to generate signed URL: ${error.message}`, {
          s3Key,
          error: error.message,
        })
      }

      throw new StorageError('Failed to generate signed URL', { s3Key })
    }
  }

  /**
   * Generate S3 key for file
   *
   * Format: {folder}/{userId}/{safeFileName}
   *
   * @param fileName - Safe file name
   * @param options - Upload options
   * @returns S3 key
   */
  private generateS3Key(fileName: string, options: UploadOptions): string {
    const folder = options.folder || 'documents'
    return `${folder}/${options.userId}/${fileName}`
  }

  /**
   * Get MIME type from file
   *
   * @param file - File or Buffer
   * @param fileName - Original file name
   * @returns MIME type
   */
  private getMimeType(file: File | Buffer, fileName: string): string {
    if (file instanceof File) {
      return file.type
    }

    // Infer from file extension
    const extension = fileName.split('.').pop()?.toLowerCase()
    const mimeTypes: Record<string, string> = {
      pdf: 'application/pdf',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      webp: 'image/webp',
    }

    return extension ? mimeTypes[extension] || 'application/octet-stream' : 'application/octet-stream'
  }

  /**
   * Convert stream to buffer
   *
   * @param stream - Readable stream
   * @returns Buffer
   */
  private async streamToBuffer(stream: Readable): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Uint8Array[] = []

      stream.on('data', (chunk) => chunks.push(chunk))
      stream.on('error', reject)
      stream.on('end', () => resolve(Buffer.concat(chunks)))
    })
  }
}

/**
 * Export singleton instance
 */
export const storageService = new StorageService()
