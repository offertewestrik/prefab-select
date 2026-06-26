// Kerntypes voor de AI-laag. Provider-onafhankelijk.

export type AiRole = "system" | "user" | "assistant";

export interface AiMessage {
  role: AiRole;
  content: string;
}

export interface AiUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export interface AiCompletion {
  text: string;
  json?: unknown;
  usage: AiUsage;
  model: string;
}

export interface CompleteRequest {
  system?: string;
  messages: AiMessage[];
  /** JSON Schema waaraan de output moet voldoen (provider-afhankelijk afgedwongen). */
  jsonSchema?: Record<string, unknown>;
  maxTokens?: number;
  temperature?: number;
  /** Deterministische hint voor de MockProvider; echte providers negeren dit. */
  mock?: unknown;
}

export interface VisionImage {
  url?: string;
  base64?: string;
}

export interface VisionRequest {
  system?: string;
  prompt: string;
  images: VisionImage[];
  jsonSchema?: Record<string, unknown>;
  mock?: unknown;
}
