import "server-only";
import { urgencyLabels } from "@repo/core";
import { siteUrl } from "@repo/seo";
import { prisma } from "@/lib/prisma";
import { sendLeadAvailable } from "@/features/notifications/email/send";
import { notifyCompany } from "@/features/notifications/server/service";

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
  const lead = await prisma.leadRequest.findUnique({
    where: { id: leadId },
    include: { service: true, municipality: true },
  });
  if (!lead) return 0;

  const candidates = await prisma.installerCompany.findMany({
    where: {
      status: "APPROVED",
      services: { some: { serviceId: lead.serviceId } },
      coverage: { some: { municipalityId: lead.municipalityId } },
      creditBalance: { gte: lead.priceCredits },
    },
    // Ranking: hoogste rating eerst (later: abonnement/voorrang, responstijd).
    orderBy: [{ ratingAvg: "desc" }, { ratingCount: "desc" }],
    take: lead.maxBuyers,
    select: { id: true, email: true },
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

  // Melding naar gematchte installateurs — PII-vrij (alleen dienst/plaats/urgentie).
  const leadUrl = siteUrl(`/dashboard/leads/${leadId}`);
  for (const c of candidates) {
    void sendLeadAvailable({ to: c.email, serviceName: lead.service.name, city: lead.municipality.name, urgencyLabel: urgencyLabels[lead.urgency], leadUrl });
    await notifyCompany(c.id, { type: "lead.available", title: `Nieuwe lead: ${lead.service.name}`, body: `${lead.municipality.name} · ${urgencyLabels[lead.urgency]}`, href: `/dashboard/leads/${leadId}` });
  }

  return candidates.length;
}
