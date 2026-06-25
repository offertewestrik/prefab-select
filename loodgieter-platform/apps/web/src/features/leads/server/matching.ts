import "server-only";
import { prisma } from "@/lib/prisma";

/**
 * Matching-fundering (schaalbaar, bewust eenvoudig — zie docs/05 §3).
 * Match-criteria voor v1:
 *  - dienst:            bedrijf biedt de dienst aan (CompanyService)
 *  - stad/werkgebied:   leadgemeente valt in CompanyCoverage
 *  - installateurstatus: alleen ACTIVE bedrijven
 *  - beschikbaarheid:    voldoende creditsaldo om de lead te kunnen kopen
 * Maakt LeadMatch-records (OFFERED) voor de top-N (maxBuyers).
 */
export async function matchLead(leadId: string): Promise<number> {
  const lead = await prisma.leadRequest.findUnique({ where: { id: leadId } });
  if (!lead) return 0;

  const candidates = await prisma.installerCompany.findMany({
    where: {
      status: "ACTIVE",
      services: { some: { serviceId: lead.serviceId } },
      coverage: { some: { municipalityId: lead.municipalityId } },
      creditBalance: { gte: lead.priceCredits },
    },
    // Ranking: hoogste rating eerst (later: abonnement/voorrang, responstijd).
    orderBy: [{ ratingAvg: "desc" }, { ratingCount: "desc" }],
    take: lead.maxBuyers,
    select: { id: true },
  });

  if (candidates.length === 0) {
    // Geen dekking → lead blijft NEW (admin kan handmatig toewijzen).
    return 0;
  }

  await prisma.$transaction([
    ...candidates.map((c) =>
      prisma.leadMatch.upsert({
        where: { leadId_companyId: { leadId, companyId: c.id } },
        update: {},
        create: { leadId, companyId: c.id, status: "OFFERED", priceCredits: lead.priceCredits },
      }),
    ),
    prisma.leadRequest.update({ where: { id: leadId }, data: { status: "DISTRIBUTED" } }),
  ]);

  return candidates.length;
}
