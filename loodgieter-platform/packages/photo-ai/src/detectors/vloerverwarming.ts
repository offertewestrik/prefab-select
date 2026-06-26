import type { Detector } from "./detector";

export const vloerverwarmingDetector: Detector = {
  key: "vloerverwarming",
  label: "Vloerverwarming",
  description: "Herkent verdelers, leidingen en pomp van vloerverwarmingssystemen.",
  mockAnalysis: () => ({
    confidence: 0.79,
    text: "",
    objects: [
      { type: "verdeler", label: "Verdeler", confidence: 0.81 },
      { type: "onderdeel", label: "Circulatiepomp", confidence: 0.76 },
      { type: "onderdeel", label: "Aanvoer-/retourleidingen", confidence: 0.74 },
    ],
    condition: { riskLevel: "LAAG", maintenanceScore: 77, notes: "Verdeler oogt compleet." },
  }),
  interpret: (analysis) => ({
    summary: "Vloerverwarming met verdeler en pomp herkend.",
    recommendations: ["Spoel het systeem periodiek door", "Controleer de groepenverdeling en debiet"],
    warnings: [],
    estimatedPrice: { minCents: 250000, maxCents: 900000 },
    riskLevel: analysis.condition.riskLevel,
    maintenanceScore: analysis.condition.maintenanceScore ?? null,
  }),
};
