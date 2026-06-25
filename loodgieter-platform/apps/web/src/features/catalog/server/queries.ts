import "server-only";
import { prisma } from "@/lib/prisma";

/** Alle gepubliceerde diensten, gegroepeerd per categorie (voor /diensten). */
export async function getServicesByCategory() {
  const categories = await prisma.serviceCategory.findMany({
    orderBy: { order: "asc" },
    include: {
      services: {
        where: { publish: "ACTIVE" },
        orderBy: { name: "asc" },
      },
    },
  });
  return categories.filter((c) => c.services.length > 0);
}

/** Eén dienst op slug, met merken, FAQ en gerelateerde diensten. */
export async function getServiceBySlug(slug: string) {
  return prisma.service.findFirst({
    where: { slug, publish: "ACTIVE" },
    include: {
      category: true,
      brands: { include: { brand: true } },
      faqs: { orderBy: { order: "asc" } },
      relatedFrom: { include: { to: true } },
    },
  });
}

/** Alle actieve dienst-slugs (voor sitemaps / generateStaticParams). */
export async function getAllServiceSlugs() {
  const rows = await prisma.service.findMany({
    where: { publish: "ACTIVE" },
    select: { slug: true, updatedAt: true },
  });
  return rows;
}

/** Prioriteits-combinaties (dienst × grootste gemeenten) voor build-time prerender. */
export async function getPriorityServiceCityPairs(topServices = 30, topCities = 50) {
  const [services, cities] = await Promise.all([
    prisma.service.findMany({
      where: { publish: "ACTIVE" },
      select: { slug: true },
      take: topServices,
    }),
    prisma.municipality.findMany({
      where: { publish: "ACTIVE" },
      select: { slug: true },
      orderBy: { population: "desc" },
      take: topCities,
    }),
  ]);
  const pairs: { service: string; city: string }[] = [];
  for (const s of services) for (const c of cities) pairs.push({ service: s.slug, city: c.slug });
  return pairs;
}
