import "server-only";
import {
  getVisionProvider,
  getDetector,
  runDetector,
  filterSupportedImages,
  isSupportedImage,
  type DetectorKey,
  type VisionImage,
} from "@repo/photo-ai";
import { prisma } from "@/lib/prisma";

/** Bepaalt de detector op basis van de dienst-slug. */
export function detectorForService(serviceSlug: string): DetectorKey {
  const s = serviceSlug.toLowerCase();
  if (s.includes("warmtepomp")) return "warmtepomp";
  if (s.includes("vloerverwarming")) return "vloerverwarming";
  if (s.includes("radiator")) return "radiator";
  if (s.includes("badkamer")) return "badkamer";
  if (s.includes("lek")) return "lekkage";
  if (s.includes("cv") || s.includes("ketel")) return "cv-ketel";
  return "general";
}

export { isSupportedImage };

export interface PendingAnalysisInput {
  detector: DetectorKey;
  imageUrls: string[];
  leadId?: string | null;
  createdBy?: string | null;
}

/**
 * Maakt synchroon een PENDING PhotoAnalysis + de afbeeldingen aan (snel; alleen
 * DB). De zware detectie draait daarna in de photo.analyze-job.
 * Geeft null terug als er geen ondersteunde afbeeldingen zijn.
 */
export async function createPendingPhotoAnalysis(input: PendingAnalysisInput): Promise<string | null> {
  const urls = filterSupportedImages(input.imageUrls);
  if (urls.length === 0) return null;
  const analysis = await prisma.photoAnalysis.create({
    data: {
      leadId: input.leadId ?? null,
      createdBy: input.createdBy ?? null,
      provider: "pending",
      detector: input.detector,
      status: "PENDING",
      images: { create: urls.map((url) => ({ imageUrl: url })) },
    },
  });
  return analysis.id;
}

/**
 * Voert de detectie uit voor een bestaande (PENDING) analyse en finaliseert deze
 * (COMPLETED/FAILED). Idempotent: een al-afgeronde analyse wordt overgeslagen.
 * Logt via de bestaande AiInvocation (geen PII).
 */
export async function runPhotoAnalysis(analysisId: string): Promise<{ ok: boolean; status: "COMPLETED" | "FAILED" | "SKIPPED" }> {
  const analysis = await prisma.photoAnalysis.findUnique({ where: { id: analysisId }, include: { images: true } });
  if (!analysis) return { ok: false, status: "FAILED" };
  if (analysis.status !== "PENDING") return { ok: true, status: "SKIPPED" };

  const provider = getVisionProvider();
  const detector = getDetector(analysis.detector);
  const visionImages: VisionImage[] = analysis.images.map((i) => ({ url: i.imageUrl, width: i.width ?? undefined, height: i.height ?? undefined }));
  const summaryLabel = `Foto-analyse: ${detector.key} (${analysis.images.length} afbeeldingen)`;
  const start = Date.now();

  try {
    const result = await runDetector(detector, { images: visionImages, provider, context: { leadId: analysis.leadId ?? undefined } });
    const latencyMs = Date.now() - start;

    await prisma.$transaction([
      prisma.photoObject.deleteMany({ where: { analysisId } }),
      prisma.photoAnalysis.update({
        where: { id: analysisId },
        data: {
          provider: result.providerUsed,
          status: "COMPLETED",
          confidence: result.confidence,
          summary: result.summary,
          recommendations: result.recommendations,
          riskLevel: result.riskLevel,
          maintenanceScore: result.maintenanceScore ?? null,
          estimatedPriceMin: result.estimatedPrice?.minCents ?? null,
          estimatedPriceMax: result.estimatedPrice?.maxCents ?? null,
          rawResponse: (result.raw ?? {}) as object,
          objects: {
            create: result.objects.map((o) => ({
              type: o.type,
              label: o.label,
              confidence: o.confidence,
              position: (o.position ?? undefined) as object | undefined,
              metadata: (o.metadata ?? undefined) as object | undefined,
            })),
          },
        },
      }),
    ]);

    await prisma.aiInvocation.create({
      data: {
        agent: "photo-analyzer",
        provider: result.providerUsed,
        model: result.providerUsed === "openai" ? process.env.OPENAI_VISION_MODEL ?? "gpt-4o-mini" : "mock",
        status: "OK",
        inputSummary: summaryLabel,
        outputJson: {
          detector: result.detector,
          confidence: result.confidence,
          riskLevel: result.riskLevel,
          fallback: result.fallback?.reason ?? null,
        } as object,
        latencyMs,
        leadId: analysis.leadId ?? null,
        userId: analysis.createdBy ?? null,
      },
    });
    return { ok: true, status: "COMPLETED" };
  } catch (e) {
    const latencyMs = Date.now() - start;
    await prisma.photoAnalysis.update({ where: { id: analysisId }, data: { status: "FAILED", provider: provider.name } });
    await prisma.aiInvocation
      .create({
        data: {
          agent: "photo-analyzer",
          provider: provider.name,
          model: "vision",
          status: "ERROR",
          inputSummary: summaryLabel,
          latencyMs,
          errorMessage: e instanceof Error ? e.message.slice(0, 500) : "error",
          leadId: analysis.leadId ?? null,
        },
      })
      .catch(() => {});
    return { ok: false, status: "FAILED" };
  }
}

/** Directe one-shot (PENDING aanmaken + meteen draaien). Handig voor tests/handmatig. */
export async function analyzePhotos(input: PendingAnalysisInput): Promise<{ ok: boolean; analysisId?: string; error?: string }> {
  const id = await createPendingPhotoAnalysis(input);
  if (!id) return { ok: false, error: "no_supported_images" };
  const r = await runPhotoAnalysis(id);
  return { ok: r.ok, analysisId: id };
}

/** Eén analyse ophalen met objecten + afbeeldingen (ADMIN/INSTALLER). */
export function getPhotoAnalysis(id: string) {
  return prisma.photoAnalysis.findUnique({ where: { id }, include: { objects: true, images: true } });
}

/** Meest recente analyse voor een lead (met objecten + afbeeldingen). */
export function getLeadPhotoAnalysis(leadId: string) {
  return prisma.photoAnalysis.findFirst({
    where: { leadId },
    orderBy: { createdAt: "desc" },
    include: { objects: true, images: true },
  });
}

/** Observability voor het admin photo-analyzer-dashboard. */
export async function getPhotoAnalyzerStats() {
  const [grouped, confAgg, fallbackCount, recentErrors] = await Promise.all([
    prisma.photoAnalysis.groupBy({ by: ["status"], _count: { _all: true } }),
    prisma.photoAnalysis.aggregate({ where: { status: "COMPLETED" }, _avg: { confidence: true } }),
    prisma.photoAnalysis.count({ where: { rawResponse: { path: ["fallback"], equals: true } } }),
    prisma.aiInvocation.findMany({
      where: { agent: "photo-analyzer", status: "ERROR" },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { errorMessage: true, createdAt: true, provider: true },
    }),
  ]);
  const map = new Map(grouped.map((g) => [g.status, g._count._all]));
  return {
    total: grouped.reduce((s, g) => s + g._count._all, 0),
    completed: map.get("COMPLETED") ?? 0,
    failed: map.get("FAILED") ?? 0,
    pending: map.get("PENDING") ?? 0,
    fallbackCount,
    avgConfidence: confAgg._avg.confidence != null ? Math.round(confAgg._avg.confidence * 100) : null,
    recentErrors,
  };
}

/** Recente analyses (ADMIN-overzicht / dashboard). */
export function listPhotoAnalyses(opts?: { leadId?: string; take?: number }) {
  return prisma.photoAnalysis.findMany({
    where: opts?.leadId ? { leadId: opts.leadId } : undefined,
    orderBy: { createdAt: "desc" },
    take: opts?.take ?? 50,
    include: { _count: { select: { objects: true, images: true } } },
  });
}
