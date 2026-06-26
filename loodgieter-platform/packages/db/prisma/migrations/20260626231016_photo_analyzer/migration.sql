-- CreateEnum
CREATE TYPE "PhotoAnalysisStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "PhotoRiskLevel" AS ENUM ('LAAG', 'GEMIDDELD', 'HOOG', 'ONBEKEND');

-- CreateTable
CREATE TABLE "PhotoAnalysis" (
    "id" TEXT NOT NULL,
    "leadId" TEXT,
    "createdBy" TEXT,
    "provider" TEXT NOT NULL,
    "detector" TEXT NOT NULL,
    "status" "PhotoAnalysisStatus" NOT NULL DEFAULT 'PENDING',
    "confidence" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "summary" TEXT,
    "recommendations" TEXT[],
    "riskLevel" "PhotoRiskLevel" NOT NULL DEFAULT 'ONBEKEND',
    "maintenanceScore" INTEGER,
    "estimatedPriceMin" INTEGER,
    "estimatedPriceMax" INTEGER,
    "rawResponse" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PhotoAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhotoObject" (
    "id" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "position" JSONB,
    "metadata" JSONB,

    CONSTRAINT "PhotoObject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhotoAnalysisImage" (
    "id" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PhotoAnalysisImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PhotoAnalysis_leadId_idx" ON "PhotoAnalysis"("leadId");

-- CreateIndex
CREATE INDEX "PhotoAnalysis_detector_status_idx" ON "PhotoAnalysis"("detector", "status");

-- CreateIndex
CREATE INDEX "PhotoObject_analysisId_idx" ON "PhotoObject"("analysisId");

-- CreateIndex
CREATE INDEX "PhotoAnalysisImage_analysisId_idx" ON "PhotoAnalysisImage"("analysisId");

-- AddForeignKey
ALTER TABLE "PhotoObject" ADD CONSTRAINT "PhotoObject_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "PhotoAnalysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhotoAnalysisImage" ADD CONSTRAINT "PhotoAnalysisImage_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "PhotoAnalysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

