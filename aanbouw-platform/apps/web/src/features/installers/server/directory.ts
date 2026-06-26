import "server-only";
import type { Prisma } from "@repo/db";
import { haversineKm, centroid, type LatLng } from "@repo/maps";
import { prisma } from "@/lib/prisma";
import { geocodeOrigin, type GeoPoint } from "@/features/geo/server/geocode";

export type InstallerSort = "rating" | "reviews" | "city" | "recent" | "distance" | "region";

export interface DirectoryFilter {
  q?: string;
  service?: string; // service slug
  city?: string; // municipality slug
  province?: string; // province slug
  minRating?: number; // 0..5
  emergency?: boolean;
  cert?: string; // certification type
  sort?: InstallerSort;
  /** Herkomst voor afstand (plaats-slug, plaatsnaam of postcode). */
  near?: string;
  /** Alleen vakmannen binnen X km van de herkomst. */
  radiusKm?: number;
}

export interface InstallerCardData {
  id: string;
  slug: string;
  name: string;
  logoUrl: string | null;
  ratingAvg: number;
  ratingCount: number;
  emergencyService: boolean;
  city: string | null;
  services: { name: string; slug: string }[];
  /** Provincies in het werkgebied (afgeleid uit coverage). */
  provinces: string[];
  /** Aantal gemeenten in het werkgebied. */
  coverageCount: number;
  certifications: string[];
  /** Korte omschrijving voor de kaart. */
  shortDescription: string | null;
  /** Afstand (km) tot de herkomst — alleen gevuld bij een `near`-zoekopdracht. */
  distanceKm: number | null;
}

const TAKE = 60;

const SORTS: InstallerSort[] = ["rating", "reviews", "city", "recent", "distance", "region"];

/** Vertaalt query-params (NL-namen) naar een gevalideerd DirectoryFilter. */
export function parseDirectoryParams(sp: Record<string, string | string[] | undefined>): DirectoryFilter {
  const str = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v)?.trim() || undefined;
  let sort = str(sp.sort);
  if (sort === "afstand") sort = "distance";
  if (sort === "regio") sort = "region";
  const rating = Number(str(sp.score));
  const radius = Number(str(sp.straal));
  return {
    q: str(sp.q),
    service: str(sp.dienst),
    city: str(sp.plaats),
    province: str(sp.provincie),
    minRating: Number.isFinite(rating) && rating > 0 ? rating : undefined,
    emergency: str(sp.spoed) === "1",
    cert: str(sp.keurmerk),
    sort: SORTS.includes(sort as InstallerSort) ? (sort as InstallerSort) : undefined,
    near: str(sp.bij),
    radiusKm: Number.isFinite(radius) && radius > 0 ? radius : undefined,
  };
}

/**
 * Hard-locked op publiek-zichtbare, goedgekeurde vakmannen. PENDING / REJECTED /
 * SUSPENDED / verborgen profielen komen nooit uit deze query.
 */
function baseWhere(filter: DirectoryFilter): Prisma.InstallerCompanyWhereInput {
  const and: Prisma.InstallerCompanyWhereInput[] = [];

  if (filter.service) and.push({ services: { some: { service: { slug: filter.service } } } });
  if (filter.city) and.push({ coverage: { some: { municipality: { slug: filter.city } } } });
  if (filter.province)
    and.push({ coverage: { some: { municipality: { province: { slug: filter.province } } } } });
  if (filter.cert) and.push({ certifications: { some: { type: filter.cert } } });

  // Vrije zoekterm: bedrijfsnaam, plaats, dienst (naam/slug) of specialisatie.
  if (filter.q) {
    const q = filter.q;
    and.push({
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { city: { contains: q, mode: "insensitive" } },
        { specialties: { has: q } },
        {
          services: {
            some: {
              service: {
                OR: [
                  { name: { contains: q, mode: "insensitive" } },
                  { slug: { contains: q, mode: "insensitive" } },
                ],
              },
            },
          },
        },
      ],
    });
  }

  return {
    status: "APPROVED",
    publicVisible: true,
    ...(filter.minRating && filter.minRating > 0 ? { ratingAvg: { gte: filter.minRating } } : {}),
    ...(filter.emergency ? { emergencyService: true } : {}),
    ...(and.length ? { AND: and } : {}),
  };
}

function orderBy(sort: InstallerSort = "rating"): Prisma.InstallerCompanyOrderByWithRelationInput[] {
  switch (sort) {
    case "reviews":
      return [{ ratingCount: "desc" }, { ratingAvg: "desc" }];
    case "city":
      // "afstand/plaats": zonder bezoekerslocatie sorteren we alfabetisch op vestigingsplaats.
      return [{ city: "asc" }, { name: "asc" }];
    case "recent":
      // "Nieuw toegevoegd": nieuwste bedrijven eerst.
      return [{ createdAt: "desc" }];
    case "region":
      // Vestigingsprovincie (vrij tekstveld) alfabetisch.
      return [{ province: "asc" }, { city: "asc" }, { name: "asc" }];
    case "rating":
    default:
      return [{ ratingAvg: "desc" }, { ratingCount: "desc" }];
  }
}

const SELECT = {
  id: true,
  slug: true,
  name: true,
  logoUrl: true,
  ratingAvg: true,
  ratingCount: true,
  emergencyService: true,
  city: true,
  shortDescription: true,
  services: { select: { service: { select: { name: true, slug: true } } }, take: 8 },
  coverage: {
    select: { municipality: { select: { name: true, lat: true, lng: true, province: { select: { name: true } } } } },
  },
  certifications: { select: { type: true } },
} satisfies Prisma.InstallerCompanySelect;

type Row = Prisma.InstallerCompanyGetPayload<{ select: typeof SELECT }>;

const eqCity = (a: string, b: string) => a.trim().toLowerCase() === b.trim().toLowerCase();

/**
 * Referentiepunt van een vakman: bij voorkeur de vestigingsplaats (indien die
 * in het werkgebied valt), anders het zwaartepunt van alle dekkingsgemeenten.
 */
function installerCenter(row: Row): LatLng | null {
  const pts = row.coverage
    .map((cv) => cv.municipality)
    .filter((m): m is NonNullable<typeof m> => !!m)
    .map((m) => ({ lat: m.lat, lng: m.lng }));
  if (row.city) {
    const match = row.coverage.find((cv) => cv.municipality && eqCity(cv.municipality.name, row.city!));
    if (match?.municipality) return { lat: match.municipality.lat, lng: match.municipality.lng };
  }
  return centroid(pts);
}

function toCard(row: Row, distanceKm: number | null): InstallerCardData {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    logoUrl: row.logoUrl,
    ratingAvg: row.ratingAvg,
    ratingCount: row.ratingCount,
    emergencyService: row.emergencyService,
    city: row.city,
    services: row.services.map((s) => ({ name: s.service.name, slug: s.service.slug })),
    provinces: [
      ...new Set(row.coverage.map((cv) => cv.municipality?.province.name).filter(Boolean) as string[]),
    ].sort(),
    coverageCount: row.coverage.filter((cv) => cv.municipality).length,
    certifications: [...new Set(row.certifications.map((cert) => cert.type))],
    shortDescription: row.shortDescription,
    distanceKm,
  };
}

function jsSort(items: InstallerCardData[], sort: InstallerSort): InstallerCardData[] {
  const nullsLast = (d: number | null) => (d == null ? Number.POSITIVE_INFINITY : d);
  const cmp: Record<InstallerSort, (a: InstallerCardData, b: InstallerCardData) => number> = {
    distance: (a, b) => nullsLast(a.distanceKm) - nullsLast(b.distanceKm),
    rating: (a, b) => b.ratingAvg - a.ratingAvg || b.ratingCount - a.ratingCount,
    reviews: (a, b) => b.ratingCount - a.ratingCount || b.ratingAvg - a.ratingAvg,
    city: (a, b) => (a.city ?? "").localeCompare(b.city ?? ""),
    region: (a, b) => (a.provinces[0] ?? "").localeCompare(b.provinces[0] ?? ""),
    recent: (a, b) => nullsLast(a.distanceKm) - nullsLast(b.distanceKm), // val terug op afstand
  };
  return [...items].sort(cmp[sort] ?? cmp.distance);
}

/**
 * Resolvet (indien `near`) de herkomst naar coördinaten. Geeft null als er geen
 * `near` is of als die niet te resolven valt (dan vervalt afstand/radius netjes).
 */
export async function resolveOrigin(filter: DirectoryFilter): Promise<GeoPoint | null> {
  if (!filter.near) return null;
  return geocodeOrigin(filter.near);
}

export async function searchInstallers(
  filter: DirectoryFilter = {},
): Promise<{ items: InstallerCardData[]; total: number; truncated: boolean; origin: GeoPoint | null }> {
  const where = baseWhere(filter);
  const origin = await resolveOrigin(filter);

  // Bij een afstandszoekopdracht halen we ruimer op en sorteren/filteren we in JS
  // (afstand zit niet in de DB). Anders gebruiken we DB-sortering + count.
  if (origin) {
    const rows = await prisma.installerCompany.findMany({ where, take: 200, select: SELECT });
    let items = rows.map((r) => {
      const center = installerCenter(r);
      return toCard(r, center ? Math.round(haversineKm(origin, center) * 10) / 10 : null);
    });
    if (filter.radiusKm) {
      items = items.filter((i) => i.distanceKm != null && i.distanceKm <= filter.radiusKm!);
    }
    items = jsSort(items, filter.sort ?? "distance");
    const total = items.length;
    return { items: items.slice(0, TAKE), total, truncated: total > TAKE, origin };
  }

  const [rows, total] = await Promise.all([
    prisma.installerCompany.findMany({ where, orderBy: orderBy(filter.sort), take: TAKE, select: SELECT }),
    prisma.installerCompany.count({ where }),
  ]);
  const items = rows.map((r) => toCard(r, null));
  return { items, total, truncated: total > TAKE, origin: null };
}

export async function getDirectoryFilterOptions() {
  const [services, provinces, cities, certs] = await Promise.all([
    prisma.service.findMany({
      where: { publish: "ACTIVE" },
      select: { slug: true, name: true },
      orderBy: { name: "asc" },
    }),
    prisma.province.findMany({ select: { slug: true, name: true }, orderBy: { name: "asc" } }),
    prisma.municipality.findMany({
      where: { publish: "ACTIVE" },
      select: { slug: true, name: true },
      orderBy: { name: "asc" },
    }),
    prisma.certification.findMany({
      where: { company: { status: "APPROVED", publicVisible: true } },
      select: { type: true },
      distinct: ["type"],
      orderBy: { type: "asc" },
    }),
  ]);
  return {
    services,
    provinces,
    cities,
    certs: certs.map((c) => c.type),
  };
}

export type DirectorySegment =
  | { kind: "service"; slug: string; name: string; description: string }
  | { kind: "city"; slug: string; name: string; province: string };

/**
 * Resolvet een padsegment voor de SEO-landingspagina's: eerst dienst, dan stad.
 * (Bedrijfsprofielen worden in de route zelf vóór deze resolver afgehandeld.)
 */
export async function resolveDirectorySegment(slug: string): Promise<DirectorySegment | null> {
  const service = await prisma.service.findFirst({
    where: { slug, publish: "ACTIVE" },
    select: { slug: true, name: true, shortDescription: true },
  });
  if (service) {
    return { kind: "service", slug: service.slug, name: service.name, description: service.shortDescription };
  }
  const city = await prisma.municipality.findFirst({
    where: { slug, publish: "ACTIVE" },
    select: { slug: true, name: true, province: { select: { name: true } } },
  });
  if (city) {
    return { kind: "city", slug: city.slug, name: city.name, province: city.province.name };
  }
  return null;
}
