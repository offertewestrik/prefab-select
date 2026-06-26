import type { VisionProvider } from "./provider";
import type { VisionRequest, VisionAnalysis, PhotoObjectResult, ExtractedText, ConditionEstimate } from "../types";

/**
 * Deterministische vision-provider zonder netwerk. Geeft de meegegeven `mock`-
 * hint terug (door de detector opgesteld) zodat de hele pipeline — detectie,
 * opslag, logging — werkt en testbaar is zónder echte Vision-AI.
 */
export class MockVisionProvider implements VisionProvider {
  readonly name = "mock";

  private fallback(req: VisionRequest): VisionAnalysis {
    return {
      confidence: req.images.length > 0 ? 0.5 : 0,
      objects: [],
      text: "",
      condition: { riskLevel: "ONBEKEND", notes: "Geen mock-data beschikbaar." },
      raw: { provider: "mock", detector: req.detector, images: req.images.length },
    };
  }

  async analyzeImages(req: VisionRequest): Promise<VisionAnalysis> {
    const base = req.mock ?? this.fallback(req);
    return { ...base, raw: base.raw ?? { provider: "mock", detector: req.detector, images: req.images.length } };
  }

  async detectObjects(req: VisionRequest): Promise<PhotoObjectResult[]> {
    return (await this.analyzeImages(req)).objects;
  }

  async extractText(req: VisionRequest): Promise<ExtractedText> {
    return { text: (await this.analyzeImages(req)).text };
  }

  async estimateCondition(req: VisionRequest): Promise<ConditionEstimate> {
    return (await this.analyzeImages(req)).condition;
  }
}
