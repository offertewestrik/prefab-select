/**
 * LA VIGOR — Component Recipe Library
 * ─────────────────────────────────────────────────────────────────────────
 * Declarative recipes for every primitive in the system: buttons, cards,
 * inputs, badges, chips, navigation, glass surfaces, and more. These are the
 * single source of truth that a future React/Tailwind build will consume —
 * each recipe pairs a Tailwind `className` (for fast implementation) with the
 * raw token values it is built from (for design tooling & docs).
 *
 * Recipes describe APPEARANCE ONLY. No layout, no page structure — true to
 * the brief: a design foundation, not sections.
 *
 * Conventions:
 *   • `base`      → always-applied classes
 *   • `variants`  → mutually-exclusive style families
 *   • `sizes`     → XS · S · M · L · XL
 *   • `states`    → hover / active / focus / disabled / loading
 */

import { radii } from './radius';
import { shadow, focusRing, blur } from './shadow';

/* ═══════════════════════════════════════════════════════════════════════
   BUTTONS
   Primary · Secondary · Ghost · Outline · Dark · Light · Icon · FAB
   ═══════════════════════════════════════════════════════════════════════ */
export const button = {
  base: [
    'inline-flex items-center justify-center gap-2.5 select-none',
    'font-sans font-semibold tracking-wide whitespace-nowrap',
    'transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-100',
    'active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none',
  ].join(' '),

  variants: {
    /** Filled espresso — the principal CTA. */
    primary:
      'rounded-lg bg-espresso-900 text-cream-50 shadow-[0_8px_20px_rgba(46,27,17,0.18)] hover:bg-espresso-800 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(46,27,17,0.26)]',
    /** Gold — the premium / featured CTA ("Order Now"). */
    gold:
      'rounded-lg bg-gradient-to-br from-gold-300 to-gold-500 text-espresso-950 shadow-[0_8px_30px_rgba(200,160,99,0.35)] hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(200,160,99,0.45)]',
    /** Beige fill on dark / glass over imagery. */
    secondary:
      'rounded-lg bg-cream-100 text-espresso-900 border border-espresso-900/10 hover:bg-cream-200 hover:-translate-y-0.5',
    /** Transparent until hovered. */
    ghost:
      'rounded-lg bg-transparent text-espresso-800 hover:bg-espresso-900/5',
    /** Hairline outline — quiet secondary action. */
    outline:
      'rounded-lg bg-transparent text-espresso-900 border border-espresso-900/25 hover:border-espresso-900/60 hover:bg-espresso-900/[0.04]',
    /** For light text on dark sections. */
    dark:
      'rounded-lg bg-espresso-950 text-cream-100 border border-cream-100/10 hover:bg-espresso-900',
    /** For dark text on light glass — used over photography. */
    light:
      'rounded-lg bg-cream-50/90 text-espresso-950 backdrop-blur-md border border-white/60 hover:bg-cream-50',
    /** Pill CTA — rounded full, gold ring on hover. */
    pill:
      'rounded-full bg-espresso-900 text-cream-50 hover:bg-espresso-800 hover:shadow-[0_0_0_1px_rgba(200,160,99,0.35),0_8px_40px_rgba(200,160,99,0.28)]',
  },

  /** [px-y, text, height, icon-size] per size. */
  sizes: {
    xs: 'h-8 px-3 text-[0.75rem] rounded-md gap-1.5 [&_svg]:size-3.5',
    sm: 'h-10 px-4 text-[0.8125rem] rounded-md gap-2 [&_svg]:size-4',
    md: 'h-12 px-6 text-[0.9375rem] [&_svg]:size-[1.125rem]',
    lg: 'h-14 px-8 text-[1rem] [&_svg]:size-5',
    xl: 'h-16 px-10 text-[1.0625rem] rounded-xl [&_svg]:size-[1.375rem]',
  },

  /** Icon-only square button. */
  icon: {
    base: 'inline-flex items-center justify-center rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300/60 active:scale-95',
    sizes: {
      sm: 'size-9 [&_svg]:size-4',
      md: 'size-11 [&_svg]:size-5',
      lg: 'size-12 [&_svg]:size-[1.375rem]',
    },
    variants: {
      solid: 'bg-espresso-900 text-cream-50 hover:bg-espresso-800',
      glass:
        'bg-white/10 text-cream-50 backdrop-blur-md border border-white/20 hover:bg-white/20',
      soft: 'bg-espresso-900/5 text-espresso-800 hover:bg-espresso-900/10',
    },
  },

  /** Floating Action Button — Order via WhatsApp, scroll-to-top, etc. */
  fab: 'fixed bottom-6 right-6 z-[500] inline-flex items-center justify-center size-14 rounded-full bg-gradient-to-br from-gold-300 to-gold-500 text-espresso-950 shadow-[0_12px_40px_rgba(200,160,99,0.45)] hover:scale-105 active:scale-95 transition-transform duration-300',

  /** Loading: hide label, show spinner (see globals.css .spinner). */
  loading: 'relative text-transparent pointer-events-none [&>.spinner]:opacity-100',

  tokens: { radius: radii.button, shadowRest: shadow.medium, focus: focusRing.default },
} as const;

/* ═══════════════════════════════════════════════════════════════════════
   CARDS
   Product · Review · Gallery · Menu · Feature · Glass · Contact · Image
   ═══════════════════════════════════════════════════════════════════════ */
export const card = {
  base: 'group relative overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',

  /** Standard surface card. */
  surface:
    'rounded-[1.75rem] bg-cream-50 border border-espresso-900/[0.08] shadow-[0_2px_4px_rgba(46,27,17,0.04),0_8px_20px_rgba(46,27,17,0.07)] hover:-translate-y-2 hover:shadow-[0_8px_16px_rgba(46,27,17,0.06),0_24px_48px_rgba(46,27,17,0.10)]',

  /** Product card — image top, body below, price + CTA. */
  product:
    'rounded-[2.25rem] bg-cream-50 border border-espresso-900/[0.08] p-3 pb-6 shadow-[0_2px_8px_rgba(46,27,17,0.06)] hover:-translate-y-2.5 hover:shadow-[0_24px_56px_rgba(46,27,17,0.14)] [&_img]:transition-transform [&_img]:duration-700 hover:[&_img]:scale-[1.06]',

  /** Menu row card — horizontal, image right, dotted price leader. */
  menu:
    'rounded-[1.5rem] bg-espresso-900/[0.03] border border-espresso-900/[0.06] p-4 flex items-center gap-5 hover:bg-espresso-900/[0.05] hover:border-gold-300/30',

  /** Review / testimonial card. */
  review:
    'rounded-[1.75rem] bg-cream-50 border border-espresso-900/[0.08] p-7 shadow-[0_2px_4px_rgba(46,27,17,0.04),0_8px_20px_rgba(46,27,17,0.07)] hover:-translate-y-1.5',

  /** Feature / highlight card — icon, title, copy. */
  feature:
    'rounded-[2.25rem] bg-gradient-to-b from-cream-50 to-cream-100 border border-espresso-900/[0.06] p-8 text-center hover:-translate-y-2 hover:shadow-[0_24px_56px_rgba(46,27,17,0.12)]',

  /** Glassmorphism card (over imagery / dark sections). */
  glass:
    'rounded-[2.25rem] bg-white/10 backdrop-blur-[20px] border border-white/20 shadow-[0_8px_32px_rgba(46,27,17,0.12)] [-webkit-backdrop-filter:blur(20px)]',
  glassDark:
    'rounded-[2.25rem] bg-espresso-950/40 backdrop-blur-[20px] border border-latte/15 shadow-[0_8px_32px_rgba(0,0,0,0.45)]',

  /** Contact / info card. */
  contact:
    'rounded-[1.75rem] bg-cream-50 border border-espresso-900/[0.08] p-6 flex items-start gap-4',

  /** Pure image card (gallery tile). */
  image:
    'relative overflow-hidden rounded-[1.5rem] [&_img]:h-full [&_img]:w-full [&_img]:object-cover [&_img]:transition-transform [&_img]:duration-[1.2s] [&_img]:ease-[cubic-bezier(0.16,1,0.3,1)] hover:[&_img]:scale-110 after:absolute after:inset-0 after:bg-gradient-to-t after:from-espresso-950/50 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500',

  /** Optional inner padding helpers. */
  padding: { sm: 'p-5', md: 'p-7', lg: 'p-9' },

  tokens: { radius: radii.card, radiusFeature: radii.cardFeature },
} as const;

/* ═══════════════════════════════════════════════════════════════════════
   INPUTS
   Input · Textarea · Select · Search · Checkbox · Radio · Switch ·
   File Upload · Quantity Selector
   ═══════════════════════════════════════════════════════════════════════ */
export const input = {
  /** Shared field shell. */
  base:
    'w-full font-sans text-espresso-900 placeholder:text-espresso-900/35 bg-cream-50 border border-espresso-900/15 rounded-[0.875rem] transition-all duration-300 ease-out focus:outline-none focus:border-gold-300 focus:ring-4 focus:ring-gold-300/30 focus:bg-white',
  sizes: {
    sm: 'h-10 px-3.5 text-[0.875rem]',
    md: 'h-12 px-4 text-[0.9375rem]',
    lg: 'h-14 px-5 text-[1rem]',
  },
  textarea: 'min-h-32 py-3.5 px-4 leading-relaxed resize-y',
  select:
    'appearance-none pr-10 bg-[length:1.25rem] bg-[right_0.875rem_center] bg-no-repeat cursor-pointer',
  search:
    'pl-11 [&~svg]:absolute [&~svg]:left-4 [&~svg]:top-1/2 [&~svg]:-translate-y-1/2 [&~svg]:text-espresso-900/40',

  /** States (compose onto base). */
  states: {
    hover: 'hover:border-espresso-900/30',
    focus: 'focus:border-gold-300 focus:ring-4 focus:ring-gold-300/30',
    error:
      'border-error/70 focus:border-error focus:ring-error/25 text-error',
    success: 'border-success/60 focus:border-success focus:ring-success/25',
    disabled: 'opacity-50 pointer-events-none bg-espresso-900/[0.03]',
  },

  /** Field label + helper. */
  label: 'block mb-2 font-sans text-[0.8125rem] font-semibold tracking-wide text-espresso-800',
  helper: 'mt-1.5 text-[0.8125rem] text-espresso-700/70',
  errorText: 'mt-1.5 text-[0.8125rem] text-error font-medium',

  /** Checkbox — rounded, gold check. */
  checkbox:
    'peer size-5 shrink-0 rounded-[0.4rem] border-2 border-espresso-900/25 bg-cream-50 transition-all duration-200 checked:bg-espresso-900 checked:border-espresso-900 focus-visible:ring-2 focus-visible:ring-gold-300/60 cursor-pointer',
  /** Radio — circular. */
  radio:
    'peer size-5 shrink-0 rounded-full border-2 border-espresso-900/25 bg-cream-50 transition-all duration-200 checked:border-[6px] checked:border-espresso-900 focus-visible:ring-2 focus-visible:ring-gold-300/60 cursor-pointer',
  /** Switch — pill track + knob. */
  switch: {
    track:
      'relative inline-flex h-7 w-12 items-center rounded-full bg-espresso-900/15 transition-colors duration-300 peer-checked:bg-espresso-900 cursor-pointer',
    knob:
      'inline-block size-5 translate-x-1 rounded-full bg-cream-50 shadow-sm transition-transform duration-300 peer-checked:translate-x-6',
  },
  /** File upload dropzone. */
  fileUpload:
    'flex flex-col items-center justify-center gap-3 w-full rounded-[1.25rem] border-2 border-dashed border-espresso-900/20 bg-espresso-900/[0.02] p-8 text-center text-espresso-700/70 transition-colors duration-300 hover:border-gold-300/60 hover:bg-gold-50/40 cursor-pointer',
  /** Quantity stepper (− value +). */
  quantity: {
    wrap: 'inline-flex items-center rounded-full border border-espresso-900/15 bg-cream-50 p-1',
    btn: 'inline-flex items-center justify-center size-9 rounded-full text-espresso-800 hover:bg-espresso-900/8 active:scale-90 transition disabled:opacity-40 disabled:pointer-events-none',
    value: 'min-w-10 text-center font-mono text-[0.9375rem] tabular-nums',
  },

  tokens: { radius: radii.input, focus: focusRing.input },
} as const;

/* ═══════════════════════════════════════════════════════════════════════
   BADGES · TAGS · CHIPS
   ═══════════════════════════════════════════════════════════════════════ */
export const badge = {
  base: 'inline-flex items-center gap-1.5 font-sans font-semibold tracking-wide whitespace-nowrap',
  variants: {
    solid: 'bg-espresso-900 text-cream-50',
    gold: 'bg-gradient-to-br from-gold-200 to-gold-300 text-espresso-950',
    soft: 'bg-espresso-900/8 text-espresso-800',
    outline: 'border border-espresso-900/20 text-espresso-800',
    success: 'bg-success-soft text-success',
    error: 'bg-error-soft text-error',
    warning: 'bg-warning-soft text-[#9a6a18]',
  },
  sizes: {
    sm: 'h-6 px-2.5 text-[0.6875rem] rounded-md',
    md: 'h-7 px-3 text-[0.75rem] rounded-lg',
  },
} as const;

export const tag = {
  base: 'inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[0.75rem] font-medium bg-cream-200 text-espresso-800',
} as const;

/** Filter chips (Coffee · Ice Coffee · Desserts · Snacks). */
export const chip = {
  base: 'inline-flex items-center gap-2 rounded-full px-5 h-10 text-[0.875rem] font-medium tracking-wide transition-all duration-300 cursor-pointer select-none',
  inactive: 'bg-transparent text-espresso-700 hover:bg-espresso-900/5 border border-transparent',
  active: 'bg-gold-100 text-espresso-900 border border-gold-300/50 shadow-[0_2px_10px_rgba(200,160,99,0.20)]',
  onDark: {
    inactive: 'text-cream-100/70 hover:bg-white/8 border border-transparent',
    active: 'bg-gold-300/15 text-gold-200 border border-gold-300/40',
  },
} as const;

/* ═══════════════════════════════════════════════════════════════════════
   NAVIGATION — floating glass pill
   ═══════════════════════════════════════════════════════════════════════ */
export const navigation = {
  /** Sticky top bar — transparent at top, frosts on scroll. */
  bar: 'fixed top-0 inset-x-0 z-[200] transition-all duration-500',
  barScrolled:
    'bg-cream-100/80 backdrop-blur-[20px] border-b border-espresso-900/8 shadow-[0_2px_20px_rgba(46,27,17,0.06)]',
  /** Alternative floating "pill" nav, centered. */
  pill: 'mx-auto flex items-center gap-1 rounded-full bg-cream-50/70 backdrop-blur-[20px] border border-white/50 px-2 py-2 shadow-[0_8px_32px_rgba(46,27,17,0.12)]',
  link: 'relative px-4 py-2 rounded-full text-[0.9375rem] font-medium text-espresso-800 transition-colors duration-300 hover:text-espresso-950',
  linkActive: 'text-espresso-950 after:absolute after:inset-x-4 after:-bottom-0.5 after:h-px after:bg-gold-300',
  /** Mobile drawer. */
  drawer:
    'fixed inset-y-0 right-0 z-[500] w-[min(86vw,380px)] bg-cream-100 shadow-[0_24px_48px_rgba(46,27,17,0.16)] p-8',
  scrim: 'fixed inset-0 z-[400] bg-espresso-950/40 backdrop-blur-sm',
  tokens: { blur: blur.lg },
} as const;

/* ═══════════════════════════════════════════════════════════════════════
   GLASS SURFACES (generic recipes)
   ═══════════════════════════════════════════════════════════════════════ */
export const glassSurface = {
  light: 'bg-white/55 backdrop-blur-[14px] border border-white/65 shadow-[0_8px_32px_rgba(46,27,17,0.12)]',
  warm: 'bg-cream-100/45 backdrop-blur-[14px] border border-gold-300/30',
  dark: 'bg-espresso-950/55 backdrop-blur-[20px] border border-latte/15',
  gold: 'bg-gold-300/14 backdrop-blur-[14px] border border-gold-300/40',
} as const;

/* ═══════════════════════════════════════════════════════════════════════
   MISC COMPONENT RECIPES
   Accordion · Tabs · Tooltip · Divider · Avatar · Rating · QR · Map ·
   Opening Hours · Social · Skeleton
   ═══════════════════════════════════════════════════════════════════════ */
export const components = {
  accordion: {
    item: 'border-b border-espresso-900/10',
    trigger: 'flex w-full items-center justify-between gap-4 py-5 text-left font-display text-[1.25rem] text-espresso-900 [&[data-open]_svg]:rotate-180 [&_svg]:transition-transform [&_svg]:duration-300',
    panel: 'overflow-hidden text-espresso-700 leading-relaxed transition-[height] duration-400 ease-out',
  },
  tabs: {
    list: 'inline-flex items-center gap-1 rounded-full bg-espresso-900/5 p-1',
    trigger: 'rounded-full px-5 h-10 text-[0.875rem] font-medium text-espresso-700 transition-all duration-300 data-[active]:bg-cream-50 data-[active]:text-espresso-950 data-[active]:shadow-sm',
  },
  tooltip: 'rounded-lg bg-espresso-950 text-cream-100 text-[0.8125rem] px-3 py-1.5 shadow-[0_8px_24px_rgba(46,27,17,0.28)]',
  divider: 'h-px w-full bg-gradient-to-r from-transparent via-espresso-900/12 to-transparent',
  dividerGold: 'flex items-center gap-3 text-gold-400 [&>span]:h-px [&>span]:flex-1 [&>span]:bg-gradient-to-r [&>span]:from-transparent [&>span]:via-gold-300/40 [&>span]:to-transparent',
  avatar: 'inline-flex items-center justify-center rounded-full bg-espresso-200 text-espresso-800 font-semibold overflow-hidden ring-2 ring-cream-50',
  rating: 'inline-flex items-center gap-0.5 text-gold-400 [&_svg]:size-4 [&_svg]:fill-current',
  /** QR card (Scan at your table). */
  qrCard: 'rounded-[1.75rem] bg-espresso-900 text-cream-100 p-7 flex flex-col items-center gap-4 text-center [&_.qr]:rounded-2xl [&_.qr]:bg-cream-50 [&_.qr]:p-3',
  /** Map card. */
  mapCard: 'relative overflow-hidden rounded-[1.75rem] border border-espresso-900/10 shadow-[0_8px_20px_rgba(46,27,17,0.07)] [&_.pin]:absolute [&_.pin]:text-error',
  /** Opening hours row. */
  hoursRow: 'flex items-center justify-between py-2.5 border-b border-espresso-900/8 last:border-0 [&_.day]:text-espresso-800 [&_.time]:font-mono [&_.time]:text-[0.875rem] [&_.time]:tabular-nums [&_.time]:text-espresso-600',
  /** Social icon button. */
  social: 'inline-flex items-center justify-center size-11 rounded-full border border-espresso-900/12 text-espresso-700 transition-all duration-300 hover:bg-espresso-900 hover:text-cream-50 hover:-translate-y-0.5',
  socialOnDark: 'inline-flex items-center justify-center size-11 rounded-full border border-cream-100/15 text-cream-100/80 transition-all duration-300 hover:bg-gold-300 hover:text-espresso-950 hover:border-gold-300',
  /** Loading skeleton (shimmer). */
  skeleton: 'relative overflow-hidden rounded-xl bg-espresso-900/8 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2.4s_linear_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent',
  /** Carousel dots. */
  carouselDot: 'size-2 rounded-full bg-espresso-900/20 transition-all duration-300 data-[active]:w-6 data-[active]:bg-gold-300',
  /** Timeline node (Our Story). */
  timelineNode: 'relative pl-8 before:absolute before:left-0 before:top-1.5 before:size-3 before:rounded-full before:bg-gold-300 before:ring-4 before:ring-gold-300/20 after:absolute after:left-[5px] after:top-5 after:bottom-0 after:w-px after:bg-espresso-900/12',
} as const;

export const componentLibrary = {
  button,
  card,
  input,
  badge,
  tag,
  chip,
  navigation,
  glassSurface,
  components,
} as const;

export default componentLibrary;
