import type { Detector } from "./detector";

export const cvKetelDetector: Detector = {
  key: "cv-ketel",
  label: "CV-ketel",
  description: "Herkent cv-ketels, merk/model en onderdelen; schat conditie en vervangingsprijs.",
  mockAnalysis: () => ({
    confidence: 0.92,
    text: "Intergas Xtreme 36",
    objects: [
      { type: "ketel", label: "Intergas Xtreme 36", confidence: 0.92, position: null, metadata: { merk: "Intergas", model: "Xtreme 36" } },
      { type: "onderdeel", label: "Expansievat", confidence: 0.88, position: null },
      { type: "onderdeel", label: "Thermostaat", confidence: 0.81, position: null },
      { type: "onderdeel", label: "Condensafvoer", confidence: 0.86, position: null },
      { type: "onderdeel", label: "Rookgasafvoer", confidence: 0.84, position: null },
    ],
    condition: { riskLevel: "LAAG", maintenanceScore: 78, notes: "Ketel oogt in goede staat." },
  }),
  interpret: (analysis) => ({
    summary: `CV-ketel herkend (${analysis.objects[0]?.label ?? "onbekend model"}). Onderdelen en afvoer zichtbaar; conditie ${analysis.condition.riskLevel.toLowerCase()}.`,
    recommendations: ["Plan jaarlijks onderhoud", "Controleer de waterdruk en het expansievat"],
    warnings: [],
    estimatedPrice: { minCents: 220000, maxCents: 280000 },
    riskLevel: analysis.condition.riskLevel,
    maintenanceScore: analysis.condition.maintenanceScore ?? null,
  }),
};
