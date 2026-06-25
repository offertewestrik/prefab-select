import type { ServiceDef, ServiceKey, BuildType, Finish } from '../types';

/**
 * The canonical service catalogue offered on AanbouwPlatform.nl. A bouwbedrijf
 * picks the services it delivers; homeowners' aanvragen are matched against them.
 */
export const SERVICES: ServiceDef[] = [
  { key: 'aanbouw', label: 'Aanbouw', description: 'Extra ruimte tegen de woning, op de begane grond.' },
  { key: 'uitbouw', label: 'Uitbouw', description: 'Uitbreiding van een bestaande ruimte, bijv. de woonkamer.' },
  { key: 'dakopbouw', label: 'Dakopbouw', description: 'Een extra verdieping of opbouw op het bestaande dak.' },
  { key: 'garage-ombouw', label: 'Garage ombouw', description: 'Een garage verbouwen tot volwaardige leefruimte.' },
  { key: 'fundering', label: 'Fundering', description: 'Funderingswerk en grondwerk voor de aanbouw.' },
  { key: 'staalconstructie', label: 'Staalconstructie', description: 'Stalen draagconstructies en spanten.' },
  { key: 'kozijnen', label: 'Kozijnen', description: 'Levering en plaatsing van kozijnen.' },
  { key: 'schuifpui', label: 'Schuifpui', description: 'Schuifpuien en grote glaspartijen.' },
  { key: 'gevelafwerking', label: 'Gevelafwerking', description: 'Metsel-, stuc- en gevelbekledingswerk.' },
  { key: 'vergunning-begeleiding', label: 'Vergunning begeleiding', description: 'Begeleiding bij de omgevingsvergunning.' },
];

const SERVICE_LABELS: Record<ServiceKey, string> = Object.fromEntries(
  SERVICES.map((s) => [s.key, s.label]),
) as Record<ServiceKey, string>;

export const serviceLabel = (key: ServiceKey): string => SERVICE_LABELS[key] ?? key;

/** What a homeowner can choose to build (Stap 1 of the aanvraagformulier). */
export const BUILD_TYPES: BuildType[] = [
  'Aanbouw', 'Uitbouw', 'Dakopbouw', 'Garage ombouw', 'Mantelzorgwoning', 'Poolhouse', 'Anders',
];

export const FINISHES: { key: Finish; label: string; description: string }[] = [
  { key: 'casco', label: 'Casco', description: 'Wind- en waterdicht, afwerking doe je zelf.' },
  { key: 'standaard', label: 'Standaard', description: 'Compleet afgewerkt met nette standaard materialen.' },
  { key: 'luxe', label: 'Luxe', description: 'Hoogwaardige afwerking en premium materialen.' },
];

/** Budget ranges shown in Stap 3, with a midpoint used for stats. */
export const BUDGET_RANGES: { label: string; min: number; max: number; mid: number }[] = [
  { label: '€ 20.000 – € 40.000', min: 20000, max: 40000, mid: 30000 },
  { label: '€ 40.000 – € 60.000', min: 40000, max: 60000, mid: 50000 },
  { label: '€ 60.000 – € 90.000', min: 60000, max: 90000, mid: 75000 },
  { label: '€ 90.000 – € 120.000', min: 90000, max: 120000, mid: 105000 },
  { label: '€ 120.000 – € 150.000', min: 120000, max: 150000, mid: 135000 },
  { label: 'Meer dan € 150.000', min: 150000, max: 200000, mid: 175000 },
];

/** Map a build type to the most relevant service for matching/labels. */
export const buildTypeToService: Partial<Record<BuildType, ServiceKey>> = {
  Aanbouw: 'aanbouw',
  Uitbouw: 'uitbouw',
  Dakopbouw: 'dakopbouw',
  'Garage ombouw': 'garage-ombouw',
};
