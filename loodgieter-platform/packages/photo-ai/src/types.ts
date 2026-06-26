// Provider-onafhankelijke types voor de Photo Analyzer.

export type RiskLevel = "LAAG" | "GEMIDDELD" | "HOOG" | "ONBEKEND";
export type AnalysisStatus = "PENDING" | "COMPLETED" | "FAILED";

export type DetectorKey =
  | "cv-ketel"
  | "warmtepomp"
  | "badkamer"
  | "radiator"
  | "vloerverwarming"
  | "lekkage"
  | "general";

export interface VisionImage {
  url?: string;
  base64?: string;
  width?: number;
  height?: number;
}

/** Eén gedetecteerd object op een foto. */
export interface PhotoObjectResult {
  type: string;
  label: string;
  confidence: number; // 0..1
  position?: { x: number; y: number; w: number; h: number } | null;
  metadata?: Record<string, unknown> | null;
}

export interface ConditionEstimate {
  riskLevel: RiskLevel;
  maintenanceScore?: number; // 0..100
  notes?: string;
}

export interface ExtractedText {
  text: string;
}

/** Het ruwe analyseresultaat van een VisionProvider (nog niet detector-geïnterpreteerd). */
export interface VisionAnalysis {
  confidence: number; // 0..1
  objects: PhotoObjectResult[];
  text: string;
  condition: ConditionEstimate;
  raw?: unknown;
}

export interface VisionRequest {
  images: VisionImage[];
  detector: DetectorKey;
  prompt: string;
  /** Deterministische hint voor de MockProvider; echte providers negeren dit. */
  mock?: VisionAnalysis;
}

export interface DetectorContext {
  leadId?: string;
  serviceHint?: string;
  notes?: string;
}

/** Het eindresultaat van een detector (klaar om op te slaan). */
export interface DetectorResult {
  detector: DetectorKey;
  confidence: number;
  summary: string;
  objects: PhotoObjectResult[];
  text: string;
  recommendations: string[];
  warnings: string[];
  estimatedPrice?: { minCents: number; maxCents: number } | null;
  riskLevel: RiskLevel;
  maintenanceScore?: number | null;
  raw?: unknown;
}
