import type { Detector } from "./detector";

export const radiatorDetector: Detector = {
  key: "radiator",
  label: "Radiator",
  description: "Herkent radiatoren, aansluitingen en thermostaatknoppen; signaleert corrosie.",
  mockAnalysis: () => ({
    confidence: 0.83,
    text: "",
    objects: [
      { type: "radiator", label: "Paneelradiator", confidence: 0.83 },
      { type: "onderdeel", label: "Thermostaatknop", confidence: 0.79 },
      { type: "onderdeel", label: "Retouraansluiting", confidence: 0.72 },
    ],
    condition: { riskLevel: "LAAG", maintenanceScore: 75, notes: "Geen zichtbare corrosie." },
  }),
  interpret: (analysis) => ({
    summary: "Radiator met aansluitingen herkend.",
    recommendations: ["Ontlucht de radiatoren bij koude bovenzijde", "Controleer thermostaatknoppen op werking"],
    warnings: [],
    estimatedPrice: { minCents: 12000, maxCents: 45000 },
    riskLevel: analysis.condition.riskLevel,
    maintenanceScore: analysis.condition.maintenanceScore ?? null,
  }),
};
