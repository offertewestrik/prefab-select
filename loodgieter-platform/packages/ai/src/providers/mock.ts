import type { AiProvider, } from "./provider";
import { estimateTokens } from "./provider";
import type { CompleteRequest, VisionRequest, AiCompletion } from "../types";

/**
 * Deterministische provider zonder netwerk. Echoot de meegegeven `mock`-hint als
 * JSON-output, zodat de volledige pipeline (validatie, logging, dashboard) werkt
 * en testbaar is zónder API-sleutel. Standaardprovider in dev/test.
 */
export class MockProvider implements AiProvider {
  readonly name = "mock";

  private build(promptText: string, mock: unknown): AiCompletion {
    const json = mock ?? {};
    const text = JSON.stringify(json);
    const promptTokens = estimateTokens(promptText);
    const completionTokens = estimateTokens(text);
    return {
      text,
      json,
      usage: { promptTokens, completionTokens, totalTokens: promptTokens + completionTokens },
      model: "mock-1",
    };
  }

  async complete(req: CompleteRequest): Promise<AiCompletion> {
    const promptText = (req.system ?? "") + req.messages.map((m) => m.content).join("\n");
    return this.build(promptText, req.mock);
  }

  async embed(texts: string[]): Promise<number[][]> {
    // Deterministische pseudo-embedding (8 dims) op basis van charcodes.
    return texts.map((t) => {
      const v = new Array(8).fill(0);
      for (let i = 0; i < t.length; i++) v[i % 8] += t.charCodeAt(i);
      const norm = Math.sqrt(v.reduce((s, x) => s + x * x, 0)) || 1;
      return v.map((x) => x / norm);
    });
  }

  async vision(req: VisionRequest): Promise<AiCompletion> {
    return this.build(req.prompt + `:${req.images.length}`, req.mock);
  }
}
