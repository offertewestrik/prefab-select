/**
 * LA VIGOR — Border Radius System
 * ─────────────────────────────────────────────────────────────────────────
 * Soft, organic corners — the curve of a cup, a roasted bean, a smooth stone.
 * Nothing sharp. Generous radii on cards give the "premium pebble" feel of
 * Aesop and Apple hardware, while pills carry CTAs and chips.
 */

export const radius = {
  none: '0px',
  xs: '0.25rem', // 4   — tags, tight inputs
  sm: '0.5rem', // 8   — small buttons, badges
  md: '0.875rem', // 14  — inputs, small cards
  lg: '1.25rem', // 20  — buttons, menu rows
  xl: '1.75rem', // 28  — cards
  '2xl': '2.25rem', // 36  — feature / product cards
  '3xl': '3rem', // 48  — hero panels, large media
  '4xl': '4rem', // 64  — oversized editorial blocks
  pill: '9999px', // chips, CTAs, avatars-as-pills
  full: '9999px', // circular (icon buttons, FAB)
} as const;

/* Semantic mapping — reach for these in components so the visual language
   stays coherent even if the raw scale is re-tuned later. */
export const radii = {
  badge: radius.sm,
  chip: radius.pill,
  tag: radius.xs,
  input: radius.md,
  buttonSm: radius.md,
  button: radius.lg,
  buttonPill: radius.pill,
  iconButton: radius.full,
  fab: radius.full,
  card: radius.xl,
  cardFeature: radius['2xl'],
  cardProduct: radius['2xl'],
  glassCard: radius['2xl'],
  modal: radius['3xl'],
  sheet: radius['3xl'],
  media: radius['2xl'],
  mediaHero: radius['3xl'],
  navbar: radius.pill, // floating glass pill nav
  tooltip: radius.sm,
} as const;

export type RadiusToken = keyof typeof radius;

export default radius;
