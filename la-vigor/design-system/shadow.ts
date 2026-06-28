/**
 * LA VIGOR — Shadow & Elevation System
 * ─────────────────────────────────────────────────────────────────────────
 * Shadows here are WARM, never grey. Every umbra is tinted with espresso
 * (rgba of #2E1B11) so cards feel lit by cand- and lamplight rather than a
 * cold studio. Soft, diffuse, layered — the quiet depth of a premium space.
 *
 * Elevation ladder:  soft → medium → large → floating → premium
 * Plus: glass (for glassmorphism), glow (gold halo), inner, focus ring.
 */

// Warm shadow ink — espresso-900 in rgba form.
const ink = (a: number) => `rgba(46, 27, 17, ${a})`;
const gold = (a: number) => `rgba(200, 160, 99, ${a})`;

export const shadow = {
  none: 'none',

  /** Hairline lift — chips, inputs at rest. */
  soft: `0 1px 2px ${ink(0.04)}, 0 2px 8px ${ink(0.05)}`,

  /** Resting card. */
  medium: `0 2px 4px ${ink(0.04)}, 0 8px 20px ${ink(0.07)}`,

  /** Raised card / hover state. */
  large: `0 8px 16px ${ink(0.06)}, 0 24px 48px ${ink(0.1)}`,

  /** Floating elements — dropdowns, popovers, sticky CTAs. */
  floating: `0 12px 24px ${ink(0.08)}, 0 32px 64px ${ink(0.14)}`,

  /** Premium hero / featured product — deep, cinematic, still soft. */
  premium: `0 16px 32px ${ink(0.1)}, 0 48px 96px ${ink(0.18)}`,

  /** Modal / dialog — anchors above an overlay. */
  modal: `0 24px 48px ${ink(0.16)}, 0 64px 128px ${ink(0.28)}`,

  /** Glassmorphism companion shadow (pairs with backdrop-blur). */
  glass: `0 8px 32px ${ink(0.12)}, inset 0 1px 0 rgba(255,255,255,0.25)`,
  glassDark: `0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(217,197,166,0.10)`,

  /** Gold glow — focus halo on accent CTAs, hovered featured cards. */
  glow: `0 0 0 1px ${gold(0.35)}, 0 8px 40px ${gold(0.28)}`,
  glowSoft: `0 6px 36px ${gold(0.2)}`,

  /** Inset — sunken wells, pressed states, input focus depth. */
  inner: `inset 0 2px 6px ${ink(0.08)}`,
  innerSoft: `inset 0 1px 3px ${ink(0.05)}`,
} as const;

/* ═══════════════════════════════════════════════════════════════════════
   FOCUS RINGS — accessibility-first, on-brand
   Always a visible, high-contrast ring. Gold on light, cream on dark.
   ═══════════════════════════════════════════════════════════════════════ */
export const focusRing = {
  /** Default keyboard focus (light surfaces). */
  default: `0 0 0 3px rgba(200, 160, 99, 0.55)`,
  /** On dark surfaces. */
  inverse: `0 0 0 3px rgba(248, 242, 232, 0.7)`,
  /** Error state focus. */
  error: `0 0 0 3px rgba(178, 74, 64, 0.5)`,
  /** Tight inset variant for inputs (ring + subtle inner). */
  input: `0 0 0 3px rgba(200, 160, 99, 0.35), inset 0 1px 2px rgba(46,27,17,0.06)`,
} as const;

/* ═══════════════════════════════════════════════════════════════════════
   BACKDROP BLUR LEVELS — glassmorphism blur scale
   ═══════════════════════════════════════════════════════════════════════ */
export const blur = {
  none: '0px',
  xs: '4px', // subtle frosting
  sm: '8px',
  md: '14px', // cards
  lg: '20px', // navigation
  xl: '28px', // modals / heavy frost
  '2xl': '40px',
} as const;

/* Semantic elevation map — name the intent, not the depth. */
export const elevation = {
  flat: shadow.none,
  rest: shadow.soft,
  card: shadow.medium,
  cardHover: shadow.large,
  raised: shadow.floating,
  feature: shadow.premium,
  overlay: shadow.modal,
} as const;

export type ShadowToken = keyof typeof shadow;

export const shadowSystem = { shadow, focusRing, blur, elevation } as const;

export default shadowSystem;
