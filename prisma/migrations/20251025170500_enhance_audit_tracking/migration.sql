-- AlterEnum
-- Add REVALIDATION stage to PipelineStage enum
ALTER TYPE "PipelineStage" ADD VALUE 'REVALIDATION';

-- AlterTable
-- Add new fields to audit_logs table for enhanced tracking
ALTER TABLE "audit_logs"
  ADD COLUMN "attemptId" TEXT,
  ADD COLUMN "inngestEventId" TEXT,
  ADD COLUMN "agreementLevel" DOUBLE PRECISION,
  ADD COLUMN "providerWeights" JSONB,
  ADD COLUMN "sensitive" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
-- Add unique constraint for idempotency (documentId + stage + attemptId)
CREATE UNIQUE INDEX "audit_logs_documentId_stage_attemptId_key" ON "audit_logs"("documentId", "stage", "attemptId");

-- CreateIndex
-- Add index for inngestEventId for tracing
CREATE INDEX "audit_logs_inngestEventId_idx" ON "audit_logs"("inngestEventId");
