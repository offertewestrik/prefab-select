import type { Detector } from "./detector";
import type { DetectorKey } from "../types";
import { cvKetelDetector } from "./cv-ketel";
import { warmtepompDetector } from "./warmtepomp";
import { badkamerDetector } from "./badkamer";
import { radiatorDetector } from "./radiator";
import { vloerverwarmingDetector } from "./vloerverwarming";
import { lekkageDetector } from "./lekkage";
import { generalDetector } from "./general";

export * from "./detector";

export const DETECTORS: Record<DetectorKey, Detector> = {
  "cv-ketel": cvKetelDetector,
  warmtepomp: warmtepompDetector,
  badkamer: badkamerDetector,
  radiator: radiatorDetector,
  vloerverwarming: vloerverwarmingDetector,
  lekkage: lekkageDetector,
  general: generalDetector,
};

export const DETECTOR_KEYS = Object.keys(DETECTORS) as DetectorKey[];
export const DETECTOR_LIST: Detector[] = Object.values(DETECTORS);

/** Detector ophalen op key (valt terug op `general`). */
export function getDetector(key: string): Detector {
  return DETECTORS[key as DetectorKey] ?? generalDetector;
}
