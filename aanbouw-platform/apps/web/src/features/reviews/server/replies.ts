import "server-only";
import { prisma } from "@/lib/prisma";
import { siteUrl } from "@repo/seo";
import { notifyCompany, notifyAdmins } from "@/features/notifications/server/service";
import { sendAdminNotification } from "@/features/notifications/email/send";

export type ReplyResult = { ok: true } | { ok: false; reason: string };

/**
 * Maakt of bewerkt de reactie van de installateur op een review van het EIGEN
 * bedrijf. Bewerken kan alleen zolang de reactie nog PENDING is. Elke
 * (her)indiening zet de status op PENDING en stelt admins op de hoogte.
 */
export async function upsertReply(
  companyId: string,
  reviewId: string,
  authorUserId: string | null,
  bodyRaw: string,
): Promise<ReplyResult> {
  const body = bodyRaw.trim();
  if (body.length < 5) return { ok: false, reason: "invalid_body" };
  if (body.length > 1500) return { ok: false, reason: "too_long" };

  // Review moet bestaan én van dit bedrijf zijn (anders niet reageren).
  const review = await prisma.review.findUnique({ where: { id: reviewId }, include: { company: true } });
  if (!review) return { ok: false, reason: "not_found" };
  if (review.companyId !== companyId) return { ok: false, reason: "forbidden" };

  const existing = await prisma.reviewReply.findUnique({ where: { reviewId } });
  if (existing && existing.status !== "PENDING") {
    // Goedgekeurde/afgewezen/verborgen reacties zijn niet bewerkbaar.
    return { ok: false, reason: "locked" };
  }

  await prisma.reviewReply.upsert({
    where: { reviewId },
    create: { reviewId, companyId, authorUserId, body, status: "PENDING" },
    update: { body, status: "PENDING", authorUserId, approvedAt: null, rejectedAt: null },
  });

  await notifyAdmins({
    type: "reply.pending",
    title: "Reactie wacht op goedkeuring",
    body: review.company.name,
    href: `/admin/reviews/${reviewId}`,
  });
  void sendAdminNotification({
    title: "Nieuwe reactie op review wacht op goedkeuring",
    lines: [`Vakman: ${review.company.name}`],
    url: siteUrl(`/admin/reviews/${reviewId}`),
  });

  return { ok: true };
}

/** Installateur verwijdert de eigen reactie (ongeacht status). */
export async function deleteOwnReply(companyId: string, reviewId: string): Promise<ReplyResult> {
  const res = await prisma.reviewReply.deleteMany({ where: { reviewId, companyId } });
  return res.count > 0 ? { ok: true } : { ok: false, reason: "not_found" };
}

/** Eigen reactie ophalen (dashboard). */
export function getReplyForCompany(reviewId: string, companyId: string) {
  return prisma.reviewReply.findFirst({ where: { reviewId, companyId } });
}

// ── Admin-moderatie van reacties ──

export async function moderateReply(id: string, status: "APPROVED" | "REJECTED" | "HIDDEN" | "PENDING") {
  const now = new Date();
  const reply = await prisma.reviewReply.update({
    where: { id },
    data: {
      status,
      approvedAt: status === "APPROVED" ? now : null,
      rejectedAt: status === "REJECTED" ? now : null,
    },
  });
  // Installateur op de hoogte stellen van de uitkomst.
  if (status === "APPROVED" || status === "REJECTED") {
    await notifyCompany(reply.companyId, {
      type: `reply.${status.toLowerCase()}`,
      title: status === "APPROVED" ? "Je reactie is goedgekeurd" : "Je reactie is afgewezen",
      body: status === "APPROVED" ? "Je reactie is nu publiek zichtbaar." : "Pas je reactie aan en dien opnieuw in.",
      href: `/dashboard/reviews/${reply.reviewId}`,
    });
  }
  return reply;
}

export async function adminEditReplyBody(id: string, bodyRaw: string): Promise<ReplyResult> {
  const body = bodyRaw.trim();
  if (body.length < 5) return { ok: false, reason: "invalid_body" };
  await prisma.reviewReply.update({ where: { id }, data: { body } });
  return { ok: true };
}

export async function adminDeleteReply(id: string) {
  await prisma.reviewReply.delete({ where: { id } });
}

/** Reacties die op moderatie wachten (admin-overzicht). */
export function getPendingReplies() {
  return prisma.reviewReply.findMany({
    where: { status: "PENDING" },
    orderBy: { createdAt: "asc" },
    include: { company: { select: { name: true } }, review: { select: { id: true, body: true, rating: true } } },
  });
}
