# La Vigor — Design System

> **Where Coffee Meets Happiness.**
> The complete design language for a luxury coffee house — warm, elegant,
> minimal, organic, timeless. Built to feel handcrafted and to scale across
> many locations and franchising.

This package is a **design foundation only**. No pages, no sections, no hero —
just the tokens, themes, and component recipes the website will be built from.

Quality bar: _Apple · Starbucks Reserve · Blue Bottle · Aesop · Blank Street._

---

## What's inside

```
la-vigor/
├─ design-system/
│  ├─ design-tokens.ts   ← master barrel + flat serializable token object
│  ├─ colors.ts          ← full palette: HEX · RGB · HSL · CSS var · Tailwind · opacity · dark
│  ├─ typography.ts       ← Fraunces + Manrope scale (display → caption), fluid clamps
│  ├─ spacing.ts          ← 8pt system, 12-col grid, containers, breakpoints, z-index, aspect
│  ├─ radius.ts           ← organic corner scale + semantic map
│  ├─ shadow.ts           ← warm elevation ladder, focus rings, blur levels
│  ├─ animation.ts        ← durations, easings, springs, Framer/GSAP/Lenis presets
│  ├─ components.ts       ← buttons · cards · inputs · badges · chips · nav · glass …
│  ├─ icons.ts            ← Lucide mapping + icon rules
│  └─ theme.ts            ← light/dark themes, image & illustration guides, a11y contract
├─ app/
│  └─ globals.css         ← runtime layer: @theme tokens, role vars, utilities, keyframes
├─ tailwind.config.ts     ← Tailwind theme generated from the same tokens
├─ package.json
└─ tsconfig.json
```

> **Standalone.** This folder is fully self-contained and independent of the
> rest of the repository — its own `package.json`, `tsconfig`, and config.

---

## The language

### Color
A single warm-brown **espresso** spine (50→950) anchors the system, paired with
a **cream** neutral ramp and a signature **gold** accent (used sparingly — gold
is a whisper). Every token ships HEX, RGB, HSL, a CSS variable, a Tailwind
token, opacity helpers, and a re-roasted **dark theme** ("After Hours").

| Role | Light | Token |
|------|-------|-------|
| Coffee Black | `#171411` | `coffee-black` / `espresso-950` |
| Espresso | `#2E1B11` | `espresso-900` |
| Caramel | `#A8743E` | `caramel` |
| Golden Sand | `#C8A063` | `gold-300` |
| Latte | `#D9C5A6` | `latte` |
| Cream White | `#F8F2E8` | `cream-100` |
| Warm Beige | `#E7DAC4` | `cream-200` / `warm-beige` |

Supporting naturals: **Olive** `#6A6A47`, **Warm Wood** `#8A5E3B`.
State: Sage **success**, Terracotta **error**, Amber **warning**, Slate **info** — each with a soft tint.

### Typography
- **Fraunces** (variable serif) — Display, Hero, H1–H2, and the italic
  _script accent_ ("Where", "Our Story").
- **Manrope** (variable sans) — H3–H4, body, UI, navigation, captions.
- **IBM Plex Mono** — tabular prices & numerals.

A 1.250 modular scale, hand-corrected at the display end, delivered as fluid
`clamp()` sizes that breathe from mobile (390) to desktop (1440+).

### Space & grid
4px base, 8pt rhythm. 12-column grid, fluid gutters (`clamp(1.25rem, 5vw, 5rem)`),
1200px default container, generous section spacing (luxury = air).

### Motion
Slow, soft, confident — steam rising, cream settling. House easing
`cubic-bezier(0.22, 1, 0.36, 1)`. Ready-made presets for **Framer Motion /
`motion`**, **GSAP / ScrollTrigger**, and **Lenis** smooth scroll. All motion
degrades under `prefers-reduced-motion`.

### Components
Recipe-driven: each component pairs a Tailwind `className` with the raw tokens
it's built from — buttons (primary/gold/secondary/ghost/outline/dark/light/pill
+ icon + FAB, XS→XL), cards (product/review/gallery/menu/feature/glass/contact/
image), inputs (+ checkbox/radio/switch/file/quantity), badges, tags, chips,
navigation (floating glass), accordion, tabs, carousel, timeline, QR, map,
opening-hours, social, skeleton.

---

## Usage

### 1 · Tokens in TypeScript
```ts
import tokens, { colors, typography, motionPresets } from './design-system/design-tokens';

colors.espresso[900].hex;        // "#2E1B11"
colors.gold[300].hsl;            // "36, 48%, 59%"
typography.typography.hero.fluid; // "clamp(2.75rem, 1.4rem + 5.8vw, 5.5rem)"
```

### 2 · Themes
```ts
import { theme, cssVariables } from './design-system/theme';

const vars = cssVariables(theme.dark.roles); // → { '--lv-bg': '#120d09', … }
```

### 3 · Tailwind / CSS
```html
<button class="h-12 px-6 rounded-lg bg-espresso-900 text-cream-50 shadow-medium
               hover:-translate-y-0.5 transition-all duration-base ease-signature">
  View Menu
</button>

<h1 class="font-display text-hero text-espresso-950">
  <span class="script-accent">Where</span> Coffee Meets Happiness
</h1>
```

`globals.css` is authoritative at runtime (Tailwind v4 `@theme` + role variables
`--lv-*`). `tailwind.config.ts` powers IntelliSense and v3 builds from the same
source values. Toggle dark mode with a `.dark` class on `<html>`.

---

## Accessibility

Targets **WCAG 2.1 AA**. Body text ≥ 4.5:1 (espresso-950 on cream ≈ 13:1).
Gold is decorative/large-display only — never small body text. Every
interactive element shows a visible focus ring; all controls ≥ 44×44px; full
keyboard operability; reduced-motion honoured globally.

---

## Fonts

Google Fonts (variable). Load via the `@import` already in `globals.css`, a
`<link>` (`typeSystem.googleFonts.combined`), or self-host with `next/font` in
production for best performance.

---

_Designed to be re-themed per venue via `cssVariables()` only — component
recipes never change. One language, many cafes._
