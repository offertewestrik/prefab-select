/**
 * LA VIGOR — Typography System
 * ─────────────────────────────────────────────────────────────────────────
 * Two voices, perfectly cast:
 *
 *   • FRAUNCES  — the serif. Optical, characterful, a little old-world.
 *                 Carries Display / Hero / H1–H2 and the script-style accent
 *                 (Fraunces italic, "soft" optical axis). This is the soul.
 *
 *   • MANROPE   — the sans. Quiet, geometric, modern, supremely legible.
 *                 Carries H3–H4, body, UI, nav, captions. This is the calm.
 *
 * Both are free Google Fonts, variable, with excellent international coverage.
 * The pairing reads like Apple's clarity wearing Starbucks Reserve's warmth.
 *
 * Scale: a 1.250 (major third) modular scale, hand-corrected at the display
 * end so headlines feel composed, not computed. Sizes are in rem; line-height
 * is unitless; tracking is in em so it scales with size.
 */

/* ═══════════════════════════════════════════════════════════════════════
   FONT FAMILIES
   ═══════════════════════════════════════════════════════════════════════ */
export const fontFamily = {
  /** Serif display — headlines, brand moments. */
  display: "'Fraunces', 'Cormorant Garamond', Georgia, 'Times New Roman', serif",
  /** Sans — body, UI, navigation. */
  sans: "'Manrope', 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",
  /** Monospace — prices, codes, fine numerals (tabular). */
  mono: "'IBM Plex Mono', 'SF Mono', ui-monospace, 'Menlo', monospace",
} as const;

/** Google Fonts <link> hrefs (variable axes pre-selected). */
export const googleFonts = {
  fraunces:
    'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&display=swap',
  manrope:
    'https://fonts.googleapis.com/css2?family=Manrope:wght@300..800&display=swap',
  mono: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap',
  /** Single combined href for convenience. */
  combined:
    'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Manrope:wght@300..800&family=IBM+Plex+Mono:wght@400;500&display=swap',
} as const;

/* ═══════════════════════════════════════════════════════════════════════
   PRIMITIVES
   ═══════════════════════════════════════════════════════════════════════ */
export const fontWeight = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  black: 900,
} as const;

export const lineHeight = {
  none: 1, // display caps
  tight: 1.1, // hero headlines
  snug: 1.22, // H1–H2
  normal: 1.5, // UI / short body
  relaxed: 1.65, // long-form body
  loose: 1.85, // airy captions
} as const;

export const letterSpacing = {
  tighter: '-0.04em', // big display serif
  tight: '-0.02em', // headings
  snug: '-0.01em',
  normal: '0em',
  wide: '0.02em',
  wider: '0.08em', // small-caps labels
  widest: '0.2em', // eyebrows / overlines (uppercase)
} as const;

/* ═══════════════════════════════════════════════════════════════════════
   TYPE STYLES
   Each role bundles everything a component needs. `fluid` gives a CSS clamp()
   that interpolates from mobile → desktop so type breathes across viewports.
   The discrete sizes (mobile/tablet/desktop) are there for design tooling.
   ═══════════════════════════════════════════════════════════════════════ */
export interface TypeStyle {
  family: string;
  weight: number;
  /** clamp(min, preferred, max) in rem. */
  fluid: string;
  size: { mobile: string; tablet: string; desktop: string };
  lineHeight: number;
  letterSpacing: string;
  /** Optional case transform. */
  transform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
  /** Optional Fraunces italic "soft" accent (for script-like words). */
  italic?: boolean;
  note?: string;
}

const serif = fontFamily.display;
const sans = fontFamily.sans;

export const typography = {
  /* ── Display & Hero — the serif theatre ───────────────────────────── */
  display: {
    family: serif,
    weight: fontWeight.semibold,
    fluid: 'clamp(3.5rem, 1.5rem + 8.5vw, 8rem)', // 56 → 128px
    size: { mobile: '3.5rem', tablet: '5.5rem', desktop: '8rem' },
    lineHeight: lineHeight.none,
    letterSpacing: letterSpacing.tighter,
    transform: 'none',
    note: 'Brand statements only. One per page.',
  },
  hero: {
    family: serif,
    weight: fontWeight.semibold,
    fluid: 'clamp(2.75rem, 1.4rem + 5.8vw, 5.5rem)', // 44 → 88px
    size: { mobile: '2.75rem', tablet: '4rem', desktop: '5.5rem' },
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
    note: 'Hero headline. Pair with a Fraunces-italic accent word.',
  },
  /** The script-style accent ("Where", "Our Story"). Fraunces italic, soft. */
  scriptAccent: {
    family: serif,
    weight: fontWeight.light,
    fluid: 'clamp(2rem, 1rem + 4.4vw, 4.25rem)',
    size: { mobile: '2rem', tablet: '3rem', desktop: '4.25rem' },
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.normal,
    italic: true,
    note: 'Use sparingly as a handwritten-feeling flourish above headlines.',
  },

  /* ── Headings ─────────────────────────────────────────────────────── */
  h1: {
    family: serif,
    weight: fontWeight.semibold,
    fluid: 'clamp(2.25rem, 1.4rem + 3.6vw, 3.75rem)', // 36 → 60px
    size: { mobile: '2.25rem', tablet: '3rem', desktop: '3.75rem' },
    lineHeight: lineHeight.snug,
    letterSpacing: letterSpacing.tight,
  },
  h2: {
    family: serif,
    weight: fontWeight.medium,
    fluid: 'clamp(1.75rem, 1.2rem + 2.4vw, 2.75rem)', // 28 → 44px
    size: { mobile: '1.75rem', tablet: '2.25rem', desktop: '2.75rem' },
    lineHeight: lineHeight.snug,
    letterSpacing: letterSpacing.tight,
  },
  h3: {
    family: sans,
    weight: fontWeight.semibold,
    fluid: 'clamp(1.375rem, 1.05rem + 1.4vw, 1.875rem)', // 22 → 30px
    size: { mobile: '1.375rem', tablet: '1.625rem', desktop: '1.875rem' },
    lineHeight: lineHeight.snug,
    letterSpacing: letterSpacing.snug,
  },
  h4: {
    family: sans,
    weight: fontWeight.semibold,
    fluid: 'clamp(1.125rem, 0.95rem + 0.8vw, 1.375rem)', // 18 → 22px
    size: { mobile: '1.125rem', tablet: '1.25rem', desktop: '1.375rem' },
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.snug,
  },

  /* ── Body ─────────────────────────────────────────────────────────── */
  bodyLg: {
    family: sans,
    weight: fontWeight.regular,
    fluid: 'clamp(1.125rem, 1rem + 0.4vw, 1.25rem)', // 18 → 20px
    size: { mobile: '1.125rem', tablet: '1.1875rem', desktop: '1.25rem' },
    lineHeight: lineHeight.relaxed,
    letterSpacing: letterSpacing.normal,
    note: 'Lead paragraphs, intros.',
  },
  body: {
    family: sans,
    weight: fontWeight.regular,
    fluid: 'clamp(1rem, 0.95rem + 0.2vw, 1.0625rem)', // 16 → 17px
    size: { mobile: '1rem', tablet: '1rem', desktop: '1.0625rem' },
    lineHeight: lineHeight.relaxed,
    letterSpacing: letterSpacing.normal,
    note: 'Default running text.',
  },
  bodySm: {
    family: sans,
    weight: fontWeight.regular,
    fluid: 'clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem)', // 14 → 15px
    size: { mobile: '0.875rem', tablet: '0.875rem', desktop: '0.9375rem' },
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },

  /* ── UI roles ─────────────────────────────────────────────────────── */
  /** Eyebrow / overline above headings — small caps, gold. */
  eyebrow: {
    family: sans,
    weight: fontWeight.semibold,
    fluid: '0.75rem', // 12px
    size: { mobile: '0.75rem', tablet: '0.75rem', desktop: '0.8125rem' },
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.widest,
    transform: 'uppercase',
  },
  button: {
    family: sans,
    weight: fontWeight.semibold,
    fluid: '0.9375rem', // 15px
    size: { mobile: '0.9375rem', tablet: '0.9375rem', desktop: '0.9375rem' },
    lineHeight: lineHeight.none,
    letterSpacing: letterSpacing.wide,
    transform: 'none',
  },
  buttonSm: {
    family: sans,
    weight: fontWeight.semibold,
    fluid: '0.8125rem',
    size: { mobile: '0.8125rem', tablet: '0.8125rem', desktop: '0.8125rem' },
    lineHeight: lineHeight.none,
    letterSpacing: letterSpacing.wider,
    transform: 'uppercase',
  },
  nav: {
    family: sans,
    weight: fontWeight.medium,
    fluid: '0.9375rem',
    size: { mobile: '0.9375rem', tablet: '0.9375rem', desktop: '0.9375rem' },
    lineHeight: lineHeight.none,
    letterSpacing: letterSpacing.wide,
  },
  caption: {
    family: sans,
    weight: fontWeight.medium,
    fluid: '0.8125rem', // 13px
    size: { mobile: '0.8125rem', tablet: '0.8125rem', desktop: '0.8125rem' },
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.wide,
    note: 'Image credits, helper text, metadata.',
  },
  overline: {
    family: sans,
    weight: fontWeight.bold,
    fluid: '0.6875rem', // 11px
    size: { mobile: '0.6875rem', tablet: '0.6875rem', desktop: '0.6875rem' },
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.widest,
    transform: 'uppercase',
  },
  footer: {
    family: sans,
    weight: fontWeight.regular,
    fluid: '0.875rem',
    size: { mobile: '0.875rem', tablet: '0.875rem', desktop: '0.875rem' },
    lineHeight: lineHeight.relaxed,
    letterSpacing: letterSpacing.normal,
  },
  /** Prices & numerals — tabular mono for clean column alignment. */
  price: {
    family: fontFamily.mono,
    weight: fontWeight.medium,
    fluid: '1rem',
    size: { mobile: '1rem', tablet: '1rem', desktop: '1.0625rem' },
    lineHeight: lineHeight.none,
    letterSpacing: letterSpacing.normal,
    note: 'Use font-variant-numeric: tabular-nums.',
  },
} as const satisfies Record<string, TypeStyle>;

export type TypographyRole = keyof typeof typography;

/** Convenience: build a CSS declaration block from a TypeStyle. */
export const toCss = (s: TypeStyle): Record<string, string> => ({
  fontFamily: s.family,
  fontWeight: String(s.weight),
  fontSize: s.fluid,
  lineHeight: String(s.lineHeight),
  letterSpacing: s.letterSpacing,
  ...(s.transform ? { textTransform: s.transform } : {}),
  ...(s.italic ? { fontStyle: 'italic' } : {}),
});

export const typeSystem = {
  fontFamily,
  googleFonts,
  fontWeight,
  lineHeight,
  letterSpacing,
  typography,
} as const;

export default typeSystem;
