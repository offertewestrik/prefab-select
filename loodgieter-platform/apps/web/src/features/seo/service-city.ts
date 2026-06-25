import "server-only";
import { prisma } from "@/lib/prisma";
import { isReservedSlug } from "@repo/core";
import { countInstallersFor, getNearbyCities } from "@/features/geo/server/queries";

/**
 * Haalt alle data voor een dienst×stad-pagina op. Geeft null bij een ongeldige
 * combinatie (→ notFound), zodat junk-URL's niet geïndexeerd worden.
 */
export async function getServiceCityData(serviceSlug: string, citySlug: string) {
  if (isReservedSlug(serviceSlug) || isReservedSlug(citySlug)) return null;

  const [service, city] = await Promise.all([
    prisma.service.findFirst({
      where: { slug: serviceSlug, publish: "ACTIVE" },
      include: {
        category: true,
        faqs: { orderBy: { order: "asc" } },
        relatedFrom: { include: { to: true } },
      },
    }),
    prisma.municipality.findFirst({
      where: { slug: citySlug, publish: "ACTIVE" },
      include: { province: true },
    }),
  ]);
  if (!service || !city) return null;

  // Optionele admin-override voor deze specifieke combinatie.
  const override = await prisma.landingContent
    .findUnique({ where: { serviceId_municipalityId: { serviceId: service.id, municipalityId: city.id } } })
    .catch(() => null);

  const [installerCount, nearby] = await Promise.all([
    countInstallersFor(service.id, city.id),
    getNearbyCities(city.lat, city.lng, city.slug, 6),
  ]);

  const related = service.relatedFrom.map((r) => r.to).filter((t) => t.publish === "ACTIVE").slice(0, 6);

  return { service, city, override, installerCount, nearby, related };
}

export type ServiceCityData = NonNullable<Awaited<ReturnType<typeof getServiceCityData>>>;
