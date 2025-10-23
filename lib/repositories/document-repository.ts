import {
  Document,
  DocumentStatus,
  DocumentType,
  Prisma,
  PipelineStage,
  ProcessingJob,
} from '@prisma/client'
import { prisma } from '@/lib/db/prisma'
import { BaseRepository } from './base-repository'
import { handlePrismaError } from '@/lib/db/errors'

export interface CreateDocumentData {
  userId: string
  originalFilename: string
  mimeType: string
  fileSize: number
  s3Key: string
  s3Bucket: string
}

export interface UpdateDocumentData {
  status?: DocumentStatus
  documentType?: DocumentType
  parsedData?: Prisma.InputJsonValue
  confidence?: number
  needsReview?: boolean
  completedAt?: Date
}

export class DocumentRepository extends BaseRepository<
  Document,
  CreateDocumentData,
  UpdateDocumentData
> {
  protected model = 'document' as const

  /**
   * Create a new document record
   */
  async create(data: CreateDocumentData): Promise<Document> {
    try {
      return await prisma.document.create({
        data: {
          userId: data.userId,
          originalFilename: data.originalFilename,
          mimeType: data.mimeType,
          fileSize: data.fileSize,
          s3Key: data.s3Key,
          s3Bucket: data.s3Bucket,
          status: 'PROCESSING',
        },
      })
    } catch (error) {
      return handlePrismaError(error)
    }
  }

  /**
   * Update document with validation
   */
  async update(id: string, data: UpdateDocumentData): Promise<Document> {
    try {
      // Validate document exists
      await this.findByIdOrThrow(id)

      return await prisma.document.update({
        where: { id },
        data: {
          ...data,
          updatedAt: new Date(),
        },
      })
    } catch (error) {
      return handlePrismaError(error)
    }
  }

  /**
   * Soft delete (mark as archived)
   */
  async delete(id: string): Promise<void> {
    try {
      await prisma.document.update({
        where: { id },
        data: { status: 'ARCHIVED' },
      })
    } catch (error) {
      handlePrismaError(error)
    }
  }

  /**
   * Find documents by user with pagination
   */
  async findByUserId(
    userId: string,
    options: {
      status?: DocumentStatus
      limit?: number
      cursor?: string
    } = {}
  ): Promise<Document[]> {
    const { status, limit = 20, cursor } = options

    return prisma.document.findMany({
      where: {
        userId,
        ...(status && { status }),
      },
      take: limit,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: 'desc' },
    })
  }

  /**
   * Find documents needing review
   */
  async findNeedingReview(limit = 50): Promise<Document[]> {
    return prisma.document.findMany({
      where: {
        status: 'NEEDS_REVIEW',
        reviewedAt: null,
      },
      take: limit,
      orderBy: { createdAt: 'asc' },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    })
  }

  /**
   * Update processing status with metrics
   */
  async updateStatus(
    id: string,
    status: DocumentStatus,
    metadata?: {
      confidence?: number
      parsedData?: Prisma.InputJsonValue
    }
  ): Promise<Document> {
    try {
      return await prisma.document.update({
        where: { id },
        data: {
          status,
          confidence: metadata?.confidence,
          parsedData: metadata?.parsedData,
          completedAt: status === 'COMPLETED' ? new Date() : undefined,
          needsReview: status === 'NEEDS_REVIEW',
        },
      })
    } catch (error) {
      return handlePrismaError(error)
    }
  }

  /**
   * Get document statistics for user
   */
  async getStatsByUserId(userId: string): Promise<{
    total: number
    completed: number
    processing: number
    needsReview: number
    failed: number
  }> {
    const [total, completed, processing, needsReview, failed] = await Promise.all([
      prisma.document.count({ where: { userId } }),
      prisma.document.count({ where: { userId, status: 'COMPLETED' } }),
      prisma.document.count({ where: { userId, status: 'PROCESSING' } }),
      prisma.document.count({ where: { userId, status: 'NEEDS_REVIEW' } }),
      prisma.document.count({ where: { userId, status: 'FAILED' } }),
    ])

    return { total, completed, processing, needsReview, failed }
  }

  /**
   * Create document with initial processing job (atomic transaction)
   */
  async createWithJob(
    documentData: CreateDocumentData,
    inngestJobId: string
  ): Promise<{ document: Document; job: ProcessingJob }> {
    return prisma.$transaction(
      async (tx) => {
        // Create document
        const document = await tx.document.create({
          data: {
            userId: documentData.userId,
            originalFilename: documentData.originalFilename,
            mimeType: documentData.mimeType,
            fileSize: documentData.fileSize,
            s3Key: documentData.s3Key,
            s3Bucket: documentData.s3Bucket,
            status: 'PROCESSING',
          },
        })

        // Create processing job
        const job = await tx.processingJob.create({
          data: {
            documentId: document.id,
            inngestJobId,
            currentStage: 'UPLOAD',
            stageStatus: 'RUNNING',
          },
        })

        // Create initial audit log
        await tx.auditLog.create({
          data: {
            documentId: document.id,
            stage: 'UPLOAD',
            llmProvider: 'system',
            llmModel: 'n/a',
            promptTemplate: 'upload',
            promptUsed: 'File uploaded to S3',
            rawResponse: JSON.stringify({ s3Key: document.s3Key }),
          },
        })

        return { document, job }
      },
      {
        maxWait: 5000, // Wait max 5s for transaction to start
        timeout: 10000, // Transaction timeout 10s
        isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted,
      }
    )
  }

  /**
   * Update document status with audit log (atomic transaction)
   */
  async updateWithAudit(
    documentId: string,
    status: DocumentStatus,
    auditData: {
      stage: PipelineStage
      llmProvider: string
      llmModel: string
      promptUsed: string
      rawResponse: string
      extractedData?: Prisma.InputJsonValue
      confidence?: number
    }
  ): Promise<Document> {
    return prisma.$transaction(async (tx) => {
      // Update document
      const document = await tx.document.update({
        where: { id: documentId },
        data: {
          status,
          confidence: auditData.confidence,
          parsedData: auditData.extractedData,
          completedAt: status === 'COMPLETED' ? new Date() : undefined,
        },
      })

      // Create audit log
      await tx.auditLog.create({
        data: {
          documentId,
          stage: auditData.stage,
          llmProvider: auditData.llmProvider,
          llmModel: auditData.llmModel,
          promptTemplate: `${auditData.stage.toLowerCase()}-v1`,
          promptUsed: auditData.promptUsed,
          rawResponse: auditData.rawResponse,
          extractedData: auditData.extractedData,
          confidence: auditData.confidence,
        },
      })

      return document
    })
  }
}

// Export singleton instance
export const documentRepository = new DocumentRepository()
