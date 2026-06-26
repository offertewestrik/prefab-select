-- CreateEnum
CREATE TYPE "AiStatus" AS ENUM ('OK', 'ERROR');

-- CreateTable
CREATE TABLE "AiInvocation" (
    "id" TEXT NOT NULL,
    "agent" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "status" "AiStatus" NOT NULL DEFAULT 'OK',
    "inputSummary" TEXT NOT NULL,
    "outputJson" JSONB,
    "promptTokens" INTEGER NOT NULL DEFAULT 0,
    "completionTokens" INTEGER NOT NULL DEFAULT 0,
    "totalTokens" INTEGER NOT NULL DEFAULT 0,
    "latencyMs" INTEGER NOT NULL DEFAULT 0,
    "errorMessage" TEXT,
    "userId" TEXT,
    "companyId" TEXT,
    "leadId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AiInvocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiDailyReport" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "reportJson" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AiDailyReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AiInvocation_agent_createdAt_idx" ON "AiInvocation"("agent", "createdAt");

-- CreateIndex
CREATE INDEX "AiInvocation_status_idx" ON "AiInvocation"("status");

-- CreateIndex
CREATE UNIQUE INDEX "AiDailyReport_date_key" ON "AiDailyReport"("date");

