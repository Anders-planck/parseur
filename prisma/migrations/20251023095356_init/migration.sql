-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('INVOICE', 'RECEIPT', 'PAYSLIP', 'BANK_STATEMENT', 'TAX_FORM', 'CONTRACT', 'OTHER');

-- CreateEnum
CREATE TYPE "DocumentStatus" AS ENUM ('UPLOADING', 'PROCESSING', 'NEEDS_REVIEW', 'COMPLETED', 'FAILED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "PipelineStage" AS ENUM ('UPLOAD', 'CLASSIFICATION', 'EXTRACTION', 'VALIDATION', 'CORRECTION', 'FINALIZE');

-- CreateEnum
CREATE TYPE "StageStatus" AS ENUM ('PENDING', 'RUNNING', 'SUCCESS', 'FAILED', 'RETRYING');

-- CreateEnum
CREATE TYPE "PromptCategory" AS ENUM ('CLASSIFICATION', 'EXTRACTION', 'VALIDATION', 'CORRECTION');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "api_keys" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastUsed" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "api_keys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "originalFilename" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "s3Key" TEXT NOT NULL,
    "s3Bucket" TEXT NOT NULL,
    "documentType" "DocumentType",
    "status" "DocumentStatus" NOT NULL DEFAULT 'PROCESSING',
    "confidence" DOUBLE PRECISION,
    "parsedData" JSONB,
    "needsReview" BOOLEAN NOT NULL DEFAULT false,
    "reviewedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "processing_jobs" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "inngestJobId" TEXT NOT NULL,
    "currentStage" "PipelineStage" NOT NULL,
    "stageStatus" "StageStatus" NOT NULL DEFAULT 'PENDING',
    "retryCount" INTEGER NOT NULL DEFAULT 0,
    "errorMessage" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "processing_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "stage" "PipelineStage" NOT NULL,
    "llmProvider" TEXT NOT NULL,
    "llmModel" TEXT NOT NULL,
    "promptTemplate" TEXT NOT NULL,
    "promptUsed" TEXT NOT NULL,
    "rawResponse" TEXT NOT NULL,
    "extractedData" JSONB,
    "confidence" DOUBLE PRECISION,
    "processingTime" INTEGER,
    "tokensUsed" INTEGER,
    "cost" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prompt_templates" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "PromptCategory" NOT NULL,
    "version" TEXT NOT NULL,
    "template" TEXT NOT NULL,
    "variables" JSONB NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prompt_templates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_token_key" ON "sessions"("token");

-- CreateIndex
CREATE INDEX "sessions_userId_idx" ON "sessions"("userId");

-- CreateIndex
CREATE INDEX "sessions_token_idx" ON "sessions"("token");

-- CreateIndex
CREATE UNIQUE INDEX "api_keys_key_key" ON "api_keys"("key");

-- CreateIndex
CREATE INDEX "api_keys_userId_idx" ON "api_keys"("userId");

-- CreateIndex
CREATE INDEX "api_keys_key_idx" ON "api_keys"("key");

-- CreateIndex
CREATE UNIQUE INDEX "documents_s3Key_key" ON "documents"("s3Key");

-- CreateIndex
CREATE INDEX "documents_userId_idx" ON "documents"("userId");

-- CreateIndex
CREATE INDEX "documents_userId_status_idx" ON "documents"("userId", "status");

-- CreateIndex
CREATE INDEX "documents_status_createdAt_idx" ON "documents"("status", "createdAt");

-- CreateIndex
CREATE INDEX "documents_createdAt_idx" ON "documents"("createdAt");

-- CreateIndex
CREATE INDEX "documents_s3Key_idx" ON "documents"("s3Key");

-- CreateIndex
CREATE UNIQUE INDEX "processing_jobs_inngestJobId_key" ON "processing_jobs"("inngestJobId");

-- CreateIndex
CREATE INDEX "processing_jobs_documentId_idx" ON "processing_jobs"("documentId");

-- CreateIndex
CREATE INDEX "processing_jobs_inngestJobId_idx" ON "processing_jobs"("inngestJobId");

-- CreateIndex
CREATE INDEX "audit_logs_documentId_idx" ON "audit_logs"("documentId");

-- CreateIndex
CREATE INDEX "audit_logs_stage_idx" ON "audit_logs"("stage");

-- CreateIndex
CREATE INDEX "audit_logs_createdAt_idx" ON "audit_logs"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "prompt_templates_name_key" ON "prompt_templates"("name");

-- CreateIndex
CREATE INDEX "prompt_templates_category_idx" ON "prompt_templates"("category");

-- CreateIndex
CREATE INDEX "prompt_templates_name_idx" ON "prompt_templates"("name");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "api_keys" ADD CONSTRAINT "api_keys_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "processing_jobs" ADD CONSTRAINT "processing_jobs_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "documents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "documents"("id") ON DELETE CASCADE ON UPDATE CASCADE;
