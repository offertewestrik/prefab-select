import "server-only";
import { siteUrl } from "@repo/seo";
import { prisma } from "@/lib/prisma";
import { sendOnboardingApproved, sendOnboardingRejected } from "@/features/notifications/email/send";
import { notifyCompany } from "@/features/notifications/server/service";

type ReviewStatus = "APPROVED" | "REJECTED" | "SUSPENDED";

/** Admin: bedrijfsstatus zetten + audit-log + melding naar de vakman. */
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

  if (status === "APPROVED") {
    void sendOnboardingApproved({ to: company.email, companyName: company.name, creditsUrl: siteUrl("/dashboard/credits") });
    await notifyCompany(companyId, { type: "onboarding.approved", title: "Je profiel is goedgekeurd 🎉", body: "Je ontvangt nu leads uit je werkgebied.", href: "/dashboard/credits" });
  } else if (status === "REJECTED") {
    void sendOnboardingRejected({ to: company.email, companyName: company.name, profileUrl: siteUrl("/aanmelden-vakman/bedrijf") });
    await notifyCompany(companyId, { type: "onboarding.rejected", title: "Aanmelding niet goedgekeurd", body: "Pas je gegevens aan en dien opnieuw in.", href: "/aanmelden-vakman/bedrijf" });
  }

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
