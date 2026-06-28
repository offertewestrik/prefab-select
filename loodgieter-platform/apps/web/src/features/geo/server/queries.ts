import "server-only";
import { prisma } from "@/lib/prisma";

/** Alle actieve gemeenten, gegroepeerd per provincie (voor /steden). */
export async function getCitiesByProvince() {
  const provinces = await prisma.province.findMany({
    orderBy: { name: "asc" },
    include: {
      municipalities: {
        where: { publish: "ACTIVE" },
        orderBy: { population: "desc" },
      },
    },
  });
  return provinces.filter((p) => p.municipalities.length > 0);
}

/** Eén gemeente op slug, met provincie. */
export async function getCityBySlug(slug: string) {
  return prisma.municipality.findFirst({
    where: { slug, publish: "ACTIVE" },
    include: { province: true },
  });
}

/** Grootste actieve gemeenten (voor interne links op dienstpagina's). */
export async function getTopCities(limit = 12) {
  return prisma.municipality.findMany({
    where: { publish: "ACTIVE" },
    orderBy: { population: "desc" },
    take: limit,
    select: { name: true, slug: true },
  });
}

export async function getAllCitySlugs() {
  return prisma.municipality.findMany({
    where: { publish: "ACTIVE" },
    select: { slug: true, updatedAt: true },
  });
}

/** Nabije gemeenten o.b.v. geografische afstand (Haversine, in JS). */
export async function getNearbyCities(
  lat: number,
  lng: number,
  excludeSlug: string,
  limit = 6,
) {
  const all = await prisma.municipality.findMany({
    where: { publish: "ACTIVE", slug: { not: excludeSlug } },
    select: { name: true, slug: true, lat: true, lng: true },
  });
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dist = (aLat: number, aLng: number) => {
    const R = 6371;
    const dLat = toRad(aLat - lat);
    const dLng = toRad(aLng - lng);
    const x =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat)) * Math.cos(toRad(aLat)) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  };
  return all
    .map((c) => ({ ...c, km: dist(c.lat, c.lng) }))
    .sort((a, b) => a.km - b.km)
    .slice(0, limit);
}

/**
 * Aantal publiek-zichtbare, goedgekeurde vakmannen met dekking per provincie.
 * Read-only — voedt de dekkingskaart op de homepage. Wijzigt niets aan logica.
 */
export async function getInstallerCountByProvince(): Promise<
  { slug: string; name: string; count: number }[]
> {
  const provinces = await prisma.province.findMany({
    select: { id: true, slug: true, name: true },
    orderBy: { name: "asc" },
  });
  const counts = await Promise.all(
    provinces.map((p) =>
      prisma.installerCompany.count({
        where: {
          status: "APPROVED",
          publicVisible: true,
          coverage: { some: { municipality: { provinceId: p.id } } },
        },
      }),
    ),
  );
  return provinces.map((p, i) => ({ slug: p.slug, name: p.name, count: counts[i] ?? 0 }));
}

/** Aantal actieve vakmannen dat een dienst in een gemeente aanbiedt. */
export async function countInstallersFor(serviceId: string, municipalityId: string) {
  return prisma.installerCompany.count({
    where: {
      status: "APPROVED",
      services: { some: { serviceId } },
      coverage: { some: { municipalityId } },
    },
  });
}
