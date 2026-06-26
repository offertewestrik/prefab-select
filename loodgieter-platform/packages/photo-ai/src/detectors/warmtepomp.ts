import type { Detector } from "./detector";

export const warmtepompDetector: Detector = {
  key: "warmtepomp",
  label: "Warmtepomp",
  description: "Herkent (hybride) warmtepompen, units en opstelling; schat conditie en prijs.",
  mockAnalysis: () => ({
    confidence: 0.87,
    text: "Daikin Altherma 3",
    objects: [
      { type: "warmtepomp", label: "Daikin Altherma 3", confidence: 0.87, metadata: { merk: "Daikin", model: "Altherma 3" } },
      { type: "onderdeel", label: "Buitenunit", confidence: 0.9 },
      { type: "onderdeel", label: "Binnenunit / boiler", confidence: 0.82 },
      { type: "onderdeel", label: "Leidingisolatie", confidence: 0.74 },
    ],
    condition: { riskLevel: "LAAG", maintenanceScore: 80, notes: "Opstelling oogt correct." },
  }),
  interpret: (analysis) => ({
    summary: `Warmtepomp herkend (${analysis.objects[0]?.label ?? "onbekend model"}). Buiten- en binnenunit zichtbaar.`,
    recommendations: ["Controleer de leidingisolatie", "Plan periodiek onderhoud van het koudemiddelcircuit"],
    warnings: [],
    estimatedPrice: { minCents: 450000, maxCents: 800000 },
    riskLevel: analysis.condition.riskLevel,
    maintenanceScore: analysis.condition.maintenanceScore ?? null,
  }),
};
