import {
  Home, Building2, Layers, Warehouse, HeartHandshake, Waves, Tent,
  Briefcase, Container, Sparkles, type LucideIcon,
} from 'lucide-react';
import type { BuildType } from '../types';

/** Icon per bouwtype, used on the marketing homepage diensten-grid. */
export const BUILD_ICON: Record<BuildType, LucideIcon> = {
  Aanbouw: Home,
  Uitbouw: Building2,
  Dakopbouw: Layers,
  'Garage ombouw': Warehouse,
  Mantelzorgwoning: HeartHandshake,
  Poolhouse: Waves,
  Veranda: Tent,
  Tuinkantoor: Briefcase,
  'Prefab woning': Container,
  Anders: Sparkles,
};

export interface ShowcaseProject {
  type: BuildType;
  title: string;
  plaats: string;
  m2: number;
  finish: string;
  value: string;
  gradient: string;
}

/**
 * Premium portfolio tiles for the homepage. No raster photos are bundled, so
 * each project uses a hand-tuned gradient "render" — intentional and crisp at
 * any resolution.
 */
export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  { type: 'Aanbouw', title: 'Woonkeuken met schuifpui', plaats: 'Tilburg', m2: 24, finish: 'Luxe', value: '€ 58.000', gradient: 'linear-gradient(135deg,#1f5c8b,#0e2a47)' },
  { type: 'Uitbouw', title: 'Uitbouw woonkamer', plaats: 'Breda', m2: 18, finish: 'Standaard', value: '€ 46.000', gradient: 'linear-gradient(135deg,#c2622a,#7a2f12)' },
  { type: 'Dakopbouw', title: 'Extra verdieping + dakterras', plaats: 'Den Haag', m2: 35, finish: 'Standaard', value: '€ 72.000', gradient: 'linear-gradient(135deg,#2b6f6a,#0f3b37)' },
  { type: 'Mantelzorgwoning', title: 'Gelijkvloerse prefab woning', plaats: 'Oss', m2: 48, finish: 'Luxe', value: '€ 98.000', gradient: 'linear-gradient(135deg,#4a5a78,#1c2740)' },
  { type: 'Tuinkantoor', title: 'Vrijstaand tuinkantoor', plaats: 'Eindhoven', m2: 16, finish: 'Standaard', value: '€ 27.000', gradient: 'linear-gradient(135deg,#6b6130,#2f2a12)' },
  { type: 'Poolhouse', title: 'Poolhouse met sauna', plaats: 'Rotterdam', m2: 22, finish: 'Luxe', value: '€ 42.000', gradient: 'linear-gradient(135deg,#3f5c86,#142340)' },
];

export interface Review {
  name: string;
  plaats: string;
  rating: number;
  quote: string;
  project: string;
}

export const REVIEWS: Review[] = [
  { name: 'Familie Hendriks', plaats: 'Waalwijk', rating: 5, project: 'Aanbouw 16 m²', quote: 'Binnen twee dagen drie offertes van geverifieerde bouwers. De aannemer die we kozen was top — alles via één omgeving geregeld.' },
  { name: 'Dhr. de Vries', plaats: 'Breda', rating: 5, project: 'Uitbouw 12 m²', quote: 'Eindelijk een platform dat aanvoelt als 2026. Heldere prijsindicatie vooraf, geen verrassingen achteraf.' },
  { name: 'Mevr. El Amrani', plaats: 'Eindhoven', rating: 5, project: 'Dakopbouw', quote: 'De configurator gaf direct een realistisch beeld én budget. Daardoor wist ik precies wat ik wilde voordat de aannemer langskwam.' },
];

export const PLATFORM_STATS = [
  { value: '1.200+', label: 'aanvragen verwerkt' },
  { value: '180+', label: 'geverifieerde bouwbedrijven' },
  { value: '€ 40M+', label: 'aan bouwprojecten' },
  { value: '4.8/5', label: 'gemiddelde beoordeling' },
];
