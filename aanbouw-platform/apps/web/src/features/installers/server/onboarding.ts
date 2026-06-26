import "server-only";
import bcrypt from "bcryptjs";
import { slugify } from "@repo/core";
import { siteUrl } from "@repo/seo";
import { prisma } from "@/lib/prisma";
import { sendAdminNotification } from "@/features/notifications/email/send";
import { notifyAdmins } from "@/features/notifications/server/service";
import { createEmailVerification } from "@/features/auth/server/tokens";
import type { RegisterInstallerInput } from "../schema";

export type RegisterResult =
  | { ok: true; userId: string; companyId: string }
  | { ok: false; reason: "email_taken" | "error" };

/** Maakt account (INSTALLER) + bedrijf (DRAFT) + eigenaarschap. */
export async function registerInstaller(input: RegisterInstallerInput): Promise<RegisterResult> {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) return { ok: false, reason: "email_taken" };

  // unieke slug
  const base = slugify(input.companyName) || "vakman";
  let slug = base;
  for (let i = 2; await prisma.installerCompany.findUnique({ where: { slug } }); i++) slug = `${base}-${i}`;

  const passwordHash = await bcrypt.hash(input.password, 10);

  try {
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: { email: input.email, name: input.contactName, role: "INSTALLER", passwordHash },
      });
      const company = await tx.installerCompany.create({
        data: {
          slug,
          name: input.companyName,
          kvk: input.kvk || null,
          vatNumber: input.vatNumber || null,
          email: input.email,
          phone: input.phone,
          website: input.website || null,
          contactName: input.contactName,
          street: input.street || null,
          postcode: input.postcode || null,
          city: input.city || null,
          province: input.province || null,
          status: "DRAFT",
        },
      });
      await tx.companyMember.create({ data: { companyId: company.id, userId: user.id, role: "OWNER" } });
      return { userId: user.id, companyId: company.id };
    });
    // Verificatiemail (buiten de transactie; fire-and-forget).
    void createEmailVerification(result.userId, input.email);
    return { ok: true, ...result };
  } catch {
    return { ok: false, reason: "error" };
  }
}

/** Diensten van een bedrijf vervangen. */
export async function saveCompanyServices(companyId: string, serviceIds: string[]) {
  const valid = await prisma.service.findMany({ where: { id: { in: serviceIds } }, select: { id: true } });
  const ids = valid.map((s) => s.id);
  await prisma.$transaction([
    prisma.companyService.deleteMany({ where: { companyId } }),
    ...ids.map((serviceId) => prisma.companyService.create({ data: { companyId, serviceId } })),
  ]);
  return ids.length;
}

/** Werkgebied (gemeenten) van een bedrijf vervangen. */
export async function saveCoverage(companyId: string, municipalityIds: string[], radiusKm?: number) {
  const valid = await prisma.municipality.findMany({ where: { id: { in: municipalityIds } }, select: { id: true } });
  const ids = valid.map((m) => m.id);
  await prisma.$transaction([
    prisma.companyCoverage.deleteMany({ where: { companyId } }),
    ...ids.map((municipalityId) =>
      prisma.companyCoverage.create({ data: { companyId, municipalityId, radiusKm: radiusKm ?? null } }),
    ),
  ]);
  return ids.length;
}

/** Profiel indienen ter beoordeling (DRAFT → PENDING_REVIEW). */
export async function submitForReview(companyId: string): Promise<{ ok: boolean; reason?: string }> {
  const company = await prisma.installerCompany.findUnique({
    where: { id: companyId },
    include: { _count: { select: { services: true, coverage: true } } },
  });
  if (!company) return { ok: false, reason: "not_found" };
  if (company._count.services === 0) return { ok: false, reason: "no_services" };
  if (company._count.coverage === 0) return { ok: false, reason: "no_coverage" };
  if (company.status === "DRAFT") {
    await prisma.installerCompany.update({ where: { id: companyId }, data: { status: "PENDING_REVIEW" } });
    void sendAdminNotification({
      title: `Nieuwe vakman wacht op goedkeuring: ${company.name}`,
      lines: [`Bedrijf: ${company.name}`, `E-mail: ${company.email}`],
      url: siteUrl(`/admin/installers/${companyId}`),
    });
    await notifyAdmins({ type: "installer.pending", title: "Nieuwe vakman wacht op goedkeuring", body: company.name, href: `/admin/installers/${companyId}` });
  }
  return { ok: true };
}

/** Profiel-compleetheid (%). */
export function profileCompleteness(company: {
  name: string;
  phone: string;
  contactName: string | null;
  kvk: string | null;
  city: string | null;
  servicesCount: number;
  coverageCount: number;
}): number {
  const checks = [
    !!company.name,
    !!company.phone,
    !!company.contactName,
    !!company.kvk,
    !!company.city,
    company.servicesCount > 0,
    company.coverageCount > 0,
  ];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}
