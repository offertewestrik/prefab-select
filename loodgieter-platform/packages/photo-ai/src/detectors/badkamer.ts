import type { Detector } from "./detector";

export const badkamerDetector: Detector = {
  key: "badkamer",
  label: "Badkamer",
  description: "Herkent sanitair, kranen en afvoeren; signaleert vocht/lekkage.",
  mockAnalysis: () => ({
    confidence: 0.8,
    text: "",
    objects: [
      { type: "sanitair", label: "Wastafel", confidence: 0.85 },
      { type: "sanitair", label: "Douche", confidence: 0.82 },
      { type: "kraan", label: "Mengkraan", confidence: 0.78 },
      { type: "afvoer", label: "Vloerafvoer", confidence: 0.7 },
    ],
    condition: { riskLevel: "GEMIDDELD", maintenanceScore: 60, notes: "Kitvoegen verouderd." },
  }),
  interpret: (analysis) => ({
    summary: "Badkamer met sanitair en afvoeren herkend. Let op de staat van kitvoegen en afvoeren.",
    recommendations: ["Vervang verouderde kitvoegen", "Controleer afvoeren op verstopping"],
    warnings: analysis.condition.riskLevel !== "LAAG" ? ["Mogelijke vochtproblemen rond natte zones"] : [],
    estimatedPrice: { minCents: 150000, maxCents: 600000 },
    riskLevel: analysis.condition.riskLevel,
    maintenanceScore: analysis.condition.maintenanceScore ?? null,
  }),
};
