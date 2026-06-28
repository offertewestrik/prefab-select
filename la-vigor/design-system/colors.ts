/**
 * LA VIGOR — Color System
 * ─────────────────────────────────────────────────────────────────────────
 * A warm, organic palette for a luxury coffee house.
 * Inspired by Starbucks Reserve, Blue Bottle, Aesop and the golden-hour
 * tones of freshly pulled espresso, raw cream and roasted beans.
 *
 * Every color is provided as HEX, RGB, HSL, a CSS custom property name and a
 * Tailwind token name, plus opacity helpers and a curated dark-mode variant.
 *
 * Naming philosophy:
 *   • Numeric scales (50→950) for systematic UI work (borders, text, fills).
 *   • Semantic aliases (coffeeBlack, caramel, latte…) for human, brand-led use.
 *
 * Nothing here is accidental. Each value was hand-tuned against warm light.
 */

export interface ColorToken {
  /** Friendly, human label. */
  name: string;
  /** #RRGGBB */
  hex: string;
  /** "r, g, b" — ready for rgb()/rgba(). */
  rgb: string;
  /** "h, s%, l%" — ready for hsl()/hsla(). */
  hsl: string;
  /** CSS custom property, e.g. --color-espresso-500 */
  cssVar: string;
  /** Tailwind utility token, e.g. espresso-500 */
  tw: string;
}

const t = (
  name: string,
  hex: string,
  rgb: string,
  hsl: string,
  tw: string
): ColorToken => ({ name, hex, rgb, hsl, cssVar: `--color-${tw}`, tw });

/* ═══════════════════════════════════════════════════════════════════════
   1 · CORE BRAND SCALE — "espresso"
   The spine of the whole system. A single warm-brown ramp from the palest
   foam (50) to the darkest roast (950). Use for text, surfaces, fills.
   ═══════════════════════════════════════════════════════════════════════ */
export const espresso = {
  50: t('Foam', '#FBF7F2', '251, 247, 242', '33, 53%, 97%', 'espresso-50'),
  100: t('Steamed Milk', '#F4E9DC', '244, 233, 220', '32, 52%, 91%', 'espresso-100'),
  200: t('Oat', '#E7D2BB', '231, 210, 187', '31, 48%, 82%', 'espresso-200'),
  300: t('Latte', '#D5B591', '213, 181, 145', '32, 45%, 70%', 'espresso-300'),
  400: t('Flat White', '#C0926A', '192, 146, 106', '28, 41%, 58%', 'espresso-400'),
  500: t('Caramel', '#A8744A', '168, 116, 74', '27, 39%, 47%', 'espresso-500'),
  600: t('Roast', '#8C5A38', '140, 90, 56', '24, 43%, 38%', 'espresso-600'),
  700: t('French Roast', '#6E4429', '110, 68, 41', '23, 46%, 30%', 'espresso-700'),
  800: t('Chocolate', '#4A2C1A', '74, 44, 26', '22, 48%, 20%', 'espresso-800'),
  900: t('Espresso', '#2E1B11', '46, 27, 17', '21, 46%, 12%', 'espresso-900'),
  950: t('Coffee Black', '#1A0F09', '26, 15, 9', '21, 49%, 7%', 'espresso-950'),
} as const;

/* ═══════════════════════════════════════════════════════════════════════
   2 · CREAM SCALE — warm neutrals / paper
   The light counterpart. Backgrounds, cards, beige sections, dividers.
   ═══════════════════════════════════════════════════════════════════════ */
export const cream = {
  50: t('Porcelain', '#FDFBF7', '253, 251, 247', '40, 50%, 98%', 'cream-50'),
  100: t('Cream White', '#F8F2E8', '248, 242, 232', '37, 53%, 94%', 'cream-100'),
  200: t('Warm Beige', '#E7DAC4', '231, 218, 196', '38, 42%, 84%', 'cream-200'),
  300: t('Sand', '#DACBAF', '218, 203, 175', '39, 39%, 77%', 'cream-300'),
  400: t('Linen', '#C9B796', '201, 183, 150', '39, 33%, 69%', 'cream-400'),
  500: t('Taupe', '#B09A77', '176, 154, 119', '37, 27%, 58%', 'cream-500'),
  600: t('Mushroom', '#8F7B5D', '143, 123, 93', '36, 21%, 46%', 'cream-600'),
  700: t('Driftwood', '#6E5E47', '110, 94, 71', '35, 22%, 35%', 'cream-700'),
  800: t('Bark', '#4D4231', '77, 66, 49', '36, 22%, 25%', 'cream-800'),
  900: t('Walnut', '#2F291E', '47, 41, 30', '39, 22%, 15%', 'cream-900'),
} as const;

/* ═══════════════════════════════════════════════════════════════════════
   3 · GOLD SCALE — "sand" / accent metal
   The signature luxury accent. CTAs, underlines, focus rings, fine detail.
   Used sparingly — gold is a whisper, never a shout.
   ═══════════════════════════════════════════════════════════════════════ */
export const gold = {
  50: t('Champagne', '#FBF4E6', '251, 244, 230', '40, 68%, 94%', 'gold-50'),
  100: t('Honey Foam', '#F4E6C8', '244, 230, 200', '41, 67%, 87%', 'gold-100'),
  200: t('Wheat', '#E8D29C', '232, 210, 156', '42, 64%, 76%', 'gold-200'),
  300: t('Golden Sand', '#C8A063', '200, 160, 99', '36, 48%, 59%', 'gold-300'),
  400: t('Amber Gold', '#B98A47', '185, 138, 71', '35, 45%, 50%', 'gold-400'),
  500: t('Honey', '#A1742F', '161, 116, 47', '36, 55%, 41%', 'gold-500'),
  600: t('Bronze', '#835D24', '131, 93, 36', '36, 57%, 33%', 'gold-600'),
  700: t('Antique Gold', '#65481D', '101, 72, 29', '36, 55%, 25%', 'gold-700'),
} as const;

/* ═══════════════════════════════════════════════════════════════════════
   4 · SEMANTIC BRAND ALIASES
   Human-readable names mapped to the scales above. These are what you reach
   for when designing — they read like a barista's vocabulary.
   ═══════════════════════════════════════════════════════════════════════ */
export const brand = {
  coffeeBlack: t('Coffee Black', '#171411', '23, 20, 17', '30, 15%, 8%', 'coffee-black'),
  espressoBrown: t('Espresso Brown', '#3B2A1E', '59, 42, 30', '25, 33%, 17%', 'espresso-brown'),
  chocolate: t('Chocolate', '#43291A', '67, 41, 26', '22, 44%, 18%', 'chocolate'),
  caramel: t('Caramel', '#A8743E', '168, 116, 62', '31, 46%, 45%', 'caramel'),
  latte: t('Latte', '#D9C5A6', '217, 197, 166', '36, 40%, 75%', 'latte'),
  creamWhite: t('Cream White', '#F8F2E8', '248, 242, 232', '37, 53%, 94%', 'cream-white'),
  warmBeige: t('Warm Beige', '#E7DAC4', '231, 218, 196', '38, 42%, 84%', 'warm-beige'),
  goldenSand: t('Golden Sand', '#C8A063', '200, 160, 99', '36, 48%, 59%', 'golden-sand'),
  // Secondary / supporting naturals
  oliveGreen: t('Olive Green', '#6A6A47', '106, 106, 71', '60, 20%, 35%', 'olive'),
  warmWood: t('Warm Wood', '#8A5E3B', '138, 94, 59', '27, 40%, 39%', 'wood'),
} as const;

/* ═══════════════════════════════════════════════════════════════════════
   5 · STATE / FEEDBACK COLORS
   Tuned to sit inside the warm world — no clinical neon. Each has a soft
   tint (for backgrounds) and a solid (for text/icons/borders).
   ═══════════════════════════════════════════════════════════════════════ */
export const state = {
  success: t('Sage Success', '#5E8C61', '94, 140, 97', '124, 20%, 46%', 'success'),
  successSoft: t('Sage Mist', '#E7F0E6', '231, 240, 230', '114, 26%, 92%', 'success-soft'),
  error: t('Terracotta Error', '#B24A40', '178, 74, 64', '5, 47%, 47%', 'error'),
  errorSoft: t('Terracotta Mist', '#F6E2DF', '246, 226, 223', '8, 50%, 92%', 'error-soft'),
  warning: t('Amber Warning', '#D89B3C', '216, 155, 60', '37, 67%, 54%', 'warning'),
  warningSoft: t('Amber Mist', '#FBEFD8', '251, 239, 216', '39, 73%, 92%', 'warning-soft'),
  info: t('Slate Info', '#5A7D8C', '90, 125, 140', '198, 22%, 45%', 'info'),
  infoSoft: t('Slate Mist', '#E3ECEF', '227, 236, 239', '198, 24%, 91%', 'info-soft'),
} as const;

/* ═══════════════════════════════════════════════════════════════════════
   6 · SEMANTIC SURFACE / TEXT / BORDER ROLES  (LIGHT THEME — default)
   Reference these in components rather than raw scale values. Re-theming the
   whole product later means editing only this block + the dark block below.
   ═══════════════════════════════════════════════════════════════════════ */
export const light = {
  // Backgrounds
  bg: cream[100].hex, //  app canvas
  bgSubtle: cream[50].hex, //  raised-but-quiet panels
  bgInverse: espresso[950].hex, //  dark immersive sections
  // Surfaces (cards, sheets)
  surface: cream[50].hex,
  surfaceRaised: '#FFFFFF',
  surfaceSunken: cream[200].hex,
  surfaceInverse: espresso[900].hex,
  // Text
  textPrimary: espresso[950].hex,
  textSecondary: espresso[700].hex,
  textMuted: cream[600].hex,
  textInverse: cream[100].hex,
  textOnBrand: cream[50].hex,
  textAccent: gold[500].hex,
  // Borders / hairlines
  border: 'rgba(74, 44, 26, 0.12)', // espresso-800 @ 12%
  borderStrong: 'rgba(74, 44, 26, 0.22)',
  borderAccent: 'rgba(200, 160, 99, 0.55)', // golden-sand
  borderInverse: 'rgba(248, 242, 232, 0.14)',
  // Interaction (hover/active fills)
  hover: 'rgba(74, 44, 26, 0.05)',
  hoverStrong: 'rgba(74, 44, 26, 0.09)',
  active: 'rgba(74, 44, 26, 0.13)',
  // Brand anchors
  primary: espresso[900].hex,
  accent: gold[300].hex,
} as const;

/* ═══════════════════════════════════════════════════════════════════════
   7 · DARK THEME VARIANT
   Not an inversion — a re-roast. Warm darks, candle-lit surfaces, the same
   gold accent. Designed to feel like the cafe after sunset.
   ═══════════════════════════════════════════════════════════════════════ */
export const dark = {
  bg: '#120D09', //  warmer-than-black canvas
  bgSubtle: espresso[950].hex,
  bgInverse: cream[100].hex,
  surface: '#1E1611',
  surfaceRaised: '#261C15',
  surfaceSunken: '#150F0A',
  surfaceInverse: cream[100].hex,
  textPrimary: cream[100].hex,
  textSecondary: '#C9B79B',
  textMuted: '#8F7B5D',
  textInverse: espresso[950].hex,
  textOnBrand: cream[50].hex,
  textAccent: gold[300].hex,
  border: 'rgba(248, 242, 232, 0.10)',
  borderStrong: 'rgba(248, 242, 232, 0.18)',
  borderAccent: 'rgba(200, 160, 99, 0.45)',
  borderInverse: 'rgba(74, 44, 26, 0.22)',
  hover: 'rgba(248, 242, 232, 0.06)',
  hoverStrong: 'rgba(248, 242, 232, 0.10)',
  active: 'rgba(248, 242, 232, 0.14)',
  primary: gold[300].hex,
  accent: gold[300].hex,
} as const;

/* ═══════════════════════════════════════════════════════════════════════
   8 · GLASS COLORS (glassmorphism fills)
   Background fills designed to pair with backdrop-blur. See shadow.ts /
   globals.css for the blur + border recipes.
   ═══════════════════════════════════════════════════════════════════════ */
export const glass = {
  // Light glass — cards on cream backgrounds
  light: 'rgba(255, 255, 255, 0.55)',
  lightStrong: 'rgba(255, 255, 255, 0.72)',
  lightBorder: 'rgba(255, 255, 255, 0.65)',
  // Warm glass — cards on beige/gold sections
  warm: 'rgba(248, 242, 232, 0.45)',
  warmBorder: 'rgba(200, 160, 99, 0.30)',
  // Dark glass — nav + cards on espresso/black sections
  dark: 'rgba(23, 20, 17, 0.55)',
  darkStrong: 'rgba(23, 20, 17, 0.72)',
  darkBorder: 'rgba(217, 197, 166, 0.16)',
  // Tinted gold glass — premium dialogs / featured chips
  gold: 'rgba(200, 160, 99, 0.14)',
  goldBorder: 'rgba(200, 160, 99, 0.40)',
} as const;

/* ═══════════════════════════════════════════════════════════════════════
   9 · OPACITY HELPERS
   Canonical alpha stops + a helper to build rgba() from any ColorToken.
   ═══════════════════════════════════════════════════════════════════════ */
export const opacity = {
  0: 0, 5: 0.05, 8: 0.08, 12: 0.12, 16: 0.16, 24: 0.24, 32: 0.32,
  48: 0.48, 64: 0.64, 80: 0.8, 90: 0.9, 100: 1,
} as const;

/** Build an rgba() string from a token at a given alpha (0–1). */
export const alpha = (token: ColorToken, a: number): string =>
  `rgba(${token.rgb}, ${a})`;

/* ═══════════════════════════════════════════════════════════════════════
   10 · GRADIENTS — organic, golden-hour washes
   ═══════════════════════════════════════════════════════════════════════ */
export const gradients = {
  espresso: 'linear-gradient(160deg, #2E1B11 0%, #1A0F09 100%)',
  caramelGlow: 'linear-gradient(135deg, #C8A063 0%, #A8743E 100%)',
  creamFade: 'linear-gradient(180deg, #FDFBF7 0%, #F8F2E8 100%)',
  goldText: 'linear-gradient(100deg, #A1742F 0%, #C8A063 45%, #E8D29C 100%)',
  heroScrim:
    'linear-gradient(180deg, rgba(23,20,17,0.10) 0%, rgba(23,20,17,0.55) 55%, rgba(23,20,17,0.85) 100%)',
  // soft radial "candlelight" auras for section backgrounds
  auraWarm:
    'radial-gradient(60% 55% at 18% 12%, rgba(200,160,99,0.18), transparent 60%), radial-gradient(50% 50% at 88% 20%, rgba(168,116,62,0.12), transparent 55%), radial-gradient(65% 65% at 50% 100%, rgba(217,197,166,0.16), transparent 60%)',
  auraDark:
    'radial-gradient(50% 50% at 25% 18%, rgba(200,160,99,0.16), transparent 60%), radial-gradient(45% 45% at 82% 82%, rgba(168,116,62,0.18), transparent 55%)',
} as const;

/* ═══════════════════════════════════════════════════════════════════════
   AGGREGATE EXPORT
   ═══════════════════════════════════════════════════════════════════════ */
export const colors = {
  espresso,
  cream,
  gold,
  brand,
  state,
  glass,
  gradients,
  opacity,
  light,
  dark,
} as const;

export type ColorScale = typeof espresso;
export type ThemeRoles = typeof light;

export default colors;
