-- AlterTable
ALTER TABLE "Certification" ADD COLUMN     "fileUrl" TEXT;

-- AlterTable
ALTER TABLE "InstallerCompany" ADD COLUMN     "coverImageUrl" TEXT,
ADD COLUMN     "emergencyService" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "employees" INTEGER,
ADD COLUMN     "openingHours" JSONB,
ADD COLUMN     "publicVisible" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "shortDescription" TEXT,
ADD COLUMN     "specialties" TEXT[],
ADD COLUMN     "warrantyText" TEXT,
ADD COLUMN     "yearsExperience" INTEGER;

-- CreateTable
CREATE TABLE "CompanyPhoto" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompanyPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CompanyPhoto_companyId_idx" ON "CompanyPhoto"("companyId");

-- AddForeignKey
ALTER TABLE "CompanyPhoto" ADD CONSTRAINT "CompanyPhoto_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "InstallerCompany"("id") ON DELETE CASCADE ON UPDATE CASCADE;

