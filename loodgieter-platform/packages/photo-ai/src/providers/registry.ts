import type { VisionProvider } from "./provider";
import { MockVisionProvider } from "./mock";
import { OpenAiVisionProvider } from "./openai";
import { GeminiVisionProvider } from "./gemini";
import { ClaudeVisionProvider } from "./claude";
import { AzureVisionProvider } from "./azure";

let cached: VisionProvider | null = null;

/**
 * Kiest de actieve vision-provider op basis van PHOTO_AI_PROVIDER. Default is
 * Mock (geen netwerk, geen sleutel). De stubs zijn aanwezig maar nog inactief
 * (Fase 21.1) — later activeren zonder de rest van het platform te wijzigen.
 */
export function getVisionProvider(): VisionProvider {
  if (cached) return cached;
  switch ((process.env.PHOTO_AI_PROVIDER ?? "").toLowerCase()) {
    case "openai":
      cached = new OpenAiVisionProvider();
      break;
    case "gemini":
      cached = new GeminiVisionProvider();
      break;
    case "claude":
      cached = new ClaudeVisionProvider();
      break;
    case "azure":
      cached = new AzureVisionProvider();
      break;
    default:
      cached = new MockVisionProvider();
  }
  return cached;
}

/** Voor tests: forceer een provider. */
export function setVisionProvider(p: VisionProvider | null): void {
  cached = p;
}
