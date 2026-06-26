import type { DetectorKey } from "../types";

// System-prompts per detector (gebruikt door echte providers; bij Mock genegeerd).
// Sturend op feitelijke, voorzichtige observaties — geen verzonnen merken/modellen.

const BASE =
  "Je bent een technisch inspecteur voor installatiewerk. Beoordeel uitsluitend wat zichtbaar is op de foto('s). Wees voorzichtig met conclusies en verzin nooit merken, modellen of defecten. Antwoord in JSON.";

export const VISION_PROMPTS: Record<DetectorKey, string> = {
  "cv-ketel": `${BASE} Focus op de cv-ketel: merk/model (alleen als leesbaar), type afvoer, expansievat, leidingwerk en zichtbare gebreken.`,
  warmtepomp: `${BASE} Focus op de warmtepomp: buiten-/binnenunit, merk/model (alleen als leesbaar), leidingwerk, opstelling en zichtbare gebreken.`,
  badkamer: `${BASE} Focus op de badkamer: sanitair, kranen, afvoeren, tegelwerk/kitvoegen en zichtbare lekkage- of vochtsporen.`,
  radiator: `${BASE} Focus op radiatoren: type, aansluitingen, kranen/thermostaatknoppen en zichtbare corrosie of lekkage.`,
  vloerverwarming: `${BASE} Focus op vloerverwarming: verdeler, leidingen, pomp en zichtbare aansluitingen of gebreken.`,
  lekkage: `${BASE} Focus op lekkage: zichtbaar water, vochtplekken, corrosie, druppels en de vermoedelijke bron.`,
  general: `${BASE} Geef een algemene observatie van zichtbare installatie-onderdelen en hun toestand.`,
};

export function buildVisionPrompt(detector: DetectorKey, notes?: string): string {
  const prompt = VISION_PROMPTS[detector];
  return notes ? `${prompt}\nContext van de klant: ${notes}` : prompt;
}
