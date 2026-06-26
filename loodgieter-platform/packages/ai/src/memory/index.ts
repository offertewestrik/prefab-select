import type { AiMessage } from "../types";

/**
 * Geheugen-interface voor gespreks-agents (bijv. Support Assistant). De
 * concrete opslag (DB) leeft in de web-laag; hier alleen het contract + een
 * in-memory implementatie voor tests.
 */
export interface ConversationMemory {
  load(sessionId: string): Promise<AiMessage[]>;
  append(sessionId: string, message: AiMessage): Promise<void>;
}

export class InMemoryConversationMemory implements ConversationMemory {
  private store = new Map<string, AiMessage[]>();
  async load(sessionId: string): Promise<AiMessage[]> {
    return this.store.get(sessionId) ?? [];
  }
  async append(sessionId: string, message: AiMessage): Promise<void> {
    const list = this.store.get(sessionId) ?? [];
    list.push(message);
    this.store.set(sessionId, list);
  }
}
