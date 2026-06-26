import "server-only";
import { prisma } from "@/lib/prisma";
import { siteUrl } from "@repo/seo";
import { makeAccessToken } from "@/features/quotes/server/service";
import { sendEmail, sendAdminNotification } from "@/features/notifications/email/send";
import { reviewThanks } from "@/features/notifications/email/templates";
import { notifyCompany, notifyAdmins } from "@/features/notifications/server/service";

export interface ReviewFormInput {
  rating: number;
  title?: string;
  body: string;
  showName: boolean;
  customerName?: string;
}

/** Maakt (idempotent) een review-uitnodiging voor een geaccepteerde offerte + mailt de klant. */
export async function createReviewInviteForQuote(quoteId: string): Promise<void> {
  const quote = await prisma.quote.findUnique({
    where: { id: quoteId },
    include: { company: true, lead: true },
  });
  if (!quote || !quote.lead) return;

  const existing = await prisma.reviewInvite.findUnique({ where: { quoteId } });
  const token = existing?.token ?? makeAccessToken(`review:${quoteId}`);
  if (!existing) {
    await prisma.reviewInvite.create({
      data: { companyId: quote.companyId, leadId: quote.leadId, quoteId, token, customerEmail: quote.lead.contactEmail },
    });
  }
  await prisma.reviewInvite.update({ where: { quoteId }, data: { sentAt: new Date() } });

  const url = siteUrl(`/reviews/${token}`);
  await sendEmail(quote.lead.contactEmail, reviewThanks({ companyName: quote.company.name, url, kind: "invite" }));
}

async function loadQuoteContext(quoteId: string) {
  return prisma.quote.findUnique({
    where: { id: quoteId },
    include: { company: true, lead: { include: { service: true, municipality: true } } },
  });
}

type SubmitResult = { ok: boolean; reason?: string };

async function persistReview(
  ctx: NonNullable<Awaited<ReturnType<typeof loadQuoteContext>>>,
  input: ReviewFormInput,
  opts: { homeownerId?: string | null; inviteToken?: string },
): Promise<SubmitResult> {
  if (input.rating < 1 || input.rating > 5) return { ok: false, reason: "invalid_rating" };
  if (!input.body || input.body.trim().length < 5) return { ok: false, reason: "invalid_body" };

  // Eén review per offerte.
  const existing = await prisma.review.findFirst({ where: { quoteId: ctx.id } });
  if (existing) return { ok: false, reason: "already_reviewed" };

  const customerName = input.customerName?.trim() || ctx.lead?.contactName || "Klant";

  await prisma.review.create({
    data: {
      companyId: ctx.companyId,
      homeownerId: opts.homeownerId ?? null,
      leadId: ctx.leadId,
      quoteId: ctx.id,
      rating: Math.round(input.rating),
      title: input.title?.trim() || null,
      body: input.body.trim(),
      serviceSlug: ctx.lead?.service.slug ?? null,
      cityName: ctx.lead?.municipality.name ?? null,
      customerName,
      showName: input.showName,
      status: "PENDING",
      source: "PLATFORM",
    },
  });

  if (opts.inviteToken) {
    await prisma.reviewInvite.updateMany({ where: { token: opts.inviteToken }, data: { usedAt: new Date() } });
  }

  // Meldingen: installateur + admin (in-app, deterministisch) + admin-mail.
  await notifyCompany(ctx.companyId, { type: "review.new", title: "Nieuwe review ontvangen", body: `${input.rating}★ van ${customerName}`, href: "/dashboard/reviews" });
  await notifyAdmins({ type: "review.pending", title: "Review wacht op goedkeuring", body: ctx.company.name, href: "/admin/reviews" });
  void sendAdminNotification({ title: "Nieuwe review wacht op goedkeuring", lines: [`Vakman: ${ctx.company.name}`, `Score: ${input.rating}★`], url: siteUrl("/admin/reviews") });
  void sendEmail(ctx.lead!.contactEmail, reviewThanks({ companyName: ctx.company.name, url: "", kind: "thanks" }));

  return { ok: true };
}

/** Indienen via beveiligde token-link (gastklant). */
export async function submitReviewByToken(token: string, input: ReviewFormInput): Promise<SubmitResult> {
  const invite = await prisma.reviewInvite.findUnique({ where: { token } });
  if (!invite || !invite.quoteId) return { ok: false, reason: "invalid_token" };
  const ctx = await loadQuoteContext(invite.quoteId);
  if (!ctx) return { ok: false, reason: "invalid_token" };
  return persistReview(ctx, input, { inviteToken: token });
}

/** Indienen via account (ingelogde klant) voor een geaccepteerde offerte. */
export async function submitReviewByAccount(userId: string, quoteId: string, input: ReviewFormInput): Promise<SubmitResult> {
  const ctx = await loadQuoteContext(quoteId);
  if (!ctx || !ctx.lead) return { ok: false, reason: "not_found" };
  if (ctx.lead.homeownerId !== userId) return { ok: false, reason: "forbidden" };
  if (ctx.status !== "ACCEPTED") return { ok: false, reason: "not_accepted" };
  return persistReview(ctx, input, { homeownerId: userId });
}

export async function getInviteByToken(token: string) {
  const invite = await prisma.reviewInvite.findUnique({ where: { token } });
  if (!invite || !invite.quoteId) return null;
  const ctx = await loadQuoteContext(invite.quoteId);
  if (!ctx) return null;
  const alreadyReviewed = (await prisma.review.count({ where: { quoteId: ctx.id } })) > 0;
  return { invite, company: ctx.company, lead: ctx.lead, alreadyReviewed };
}

/** Herbereken gemiddelde score + aantal (alleen APPROVED) op het bedrijf. */
export async function recomputeRating(companyId: string) {
  const agg = await prisma.review.aggregate({
    where: { companyId, status: "APPROVED" },
    _avg: { rating: true },
    _count: true,
  });
  await prisma.installerCompany.update({
    where: { id: companyId },
    data: { ratingAvg: agg._avg.rating ?? 0, ratingCount: agg._count },
  });
}

/** Admin: modereren + rating herberekenen. */
export async function moderateReview(id: string, status: "APPROVED" | "REJECTED" | "HIDDEN" | "PENDING") {
  const review = await prisma.review.update({ where: { id }, data: { status } });
  await recomputeRating(review.companyId);
  return review;
}

export function getAllReviews(filter?: {
  status?: "PENDING" | "APPROVED" | "REJECTED" | "HIDDEN";
  serviceSlug?: string;
  cityName?: string;
  q?: string;
}) {
  return prisma.review.findMany({
    where: {
      status: filter?.status,
      serviceSlug: filter?.serviceSlug || undefined,
      cityName: filter?.cityName ? { equals: filter.cityName, mode: "insensitive" } : undefined,
      ...(filter?.q
        ? {
            OR: [
              { customerName: { contains: filter.q, mode: "insensitive" } },
              { company: { name: { contains: filter.q, mode: "insensitive" } } },
            ],
          }
        : {}),
    },
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    take: 200,
    include: { company: true, replyEntry: { select: { id: true, status: true } } },
  });
}

/** Eén review + reactie voor de admin-detailpagina. */
export function getReviewForAdmin(id: string) {
  return prisma.review.findUnique({
    where: { id },
    include: { company: true, replyEntry: true },
  });
}

/** Distinct waarden voor de admin-filters. */
export async function getReviewFilterOptions() {
  const [services, cities] = await Promise.all([
    prisma.review.findMany({ where: { serviceSlug: { not: null } }, select: { serviceSlug: true }, distinct: ["serviceSlug"] }),
    prisma.review.findMany({ where: { cityName: { not: null } }, select: { cityName: true }, distinct: ["cityName"] }),
  ]);
  return {
    services: services.map((s) => s.serviceSlug!).sort(),
    cities: cities.map((c) => c.cityName!).sort(),
  };
}
