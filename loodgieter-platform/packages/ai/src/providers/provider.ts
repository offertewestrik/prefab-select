import type { CompleteRequest, VisionRequest, AiCompletion } from "../types";

/**
 * Provider-onafhankelijke interface. Elke aanbieder (Mock, OpenAI, later
 * Gemini/Claude/Azure) implementeert dit contract. De rest van het platform
 * kent alleen deze interface — nergens een provider hardcoded.
 */
export interface AiProvider {
  readonly name: string;
  complete(req: CompleteRequest): Promise<AiCompletion>;
  embed?(texts: string[]): Promise<number[][]>;
  vision?(req: VisionRequest): Promise<AiCompletion>;
}

/** Schat tokens grof in (≈4 tekens per token) wanneer een provider geen telling geeft. */
export function estimateTokens(text: string): number {
  return Math.max(1, Math.ceil(text.length / 4));
}
