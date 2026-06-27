// @repo/photo-ai — provider-onafhankelijke AI Photo Analyzer (fundering).
// Geen echte Vision-AI gekoppeld (Fase 21.1); MockProvider is de default.

export * from "./types";
export * from "./utils";
export {
  type VisionProvider,
  ProviderNotConfiguredError,
  VisionProviderError,
  classifyError,
  type FallbackReason,
} from "./providers/provider";
export { MockVisionProvider } from "./providers/mock";
export { OpenAiVisionProvider } from "./providers/openai";
export { GeminiVisionProvider } from "./providers/gemini";
export { ClaudeVisionProvider } from "./providers/claude";
export { AzureVisionProvider } from "./providers/azure";
export { getVisionProvider, setVisionProvider } from "./providers/registry";
export * from "./detectors";
export { VISION_PROMPTS, buildVisionPrompt } from "./prompts/vision-prompts";
export {
  detectorResultSchema,
  photoObjectSchema,
  riskLevelSchema,
  type DetectorResultSchema,
} from "./schemas/photo-analysis";
