import { z } from "zod";

export const riskLevelSchema = z.enum(["LAAG", "GEMIDDELD", "HOOG", "ONBEKEND"]);

export const photoObjectSchema = z.object({
  type: z.string(),
  label: z.string(),
  confidence: z.number().min(0).max(1),
  position: z.object({ x: z.number(), y: z.number(), w: z.number(), h: z.number() }).nullable().optional(),
  metadata: z.record(z.string(), z.unknown()).nullable().optional(),
});

export const detectorResultSchema = z.object({
  detector: z.enum(["cv-ketel", "warmtepomp", "badkamer", "radiator", "vloerverwarming", "lekkage", "general"]),
  confidence: z.number().min(0).max(1),
  summary: z.string(),
  objects: z.array(photoObjectSchema),
  text: z.string(),
  recommendations: z.array(z.string()),
  warnings: z.array(z.string()),
  estimatedPrice: z.object({ minCents: z.number().int(), maxCents: z.number().int() }).nullable().optional(),
  riskLevel: riskLevelSchema,
  maintenanceScore: z.number().min(0).max(100).nullable().optional(),
});

export type DetectorResultSchema = z.infer<typeof detectorResultSchema>;
