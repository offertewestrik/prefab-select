// Tool-interface: laat agents (later) gestructureerde functies aanroepen
// (bijv. dienst opzoeken, leads tellen). Nu het contract; koppeling volgt.

export interface AiTool<A = Record<string, unknown>, R = unknown> {
  name: string;
  description: string;
  /** JSON Schema van de argumenten (voor function-calling). */
  parameters: Record<string, unknown>;
  run: (args: A) => Promise<R>;
}

export type ToolRegistry = Record<string, AiTool>;
