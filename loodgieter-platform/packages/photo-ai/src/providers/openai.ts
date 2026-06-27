import type { VisionProvider } from "./provider";
import { VisionProviderError } from "./provider";
import type { VisionRequest, VisionAnalysis, PhotoObjectResult, ExtractedText, ConditionEstimate, RiskLevel } from "../types";
import { clampConfidence } from "../utils";

const MAX_IMAGES = 8;
const RISK_LEVELS: RiskLevel[] = ["LAAG", "GEMIDDELD", "HOOG", "ONBEKEND"];

// Beschrijving van de verwachte JSON-vorm (in de prompt meegegeven).
const SHAPE_INSTRUCTION =
  'Antwoord UITSLUITEND met geldige JSON in deze vorm: {"confidence":0-1,"text":"zichtbare merk/model-tekst of leeg","objects":[{"type":"...","label":"...","confidence":0-1}],"condition":{"riskLevel":"LAAG|GEMIDDELD|HOOG|ONBEKEND","maintenanceScore":0-100,"notes":"..."}}. Geef praktische, adviserende observaties — geen medische of juridische zekerheid.';

interface RawVisionJson {
  confidence?: number;
  text?: string;
  objects?: { type?: string; label?: string; confidence?: number }[];
  condition?: { riskLevel?: string; maintenanceScore?: number; notes?: string };
}

/**
 * Echte OpenAI Vision-provider (Chat Completions met image_url, JSON-output).
 * Faalt met een VisionProviderError zodat de orchestratie veilig kan terugvallen
 * op de MockProvider. Stuurt ALLEEN afbeelding-URL's + dienstcontext — nooit PII.
 */
export class OpenAiVisionProvider implements VisionProvider {
  readonly name = "openai";
  private readonly apiKey: string;
  private readonly model: string;
  private readonly timeoutMs: number;
  private readonly base = "https://api.openai.com/v1";

  constructor(opts?: { apiKey?: string; model?: string; timeoutMs?: number }) {
    this.apiKey = opts?.apiKey ?? process.env.OPENAI_API_KEY ?? "";
    this.model = opts?.model ?? process.env.OPENAI_VISION_MODEL ?? "gpt-4o-mini";
    this.timeoutMs = opts?.timeoutMs ?? (Number(process.env.OPENAI_VISION_TIMEOUT_MS) || 30000);
  }

  private normalize(raw: RawVisionJson): VisionAnalysis {
    const riskRaw = (raw.condition?.riskLevel ?? "ONBEKEND").toUpperCase();
    const riskLevel: RiskLevel = (RISK_LEVELS as string[]).includes(riskRaw) ? (riskRaw as RiskLevel) : "ONBEKEND";
    const objects: PhotoObjectResult[] = Array.isArray(raw.objects)
      ? raw.objects.slice(0, 25).map((o) => ({
          type: String(o.type ?? "onbekend"),
          label: String(o.label ?? "onbekend"),
          confidence: clampConfidence(Number(o.confidence ?? 0)),
          position: null,
          metadata: null,
        }))
      : [];
    return {
      confidence: clampConfidence(Number(raw.confidence ?? 0)),
      text: typeof raw.text === "string" ? raw.text.slice(0, 500) : "",
      objects,
      condition: {
        riskLevel,
        maintenanceScore:
          typeof raw.condition?.maintenanceScore === "number"
            ? Math.min(100, Math.max(0, Math.round(raw.condition.maintenanceScore)))
            : undefined,
        notes: typeof raw.condition?.notes === "string" ? raw.condition.notes.slice(0, 500) : undefined,
      },
      raw: { provider: "openai", model: this.model },
    };
  }

  private imageContent(req: VisionRequest) {
    // Alleen analyseerbare URL's; geen base64; gemaximeerd op MAX_IMAGES.
    return req.images
      .filter((i) => !!i.url)
      .slice(0, MAX_IMAGES)
      .map((i) => ({ type: "image_url", image_url: { url: i.url as string } }));
  }

  private async call(messages: unknown[]): Promise<string> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);
    try {
      const res = await fetch(`${this.base}/chat/completions`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${this.apiKey}` },
        body: JSON.stringify({ model: this.model, messages, temperature: 0.2, response_format: { type: "json_object" } }),
        signal: controller.signal,
      });
      if (res.status === 429) throw new VisionProviderError("rate_limit");
      if (!res.ok) throw new VisionProviderError("provider_error", `status ${res.status}`);
      const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
      return data.choices?.[0]?.message?.content ?? "";
    } catch (e) {
      if (e instanceof VisionProviderError) throw e;
      if (e instanceof Error && e.name === "AbortError") throw new VisionProviderError("timeout");
      throw new VisionProviderError("provider_error");
    } finally {
      clearTimeout(timer);
    }
  }

  private tryParse(content: string): RawVisionJson | null {
    try {
      const obj = JSON.parse(content);
      return obj && typeof obj === "object" ? (obj as RawVisionJson) : null;
    } catch {
      return null;
    }
  }

  async analyzeImages(req: VisionRequest): Promise<VisionAnalysis> {
    if (!this.apiKey) throw new VisionProviderError("no_key");
    const images = this.imageContent(req);
    if (images.length === 0) throw new VisionProviderError("provider_error", "geen analyseerbare URL's");

    const system = `${req.prompt}\n${SHAPE_INSTRUCTION}`;
    const userContent = [{ type: "text", text: "Analyseer de bijgevoegde foto('s) van de installatie." }, ...images];
    const content = await this.call([
      { role: "system", content: system },
      { role: "user", content: userContent },
    ]);

    const parsed = this.tryParse(content);
    if (parsed) return this.normalize(parsed);

    // Eén repair-pass: vraag uitsluitend geldige JSON terug.
    const repair = await this.call([
      { role: "system", content: SHAPE_INSTRUCTION },
      { role: "user", content: `Je vorige antwoord was geen geldige JSON. Corrigeer naar uitsluitend geldige JSON.\n\n${content.slice(0, 2000)}` },
    ]);
    const repaired = this.tryParse(repair);
    if (repaired) return this.normalize(repaired);

    throw new VisionProviderError("invalid_json");
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
