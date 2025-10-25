/**
 * S3 Client Singleton
 *
 * Provides a singleton S3 client instance compatible with both:
 * - AWS S3 (production)
 * - MinIO (local development)
 */

import { S3Client } from '@aws-sdk/client-s3'
import { config } from '@/lib/config'
import { logger } from '@/lib/utils/logger'

/**
 * S3 client configuration
 */
const s3Config = {
  region: config.storage.region,
  credentials: {
    accessKeyId: config.storage.accessKeyId,
    secretAccessKey: config.storage.secretAccessKey,
  },
  // MinIO-specific configuration (ignored by AWS S3)
  ...(config.storage.endpoint && {
    endpoint: config.storage.endpoint,
    forcePathStyle: config.storage.forcePathStyle,
  }),
}

/**
 * Create S3 client instance
 */
function createS3Client(): S3Client {
  logger.info(
    {
      region: s3Config.region,
      endpoint: config.storage.endpoint || 'AWS S3',
      bucket: config.storage.bucket,
    },
    'Initializing S3 client'
  )

  return new S3Client(s3Config)
}

/**
 * Global S3 client singleton
 *
 * This prevents multiple S3 client instances in development
 * due to Next.js hot reload
 */
const globalForS3 = globalThis as unknown as {
  s3Client: S3Client | undefined
}

/**
 * Export S3 client singleton
 */
export const s3Client = globalForS3.s3Client ?? createS3Client()

if (process.env.NODE_ENV !== 'production') {
  globalForS3.s3Client = s3Client
}

/**
 * Get S3 bucket name from config
 */
export const bucketName = config.storage.bucket

/**
 * S3 client metadata for debugging
 */
export const s3ClientInfo = {
  region: config.storage.region,
  endpoint: config.storage.endpoint || 'https://s3.amazonaws.com',
  bucket: config.storage.bucket,
  forcePathStyle: config.storage.forcePathStyle,
}
