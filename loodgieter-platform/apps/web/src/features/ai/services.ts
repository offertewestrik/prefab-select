import "server-only";
import { leadAnalyzer, reviewSummarizer, adminAi } from "@repo/ai";
import { prisma } from "@/lib/prisma";
import { runAgent } from "./run";

/** Analyseer een aanvraag (zonder PII naar de AI/logs). */
export async function analyzeLead(leadId: string) {
  const lead = await prisma.leadRequest.findUnique({
    where: { id: leadId },
    include: { service: true, municipality: true, _count: { select: { attachments: true } } },
  });
  if (!lead) return { ok: false as const, error: "not_found" };

  return runAgent(
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
}

/** Vat de goedgekeurde reviews van een bedrijf samen. */
export async function summarizeCompanyReviews(companyId: string) {
  const company = await prisma.installerCompany.findUnique({
    where: { id: companyId },
    select: { name: true, reviews: { where: { status: "APPROVED" }, select: { rating: true, body: true }, take: 100 } },
  });
  if (!company) return { ok: false as const, error: "not_found" };

  return runAgent(
    reviewSummarizer,
    { companyName: company.name, reviews: company.reviews },
    { summary: `Reviewsamenvatting ${company.name} (${company.reviews.length})`, companyId },
  );
}

/** Verzamelt dagstatistieken voor het Admin AI-rapport. */
export async function gatherAdminStats(day: Date) {
  const start = new Date(day);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  const range = { gte: start, lt: end };

  const [newLeads, newCompanies, payments, credits, newReviews, totalLeads, soldLeads] = await Promise.all([
    prisma.leadRequest.count({ where: { createdAt: range } }),
    prisma.installerCompany.count({ where: { createdAt: range } }),
    prisma.payment.aggregate({ where: { createdAt: range, status: "PAID" }, _sum: { amountCents: true } }),
    prisma.creditTransaction.aggregate({ where: { createdAt: range, type: "TOPUP" }, _sum: { amount: true } }),
    prisma.review.count({ where: { createdAt: range } }),
    prisma.leadRequest.count({ where: { createdAt: range } }),
    prisma.leadRequest.count({ where: { createdAt: range, status: { in: ["PARTIALLY_SOLD", "SOLD_OUT"] } } }),
  ]);

  const problems: string[] = [];
  const pendingCompanies = await prisma.installerCompany.count({ where: { status: "PENDING_REVIEW" } });
  if (pendingCompanies > 0) problems.push(`${pendingCompanies} bedrijven wachten op goedkeuring`);
  const pendingReviews = await prisma.review.count({ where: { status: "PENDING" } });
  if (pendingReviews > 0) problems.push(`${pendingReviews} reviews wachten op moderatie`);

  return {
    newLeads,
    newCompanies,
    revenueCents: payments._sum.amountCents ?? 0,
    creditsSold: credits._sum.amount ?? 0,
    newReviews,
    conversionPct: totalLeads > 0 ? Math.round((soldLeads / totalLeads) * 100) : 0,
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
