-- AlterTable
ALTER TABLE "InstallerCompany" ADD COLUMN     "reviewSummary" JSONB,
ADD COLUMN     "reviewSummaryAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "LeadRequest" ADD COLUMN     "aiAnalysis" JSONB,
ADD COLUMN     "fraudFlags" TEXT[],
ADD COLUMN     "fraudScore" INTEGER;

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "fraudFlags" TEXT[],
ADD COLUMN     "fraudScore" INTEGER;

-- CreateTable
CREATE TABLE "PriceEstimate" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'ai',
    "marketPriceCents" INTEGER NOT NULL,
    "rangeMinCents" INTEGER NOT NULL,
    "rangeMaxCents" INTEGER NOT NULL,
    "materialCents" INTEGER NOT NULL DEFAULT 0,
    "labourHours" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "vatRate" INTEGER NOT NULL DEFAULT 21,
    "regionalFactor" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "advice" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PriceEstimate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PriceEstimate_leadId_key" ON "PriceEstimate"("leadId");

-- AddForeignKey
ALTER TABLE "PriceEstimate" ADD CONSTRAINT "PriceEstimate_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "LeadRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

