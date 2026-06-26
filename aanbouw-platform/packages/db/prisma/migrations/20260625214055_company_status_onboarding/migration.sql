-- CompanyStatus enum vervangen door onboarding-statussen, met datamapping.
ALTER TYPE "CompanyStatus" RENAME TO "CompanyStatus_old";
CREATE TYPE "CompanyStatus" AS ENUM ('DRAFT', 'PENDING_REVIEW', 'APPROVED', 'REJECTED', 'SUSPENDED');
ALTER TABLE "InstallerCompany" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "InstallerCompany" ALTER COLUMN "status" TYPE "CompanyStatus" USING (
  CASE "status"::text
    WHEN 'ACTIVE' THEN 'APPROVED'
    WHEN 'PENDING' THEN 'PENDING_REVIEW'
    WHEN 'SUSPENDED' THEN 'SUSPENDED'
    WHEN 'REJECTED' THEN 'REJECTED'
    ELSE 'PENDING_REVIEW'
  END
)::"CompanyStatus";
ALTER TABLE "InstallerCompany" ALTER COLUMN "status" SET DEFAULT 'PENDING_REVIEW';
DROP TYPE "CompanyStatus_old";
