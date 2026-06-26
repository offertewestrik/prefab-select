import type { VisionProvider } from "./provider";
import { ProviderNotConfiguredError } from "./provider";
import type { VisionRequest, VisionAnalysis, PhotoObjectResult, ExtractedText, ConditionEstimate } from "../types";

/**
 * Stub voor GeminiVisionProvider. Implementeert de VisionProvider-interface maar voert nog
 * GEEN echte calls uit (Fase 21.1). Activeren gebeurt later door deze methods
 * te implementeren; de rest van het platform hoeft niet te wijzigen.
 */
export class GeminiVisionProvider implements VisionProvider {
  readonly name = "gemini";
  private readonly apiKey: string;

  constructor(opts?: { apiKey?: string }) {
    this.apiKey = opts?.apiKey ?? process.env.GEMINI_API_KEY ?? "";
  }

  async analyzeImages(_req: VisionRequest): Promise<VisionAnalysis> {
    throw new ProviderNotConfiguredError(this.name);
  }
  async detectObjects(_req: VisionRequest): Promise<PhotoObjectResult[]> {
    throw new ProviderNotConfiguredError(this.name);
  }
  async extractText(_req: VisionRequest): Promise<ExtractedText> {
    throw new ProviderNotConfiguredError(this.name);
  }
  async estimateCondition(_req: VisionRequest): Promise<ConditionEstimate> {
    throw new ProviderNotConfiguredError(this.name);
  }
}
