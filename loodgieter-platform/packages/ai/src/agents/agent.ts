import type { ZodType } from "zod";
import type { VisionImage } from "../types";

export type AgentMode = "json" | "vision" | "chat";

/**
 * Een agent is een pure definitie: prompt + outputschema + (deterministische)
 * voorbeelduitvoer. De orchestratie (provider aanroepen, valideren, loggen)
 * gebeurt in de web-laag (features/ai/run.ts).
 */
export interface AgentDefinition<I = Record<string, unknown>, O = unknown> {
  id: string;
  label: string;
  description: string;
  mode: AgentMode;
  systemPrompt: string;
  /** Bouwt de user-prompt uit de (reeds gesanitiseerde) input. */
  buildUser: (input: I) => string;
  /** Zod-schema waaraan de output moet voldoen. */
  schema: ZodType<O>;
  /** Deterministische, schema-geldige voorbeelduitvoer (MockProvider). */
  sample: (input: I) => O;
  /** Alleen voor vision-agents: af te beelden afbeeldingen. */
  images?: (input: I) => VisionImage[];
}
