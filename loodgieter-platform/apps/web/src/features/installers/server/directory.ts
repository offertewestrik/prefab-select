import "server-only";
import type { Prisma } from "@repo/db";
import { prisma } from "@/lib/prisma";

export type InstallerSort = "rating" | "reviews" | "city" | "recent";

export interface DirectoryFilter {
  q?: string;
  service?: string; // service slug
  city?: string; // municipality slug
  province?: string; // province slug
  minRating?: number; // 0..5
  emergency?: boolean;
  cert?: string; // certification type
  sort?: InstallerSort;
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
}

const TAKE = 60;

const SORTS: InstallerSort[] = ["rating", "reviews", "city", "recent"];

/** Vertaalt query-params (NL-namen) naar een gevalideerd DirectoryFilter. */
export function parseDirectoryParams(sp: Record<string, string | string[] | undefined>): DirectoryFilter {
  const str = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v)?.trim() || undefined;
  const sort = str(sp.sort);
  const rating = Number(str(sp.score));
  return {
    q: str(sp.q),
    service: str(sp.dienst),
    city: str(sp.plaats),
    province: str(sp.provincie),
    minRating: Number.isFinite(rating) && rating > 0 ? rating : undefined,
    emergency: str(sp.spoed) === "1",
    cert: str(sp.keurmerk),
    sort: SORTS.includes(sort as InstallerSort) ? (sort as InstallerSort) : undefined,
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

  return {
    status: "APPROVED",
    publicVisible: true,
    ...(filter.q ? { name: { contains: filter.q, mode: "insensitive" } } : {}),
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
      return [{ updatedAt: "desc" }];
    case "rating":
    default:
      return [{ ratingAvg: "desc" }, { ratingCount: "desc" }];
  }
}

export async function searchInstallers(
  filter: DirectoryFilter = {},
): Promise<{ items: InstallerCardData[]; total: number; truncated: boolean }> {
  const where = baseWhere(filter);

  const [rows, total] = await Promise.all([
    prisma.installerCompany.findMany({
      where,
      orderBy: orderBy(filter.sort),
      take: TAKE,
      select: {
        id: true,
        slug: true,
        name: true,
        logoUrl: true,
        ratingAvg: true,
        ratingCount: true,
        emergencyService: true,
        city: true,
        services: { select: { service: { select: { name: true, slug: true } } }, take: 8 },
        coverage: {
          select: { municipality: { select: { name: true, province: { select: { name: true } } } } },
        },
        certifications: { select: { type: true } },
      },
    }),
    prisma.installerCompany.count({ where }),
  ]);

  const items: InstallerCardData[] = rows.map((c) => ({
    id: c.id,
    slug: c.slug,
    name: c.name,
    logoUrl: c.logoUrl,
    ratingAvg: c.ratingAvg,
    ratingCount: c.ratingCount,
    emergencyService: c.emergencyService,
    city: c.city,
    services: c.services.map((s) => ({ name: s.service.name, slug: s.service.slug })),
    provinces: [
      ...new Set(c.coverage.map((cv) => cv.municipality?.province.name).filter(Boolean) as string[]),
    ].sort(),
    coverageCount: c.coverage.filter((cv) => cv.municipality).length,
    certifications: [...new Set(c.certifications.map((cert) => cert.type))],
  }));

  return { items, total, truncated: total > TAKE };
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
