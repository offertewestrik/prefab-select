/**
 * LA VIGOR — Iconography
 * ─────────────────────────────────────────────────────────────────────────
 * Library:  lucide-react  (thin, rounded, elegant — exactly our voice).
 *
 * House rules:
 *   • strokeWidth 1.5 everywhere (1.25 for large decorative use).
 *   • Rounded linecap + linejoin (Lucide default — keep it).
 *   • One of four sizes only: sm 16 · md 20 · lg 24 · xl 32.
 *   • Icons inherit currentColor; never hard-code a fill.
 *   • Pair an icon with a text label whenever it is an action (a11y).
 *
 * The map below is the canonical name → Lucide component string so the brand
 * never drifts (e.g. always `MapPin` for location, never `Map`).
 */

export const iconDefaults = {
  strokeWidth: 1.5,
  strokeWidthBold: 2,
  strokeWidthThin: 1.25,
  absoluteStrokeWidth: true, // stroke stays 1.5 visually at any size
} as const;

export const iconSize = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  display: 48, // feature illustrations
} as const;

/**
 * Semantic name → Lucide icon component name.
 * Import from 'lucide-react' by these component names.
 */
export const icons = {
  // Brand / product
  coffee: 'Coffee',
  iceCoffee: 'CupSoda',
  bean: 'Bean',
  dessert: 'Croissant',
  donut: 'Donut',
  cup: 'CupSoda',
  milk: 'Milk',
  leaf: 'Leaf',
  flame: 'Flame', // roast / fresh / hot
  sparkles: 'Sparkles', // premium / quality
  heart: 'Heart',
  star: 'Star',
  award: 'Award', // premium quality
  utensils: 'UtensilsCrossed',

  // Contact / location
  location: 'MapPin',
  map: 'Map',
  phone: 'Phone',
  clock: 'Clock',
  mail: 'Mail',
  calendar: 'CalendarDays',
  navigation: 'Navigation',

  // Social
  instagram: 'Instagram',
  facebook: 'Facebook',
  tiktok: 'Music2', // Lucide has no TikTok mark; Music2 is the brand-safe stand-in
  whatsapp: 'MessageCircle', // pair with brand color; or use custom SVG
  twitter: 'Twitter',
  youtube: 'Youtube',

  // UI / navigation
  menu: 'Menu',
  close: 'X',
  search: 'Search',
  qr: 'QrCode',
  arrowRight: 'ArrowRight',
  arrowUpRight: 'ArrowUpRight',
  arrowLeft: 'ArrowLeft',
  chevronDown: 'ChevronDown',
  chevronRight: 'ChevronRight',
  plus: 'Plus',
  minus: 'Minus',
  check: 'Check',
  filter: 'SlidersHorizontal',
  cart: 'ShoppingBag',
  external: 'ExternalLink',
  play: 'Play',

  // State
  success: 'CircleCheck',
  error: 'CircleAlert',
  warning: 'TriangleAlert',
  info: 'Info',
  loading: 'LoaderCircle',
} as const;

export type IconName = keyof typeof icons;

export const iconSystem = { iconDefaults, iconSize, icons } as const;
export default iconSystem;
