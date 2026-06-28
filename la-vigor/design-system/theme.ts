/**
 * LA VIGOR — Theme Assembler
 * ─────────────────────────────────────────────────────────────────────────
 * Composes the raw token modules into two complete, ready-to-apply themes
 * (light = "Daylight Cafe", dark = "After Hours") plus the guideline modules
 * that keep the brand coherent: image direction, illustration language, and
 * accessibility contract.
 *
 * Consume `theme.light` / `theme.dark` in a ThemeProvider, or read individual
 * modules directly. `cssVariables(theme)` emits the `:root` / `.dark` custom
 * properties used by globals.css and Tailwind.
 */

import { colors, light as lightRoles, dark as darkRoles } from './colors';
import { typeSystem } from './typography';
import { spacingSystem } from './spacing';
import { radius, radii } from './radius';
import { shadowSystem } from './shadow';
import { animationSystem } from './animation';
import { componentLibrary } from './components';
import { iconSystem } from './icons';

/* ═══════════════════════════════════════════════════════════════════════
   BRAND META
   ═══════════════════════════════════════════════════════════════════════ */
export const brandMeta = {
  name: 'La Vigor',
  tagline: 'Where Coffee Meets Happiness',
  voice: 'Warm · Elegant · Minimal · Organic · Premium · Timeless',
  origin: 'Irbid City Center, Irbid — Jordan',
  // Designed to scale to many locations / franchising.
  scalability:
    'Tokens are location-agnostic. New venues theme via cssVariables() only; component recipes never change.',
} as const;

/* ═══════════════════════════════════════════════════════════════════════
   IMAGE STYLE GUIDE
   One consistent photographic world. Every asset must pass this checklist.
   ═══════════════════════════════════════════════════════════════════════ */
export const imageStyle = {
  mood: 'Golden hour, warm, intimate, hospitable. The light of a late-afternoon cafe.',
  lighting: [
    'Warm directional light (3000–3500K), soft and raking.',
    'Gentle, feathered shadows — never harsh or doubled.',
    'Subtle highlight bloom on cream, crema and glassware.',
  ],
  colorGrade: [
    'Push warmth: amber/gold highlights, espresso-brown shadows.',
    'Slightly lifted, matte blacks (filmic, not crushed).',
    'Desaturate cool tones; protect skin and crema warmth.',
    'Target the brand palette — beige, caramel, gold, deep brown.',
  ],
  composition: [
    'Shallow depth of field (f/1.8–f/2.8) — creamy bokeh.',
    'Negative space for type overlays; rule-of-thirds product placement.',
    'Tabletop & 3/4 hero angles; honest steam, real condensation.',
    'Natural props: linen, raw wood, ceramic, coffee beans, leaves.',
  ],
  subjects: ['Single-cup hero pours', 'Latte art top-down', 'Hands & ritual', 'Interior warmth', 'Beans & ingredients'],
  avoid: [
    'Cold/blue corporate stock lighting.',
    'Over-saturated, HDR or plastic-looking food.',
    'Cluttered backgrounds; busy patterns.',
    'Visible logos of other brands; obvious stock watermarks energy.',
  ],
  treatment: {
    radius: radii.media,
    overlay: colors.gradients.heroScrim,
    hoverZoom: 'scale-1.06 over 700ms (signature ease)',
    ratios: spacingSystem.aspect,
  },
} as const;

/* ═══════════════════════════════════════════════════════════════════════
   ILLUSTRATION STYLE GUIDE
   Minimal, organic line + soft-fill motifs. Decorative, never loud.
   ═══════════════════════════════════════════════════════════════════════ */
export const illustrationStyle = {
  language: 'Minimal organic line art with optional single-tone soft fills.',
  stroke: '1.5px, rounded caps — matches the icon system.',
  palette: ['Gold (#C8A063) line on cream', 'Espresso line on beige', 'Tone-on-tone for watermarks'],
  motifs: [
    'Coffee beans (single & scattered)',
    'Rising steam curls',
    'Coffee leaves & branches',
    'Caramel / chocolate drizzle ribbons',
    'Wood grain & ceramic forms',
    'Latte-art rosetta',
  ],
  usage: [
    'Section dividers & corner flourishes.',
    'Large faint background watermarks (4–8% opacity).',
    'Empty-state and loading illustrations.',
    'Menu category markers.',
  ],
  avoid: ['Flat cartoon mascots', 'Hard geometric/tech motifs', 'Gradients with cold hues', 'Heavy drop shadows'],
} as const;

/* ═══════════════════════════════════════════════════════════════════════
   ACCESSIBILITY CONTRACT — WCAG 2.1 AA, non-negotiable
   ═══════════════════════════════════════════════════════════════════════ */
export const accessibility = {
  standard: 'WCAG 2.1 AA',
  contrast: {
    bodyText: '≥ 4.5:1 (espresso-950 on cream-100 ≈ 13:1 ✓)',
    largeText: '≥ 3:1',
    uiAndGraphics: '≥ 3:1 for borders, icons, focus rings',
    note: 'Gold (#C8A063) on cream FAILS for body text — use only for ≥24px/bold display or as a decorative accent, never small running text.',
  },
  focus: {
    rule: 'Every interactive element shows a visible focus ring (focusRing.default / .inverse).',
    neverRemove: 'Do not set outline:none without a replacement ring.',
  },
  motion: {
    rule: 'All non-essential motion is gated behind prefers-reduced-motion; degrade to opacity-only or none.',
  },
  targets: { minimum: '44×44px touch target for all controls (iconButton md = 44px).' },
  semantics: [
    'Use real landmarks (header/nav/main/footer) & heading order (one h1/page).',
    'Icon-only buttons require aria-label.',
    'Decorative images: alt=""; meaningful images: descriptive alt.',
    'Form fields: associated <label>, aria-invalid + aria-describedby on error.',
    'Respect language direction — menu carries Arabic; support dir="rtl" blocks.',
  ],
  keyboard: 'Full operability without a pointer; logical tab order; ESC closes overlays; focus trap in modals/drawers.',
} as const;

/* ═══════════════════════════════════════════════════════════════════════
   THEMES
   ═══════════════════════════════════════════════════════════════════════ */
export const theme = {
  meta: brandMeta,
  light: {
    name: 'Daylight Cafe',
    scheme: 'light' as const,
    roles: lightRoles,
  },
  dark: {
    name: 'After Hours',
    scheme: 'dark' as const,
    roles: darkRoles,
  },
} as const;

/* ═══════════════════════════════════════════════════════════════════════
   CSS VARIABLE EMITTER
   Returns the flat custom-property map for a theme's semantic roles, so a
   ThemeProvider can write them to :root or .dark at runtime.
   ═══════════════════════════════════════════════════════════════════════ */
export const cssVariables = (
  roles: typeof lightRoles | typeof darkRoles
): Record<string, string> => {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(roles)) {
    // camelCase → kebab-case  →  --lv-<role>
    const kebab = key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
    out[`--lv-${kebab}`] = String(value);
  }
  return out;
};

/* ═══════════════════════════════════════════════════════════════════════
   FULL DESIGN SYSTEM AGGREGATE
   ═══════════════════════════════════════════════════════════════════════ */
export const designSystem = {
  meta: brandMeta,
  colors,
  typography: typeSystem,
  spacing: spacingSystem,
  radius: { scale: radius, semantic: radii },
  shadow: shadowSystem,
  animation: animationSystem,
  components: componentLibrary,
  icons: iconSystem,
  imageStyle,
  illustrationStyle,
  accessibility,
  theme,
} as const;

export type DesignSystem = typeof designSystem;
export default designSystem;
