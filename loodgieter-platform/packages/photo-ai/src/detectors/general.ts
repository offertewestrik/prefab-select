import type { Detector } from "./detector";

export const generalDetector: Detector = {
  key: "general",
  label: "Algemeen",
  description: "Algemene observatie van zichtbare installatie-onderdelen en toestand.",
  mockAnalysis: () => ({
    confidence: 0.6,
    text: "",
    objects: [{ type: "installatie", label: "Installatie-onderdeel", confidence: 0.6 }],
    condition: { riskLevel: "ONBEKEND", maintenanceScore: 50, notes: "Algemene observatie." },
  }),
  interpret: (analysis) => ({
    summary: "Algemene observatie van zichtbare installatie-onderdelen.",
    recommendations: ["Laat ter plaatse beoordelen voor een definitief advies"],
    warnings: [],
    estimatedPrice: null,
    riskLevel: analysis.condition.riskLevel,
    maintenanceScore: analysis.condition.maintenanceScore ?? null,
  }),
};
