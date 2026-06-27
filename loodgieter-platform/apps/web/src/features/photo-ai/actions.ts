"use server";

import { revalidatePath } from "next/cache";
import { getSessionUser, requireRole } from "@/lib/guards";
import { prisma } from "@/lib/prisma";
import { enqueue } from "@/features/jobs/queue";
import { reanalyzeLead, liveTestDetector, type ForceProvider, type LiveTestResult } from "./service";
import { DETECTOR_KEYS, type DetectorKey } from "@repo/photo-ai";

/**
 * Mag deze gebruiker een heranalyse starten voor de lead?
 *  - ADMIN: altijd
 *  - INSTALLER: alleen als zijn bedrijf de lead heeft gekocht
 *  - HOMEOWNER/overig: nooit
 * Geeft tevens of de gebruiker admin is (voor force-provider).
 */
async function canReanalyze(leadId: string): Promise<{ allowed: boolean; isAdmin: boolean }> {
  const user = await getSessionUser();
  const role = (user as { role?: string } | null)?.role;
  const userId = (user as { id?: string } | null)?.id;
  if (!user || !userId) return { allowed: false, isAdmin: false };
  if (role === "ADMIN") return { allowed: true, isAdmin: true };
  if (role !== "INSTALLER") return { allowed: false, isAdmin: false };

  // Installateur: vereist een gekochte (PURCHASED) match voor zijn bedrijf.
  const membership = await prisma.companyMember.findFirst({ where: { userId }, select: { companyId: true } });
  if (!membership) return { allowed: false, isAdmin: false };
  const purchased = await prisma.leadMatch.findFirst({
    where: { leadId, companyId: membership.companyId, status: "PURCHASED" },
    select: { id: true },
  });
  return { allowed: !!purchased, isAdmin: false };
}

export type ReanalyzeState = { ok?: boolean; message?: string };

/** Heranalyse starten (admin of gekochte installateur). Force-provider alleen voor admin. */
export async function reanalyzeLeadAction(_prev: ReanalyzeState, formData: FormData): Promise<ReanalyzeState> {
  const leadId = String(formData.get("leadId") ?? "");
  if (!leadId) return { ok: false, message: "Onbekende lead." };

  const { allowed, isAdmin } = await canReanalyze(leadId);
  if (!allowed) return { ok: false, message: "Geen toegang om een heranalyse te starten." };

  const force = String(formData.get("force") ?? "default");
  const forceProvider: ForceProvider = isAdmin && ["mock", "openai", "default"].includes(force) ? (force as ForceProvider) : "default";

  const res = await reanalyzeLead(leadId);
  if (!res.ok) {
    const reason = res.reason === "limit_reached" ? "Maximum aantal analyses voor deze lead bereikt." : "Geen geschikte foto's gevonden.";
    return { ok: false, message: reason };
  }
  await enqueue("photo.analyze", { analysisId: res.analysisId, leadId, forceProvider });
  revalidatePath(`/dashboard/leads/${leadId}`);
  revalidatePath("/admin/leads");
  revalidatePath("/admin/ai/photo-analyzer");
  return { ok: true, message: "Heranalyse gestart. Resultaat verschijnt zodra de verwerking klaar is." };
}

/** Admin: orphan-uploads opruimen (handmatig). */
export async function cleanupOrphansAction(): Promise<void> {
  await requireRole("ADMIN");
  await enqueue("photo.cleanup_orphans", {});
  revalidatePath("/admin/ai/photo-analyzer");
}

export type LiveTestState = { result?: LiveTestResult; error?: string };

/** Admin: live-test van de Photo Analyzer op één image-URL. */
export async function liveTestAction(_prev: LiveTestState, formData: FormData): Promise<LiveTestState> {
  await requireRole("ADMIN");
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();
  if (!imageUrl || !/^https?:\/\//.test(imageUrl)) return { error: "Vul een geldige https image-URL in." };

  const detectorRaw = String(formData.get("detector") ?? "general");
  const detector = (DETECTOR_KEYS.includes(detectorRaw as DetectorKey) ? detectorRaw : "general") as DetectorKey;

  const forceRaw = String(formData.get("force") ?? "default");
  const force = (["default", "mock", "openai"].includes(forceRaw) ? forceRaw : "default") as ForceProvider;

  const result = await liveTestDetector({ imageUrl, detector, force });
  if (!result.ok) return { error: result.error === "unsupported_image" ? "Niet-ondersteund bestandstype (jpg/png/webp/heic)." : "Analyse mislukt." };
  return { result };
}
