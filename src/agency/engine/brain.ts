/**
 * The agents' "brain" — an LLM abstraction.
 *
 * Default model is Gemini (the repo already ships `@google/genai` and a
 * GEMINI_API_KEY slot). Swapping to Claude/OpenAI is a one-file change. When no
 * key is configured the brain falls back to a deterministic template so the
 * engine still runs end-to-end (useful for local testing and the monitor).
 *
 * IMPORTANT: only call this server-side (Cloud Function / Cloud Run). Never ship
 * the API key to the browser.
 */

export interface Brain {
  readonly name: string;
  readonly available: boolean;
  generate(system: string, prompt: string): Promise<string>;
}

class FallbackBrain implements Brain {
  name = 'fallback (geen API key)';
  available = false;
  async generate(_system: string, prompt: string): Promise<string> {
    return `‹concept gegenereerd zonder live model›\n${prompt.slice(0, 280)}`;
  }
}

class GeminiBrain implements Brain {
  name = 'gemini';
  available = true;
  private model: string;
  private apiKey: string;
  constructor(apiKey: string, model = 'gemini-2.0-flash') {
    this.apiKey = apiKey;
    this.model = model;
  }
  async generate(system: string, prompt: string): Promise<string> {
    // Lazy import so the engine compiles/loads even where the SDK is absent.
    const mod: any = await import('@google/genai');
    const GoogleGenAI = mod.GoogleGenAI ?? mod.default?.GoogleGenAI ?? mod.default;
    const ai = new GoogleGenAI({ apiKey: this.apiKey });
    const res = await ai.models.generateContent({
      model: this.model,
      contents: `${system}\n\n${prompt}`,
    });
    return (res?.text ?? res?.response?.text ?? '').trim() || '(leeg antwoord)';
  }
}

/**
 * Resolve a brain from the environment. Reads GEMINI_API_KEY by default; pass an
 * explicit key to override. Returns the fallback brain when no key is present.
 */
export function createBrain(apiKey?: string): Brain {
  const key = apiKey
    ?? (typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY : undefined);
  return key ? new GeminiBrain(key) : new FallbackBrain();
}
