import "server-only";
import type { Prisma } from "@repo/db";
import { prisma } from "@/lib/prisma";

export interface ReviewCard {
  id: string;
  rating: number;
  title: string | null;
  body: string;
  authorLabel: string; // respecteert showName
  cityName: string | null;
  serviceSlug: string | null;
  companyName: string;
  companySlug: string | null; // alleen als publiek profiel zichtbaar
  createdAt: Date;
}

export interface ReviewAggregate {
  average: number;
  count: number;
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
  latest: ReviewCard[];
}

async function aggregate(where: Prisma.ReviewWhereInput): Promise<ReviewAggregate> {
  const scoped: Prisma.ReviewWhereInput = { ...where, status: "APPROVED" };
  const [agg, grouped, latest] = await Promise.all([
    prisma.review.aggregate({ where: scoped, _avg: { rating: true }, _count: true }),
    prisma.review.groupBy({ by: ["rating"], where: scoped, _count: true }),
    prisma.review.findMany({
      where: scoped,
      orderBy: { createdAt: "desc" },
      take: 6,
      include: { company: { select: { name: true, slug: true, status: true, publicVisible: true } } },
    }),
  ]);

  const distribution: Record<1 | 2 | 3 | 4 | 5, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const g of grouped) {
    const r = g.rating as 1 | 2 | 3 | 4 | 5;
    if (r >= 1 && r <= 5) distribution[r] = g._count;
  }

  return {
    average: agg._avg.rating ?? 0,
    count: agg._count,
    distribution,
    latest: latest.map((r) => ({
      id: r.id,
      rating: r.rating,
      title: r.title,
      body: r.body,
      authorLabel: r.showName ? r.customerName : "Anonieme klant",
      cityName: r.cityName,
      serviceSlug: r.serviceSlug,
      companyName: r.company.name,
      companySlug: r.company.status === "APPROVED" && r.company.publicVisible ? r.company.slug : null,
      createdAt: r.createdAt,
    })),
  };
}

export const getReviewsForService = (serviceSlug: string) => aggregate({ serviceSlug });
export const getReviewsForCity = (cityName: string) => aggregate({ cityName });
export const getReviewsForServiceCity = (serviceSlug: string, cityName: string) =>
  aggregate({ serviceSlug, cityName });
