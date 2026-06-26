-- AlterTable
ALTER TABLE "Quote" ADD COLUMN     "acceptedAt" TIMESTAMP(3),
ADD COLUMN     "accessToken" TEXT,
ADD COLUMN     "introText" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "rejectedAt" TIMESTAMP(3),
ADD COLUMN     "sentAt" TIMESTAMP(3),
ADD COLUMN     "terms" TEXT,
ADD COLUMN     "title" TEXT,
ADD COLUMN     "vatRate" INTEGER NOT NULL DEFAULT 21,
ALTER COLUMN "subtotalCents" SET DEFAULT 0,
ALTER COLUMN "vatCents" SET DEFAULT 0,
ALTER COLUMN "totalCents" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Quote_accessToken_key" ON "Quote"("accessToken");

-- CreateIndex
CREATE INDEX "Quote_leadId_idx" ON "Quote"("leadId");

