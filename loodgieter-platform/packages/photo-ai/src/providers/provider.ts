import type {
  VisionRequest,
  VisionAnalysis,
  PhotoObjectResult,
  ExtractedText,
  ConditionEstimate,
} from "../types";

/**
 * Provider-onafhankelijke vision-interface. Elke aanbieder (Mock, OpenAI,
 * Gemini, Claude, Azure) implementeert exact dit contract; de detectors en de
 * rest van het platform kennen alleen deze interface.
 */
export interface VisionProvider {
  readonly name: string;
  /** Volledige analyse (objecten + tekst + conditie + confidence). */
  analyzeImages(req: VisionRequest): Promise<VisionAnalysis>;
  /** Alleen objectdetectie. */
  detectObjects(req: VisionRequest): Promise<PhotoObjectResult[]>;
  /** Tekstextractie (typeplaatjes, merken/modellen). */
  extractText(req: VisionRequest): Promise<ExtractedText>;
  /** Conditie-/risico-inschatting. */
  estimateCondition(req: VisionRequest): Promise<ConditionEstimate>;
}

/** Hulp voor stub-providers die nog niet geconfigureerd zijn. */
export class ProviderNotConfiguredError extends Error {
  constructor(provider: string) {
    super(`Vision-provider "${provider}" is nog niet geconfigureerd. Stel PHOTO_AI_PROVIDER + sleutel in of gebruik de MockProvider.`);
    this.name = "ProviderNotConfiguredError";
  }
}

/** Reden waarom een provider faalde — gebruikt voor de fallback-tracking (geen PII). */
export type FallbackReason = "no_key" | "timeout" | "invalid_json" | "rate_limit" | "provider_error";

export class VisionProviderError extends Error {
  readonly reason: FallbackReason;
  constructor(reason: FallbackReason, message?: string) {
    super(message ?? reason);
    this.name = "VisionProviderError";
    this.reason = reason;
  }
}

/** Classificeert een willekeurige fout naar een FallbackReason (zonder PII). */
export function classifyError(e: unknown): FallbackReason {
  if (e instanceof VisionProviderError) return e.reason;
  if (e instanceof Error && e.name === "AbortError") return "timeout";
  return "provider_error";
}
