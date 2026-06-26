import "server-only";
import { leadAnalyzer, priceAdvisor, fraudDetector, reviewSummarizer, adminAi } from "@repo/ai";
import { prisma } from "@/lib/prisma";
import { runAgent } from "./run";

/** Analyseer een aanvraag en sla het resultaat op bij de lead (zonder PII). */
export async function analyzeLead(leadId: string) {
  const lead = await prisma.leadRequest.findUnique({
    where: { id: leadId },
    include: { service: true, municipality: true, _count: { select: { attachments: true } } },
  });
  if (!lead) return { ok: false as const, error: "not_found" };

  const res = await runAgent(
    leadAnalyzer,
    {
      service: lead.service.name,
      city: lead.municipality.name,
      urgency: lead.urgency,
      description: lead.description,
      attachmentCount: lead._count.attachments,
    },
    { summary: `Lead ${lead.service.name} / ${lead.municipality.name}`, leadId },
  );
  if (res.ok && res.data) {
    await prisma.leadRequest.update({ where: { id: leadId }, data: { aiAnalysis: res.data as object } });
  }
  return res;
}

/** Prijsindicatie voor een lead via Price Advisor, met rule-based fallback. */
export async function estimateLeadPrice(leadId: string) {
  const lead = await prisma.leadRequest.findUnique({
    where: { id: leadId },
    include: { service: true, municipality: { include: { province: true } } },
  });
  if (!lead) return { ok: false as const, error: "not_found" };

  const priceFromCents = lead.service.priceFrom ? Math.round(lead.service.priceFrom * 100) : null;
  const res = await runAgent(
    priceAdvisor,
    {
      service: lead.service.name,
      region: lead.municipality.province.name,
      scope: lead.description.slice(0, 200),
      priceFromCents,
    },
    { summary: `Prijsindicatie ${lead.service.name} / ${lead.municipality.province.name}`, leadId },
  );

  // Rule-based fallback wanneer de AI faalt of geen geldige output geeft.
  let data;
  let source = "ai";
  if (res.ok && res.data) {
    data = res.data;
  } else {
    source = "rule";
    const base = priceFromCents ?? 75000;
    const to = lead.service.priceTo ? Math.round(lead.service.priceTo * 100) : Math.round(base * 1.4);
    data = {
      marketPriceCents: Math.round((base + to) / 2),
      rangeMinCents: base,
      rangeMaxCents: to,
      materialCents: Math.round(base * 0.4),
      labourHours: 4,
      vatRate: 21,
      regionalFactor: 1,
      advice: "Indicatie op basis van standaardtarieven (AI niet beschikbaar).",
    };
  }

  await prisma.priceEstimate.upsert({
    where: { leadId },
    create: { leadId, source, ...data },
    update: { source, ...data },
  });
  return { ok: true as const, source, data };
}

/** Fraudedetectie op een nieuwe aanvraag; slaat score + flags op bij de lead. */
export async function detectLeadFraud(leadId: string) {
  const lead = await prisma.leadRequest.findUnique({ where: { id: leadId } });
  if (!lead) return { ok: false as const, error: "not_found" };

  const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const [duplicateCount, sameContactRecentCount] = await Promise.all([
    lead.ipHash
      ? prisma.leadRequest.count({ where: { ipHash: lead.ipHash, id: { not: leadId } } })
      : Promise.resolve(0),
    prisma.leadRequest.count({ where: { contactEmail: lead.contactEmail, id: { not: leadId }, createdAt: { gte: since } } }),
  ]);

  const res = await runAgent(
    fraudDetector,
    { kind: "lead", text: lead.description, signals: { duplicateCount, sameContactRecentCount } },
    { summary: `Fraudecheck lead ${lead.serviceId}`, leadId },
  );
  if (res.ok && res.data) {
    await prisma.leadRequest.update({
      where: { id: leadId },
      data: { fraudScore: res.data.riskScore, fraudFlags: res.data.flags },
    });
  }
  return res;
}

/** Fraudedetectie op een nieuwe review; slaat score + flags op. Review blijft PENDING. */
export async function detectReviewFraud(reviewId: string) {
  const review = await prisma.review.findUnique({ where: { id: reviewId } });
  if (!review) return { ok: false as const, error: "not_found" };

  const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const sameContactRecentCount = await prisma.review.count({
    where: { companyId: review.companyId, customerName: review.customerName, id: { not: reviewId }, createdAt: { gte: since } },
  });

  const res = await runAgent(
    fraudDetector,
    { kind: "review", text: review.body, signals: { sameContactRecentCount } },
    { summary: `Fraudecheck review ${review.companyId}` },
  );
  if (res.ok && res.data) {
    await prisma.review.update({
      where: { id: reviewId },
      data: { fraudScore: res.data.riskScore, fraudFlags: res.data.flags },
    });
  }
  return res;
}

/** Vat de goedgekeurde reviews van een bedrijf samen en slaat dit intern op. */
export async function summarizeCompanyReviews(companyId: string) {
  const company = await prisma.installerCompany.findUnique({
    where: { id: companyId },
    select: { name: true, reviews: { where: { status: "APPROVED" }, select: { rating: true, body: true }, take: 100 } },
  });
  if (!company) return { ok: false as const, error: "not_found" };

  const res = await runAgent(
    reviewSummarizer,
    { companyName: company.name, reviews: company.reviews },
    { summary: `Reviewsamenvatting ${company.name} (${company.reviews.length})`, companyId },
  );
  if (res.ok && res.data) {
    await prisma.installerCompany.update({
      where: { id: companyId },
      data: { reviewSummary: res.data as object, reviewSummaryAt: new Date() },
    });
  }
  return res;
}

/** Verrijkt een nieuwe lead met AI (analyse + prijs + fraude). Best-effort, niet-blokkerend. */
export async function enrichNewLead(leadId: string): Promise<void> {
  await Promise.allSettled([analyzeLead(leadId), estimateLeadPrice(leadId), detectLeadFraud(leadId)]);
}

/** Verzamelt dagstatistieken voor het Admin AI-rapport. */
export async function gatherAdminStats(day: Date) {
  const start = new Date(day);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  const range = { gte: start, lt: end };

  const [
    newLeads,
    purchasedLeads,
    newCompanies,
    payments,
    credits,
    acceptedQuotes,
    newReviews,
    soldLeads,
    suspiciousLeads,
    suspiciousReviews,
    pendingCompanies,
    pendingReviews,
    aiErrors,
  ] = await Promise.all([
    prisma.leadRequest.count({ where: { createdAt: range } }),
    prisma.leadPurchase.count({ where: { createdAt: range } }),
    prisma.installerCompany.count({ where: { createdAt: range } }),
    prisma.payment.aggregate({ where: { createdAt: range, status: "PAID" }, _sum: { amountCents: true } }),
    prisma.creditTransaction.aggregate({ where: { createdAt: range, type: "TOPUP" }, _sum: { amount: true } }),
    prisma.quote.count({ where: { acceptedAt: range, status: "ACCEPTED" } }),
    prisma.review.count({ where: { createdAt: range } }),
    prisma.leadRequest.count({ where: { createdAt: range, status: { in: ["PARTIALLY_SOLD", "SOLD_OUT"] } } }),
    prisma.leadRequest.count({ where: { createdAt: range, fraudScore: { gte: 70 } } }),
    prisma.review.count({ where: { fraudScore: { gte: 70 }, status: "PENDING" } }),
    prisma.installerCompany.count({ where: { status: "PENDING_REVIEW" } }),
    prisma.review.count({ where: { status: "PENDING" } }),
    prisma.aiInvocation.count({ where: { createdAt: range, status: "ERROR" } }),
  ]);

  const problems: string[] = [];
  if (pendingCompanies > 0) problems.push(`${pendingCompanies} bedrijven wachten op goedkeuring`);
  if (pendingReviews > 0) problems.push(`${pendingReviews} reviews wachten op moderatie`);
  if (suspiciousLeads > 0) problems.push(`${suspiciousLeads} verdachte aanvragen`);
  if (suspiciousReviews > 0) problems.push(`${suspiciousReviews} verdachte reviews`);
  if (aiErrors > 0) problems.push(`${aiErrors} AI-fouten`);

  return {
    newLeads,
    purchasedLeads,
    newCompanies,
    revenueCents: payments._sum.amountCents ?? 0,
    creditsSold: credits._sum.amount ?? 0,
    acceptedQuotes,
    newReviews,
    conversionPct: newLeads > 0 ? Math.round((soldLeads / newLeads) * 100) : 0,
    suspiciousItems: suspiciousLeads + suspiciousReviews,
    openApprovals: pendingCompanies + pendingReviews,
    aiErrors,
    problems,
  };
}

/** Genereert en bewaart het Admin AI-ochtendrapport voor een dag (idempotent per datum). */
export async function runDailyReport(day: Date = new Date()) {
  const dateStr = day.toISOString().slice(0, 10);
  const stats = await gatherAdminStats(day);

  const result = await runAgent(adminAi, { date: dateStr, stats }, { summary: `Dagrapport ${dateStr}` });
  if (!result.ok || !result.data) return { ok: false as const, error: result.error };

  await prisma.aiDailyReport.upsert({
    where: { date: dateStr },
    create: { date: dateStr, reportJson: { ...result.data, stats } },
    update: { reportJson: { ...result.data, stats } },
  });
  return { ok: true as const, date: dateStr, report: result.data };
}
