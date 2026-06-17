export type CategorySlug =
  | 'cv-ketels'
  | 'boilers'
  | 'hybride-warmtepompen'
  | 'thermostaten'
  | 'expansievaten'
  | 'rookgasafvoer'
  | 'installatiemateriaal'
  | 'onderhoudscontracten';

export type Brand =
  | 'Intergas'
  | 'Remeha'
  | 'Vaillant'
  | 'Nefit Bosch'
  | 'ATAG'
  | 'Daalderop'
  | 'Inventum'
  | 'Honeywell'
  | 'Flamco'
  | 'Westrik';

export type WoningType =
  | 'Appartement'
  | 'Tussenwoning'
  | 'Hoekwoning'
  | 'Vrijstaande woning'
  | '2-onder-1-kap';

export interface SpecRow {
  label: string;
  value: string;
}

export interface Download {
  label: string;
  /** Handleiding, Datasheet, Energielabel, Installatievoorschrift */
  type: 'Handleiding' | 'Datasheet' | 'Energielabel' | 'Installatievoorschrift';
  url: string;
}

export interface Review {
  author: string;
  rating: number; // 1-5
  date: string;
  body: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface InstallOption {
  id: 'levering' | 'installatie' | 'afvoer' | 'onderhoud';
  label: string;
  description: string;
  price: number;
}

export interface Product {
  id: string;
  slug: string;
  category: CategorySlug;
  brand: Brand;
  model: string;
  /** Korte tagline voor kaarten */
  tagline: string;
  description: string;
  /**
   * Optionele echte productfoto. Vul een URL in (bijv. van een gelicentieerde
   * leveranciersfeed of merk-mediakit) of een lokaal pad onder /public, zoals
   * `/products/intergas-xtreme-30-cw4.webp`. Is dit leeg, dan toont de shop een
   * nette merk-illustratie als fallback.
   */
  imageUrl?: string;
  /** Extra foto's voor de galerij (zelfde conventie als imageUrl). */
  gallery?: string[];
  price: number;
  /** Adviesprijs / van-prijs voor kortingsweergave */
  listPrice?: number;
  /** Accent kleur van het merk voor de productfoto-placeholder */
  accent: string;
  badge?: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  // CV-ketel specifiek
  cwKlasse?: 3 | 4 | 5 | 6;
  vermogenKw?: number;
  energielabel?: 'A' | 'A+' | 'A++' | 'B';
  hybridReady?: boolean;
  warmwaterLpm?: number; // liter per minuut
  gasverbruik?: string;
  // Boiler specifiek
  inhoudLiter?: number;
  elektrischOfGas?: 'Elektrisch' | 'Gas';
  montage?: 'Wand' | 'Vloer' | 'Close-in';
  // Algemeen
  garantieJaar: number;
  afmetingen?: string;
  gewichtKg?: number;
  geschiktVoor?: WoningType[];
  badkamers?: 1 | 2;
  specs: SpecRow[];
  downloads: Download[];
  reviews: Review[];
  faq: FaqItem[];
  relatedIds?: string[];
}

export interface Category {
  slug: CategorySlug;
  title: string;
  short: string;
  description: string;
  icon: string; // lucide icon name
  image: string; // gradient accent
  brands?: Brand[];
  highlights: string[];
}
