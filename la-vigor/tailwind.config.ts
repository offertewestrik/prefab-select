/**
 * LA VIGOR — Tailwind Configuration
 * ─────────────────────────────────────────────────────────────────────────
 * Maps the design-system token modules onto Tailwind's theme so every utility
 * (bg-espresso-900, text-gold-300, rounded-2xl, shadow-premium, ease-signature…)
 * is generated from the SAME source of truth as the TypeScript tokens.
 *
 * Works with Tailwind v3 (this config) and complements the v4 `@theme` block in
 * globals.css — keep both in sync; the CSS file is authoritative at runtime,
 * this config powers IntelliSense + arbitrary-value-free authoring.
 */

import type { Config } from 'tailwindcss';
import { colors as C } from './design-system/colors';
import { typeSystem } from './design-system/typography';
import { spacingSystem } from './design-system/spacing';
import radius from './design-system/radius';
import { shadowSystem } from './design-system/shadow';
import { animationSystem } from './design-system/animation';

// Flatten a ColorToken scale → { 50:'#..', 100:'#..' }
const scale = (s: Record<string | number, { hex: string }>) =>
  Object.fromEntries(Object.entries(s).map(([k, v]) => [k, v.hex]));

const fontSizeFromTypography = Object.fromEntries(
  Object.entries(typeSystem.typography).map(([name, s]) => [
    name,
    [
      s.fluid,
      {
        lineHeight: String(s.lineHeight),
        letterSpacing: s.letterSpacing,
        fontWeight: String(s.weight),
      },
    ],
  ])
);

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './design-system/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    // Container helper aligned to our grid system.
    container: {
      center: true,
      padding: {
        DEFAULT: spacingSystem.container.gutterMobile,
        lg: spacingSystem.container.gutterDesktop,
      },
      screens: { '2xl': spacingSystem.container.default },
    },
    screens: spacingSystem.breakpoints,
    extend: {
      colors: {
        espresso: scale(C.espresso),
        cream: scale(C.cream),
        gold: scale(C.gold),
        // semantic brand aliases
        'coffee-black': C.brand.coffeeBlack.hex,
        'espresso-brown': C.brand.espressoBrown.hex,
        chocolate: C.brand.chocolate.hex,
        caramel: C.brand.caramel.hex,
        latte: C.brand.latte.hex,
        'golden-sand': C.brand.goldenSand.hex,
        'warm-beige': C.brand.warmBeige.hex,
        olive: C.brand.oliveGreen.hex,
        wood: C.brand.warmWood.hex,
        // state
        success: C.state.success.hex,
        'success-soft': C.state.successSoft.hex,
        error: C.state.error.hex,
        'error-soft': C.state.errorSoft.hex,
        warning: C.state.warning.hex,
        'warning-soft': C.state.warningSoft.hex,
        info: C.state.info.hex,
        'info-soft': C.state.infoSoft.hex,
      },
      fontFamily: {
        display: ['Fraunces', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: fontSizeFromTypography as Config['theme'] & object,
      fontWeight: Object.fromEntries(
        Object.entries(typeSystem.fontWeight).map(([k, v]) => [k, String(v)])
      ),
      lineHeight: Object.fromEntries(
        Object.entries(typeSystem.lineHeight).map(([k, v]) => [k, String(v)])
      ),
      letterSpacing: typeSystem.letterSpacing,
      spacing: spacingSystem.spacing as unknown as Record<string, string>,
      maxWidth: {
        container: spacingSystem.container.default,
        wide: spacingSystem.container.wide,
        prose: spacingSystem.container.prose,
        max: spacingSystem.container.max,
      },
      borderRadius: radius,
      boxShadow: {
        soft: shadowSystem.shadow.soft,
        medium: shadowSystem.shadow.medium,
        large: shadowSystem.shadow.large,
        floating: shadowSystem.shadow.floating,
        premium: shadowSystem.shadow.premium,
        modal: shadowSystem.shadow.modal,
        glass: shadowSystem.shadow.glass,
        glow: shadowSystem.shadow.glow,
        inner: shadowSystem.shadow.inner,
      },
      blur: shadowSystem.blur,
      zIndex: Object.fromEntries(
        Object.entries(spacingSystem.zIndex).map(([k, v]) => [k, String(v)])
      ),
      aspectRatio: {
        portrait: '4 / 5',
        photo: '3 / 2',
        story: '9 / 16',
      },
      transitionTimingFunction: {
        signature: animationSystem.easingCss.signature,
        smooth: animationSystem.easingCss.smooth,
        out: animationSystem.easingCss.out,
        in: animationSystem.easingCss.in,
        'gentle-back': animationSystem.easingCss.gentleBack,
      },
      transitionDuration: Object.fromEntries(
        Object.entries(animationSystem.duration).map(([k, v]) => [k, `${v}ms`])
      ),
      keyframes: {
        'steam-rise': {
          '0%': { opacity: '0', transform: 'translateY(0) scaleX(1)' },
          '40%': { opacity: '0.5' },
          '100%': { opacity: '0', transform: 'translateY(-26px) scaleX(1.6)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: { '100%': { transform: 'translateX(100%)' } },
        'pulse-glow': {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(200,160,99,0.0)' },
          '50%': { boxShadow: '0 0 36px 4px rgba(200,160,99,0.35)' },
        },
        marquee: { '100%': { transform: 'translateX(-50%)' } },
        'spin-slow': { '100%': { transform: 'rotate(360deg)' } },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'steam-rise': 'steam-rise 4s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2.4s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
        'spin-slow': 'spin-slow 18s linear infinite',
        'fade-up': 'fade-up 0.5s cubic-bezier(0.22,1,0.36,1) both',
      },
      backgroundImage: {
        'gradient-espresso': C.gradients.espresso,
        'gradient-caramel': C.gradients.caramelGlow,
        'gradient-cream': C.gradients.creamFade,
        'gradient-gold-text': C.gradients.goldText,
        'hero-scrim': C.gradients.heroScrim,
        'aura-warm': C.gradients.auraWarm,
        'aura-dark': C.gradients.auraDark,
      },
    },
  },
  plugins: [],
};

export default config;
