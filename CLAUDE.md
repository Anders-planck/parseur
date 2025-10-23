# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project Overview

Smart Document Parser — An intelligent document parsing platform that extracts, validates, and auto-corrects structured data from PDFs and images using LLM-only approach (no local ML models or OCR). Built entirely in Next.js 15 + TypeScript with Inngest for async job orchestration.

**Core Capabilities:**
- Universal parsing of financial documents (invoices, receipts, payslips, bank statements)
- Automatic document type classification
- Structured JSON extraction with custom schema support
- Multi-step auto-correction and validation loops
- Confidence-based human review flagging
- Cloud-only, serverless architecture

## Technology Stack

- **Framework:** Next.js 15 (TypeScript) with React 19
- **Database:** Vercel Postgres + Prisma ORM
- **UI:** shadcn/ui components
- **Forms:** React Hook Form + Zod validation
- **Async Jobs:** Inngest for pipeline orchestration
- **LLM Providers:** GPT-5 (OpenAI), Claude 4.5 (Anthropic)
- **Storage:** S3-compatible (AWS S3)
- **Hosting:** Vercel (MVP) / AWS Lambda (production)
- **Package Manager:** bun

---

## 🎯 Core Development Principles

### 1. Documentation First, Code Second

**CRITICAL:** Before writing ANY code, Claude Code MUST:

1. **Read relevant documentation** from official sources:
   ```bash
   # Always check these resources first:
   - Next.js docs: https://nextjs.org/docs
   - Prisma docs: https://www.prisma.io/docs
   - Vercel Postgres: https://vercel.com/docs/storage/vercel-postgres
   - shadcn/ui: https://ui.shadcn.com/docs
   - React Hook Form: https://react-hook-form.com
   - Zod: https://zod.dev
   - Inngest: https://www.inngest.com/docs
   ```

2. **Understand the existing codebase** before modifications:
   - Use `view` tool to inspect related files
   - Check for similar patterns already implemented
   - Review type definitions in `/types`
   - Examine existing utility functions in `/lib`
   - Review Prisma schema in `/prisma/schema.prisma`

3. **Think before implementing:**
   - What is the simplest solution?
   - Does this duplicate existing logic?
   - Will this scale?
   - How will this be tested?
   - What edge cases exist?
   - What are the database implications?

### 2. TypeScript Discipline (Zero Tolerance for `any`)

**STRICT RULES:**

❌ **NEVER ALLOWED:**
```typescript
// FORBIDDEN
const data: any = ...
function process(input: any) { ... }
type UserData = any
```

✅ **ALWAYS REQUIRED:**
```typescript
// CORRECT - Always use specific types
interface DocumentData {
  id: string
  type: DocumentType
  content: Buffer
  metadata: DocumentMetadata
}

// Use unknown for truly unknown types, then narrow
function processUnknown(input: unknown): ProcessedData {
  if (!isValidInput(input)) {
    throw new ValidationError('Invalid input')
  }
  return process(input) // Type guard ensures safety
}

// Use generics for reusable patterns
function fetchData<T>(url: string, schema: z.ZodSchema<T>): Promise<T> {
  // Implementation
}

// Prisma types are fully integrated
import { Document, Prisma } from '@prisma/client'

type DocumentWithUser = Prisma.DocumentGetPayload<{
  include: { user: true }
}>
```

**Type Safety Checklist:**
- [ ] All function parameters typed
- [ ] All function return types explicit
- [ ] All API responses validated with Zod schemas
- [ ] All database models use Prisma-generated types
- [ ] No implicit `any` (enable `noImplicitAny` in tsconfig)
- [ ] Use discriminated unions for complex types
- [ ] Leverage `satisfies` operator for type narrowing
- [ ] Use `Prisma.validator()` for complex queries

### 3. DRY Principle (Don't Repeat Yourself)

**Before creating new code, check for:**

1. **Existing utilities** in `/lib/utils/`:
   - File handling
   - Data validation
   - Error formatting
   - API helpers

2. **Shared types** in `/types/`:
   - Document schemas
   - API responses
   - Pipeline states

3. **Database operations** in `/lib/repositories/`:
   - Document operations
   - User management
   - Audit logging

4. **Common patterns**:
   - LLM API calls → Use `lib/llm/client.ts`
   - File uploads → Use `lib/storage/uploader.ts`
   - Validation → Use `lib/validation/schemas.ts`
   - Database queries → Use repository pattern

**Anti-Pattern Example:**
```typescript
// ❌ WRONG - Logic duplicated across files
// In api/upload/route.ts
const document = await prisma.document.create({
  data: { userId, filename, ... }
})

// In api/process/route.ts
const document = await prisma.document.create({
  data: { userId, filename, ... }
})
```

**Correct Pattern:**
```typescript
// ✅ RIGHT - Single source of truth
// lib/repositories/document-repository.ts
export class DocumentRepository {
  async create(data: CreateDocumentData): Promise<Document> {
    return prisma.document.create({
      data: {
        userId: data.userId,
        originalFilename: data.filename,
        mimeType: data.mimeType,
        fileSize: data.fileSize,
        s3Key: data.s3Key,
        s3Bucket: data.s3Bucket,
      }
    })
  }
}

// Use anywhere:
import { documentRepository } from '@/lib/repositories'
const document = await documentRepository.create(data)
```

### 4. Infrastructure Respect

**Never hardcode values:**
```typescript
// ❌ WRONG
const apiKey = "sk-abc123..."
const bucket = "my-bucket"
const maxRetries = 3

// ✅ RIGHT - Use environment variables & config
import { config } from '@/lib/config'

const apiKey = config.openai.apiKey
const bucket = config.storage.bucket
const maxRetries = config.pipeline.maxRetries
```

---

## 🗄️ Database Best Practices (Vercel Postgres + Prisma)

### Core Principles

**CRITICAL:** Follow these database principles religiously:

1. **Always use Prisma Client** - Never write raw SQL unless absolutely necessary
2. **Connection pooling is automatic** - Vercel Postgres handles this via `@prisma/client`
3. **Optimize for serverless** - Queries must complete quickly (< 10s)
4. **Type safety everywhere** - Leverage Prisma's generated types
5. **Transactions for consistency** - Use for multi-step operations
6. **Migrations are immutable** - Never edit existing migrations
7. **Seed data for development** - Consistent test data across environments

### 1. Prisma Client Setup

**Singleton Pattern (CRITICAL for Next.js):**

```typescript
// lib/db/prisma.ts
import { PrismaClient } from '@prisma/client'

/**
 * PrismaClient singleton for Next.js
 * Prevents multiple instances in development (hot reload)
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' 
      ? ['query', 'error', 'warn'] 
      : ['error'],
    errorFormat: 'pretty',
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect()
})

// Export types for use throughout the app
export type { Prisma } from '@prisma/client'
```

**Usage in API Routes:**
```typescript
// app/api/documents/route.ts
import { prisma } from '@/lib/db/prisma'

export async function GET() {
  const documents = await prisma.document.findMany({
    take: 20,
    orderBy: { createdAt: 'desc' },
  })
  
  return Response.json(documents)
}
```

### 2. Repository Pattern (Abstraction Layer)

**Why Use Repositories:**
- ✅ Single source of truth for database operations
- ✅ Easier to test (mock the repository)
- ✅ Centralized query logic
- ✅ Type-safe interfaces
- ✅ Reusable across API routes and Inngest functions

**Base Repository Pattern:**

```typescript
// lib/repositories/base-repository.ts
import { prisma, Prisma } from '@/lib/db/prisma'

export abstract class BaseRepository<
  T,
  CreateInput,
  UpdateInput,
  WhereInput
> {
  protected abstract model: Prisma.ModelName

  /**
   * Find record by ID
   * @throws {NotFoundError} If record doesn't exist
   */
  async findById(id: string): Promise<T | null> {
    return prisma[this.model].findUnique({
      where: { id },
    }) as Promise<T | null>
  }

  /**
   * Find record by ID or throw error
   */
  async findByIdOrThrow(id: string): Promise<T> {
    const record = await this.findById(id)
    if (!record) {
      throw new NotFoundError(`${this.model} with id ${id} not found`)
    }
    return record
  }

  /**
   * Create new record
   */
  abstract create(data: CreateInput): Promise<T>

  /**
   * Update existing record
   */
  abstract update(id: string, data: UpdateInput): Promise<T>

  /**
   * Delete record (soft delete preferred)
   */
  abstract delete(id: string): Promise<void>
}
```

**Document Repository Example:**

```typescript
// lib/repositories/document-repository.ts
import { Document, DocumentStatus, Prisma } from '@prisma/client'
import { prisma } from '@/lib/db/prisma'
import { BaseRepository } from './base-repository'

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
  documentType?: string
  parsedData?: Prisma.JsonValue
  confidence?: number
  needsReview?: boolean
  completedAt?: Date
}

export class DocumentRepository extends BaseRepository<
  Document,
  CreateDocumentData,
  UpdateDocumentData,
  Prisma.DocumentWhereInput
> {
  protected model = 'document' as const

  /**
   * Create a new document record
   */
  async create(data: CreateDocumentData): Promise<Document> {
    return prisma.document.create({
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
  }

  /**
   * Update document with validation
   */
  async update(id: string, data: UpdateDocumentData): Promise<Document> {
    // Validate document exists
    await this.findByIdOrThrow(id)

    return prisma.document.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    })
  }

  /**
   * Soft delete (mark as archived)
   */
  async delete(id: string): Promise<void> {
    await prisma.document.update({
      where: { id },
      data: { status: 'ARCHIVED' },
    })
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
      parsedData?: Prisma.JsonValue
    }
  ): Promise<Document> {
    return prisma.document.update({
      where: { id },
      data: {
        status,
        confidence: metadata?.confidence,
        parsedData: metadata?.parsedData,
        completedAt: status === 'COMPLETED' ? new Date() : undefined,
        needsReview: status === 'NEEDS_REVIEW',
      },
    })
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
}

// Export singleton instance
export const documentRepository = new DocumentRepository()
```

### 3. Transaction Management

**When to Use Transactions:**
- ✅ Creating document + processing job + audit log (multi-table writes)
- ✅ Updating document status + creating audit log
- ✅ User registration + initial document creation
- ✅ Any operation where partial failure is unacceptable

**Transaction Pattern:**

```typescript
// lib/repositories/document-repository.ts (continued)
export class DocumentRepository {
  /**
   * Create document with initial processing job (atomic)
   */
  async createWithJob(
    documentData: CreateDocumentData,
    inngestJobId: string
  ): Promise<{ document: Document; job: ProcessingJob }> {
    return prisma.$transaction(async (tx) => {
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
    }, {
      maxWait: 5000, // Wait max 5s for transaction to start
      timeout: 10000, // Transaction timeout 10s
      isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted,
    })
  }

  /**
   * Update document status with audit log (atomic)
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
      extractedData?: Prisma.JsonValue
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
```

### 4. Query Optimization

**N+1 Query Problem - AVOID THIS:**

```typescript
// ❌ WRONG - N+1 queries (1 for documents + N for users)
async function getDocumentsWithUsers() {
  const documents = await prisma.document.findMany()
  
  const documentsWithUsers = await Promise.all(
    documents.map(async (doc) => {
      const user = await prisma.user.findUnique({
        where: { id: doc.userId }
      })
      return { ...doc, user }
    })
  )
  
  return documentsWithUsers
}
```

**Correct Pattern - Use Include/Select:**

```typescript
// ✅ RIGHT - Single query with join
async function getDocumentsWithUsers() {
  return prisma.document.findMany({
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          // Never include password hash!
        },
      },
      processingJobs: {
        orderBy: { startedAt: 'desc' },
        take: 1, // Only latest job
      },
    },
  })
}

// Even better - use type-safe Prisma.validator
const documentWithUserValidator = Prisma.validator<Prisma.DocumentDefaultArgs>()({
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

type DocumentWithUser = Prisma.DocumentGetPayload<typeof documentWithUserValidator>
```

**Pagination Best Practices:**

```typescript
// ✅ Cursor-based pagination (recommended for real-time data)
async function getDocumentsPaginated(cursor?: string, limit = 20) {
  return prisma.document.findMany({
    take: limit + 1, // Fetch one extra to know if there are more
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { createdAt: 'desc' },
  })
}

// ✅ Offset-based pagination (for admin panels with page numbers)
async function getDocumentsPage(page = 1, pageSize = 20) {
  const skip = (page - 1) * pageSize

  const [documents, total] = await Promise.all([
    prisma.document.findMany({
      skip,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.document.count(),
  ])

  return {
    documents,
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    },
  }
}
```

**Aggregations & Analytics:**

```typescript
// ✅ Use Prisma aggregations (faster than fetching all records)
async function getDocumentAnalytics(userId: string) {
  const [
    stats,
    avgConfidence,
    totalSize,
  ] = await Promise.all([
    // Group by status
    prisma.document.groupBy({
      by: ['status'],
      where: { userId },
      _count: { id: true },
    }),
    // Average confidence
    prisma.document.aggregate({
      where: { 
        userId,
        confidence: { not: null },
      },
      _avg: { confidence: true },
    }),
    // Total file size
    prisma.document.aggregate({
      where: { userId },
      _sum: { fileSize: true },
    }),
  ])

  return {
    byStatus: stats.reduce((acc, curr) => ({
      ...acc,
      [curr.status]: curr._count.id,
    }), {}),
    avgConfidence: avgConfidence._avg.confidence ?? 0,
    totalSizeMB: (totalSize._sum.fileSize ?? 0) / (1024 * 1024),
  }
}
```

### 5. Migrations Strategy

**Golden Rules:**
1. ✅ Never edit existing migration files
2. ✅ Always test migrations locally first
3. ✅ Use descriptive migration names
4. ✅ Review generated SQL before applying
5. ✅ Backup production database before migrations

**Migration Workflow:**

```bash
# 1. Make changes to schema.prisma

# 2. Generate migration (creates SQL file)
bunx prisma migrate dev --name add_document_tags

# 3. Review the generated SQL
cat prisma/migrations/20250123_add_document_tags/migration.sql

# 4. Test locally
bunx prisma migrate dev

# 5. Generate Prisma Client
bunx prisma generate

# 6. Deploy to production (CI/CD or manual)
bunx prisma migrate deploy
```

**Safe Schema Changes:**

```prisma
// ✅ SAFE - Adding nullable field
model Document {
  id String @id
  tags String? // Safe - nullable field
}

// ✅ SAFE - Adding field with default
model Document {
  id String @id
  version Int @default(1) // Safe - has default
}

// ⚠️ REQUIRES DATA MIGRATION - Adding required field
model Document {
  id String @id
  category String // Dangerous - will fail on existing records
}

// Solution: Add as nullable first, backfill data, then make required
// Step 1:
model Document {
  id String @id
  category String?
}
// Step 2: Run script to backfill
// Step 3: Make required
model Document {
  id String @id
  category String @default("OTHER")
}
```

**Seeding Pattern:**

```typescript
// prisma/seed.ts
import { PrismaClient, DocumentType, DocumentStatus } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function seed() {
  console.log('🌱 Seeding database...')

  // Create test user
  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      password: await hash('password123', 10),
    },
  })

  console.log('✅ Created test user:', testUser.email)

  // Create sample documents
  const sampleDocuments = [
    {
      originalFilename: 'invoice_001.pdf',
      mimeType: 'application/pdf',
      fileSize: 245678,
      s3Key: 'test/invoice_001.pdf',
      s3Bucket: 'test-bucket',
      documentType: 'INVOICE' as DocumentType,
      status: 'COMPLETED' as DocumentStatus,
      confidence: 0.95,
      parsedData: {
        invoiceNumber: 'INV-001',
        total: 1234.56,
        currency: 'USD',
      },
    },
    {
      originalFilename: 'receipt_001.jpg',
      mimeType: 'image/jpeg',
      fileSize: 123456,
      s3Key: 'test/receipt_001.jpg',
      s3Bucket: 'test-bucket',
      documentType: 'RECEIPT' as DocumentType,
      status: 'COMPLETED' as DocumentStatus,
      confidence: 0.88,
      parsedData: {
        merchant: 'Coffee Shop',
        total: 5.99,
        currency: 'USD',
      },
    },
  ]

  for (const doc of sampleDocuments) {
    await prisma.document.upsert({
      where: { s3Key: doc.s3Key },
      update: {},
      create: {
        ...doc,
        userId: testUser.id,
      },
    })
  }

  console.log('✅ Created sample documents')

  // Create prompt templates
  const promptTemplates = [
    {
      name: 'classification-v1',
      category: 'CLASSIFICATION',
      version: '1.0.0',
      template: 'Classify this document type: {{image}}',
      variables: { image: 'base64' },
      description: 'Document type classification prompt',
    },
  ]

  for (const template of promptTemplates) {
    await prisma.promptTemplate.upsert({
      where: { name: template.name },
      update: {},
      create: template,
    })
  }

  console.log('✅ Created prompt templates')
  console.log('🎉 Seeding completed!')
}

seed()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

### 6. Performance & Caching

**Database Query Caching (React Server Components):**

```typescript
// app/dashboard/page.tsx
import { prisma } from '@/lib/db/prisma'
import { unstable_cache } from 'next/cache'

// Cache documents list for 5 minutes
const getCachedDocuments = unstable_cache(
  async (userId: string) => {
    return prisma.document.findMany({
      where: { userId },
      take: 20,
      orderBy: { createdAt: 'desc' },
    })
  },
  ['documents-list'], // Cache key
  {
    revalidate: 300, // 5 minutes
    tags: ['documents'], // For manual revalidation
  }
)

export default async function DashboardPage({ userId }: { userId: string }) {
  const documents = await getCachedDocuments(userId)
  return <DocumentList documents={documents} />
}
```

**Query Optimization Checklist:**
- [ ] Use `select` to fetch only needed fields
- [ ] Use `include` instead of separate queries
- [ ] Add database indexes for frequently queried fields
- [ ] Use cursor-based pagination for large datasets
- [ ] Cache expensive queries with `unstable_cache`
- [ ] Use `findFirstOrThrow` instead of `findFirst` + null check
- [ ] Batch operations with `createMany`, `updateMany`

**Indexes in Schema:**

```prisma
model Document {
  id        String   @id @default(cuid())
  userId    String
  status    DocumentStatus
  createdAt DateTime @default(now())
  
  user User @relation(fields: [userId], references: [id])
  
  // Composite indexes for common queries
  @@index([userId, status]) // For findMany({ where: { userId, status } })
  @@index([status, createdAt]) // For admin filtering
  @@index([createdAt]) // For chronological sorting
  @@index([s3Key]) // For S3 lookups
  
  @@map("documents")
}
```

### 7. Error Handling

**Database Error Pattern:**

```typescript
// lib/db/errors.ts
import { Prisma } from '@prisma/client'

export function handlePrismaError(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        // Unique constraint violation
        throw new ConflictError('A record with this value already exists')
      
      case 'P2025':
        // Record not found
        throw new NotFoundError('Record not found')
      
      case 'P2003':
        // Foreign key constraint violation
        throw new ValidationError('Invalid reference to related record')
      
      default:
        throw new DatabaseError(`Database error: ${error.message}`, error.code)
    }
  }
  
  if (error instanceof Prisma.PrismaClientValidationError) {
    throw new ValidationError('Invalid data provided to database')
  }
  
  // Unknown error
  throw new DatabaseError('An unexpected database error occurred')
}

// Usage in repository
async create(data: CreateDocumentData): Promise<Document> {
  try {
    return await prisma.document.create({ data })
  } catch (error) {
    handlePrismaError(error)
  }
}
```

### 8. Testing with Prisma

**Test Database Setup:**

```typescript
// lib/db/test-helpers.ts
import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process'

export async function setupTestDatabase() {
  // Use separate test database
  process.env.DATABASE_URL = process.env.DATABASE_URL_TEST
  
  const prisma = new PrismaClient()
  
  // Reset database
  await prisma.$executeRawUnsafe('DROP SCHEMA IF EXISTS public CASCADE')
  await prisma.$executeRawUnsafe('CREATE SCHEMA public')
  
  // Run migrations
  execSync('bunx prisma migrate deploy', { stdio: 'inherit' })
  
  // Run seed
  execSync('bunx prisma db seed', { stdio: 'inherit' })
  
  return prisma
}

export async function cleanupTestDatabase(prisma: PrismaClient) {
  // Delete all records in reverse order (respect foreign keys)
  await prisma.auditLog.deleteMany()
  await prisma.processingJob.deleteMany()
  await prisma.document.deleteMany()
  await prisma.session.deleteMany()
  await prisma.apiKey.deleteMany()
  await prisma.user.deleteMany()
  
  await prisma.$disconnect()
}
```

**Repository Tests:**

```typescript
// __tests__/repositories/document-repository.test.ts
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import { setupTestDatabase, cleanupTestDatabase } from '@/lib/db/test-helpers'
import { documentRepository } from '@/lib/repositories/document-repository'

let prisma: PrismaClient

beforeAll(async () => {
  prisma = await setupTestDatabase()
})

afterAll(async () => {
  await cleanupTestDatabase(prisma)
})

beforeEach(async () => {
  // Clean between tests
  await prisma.document.deleteMany()
})

describe('DocumentRepository', () => {
  it('should create document successfully', async () => {
    const document = await documentRepository.create({
      userId: 'test-user-id',
      originalFilename: 'test.pdf',
      mimeType: 'application/pdf',
      fileSize: 1024,
      s3Key: 'test/test.pdf',
      s3Bucket: 'test-bucket',
    })

    expect(document.id).toBeDefined()
    expect(document.status).toBe('PROCESSING')
    expect(document.originalFilename).toBe('test.pdf')
  })

  it('should handle unique constraint violation', async () => {
    const data = {
      userId: 'test-user-id',
      originalFilename: 'test.pdf',
      mimeType: 'application/pdf',
      fileSize: 1024,
      s3Key: 'unique-key',
      s3Bucket: 'test-bucket',
    }

    await documentRepository.create(data)

    // Attempting to create with same s3Key should fail
    await expect(documentRepository.create(data)).rejects.toThrow()
  })
})
```

---

## 📁 Project Structure & Organization

```
/app
  /api
    /upload              # File upload endpoint
    /status/[id]         # Pipeline status check
    /result/[id]         # Final parsed result
    /inngest             # Inngest webhook endpoint
  /dashboard             # Main UI (React Server Components)
  
/components
  /ui                    # shadcn/ui primitives
  /features
    /upload              # Upload-specific components
    /results             # Result display components
    
/lib
  /db
    /prisma.ts           # Prisma client singleton
    /errors.ts           # Database error handling
  /repositories          # Data access layer
    /base-repository.ts  # Abstract base class
    /document-repository.ts
    /user-repository.ts
    /audit-repository.ts
  /llm                   # LLM client abstractions
    /client.ts           # Base LLM client
    /openai.ts           # OpenAI-specific
    /anthropic.ts        # Anthropic-specific
  /storage               # S3 operations
    /client.ts           # S3 client singleton
    /uploader.ts         # Upload utilities
  /validation            # Zod schemas
    /schemas.ts          # All validation schemas
  /utils                 # Utility functions
    /errors.ts           # Custom error classes
    /logger.ts           # Structured logging
  /config                # Configuration management
    
/inngest
  /functions             # Pipeline functions
    /classify.ts         # Document classification
    /extract.ts          # Data extraction
    /validate.ts         # Validation logic
    /correct.ts          # Auto-correction
  /client.ts             # Inngest client setup
  
/prisma
  /schema.prisma         # Database schema
  /migrations/           # Migration files
  /seed.ts               # Seed script
  
/types
  /documents.ts          # Document-related types
  /pipeline.ts           # Pipeline state types
  /api.ts                # API request/response types
  
/prompts
  /classification.ts     # Classification prompts
  /extraction.ts         # Extraction prompts
  /validation.ts         # Validation prompts
  /correction.ts         # Correction prompts
```

### Module Responsibilities

**CRITICAL RULES:**

1. **Server-only code** stays in `/api` and `/lib`
   - Database access (always through repositories)
   - LLM API calls
   - File system operations
   - Secret key usage

2. **Client-only code** stays in `/components` and `/app/(client-pages)`
   - UI interactions
   - Browser APIs
   - Client-side state

3. **Shared types** in `/types` (no runtime code)
   - Interfaces
   - Type aliases
   - Zod schemas (can be used on both sides)

4. **Database layer** in `/lib/repositories`
   - All Prisma queries go through repositories
   - Type-safe interfaces
   - Reusable across API routes and Inngest functions

---

## 🏗️ Architecture Patterns

### 1. Service Layer Pattern

**Every external integration gets a service:**

```typescript
// lib/llm/base-service.ts
export abstract class BaseLLMService {
  protected abstract provider: string
  
  abstract classify(image: Buffer): Promise<ClassificationResult>
  abstract extract(image: Buffer, schema: DocumentSchema): Promise<ExtractionResult>
  abstract validate(data: unknown, rules: ValidationRules): Promise<ValidationResult>
  
  protected async handleError(error: unknown): Promise<never> {
    // Centralized error handling
    throw this.wrapError(error)
  }
}

// lib/llm/openai-service.ts
export class OpenAIService extends BaseLLMService {
  protected provider = 'openai'
  
  async classify(image: Buffer): Promise<ClassificationResult> {
    try {
      const response = await this.client.chat.completions.create({
        model: config.openai.model,
        messages: [{ role: 'user', content: this.buildClassificationPrompt(image) }],
      })
      return this.parseClassificationResponse(response)
    } catch (error) {
      return this.handleError(error)
    }
  }
}
```

### 2. Repository Pattern (Already Covered Above)

See "Database Best Practices" section for complete repository implementation.

### 3. Pipeline Orchestration Pattern

```typescript
// inngest/functions/pipeline-orchestrator.ts
import { documentRepository } from '@/lib/repositories'

export const documentPipeline = inngest.createFunction(
  { id: 'document-pipeline', retries: 3 },
  { event: 'document/uploaded' },
  async ({ event, step }) => {
    const { documentId } = event.data

    // Each step is isolated and retryable
    const classification = await step.run('classify', async () => {
      const document = await documentRepository.findByIdOrThrow(documentId)
      return await llmService.classify(Buffer.from(document.s3Key))
    })

    const extraction = await step.run('extract', async () => {
      const document = await documentRepository.findByIdOrThrow(documentId)
      return await llmService.extract(
        Buffer.from(document.s3Key),
        classification.suggestedSchema
      )
    })

    // Update database with results
    await step.run('save-results', async () => {
      await documentRepository.updateWithAudit(
        documentId,
        'COMPLETED',
        {
          stage: 'FINALIZE',
          llmProvider: 'openai',
          llmModel: 'gpt-4-turbo',
          promptUsed: extraction.prompt,
          rawResponse: JSON.stringify(extraction.raw),
          extractedData: extraction.data,
          confidence: extraction.confidence,
        }
      )
    })

    return {
      documentId,
      status: 'completed',
      confidence: extraction.confidence,
    }
  }
)
```

---

## 🛡️ Error Handling Strategy

### Custom Error Classes

```typescript
// lib/utils/errors.ts
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number,
    public details?: unknown
  ) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, 'VALIDATION_ERROR', 400, details)
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, 'DATABASE_ERROR', 500, details)
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 'NOT_FOUND', 404)
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 'CONFLICT', 409)
  }
}

export class LLMError extends AppError {
  constructor(message: string, provider: string, details?: unknown) {
    super(message, `LLM_ERROR_${provider.toUpperCase()}`, 502, details)
  }
}

export class StorageError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, 'STORAGE_ERROR', 503, details)
  }
}
```

### Error Handling Pattern

```typescript
// api/upload/route.ts
import { handleApiError } from '@/lib/utils/error-handler'

export async function POST(request: Request) {
  try {
    // Validate request
    const formData = await request.formData()
    const file = formData.get('file')
    
    if (!file || !(file instanceof File)) {
      throw new ValidationError('No file provided or invalid file type')
    }
    
    // Process upload
    const result = await uploadService.upload(file)
    
    return Response.json(result, { status: 201 })
    
  } catch (error) {
    return handleApiError(error)
  }
}

// lib/utils/error-handler.ts
export function handleApiError(error: unknown): Response {
  if (error instanceof AppError) {
    return Response.json(
      {
        error: {
          message: error.message,
          code: error.code,
          details: error.details,
        }
      },
      { status: error.statusCode }
    )
  }
  
  // Unknown errors
  console.error('Unhandled error:', error)
  return Response.json(
    { error: { message: 'Internal server error', code: 'INTERNAL_ERROR' } },
    { status: 500 }
  )
}
```

---

## 📊 Logging & Observability

### Structured Logging

```typescript
// lib/utils/logger.ts
import pino from 'pino'

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    },
  },
})

// Usage:
logger.info({ userId, documentId }, 'Document uploaded successfully')
logger.error({ error, documentId }, 'Failed to process document')
```

### Pipeline Telemetry

```typescript
// lib/utils/telemetry.ts
export interface PipelineMetrics {
  documentId: string
  stage: PipelineStage
  startTime: number
  endTime: number
  success: boolean
  confidence?: number
  errorCode?: string
}

export async function trackPipelineMetrics(metrics: PipelineMetrics) {
  // Send to observability platform (e.g., Datadog, New Relic)
  logger.info(metrics, 'Pipeline stage completed')
}
```

---

## ✅ Code Review Checklist

Before considering any code complete, verify:

### Type Safety
- [ ] No `any` types used
- [ ] All function parameters typed
- [ ] All return types explicit
- [ ] Zod schemas for all external data
- [ ] Error types properly defined
- [ ] Prisma types used for database operations

### Database Operations
- [ ] All queries go through repositories
- [ ] No N+1 query problems
- [ ] Appropriate indexes exist
- [ ] Transactions used for multi-step operations
- [ ] Error handling for database operations
- [ ] Pagination implemented correctly

### Code Quality
- [ ] No duplicated logic
- [ ] Functions are single-purpose (< 50 lines)
- [ ] Descriptive variable names (no abbreviations)
- [ ] Comments explain "why", not "what"
- [ ] No console.log (use logger)

### Architecture
- [ ] Follows existing patterns
- [ ] Uses appropriate service layer
- [ ] Proper separation of concerns
- [ ] Environment variables for config
- [ ] No hardcoded values

### Security
- [ ] Input validation with Zod
- [ ] No secrets in code
- [ ] Proper error messages (no sensitive data)
- [ ] File uploads validated (size, type)
- [ ] Rate limiting considered
- [ ] SQL injection impossible (using Prisma)

### Performance
- [ ] Database queries optimized
- [ ] No N+1 queries
- [ ] Proper caching strategy
- [ ] Large files handled async (Inngest)
- [ ] Memory leaks prevented
- [ ] Connection pooling utilized

---

## 🔄 Development Workflow

### Before Starting Any Task:

1. **Understand the requirement**
   - What problem are we solving?
   - What are the edge cases?
   - What is the expected output?
   - What database changes are needed?

2. **Review existing code**
   - Is there similar functionality?
   - What patterns are used?
   - What utilities can be reused?
   - Check Prisma schema for existing models

3. **Plan the implementation**
   - What files need to change?
   - What new types are needed?
   - What database migrations are required?
   - What tests are required?

4. **Implement incrementally**
   - Start with Prisma schema changes (if needed)
   - Run migration: `bunx prisma migrate dev`
   - Generate Prisma Client: `bunx prisma generate`
   - Add repository methods
   - Update types and interfaces
   - Add core logic
   - Add error handling
   - Add logging
   - Add documentation

5. **Verify quality**
   - Run type checker: `bun run typecheck`
   - Run linter: `bun run lint`
   - Test database operations in Prisma Studio: `bunx prisma studio`
   - Test manually with real data
   - Check for code duplication

---

## 🎯 MVP Priorities

### Phase 1 - Core Infrastructure (Current)
- [x] Next.js project setup
- [x] TypeScript configuration (strict mode)
- [x] Prisma schema design
- [x] Database setup (Vercel Postgres)
- [x] Repository pattern implementation
- [ ] Inngest integration
- [ ] Environment configuration system
- [ ] Base service abstractions
- [ ] Error handling framework
- [ ] Logging infrastructure

### Phase 2 - Document Processing
- [ ] File upload API with validation
- [ ] S3 storage integration
- [ ] Document classification pipeline
- [ ] Data extraction pipeline
- [ ] Basic UI for upload and results

### Phase 3 - Intelligence Layer
- [ ] Auto-correction loop
- [ ] Multi-model validation
- [ ] Confidence scoring system
- [ ] Human review workflow

### Phase 4 - Polish & Production
- [ ] Comprehensive error handling
- [ ] Performance optimization
- [ ] Security audit
- [ ] Documentation completion
- [ ] Deployment automation
- [ ] Database backups

---

## 📚 Key Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Vercel Postgres Guide](https://vercel.com/docs/storage/vercel-postgres)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [shadcn/ui Components](https://ui.shadcn.com/docs)
- [React Hook Form](https://react-hook-form.com/get-started)
- [Zod Validation](https://zod.dev/)
- [Inngest Guides](https://www.inngest.com/docs/guides)
- [Clean Code Principles](https://github.com/ryanmcdermott/clean-code-javascript)

---

## 💡 Remember

> "Any fool can write code that a computer can understand. Good programmers write code that humans can understand." 
> — Martin Fowler

**Key Mantras:**
- ✨ Simplicity over cleverness
- 📖 Code is read more than written
- 🔒 Type safety is not optional
- 🗄️ Database operations through repositories only
- 🧪 If it can't be tested, it's wrong
- 📝 Documentation is code

---

**Last Updated:** 2025-10-23  
**Maintained by:** Anders Planck  
**Version:** 3.0 (Database Edition - Vercel Postgres + Prisma)