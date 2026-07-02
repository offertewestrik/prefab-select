import "server-only";
import { prisma } from "@/lib/prisma";

/** Eigen prijstemplates van het bedrijf (nieuwste eerst). */
export function listCompanyTemplates(companyId: string) {
  return prisma.quoteTemplate.findMany({
    where: { companyId },
    orderBy: [{ order: "asc" }, { updatedAt: "desc" }],
    include: { _count: { select: { items: true } } },
  });
}

/** Eén eigen template met regels — alleen als het bij dit bedrijf hoort. */
export async function getCompanyTemplate(id: string, companyId: string) {
  const t = await prisma.quoteTemplate.findUnique({
    where: { id },
    include: { items: { orderBy: { order: "asc" } } },
  });
  if (!t || t.companyId !== companyId) return null;
  return t;
}

/** Platform-standaardtemplates die als startpunt gekopieerd kunnen worden. */
export function listPlatformTemplates() {
  return prisma.quoteTemplate.findMany({
    where: { companyId: null, active: true },
    orderBy: [{ order: "asc" }, { title: "asc" }],
    include: { service: { select: { category: { select: { name: true } } } }, _count: { select: { items: true } } },
  });
}
