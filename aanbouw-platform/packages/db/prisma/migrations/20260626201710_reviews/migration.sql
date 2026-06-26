-- CreateEnum
CREATE TYPE "ReviewSource" AS ENUM ('PLATFORM', 'IMPORTED', 'MANUAL');

-- AlterEnum
BEGIN;
CREATE TYPE "ReviewStatus_new" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'HIDDEN');
ALTER TABLE "public"."Review" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Review" ALTER COLUMN "status" TYPE "ReviewStatus_new" USING ("status"::text::"ReviewStatus_new");
ALTER TYPE "ReviewStatus" RENAME TO "ReviewStatus_old";
ALTER TYPE "ReviewStatus_new" RENAME TO "ReviewStatus";
DROP TYPE "public"."ReviewStatus_old";
ALTER TABLE "Review" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "authorName",
ADD COLUMN     "cityName" TEXT,
ADD COLUMN     "customerName" TEXT NOT NULL,
ADD COLUMN     "homeownerId" TEXT,
ADD COLUMN     "quoteId" TEXT,
ADD COLUMN     "serviceSlug" TEXT,
ADD COLUMN     "showName" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "source" "ReviewSource" NOT NULL DEFAULT 'PLATFORM',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ReviewInvite" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "customerEmail" TEXT,
ADD COLUMN     "quoteId" TEXT,
ADD COLUMN     "usedAt" TIMESTAMP(3),
ALTER COLUMN "leadId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ReviewInvite_quoteId_key" ON "ReviewInvite"("quoteId");

