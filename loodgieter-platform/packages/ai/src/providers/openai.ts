import type { AiProvider } from "./provider";
import { estimateTokens } from "./provider";
import type { CompleteRequest, VisionRequest, AiCompletion } from "../types";

interface OpenAiUsage {
  prompt_tokens?: number;
  completion_tokens?: number;
  total_tokens?: number;
}

/**
 * OpenAI-provider via de Chat Completions / Embeddings REST API (fetch — geen
 * SDK-afhankelijkheid). Volledig functioneel, maar pas actief wanneer
 * OPENAI_API_KEY gezet is; anders wordt de MockProvider gekozen (zie registry).
 */
export class OpenAiProvider implements AiProvider {
  readonly name = "openai";
  private readonly apiKey: string;
  private readonly model: string;
  private readonly base = "https://api.openai.com/v1";

  constructor(opts?: { apiKey?: string; model?: string }) {
    this.apiKey = opts?.apiKey ?? process.env.OPENAI_API_KEY ?? "";
    this.model = opts?.model ?? process.env.OPENAI_MODEL ?? "gpt-4o-mini";
  }

  private usage(u: OpenAiUsage | undefined, prompt: string, text: string): AiCompletion["usage"] {
    const promptTokens = u?.prompt_tokens ?? estimateTokens(prompt);
    const completionTokens = u?.completion_tokens ?? estimateTokens(text);
    return { promptTokens, completionTokens, totalTokens: u?.total_tokens ?? promptTokens + completionTokens };
  }

  private async chat(body: Record<string, unknown>, promptText: string): Promise<AiCompletion> {
    const res = await fetch(`${this.base}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${this.apiKey}` },
      body: JSON.stringify({ model: this.model, ...body }),
    });
    if (!res.ok) throw new Error(`OpenAI ${res.status}: ${await res.text()}`);
    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
      usage?: OpenAiUsage;
    };
    const text = data.choices?.[0]?.message?.content ?? "";
    let json: unknown;
    try {
      json = JSON.parse(text);
    } catch {
      json = undefined;
    }
    return { text, json, usage: this.usage(data.usage, promptText, text), model: this.model };
  }

  async complete(req: CompleteRequest): Promise<AiCompletion> {
    const messages = [
      ...(req.system ? [{ role: "system", content: req.system }] : []),
      ...req.messages.map((m) => ({ role: m.role, content: m.content })),
    ];
    const promptText = (req.system ?? "") + req.messages.map((m) => m.content).join("\n");
    return this.chat(
      {
        messages,
        temperature: req.temperature ?? 0.2,
        max_tokens: req.maxTokens,
        ...(req.jsonSchema ? { response_format: { type: "json_object" } } : {}),
      },
      promptText,
    );
  }

  async embed(texts: string[]): Promise<number[][]> {
    const res = await fetch(`${this.base}/embeddings`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${this.apiKey}` },
      body: JSON.stringify({ model: process.env.OPENAI_EMBED_MODEL ?? "text-embedding-3-small", input: texts }),
    });
    if (!res.ok) throw new Error(`OpenAI embeddings ${res.status}`);
    const data = (await res.json()) as { data?: { embedding: number[] }[] };
    return (data.data ?? []).map((d) => d.embedding);
  }

  async vision(req: VisionRequest): Promise<AiCompletion> {
    const content = [
      { type: "text", text: req.prompt },
      ...req.images.map((img) => ({
        type: "image_url",
        image_url: { url: img.url ?? `data:image/jpeg;base64,${img.base64}` },
      })),
    ];
    const messages = [
      ...(req.system ? [{ role: "system", content: req.system }] : []),
      { role: "user", content },
    ];
    return this.chat(
      { messages, ...(req.jsonSchema ? { response_format: { type: "json_object" } } : {}) },
      req.prompt,
    );
  }
}
