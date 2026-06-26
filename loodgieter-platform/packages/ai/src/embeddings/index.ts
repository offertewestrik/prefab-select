import { getProvider } from "../providers/registry";

/** Embeddt teksten via de actieve provider (Mock geeft deterministische vectoren). */
export async function embed(texts: string[]): Promise<number[][]> {
  const provider = getProvider();
  if (!provider.embed) throw new Error(`Provider ${provider.name} ondersteunt geen embeddings`);
  return provider.embed(texts);
}

/** Cosine-similariteit tussen twee vectoren (voor semantische zoek later). */
export function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    const x = a[i] ?? 0;
    const y = b[i] ?? 0;
    dot += x * y;
    na += x * x;
    nb += y * y;
  }
  const denom = Math.sqrt(na) * Math.sqrt(nb);
  return denom === 0 ? 0 : dot / denom;
}
