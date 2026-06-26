import "server-only";
import {
  getVisionProvider,
  getDetector,
  runDetector,
  filterSupportedImages,
  type DetectorKey,
  type VisionImage,
} from "@repo/photo-ai";
import { prisma } from "@/lib/prisma";

export interface AnalyzePhotosInput {
  detector: DetectorKey;
  images: { url: string; width?: number; height?: number }[];
  leadId?: string | null;
  createdBy?: string | null;
  notes?: string;
}

export interface AnalyzePhotosResult {
  ok: boolean;
  analysisId?: string;
  error?: string;
}

/**
 * Voert een foto-analyse uit via de actieve (mock-)provider, slaat het resultaat
 * + objecten + afbeeldingen op, en logt de run in AiInvocation (zonder PII).
 */
export async function analyzePhotos(input: AnalyzePhotosInput): Promise<AnalyzePhotosResult> {
  const supportedUrls = filterSupportedImages(input.images.map((i) => i.url));
  const images = input.images.filter((i) => supportedUrls.includes(i.url));
  if (images.length === 0) return { ok: false, error: "no_supported_images" };

  const provider = getVisionProvider();
  const detector = getDetector(input.detector);
  const visionImages: VisionImage[] = images.map((i) => ({ url: i.url, width: i.width, height: i.height }));
  const summaryLabel = `Foto-analyse: ${detector.key} (${images.length} afbeeldingen)`;
  const start = Date.now();

  try {
    const result = await runDetector(detector, {
      images: visionImages,
      provider,
      context: { leadId: input.leadId ?? undefined, notes: input.notes },
    });
    const latencyMs = Date.now() - start;

    const analysis = await prisma.photoAnalysis.create({
      data: {
        leadId: input.leadId ?? null,
        createdBy: input.createdBy ?? null,
        provider: provider.name,
        detector: result.detector,
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
        images: { create: images.map((i) => ({ imageUrl: i.url, width: i.width ?? null, height: i.height ?? null })) },
      },
    });

    // Hergebruik de bestaande AI-logging (geen PII).
    await prisma.aiInvocation.create({
      data: {
        agent: "photo-analyzer",
        provider: provider.name,
        model: "vision",
        status: "OK",
        inputSummary: summaryLabel,
        outputJson: { detector: result.detector, confidence: result.confidence, riskLevel: result.riskLevel } as object,
        latencyMs,
        leadId: input.leadId ?? null,
        userId: input.createdBy ?? null,
      },
    });

    return { ok: true, analysisId: analysis.id };
  } catch (e) {
    const latencyMs = Date.now() - start;
    await prisma.photoAnalysis.create({
      data: {
        leadId: input.leadId ?? null,
        createdBy: input.createdBy ?? null,
        provider: provider.name,
        detector: input.detector,
        status: "FAILED",
        images: { create: images.map((i) => ({ imageUrl: i.url })) },
      },
    });
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
          leadId: input.leadId ?? null,
        },
      })
      .catch(() => {});
    return { ok: false, error: "analysis_failed" };
  }
}

/** Eén analyse ophalen met objecten + afbeeldingen (ADMIN/INSTALLER). */
export function getPhotoAnalysis(id: string) {
  return prisma.photoAnalysis.findUnique({ where: { id }, include: { objects: true, images: true } });
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
