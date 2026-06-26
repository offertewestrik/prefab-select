import type { VisionProvider } from "./provider";
import { ProviderNotConfiguredError } from "./provider";
import type { VisionRequest, VisionAnalysis, PhotoObjectResult, ExtractedText, ConditionEstimate } from "../types";

/**
 * Stub voor OpenAiVisionProvider. Implementeert de VisionProvider-interface maar voert nog
 * GEEN echte calls uit (Fase 21.1). Activeren gebeurt later door deze methods
 * te implementeren; de rest van het platform hoeft niet te wijzigen.
 */
export class OpenAiVisionProvider implements VisionProvider {
  readonly name = "openai";
  private readonly apiKey: string;

  constructor(opts?: { apiKey?: string }) {
    this.apiKey = opts?.apiKey ?? process.env.OPENAI_API_KEY ?? "";
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
