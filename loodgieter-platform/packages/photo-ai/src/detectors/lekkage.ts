import type { Detector } from "./detector";

export const lekkageDetector: Detector = {
  key: "lekkage",
  label: "Lekkage",
  description: "Signaleert zichtbaar water, vochtplekken, corrosie en vermoedelijke bron.",
  mockAnalysis: () => ({
    confidence: 0.71,
    text: "",
    objects: [
      { type: "lekkage", label: "Vochtplek", confidence: 0.74 },
      { type: "indicatie", label: "Corrosie op koppeling", confidence: 0.68 },
    ],
    condition: { riskLevel: "HOOG", maintenanceScore: 35, notes: "Actieve lekkage vermoed." },
  }),
  interpret: (analysis) => ({
    summary: "Mogelijke lekkage/vochtindicaties herkend. Snelle inspectie aanbevolen.",
    recommendations: ["Sluit indien mogelijk de watertoevoer af", "Laat de bron ter plaatse inspecteren"],
    warnings: ["Risico op water- en vervolgschade"],
    estimatedPrice: { minCents: 9000, maxCents: 150000 },
    riskLevel: analysis.condition.riskLevel,
    maintenanceScore: analysis.condition.maintenanceScore ?? null,
  }),
};
