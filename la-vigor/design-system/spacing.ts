/**
 * LA VIGOR — Spacing, Grid & Layout System
 * ─────────────────────────────────────────────────────────────────────────
 * An 8-point rhythm. Everything in the product is a multiple of 4px, with 8px
 * as the heartbeat. Generous, calm, architectural whitespace — the luxury of
 * room to breathe.
 *
 * Base unit  = 4px   (0.25rem)
 * Step       = 8px   (the 8pt grid)
 */

/* ═══════════════════════════════════════════════════════════════════════
   SPACING SCALE  (4px base · 8pt rhythm)
   Keyed by step. Value is rem. Comment is the px equivalent.
   ═══════════════════════════════════════════════════════════════════════ */
export const spacing = {
  0: '0rem', // 0
  px: '1px', // hairline
  0.5: '0.125rem', // 2
  1: '0.25rem', // 4   ← base unit
  1.5: '0.375rem', // 6
  2: '0.5rem', // 8   ← heartbeat
  3: '0.75rem', // 12
  4: '1rem', // 16
  5: '1.25rem', // 20
  6: '1.5rem', // 24
  7: '1.75rem', // 28
  8: '2rem', // 32
  10: '2.5rem', // 40
  12: '3rem', // 48
  14: '3.5rem', // 56
  16: '4rem', // 64
  20: '5rem', // 80
  24: '6rem', // 96
  28: '7rem', // 112
  32: '8rem', // 128
  40: '10rem', // 160
  48: '12rem', // 192
  56: '14rem', // 224
  64: '16rem', // 256
} as const;

/* ═══════════════════════════════════════════════════════════════════════
   SEMANTIC SPACING — purpose-named so layouts stay consistent
   ═══════════════════════════════════════════════════════════════════════ */
export const space = {
  /** Inside small UI (chip, badge). */
  inlineXs: spacing[1],
  inlineSm: spacing[2],
  inlineMd: spacing[3],
  /** Gap between related items (icon ↔ label, card rows). */
  gapXs: spacing[2],
  gapSm: spacing[3],
  gapMd: spacing[4],
  gapLg: spacing[6],
  gapXl: spacing[8],
  /** Component internal padding. */
  componentSm: spacing[4],
  componentMd: spacing[6],
  componentLg: spacing[8],
  componentXl: spacing[10],
  /** Stack rhythm between blocks within a section. */
  stackSm: spacing[6],
  stackMd: spacing[10],
  stackLg: spacing[16],
} as const;

/* ═══════════════════════════════════════════════════════════════════════
   SECTION SPACING — vertical rhythm between page sections (fluid)
   Luxury = air. These are deliberately large.
   ═══════════════════════════════════════════════════════════════════════ */
export const section = {
  compact: 'clamp(3rem, 6vw, 5rem)', // 48 → 80
  default: 'clamp(5rem, 9vw, 8rem)', // 80 → 128
  spacious: 'clamp(7rem, 12vw, 11rem)', // 112 → 176
  hero: 'clamp(8rem, 14vw, 14rem)', // 128 → 224
} as const;

/* ═══════════════════════════════════════════════════════════════════════
   CONTAINER WIDTHS & GUTTERS
   ═══════════════════════════════════════════════════════════════════════ */
export const container = {
  /** Hard max for ultrawide — keeps line lengths human. */
  max: '1440px',
  /** Standard content container. */
  default: '1200px',
  /** Narrow reading column (articles, forms). */
  prose: '720px',
  /** Wide editorial / gallery. */
  wide: '1320px',
  /** Horizontal gutter (fluid: comfortable on mobile, roomy on desktop). */
  gutter: 'clamp(1.25rem, 5vw, 5rem)', // 20 → 80
  gutterMobile: '1.25rem', // 20
  gutterDesktop: '5rem', // 80
} as const;

/* ═══════════════════════════════════════════════════════════════════════
   12-COLUMN GRID
   ═══════════════════════════════════════════════════════════════════════ */
export const grid = {
  columns: 12,
  /** Gutter between columns, per breakpoint. */
  gap: {
    mobile: spacing[4], // 16
    tablet: spacing[6], // 24
    desktop: spacing[8], // 32
  },
  /** Handy column-span fractions for asymmetric editorial layouts. */
  span: {
    full: '1 / -1',
    half: 'span 6',
    third: 'span 4',
    twoThirds: 'span 8',
    quarter: 'span 3',
    threeQuarters: 'span 9',
  },
} as const;

/* ═══════════════════════════════════════════════════════════════════════
   BREAKPOINTS  (min-width, mobile-first)
   Mobile 390 · Tablet 768 · Laptop 1280 · Desktop 1440+
   ═══════════════════════════════════════════════════════════════════════ */
export const breakpoints = {
  xs: '390px', // small phones (design target)
  sm: '640px', // large phones
  md: '768px', // tablet
  lg: '1024px', // small laptop
  xl: '1280px', // laptop (design target)
  '2xl': '1440px', // desktop (design target)
  '3xl': '1920px', // large desktop
} as const;

/** Ready-made media query strings. */
export const media = {
  xs: `(min-width: ${breakpoints.xs})`,
  sm: `(min-width: ${breakpoints.sm})`,
  md: `(min-width: ${breakpoints.md})`,
  lg: `(min-width: ${breakpoints.lg})`,
  xl: `(min-width: ${breakpoints.xl})`,
  '2xl': `(min-width: ${breakpoints['2xl']})`,
  reducedMotion: '(prefers-reduced-motion: reduce)',
  dark: '(prefers-color-scheme: dark)',
  hover: '(hover: hover) and (pointer: fine)',
} as const;

/* ═══════════════════════════════════════════════════════════════════════
   Z-INDEX SCALE — named layers, no magic numbers
   ═══════════════════════════════════════════════════════════════════════ */
export const zIndex = {
  base: 0,
  raised: 10,
  sticky: 100, // sticky sub-headers
  nav: 200, // top navigation
  dropdown: 300,
  overlay: 400, // scrims
  drawer: 500, // side sheets / mobile menu
  modal: 600,
  popover: 700,
  toast: 800,
  tooltip: 900,
  max: 9999,
} as const;

/* ═══════════════════════════════════════════════════════════════════════
   ASPECT RATIOS — image discipline (see image-style-guide)
   ═══════════════════════════════════════════════════════════════════════ */
export const aspect = {
  square: '1 / 1', // product close-ups
  portrait: '4 / 5', // menu items, dishes
  classic: '4 / 3',
  photo: '3 / 2', // editorial / gallery
  wide: '16 / 9', // hero video
  ultrawide: '21 / 9', // panoramic band
  story: '9 / 16', // mobile stories / QR
} as const;

export const spacingSystem = {
  spacing,
  space,
  section,
  container,
  grid,
  breakpoints,
  media,
  zIndex,
  aspect,
} as const;

export default spacingSystem;
