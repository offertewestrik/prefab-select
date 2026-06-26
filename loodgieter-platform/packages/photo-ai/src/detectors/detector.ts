import type { VisionProvider } from "../providers/provider";
import type { DetectorKey, DetectorContext, DetectorResult, VisionAnalysis, VisionImage } from "../types";
import { buildVisionPrompt } from "../prompts/vision-prompts";

/** Detector-interface: detector-specifieke mock + interpretatie van de analyse. */
export interface Detector {
  key: DetectorKey;
  label: string;
  description: string;
  /** Deterministische mock-analyse (door MockProvider teruggegeven). */
  mockAnalysis: (ctx: DetectorContext) => VisionAnalysis;
  /** Business-interpretatie van de provider-analyse (samenvatting, prijs, risico). */
  interpret: (
    analysis: VisionAnalysis,
    ctx: DetectorContext,
  ) => Pick<DetectorResult, "summary" | "recommendations" | "warnings" | "estimatedPrice" | "riskLevel" | "maintenanceScore">;
}

export interface RunDetectorInput {
  images: VisionImage[];
  provider: VisionProvider;
  context: DetectorContext;
}

/**
 * Voert een detector uit: bouwt de prompt → vraagt de provider om een analyse →
 * past de detector-specifieke interpretatie toe → levert een DetectorResult.
 * Provider-onafhankelijk: Mock geeft `mockAnalysis` terug, echte providers de modeloutput.
 */
export async function runDetector(d: Detector, input: RunDetectorInput): Promise<DetectorResult> {
  const prompt = buildVisionPrompt(d.key, input.context.notes);
  const analysis = await input.provider.analyzeImages({
    images: input.images,
    detector: d.key,
    prompt,
    mock: d.mockAnalysis(input.context),
  });
  const interp = d.interpret(analysis, input.context);
  return {
    detector: d.key,
    confidence: analysis.confidence,
    objects: analysis.objects,
    text: analysis.text,
    raw: analysis.raw,
    ...interp,
  };
}
