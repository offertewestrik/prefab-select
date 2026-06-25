import "server-only";
import { prisma } from "@/lib/prisma";

type ReviewStatus = "APPROVED" | "REJECTED" | "SUSPENDED";

/** Admin: bedrijfsstatus zetten + audit-log. */
export async function setCompanyStatus(companyId: string, status: ReviewStatus, actorId?: string) {
  const company = await prisma.installerCompany.findUnique({ where: { id: companyId } });
  if (!company) return { ok: false };

  await prisma.$transaction([
    prisma.installerCompany.update({ where: { id: companyId }, data: { status } }),
    prisma.auditLog.create({
      data: {
        actorId: actorId ?? null,
        action: `company.${status.toLowerCase()}`,
        entityType: "InstallerCompany",
        entityId: companyId,
        diff: { from: company.status, to: status },
      },
    }),
  ]);
  return { ok: true };
}

/** Admin: volledig bedrijfsprofiel met diensten, werkgebied en leden. */
export async function getCompanyForAdmin(companyId: string) {
  return prisma.installerCompany.findUnique({
    where: { id: companyId },
    include: {
      services: { include: { service: true } },
      coverage: { include: { municipality: true } },
      members: { include: { user: true } },
    },
  });
}
