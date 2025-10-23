import { AuditLog, PipelineStage, Prisma } from '@prisma/client'
import { prisma } from '@/lib/db/prisma'
import { handlePrismaError } from '@/lib/db/errors'

export interface CreateAuditLogData {
  documentId: string
  stage: PipelineStage
  llmProvider: string
  llmModel: string
  promptTemplate: string
  promptUsed: string
  rawResponse: string
  extractedData?: Prisma.InputJsonValue
  confidence?: number
  processingTime?: number
  tokensUsed?: number
  cost?: number
}

export class AuditRepository {
  /**
   * Create audit log entry
   */
  async create(data: CreateAuditLogData): Promise<AuditLog> {
    try {
      return await prisma.auditLog.create({
        data,
      })
    } catch (error) {
      return handlePrismaError(error)
    }
  }

  /**
   * Find audit logs by document ID
   */
  async findByDocumentId(
    documentId: string,
    options: {
      stage?: PipelineStage
      limit?: number
    } = {}
  ): Promise<AuditLog[]> {
    const { stage, limit = 50 } = options

    return prisma.auditLog.findMany({
      where: {
        documentId,
        ...(stage && { stage }),
      },
      take: limit,
      orderBy: { createdAt: 'desc' },
    })
  }

  /**
   * Get audit log statistics
   */
  async getStats(options: {
    startDate?: Date
    endDate?: Date
    llmProvider?: string
  } = {}): Promise<{
    totalLogs: number
    totalTokens: number
    totalCost: number
    avgProcessingTime: number
    byProvider: Record<string, number>
  }> {
    const { startDate, endDate, llmProvider } = options

    const where: Prisma.AuditLogWhereInput = {
      ...(startDate && { createdAt: { gte: startDate } }),
      ...(endDate && { createdAt: { lte: endDate } }),
      ...(llmProvider && { llmProvider }),
    }

    const [total, aggregates, byProvider] = await Promise.all([
      // Total count
      prisma.auditLog.count({ where }),

      // Aggregates
      prisma.auditLog.aggregate({
        where,
        _sum: {
          tokensUsed: true,
          cost: true,
        },
        _avg: {
          processingTime: true,
        },
      }),

      // Group by provider
      prisma.auditLog.groupBy({
        by: ['llmProvider'],
        where,
        _count: { id: true },
      }),
    ])

    return {
      totalLogs: total,
      totalTokens: aggregates._sum.tokensUsed ?? 0,
      totalCost: aggregates._sum.cost ?? 0,
      avgProcessingTime: aggregates._avg.processingTime ?? 0,
      byProvider: byProvider.reduce<Record<string, number>>(
        (acc, curr) => ({
          ...acc,
          [curr.llmProvider]: curr._count.id,
        }),
        {}
      ),
    }
  }

  /**
   * Get pipeline stage metrics
   */
  async getStageMetrics(documentId: string): Promise<{
    stage: PipelineStage
    avgProcessingTime: number
    totalTokens: number
    avgConfidence: number
  }[]> {
    const stages = await prisma.auditLog.groupBy({
      by: ['stage'],
      where: { documentId },
      _avg: {
        processingTime: true,
        confidence: true,
      },
      _sum: {
        tokensUsed: true,
      },
    })

    return stages.map((s) => ({
      stage: s.stage,
      avgProcessingTime: s._avg.processingTime ?? 0,
      totalTokens: s._sum.tokensUsed ?? 0,
      avgConfidence: s._avg.confidence ?? 0,
    }))
  }
}

// Export singleton instance
export const auditRepository = new AuditRepository()
