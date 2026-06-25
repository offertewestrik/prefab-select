import "server-only";
import { prisma } from "@/lib/prisma";
import { profileSchema } from "../schema";

export type MediaKind = "logo" | "cover";

export type ProfileResult = { ok: boolean; reason?: string };

/** Publiek bedrijfsprofiel bijwerken (eigen bedrijf). */
export async function updateCompanyProfile(companyId: string, payload: unknown): Promise<ProfileResult> {
  const parsed = profileSchema.safeParse(payload);
  if (!parsed.success) return { ok: false, reason: parsed.error.issues[0]?.message ?? "invalid" };
  const d = parsed.data;

  await prisma.installerCompany.update({
    where: { id: companyId },
    data: {
      name: d.name,
      shortDescription: d.shortDescription || null,
      description: d.description || null,
      specialties: d.specialties ? d.specialties.split(",").map((s) => s.trim()).filter(Boolean) : [],
      yearsExperience: d.yearsExperience ?? null,
      employees: d.employees ?? null,
      kvk: d.kvk || null,
      vatNumber: d.vatNumber || null,
      phone: d.phone,
      email: d.email,
      website: d.website || null,
      street: d.street || null,
      postcode: d.postcode || null,
      city: d.city || null,
      province: d.province || null,
      openingHours: d.openingHours ? { text: d.openingHours } : undefined,
      emergencyService: d.emergencyService,
      warrantyText: d.warrantyText || null,
    },
  });
  return { ok: true };
}

/** Logo of omslagfoto-URL opslaan (na upload). */
export async function setCompanyMedia(companyId: string, kind: MediaKind, url: string) {
  await prisma.installerCompany.update({
    where: { id: companyId },
    data: kind === "logo" ? { logoUrl: url } : { coverImageUrl: url },
  });
}

export async function addPortfolioPhoto(companyId: string, url: string, caption?: string) {
  const count = await prisma.companyPhoto.count({ where: { companyId } });
  return prisma.companyPhoto.create({ data: { companyId, url, caption: caption ?? null, order: count } });
}

export async function removePhoto(companyId: string, photoId: string) {
  await prisma.companyPhoto.deleteMany({ where: { id: photoId, companyId } });
}

export async function addCertification(
  companyId: string,
  input: { type: string; number?: string; validUntil?: string; fileUrl?: string },
) {
  if (!input.type?.trim()) return { ok: false };
  await prisma.certification.create({
    data: {
      companyId,
      type: input.type.trim(),
      number: input.number || null,
      validUntil: input.validUntil ? new Date(input.validUntil) : null,
      fileUrl: input.fileUrl || null,
    },
  });
  return { ok: true };
}

export async function removeCertification(companyId: string, id: string) {
  await prisma.certification.deleteMany({ where: { id, companyId } });
}

/** Admin: publiek profiel tonen/verbergen. */
export async function setVisibility(companyId: string, visible: boolean) {
  await prisma.installerCompany.update({ where: { id: companyId }, data: { publicVisible: visible } });
}

/** Profiel voor het dashboard (eigen bedrijf). */
export async function getOwnProfile(companyId: string) {
  return prisma.installerCompany.findUnique({
    where: { id: companyId },
    include: { photos: { orderBy: { order: "asc" } }, certifications: true },
  });
}

/** Publiek profiel op slug — alleen APPROVED én zichtbaar. */
export async function getPublicProfile(slug: string) {
  const company = await prisma.installerCompany.findFirst({
    where: { slug, status: "APPROVED", publicVisible: true },
    include: {
      services: { include: { service: true } },
      coverage: { include: { municipality: true } },
      certifications: true,
      photos: { orderBy: { order: "asc" } },
      reviews: { where: { status: "PUBLISHED" }, orderBy: { createdAt: "desc" }, take: 10 },
    },
  });
  return company;
}
