/**
 * LA VIGOR — Design Tokens (Master Barrel)
 * ─────────────────────────────────────────────────────────────────────────
 * The single import surface for the entire design language. Everything an app,
 * a Figma sync, or a Style Dictionary export needs flows through here.
 *
 *   import tokens from '@/design-system/design-tokens'
 *   import { colors, typography, spacing } from '@/design-system/design-tokens'
 *
 * Layers:
 *   1. Re-exports of every primitive module (tree-shakable).
 *   2. `tokens` — the flat, serializable token object (W3C-ish shape) suitable
 *      for tooling / cross-platform export.
 */

export * from './colors';
export * from './typography';
export * from './spacing';
export * from './shadow';
export * from './animation';
export * from './components';
export * from './icons';
export * from './theme';

export { default as radius, radii } from './radius';

import { colors } from './colors';
import { typeSystem } from './typography';
import { spacingSystem } from './spacing';
import radius, { radii } from './radius';
import { shadowSystem } from './shadow';
import { animationSystem } from './animation';
import { brandMeta } from './theme';

/* ═══════════════════════════════════════════════════════════════════════
   FLAT, SERIALIZABLE TOKEN OBJECT
   Stable, JSON-friendly shape — feed this to Style Dictionary, a Figma
   Tokens plugin, or a native platform exporter.
   ═══════════════════════════════════════════════════════════════════════ */
export const tokens = {
  $meta: {
    name: brandMeta.name,
    version: '1.0.0',
    description: 'La Vigor luxury coffee design system',
  },
  color: {
    espresso: Object.fromEntries(
      Object.entries(colors.espresso).map(([k, v]) => [k, v.hex])
    ),
    cream: Object.fromEntries(
      Object.entries(colors.cream).map(([k, v]) => [k, v.hex])
    ),
    gold: Object.fromEntries(
      Object.entries(colors.gold).map(([k, v]) => [k, v.hex])
    ),
    brand: Object.fromEntries(
      Object.entries(colors.brand).map(([k, v]) => [k, v.hex])
    ),
    state: Object.fromEntries(
      Object.entries(colors.state).map(([k, v]) => [k, v.hex])
    ),
  },
  font: {
    family: typeSystem.fontFamily,
    weight: typeSystem.fontWeight,
    lineHeight: typeSystem.lineHeight,
    letterSpacing: typeSystem.letterSpacing,
  },
  space: spacingSystem.spacing,
  container: spacingSystem.container,
  breakpoint: spacingSystem.breakpoints,
  zIndex: spacingSystem.zIndex,
  radius,
  radiusSemantic: radii,
  shadow: shadowSystem.shadow,
  blur: shadowSystem.blur,
  duration: animationSystem.duration,
  easing: animationSystem.easingCss,
} as const;

import designSystem from './theme';
export { designSystem };
export default tokens;
