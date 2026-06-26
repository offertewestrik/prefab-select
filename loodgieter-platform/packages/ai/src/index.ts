// @repo/ai — modulaire AI-laag: provider-interface + implementaties, agents,
// prompts, schema's, embeddings, memory en tools. Geen provider hardcoded.

export * from "./types";
export * from "./providers/provider";
export { MockProvider } from "./providers/mock";
export { OpenAiProvider } from "./providers/openai";
export { getProvider, setProvider } from "./providers/registry";
export * from "./agents";
export { PROMPTS, type AgentId } from "./prompts";
export { embed, cosineSimilarity } from "./embeddings";
export { type ConversationMemory, InMemoryConversationMemory } from "./memory";
export { type AiTool, type ToolRegistry } from "./tools";
