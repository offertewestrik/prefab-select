// Hulpfuncties voor de Photo Analyzer (validatie, formaten).

/** Ondersteunde afbeeldingsformaten. (pdf volgt later.) */
export const SUPPORTED_IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "heic"] as const;
export const FUTURE_EXTENSIONS = ["pdf"] as const;

export type SupportedExtension = (typeof SUPPORTED_IMAGE_EXTENSIONS)[number];

export function extensionOf(urlOrName: string): string {
  const clean = urlOrName.split("?")[0]?.split("#")[0] ?? urlOrName;
  const dot = clean.lastIndexOf(".");
  return dot >= 0 ? clean.slice(dot + 1).toLowerCase() : "";
}

/** Of een bestand op basis van de extensie nu al ondersteund wordt. */
export function isSupportedImage(urlOrName: string): boolean {
  return (SUPPORTED_IMAGE_EXTENSIONS as readonly string[]).includes(extensionOf(urlOrName));
}

/** Filtert een lijst URLs op (nu) ondersteunde formaten. */
export function filterSupportedImages(urls: string[]): string[] {
  return urls.filter(isSupportedImage);
}

/** Klemt een confidence naar 0..1. */
export function clampConfidence(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}
