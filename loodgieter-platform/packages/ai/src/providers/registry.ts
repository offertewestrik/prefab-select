import type { AiProvider } from "./provider";
import { MockProvider } from "./mock";
import { OpenAiProvider } from "./openai";

let cached: AiProvider | null = null;

/**
 * Kiest de actieve provider op basis van env:
 *  - AI_PROVIDER=openai + OPENAI_API_KEY → OpenAI
 *  - anders → Mock (veilige default; geen externe calls, geen sleutel nodig)
 *
 * Later uitbreidbaar met gemini/claude/azure: voeg een case toe, niets anders
 * in het platform hoeft te wijzigen.
 */
export function getProvider(): AiProvider {
  if (cached) return cached;
  const choice = (process.env.AI_PROVIDER ?? "").toLowerCase();
  if (choice === "openai" && process.env.OPENAI_API_KEY) {
    cached = new OpenAiProvider();
  } else {
    cached = new MockProvider();
  }
  return cached;
}

/** Voor tests: forceer een specifieke provider. */
export function setProvider(p: AiProvider | null): void {
  cached = p;
}
