/**
 * LA VIGOR — Motion & Animation System
 * ─────────────────────────────────────────────────────────────────────────
 * Motion here is SLOW, SOFT and CONFIDENT. Things ease in like steam rising,
 * settle like cream into coffee. Nothing snaps, nothing bounces cheaply.
 * The feeling is calm luxury hospitality — never busy, never nervous.
 *
 * This file is framework-agnostic at its core (durations + easings) and then
 * ships ready-made presets for Framer Motion / `motion`, GSAP and Lenis so
 * every animated surface speaks the same dialect.
 *
 * Golden rule: always honour prefers-reduced-motion. Presets degrade to a
 * simple opacity fade (or nothing) — see `reducedMotion` + globals.css.
 */

/* ═══════════════════════════════════════════════════════════════════════
   DURATIONS  (ms) — unhurried
   ═══════════════════════════════════════════════════════════════════════ */
export const duration = {
  instant: 80,
  fast: 180, // micro-interactions (hover color)
  base: 320, // default UI transition
  smooth: 500, // cards, reveals
  slow: 700, // hero, large media
  slower: 1000, // ambient, parallax settle
  cinematic: 1400, // page/hero entrances
} as const;

/* CSS-string variants for direct use in transitions. */
export const durationCss = Object.fromEntries(
  Object.entries(duration).map(([k, v]) => [k, `${v}ms`])
) as Record<keyof typeof duration, string>;

/* ═══════════════════════════════════════════════════════════════════════
   EASINGS — bezier curves with intent
   ═══════════════════════════════════════════════════════════════════════ */
export const easing = {
  /** The house curve. Gentle out — for almost everything. */
  signature: [0.22, 1, 0.36, 1] as [number, number, number, number], // "easeOutExpo-ish"
  /** Soft, symmetric — color/opacity tweaks. */
  smooth: [0.4, 0, 0.2, 1] as [number, number, number, number],
  /** Entrances — decelerate into place. */
  out: [0.16, 1, 0.3, 1] as [number, number, number, number],
  /** Exits — accelerate away. */
  in: [0.5, 0, 0.75, 0] as [number, number, number, number],
  /** Luxurious overshoot — used rarely, for delight (badge pop). */
  gentleBack: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
  /** Linear — for steam / continuous loops only. */
  linear: [0, 0, 1, 1] as [number, number, number, number],
} as const;

/** CSS cubic-bezier() strings. */
export const easingCss = {
  signature: 'cubic-bezier(0.22, 1, 0.36, 1)',
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  out: 'cubic-bezier(0.16, 1, 0.3, 1)',
  in: 'cubic-bezier(0.5, 0, 0.75, 0)',
  gentleBack: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  linear: 'linear',
} as const;

/* ═══════════════════════════════════════════════════════════════════════
   SPRINGS — for Framer Motion `type: 'spring'`
   ═══════════════════════════════════════════════════════════════════════ */
export const spring = {
  /** Default soft spring — buttons, toggles. */
  soft: { type: 'spring', stiffness: 260, damping: 30, mass: 1 },
  /** Gentle, slow — cards, drawers. */
  gentle: { type: 'spring', stiffness: 170, damping: 26, mass: 1.1 },
  /** Snappy but graceful — chips, tabs. */
  snappy: { type: 'spring', stiffness: 380, damping: 32, mass: 0.9 },
  /** A barely-there overshoot for delightful moments. */
  expressive: { type: 'spring', stiffness: 300, damping: 18, mass: 1 },
} as const;

/* ═══════════════════════════════════════════════════════════════════════
   FRAMER MOTION / `motion` PRESETS
   Drop straight into <motion.* variants={…}> or use as transition objects.
   Pair list reveals with `staggerContainer`.
   ═══════════════════════════════════════════════════════════════════════ */
const T = (d: keyof typeof duration, e: keyof typeof easing = 'signature') => ({
  duration: duration[d] / 1000,
  ease: easing[e],
});

export const motionPresets = {
  /** Fade up — the workhorse reveal. */
  fadeUp: {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 12 },
    transition: T('smooth'),
  },
  /** Plain fade. */
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: T('base'),
  },
  /** Scale + fade — images, featured cards. */
  scaleIn: {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
    transition: T('smooth', 'out'),
  },
  /** Slow image "Ken Burns" drift — set as animate loop. */
  kenBurns: {
    initial: { scale: 1.08 },
    animate: { scale: 1 },
    transition: { duration: duration.cinematic / 1000, ease: easing.out },
  },
  /** Blur-in reveal for hero headlines. */
  blurUp: {
    initial: { opacity: 0, y: 24, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: T('slow', 'out'),
  },
  /** Slide from left / right (drawers, nav). */
  slideInRight: {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
    transition: { ...spring.gentle },
  },
  /** Container that staggers its children. */
  staggerContainer: {
    initial: {},
    animate: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
  },
  /** Child of a stagger container. */
  staggerChild: {
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0, transition: T('smooth') },
  },
} as const;

/** Reusable whileHover / whileTap interaction states. */
export const interaction = {
  hoverLift: { y: -6, transition: T('base', 'out') },
  hoverLiftCard: { y: -10, transition: T('smooth', 'out') },
  hoverScale: { scale: 1.03, transition: T('base', 'out') },
  hoverImageZoom: { scale: 1.06, transition: T('slow', 'out') },
  tap: { scale: 0.97, transition: T('fast', 'smooth') },
  tapSoft: { scale: 0.985, transition: T('fast', 'smooth') },
} as const;

/** Scroll-reveal defaults for whileInView. */
export const viewport = {
  once: true,
  amount: 0.3, // 30% in view triggers
  margin: '0px 0px -10% 0px',
} as const;

/* ═══════════════════════════════════════════════════════════════════════
   GSAP DEFAULTS — for timeline / ScrollTrigger work
   ═══════════════════════════════════════════════════════════════════════ */
export const gsap = {
  defaults: { ease: 'power3.out', duration: duration.smooth / 1000 },
  ease: {
    signature: 'expo.out',
    smooth: 'power2.inOut',
    out: 'power3.out',
    in: 'power3.in',
    gentleBack: 'back.out(1.4)',
  },
  /** Standard ScrollTrigger config for section reveals. */
  scrollTrigger: {
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
    scrub: false,
  },
  /** Parallax ScrollTrigger (continuous). */
  parallax: {
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1, // 1s smoothing
  },
  /** Pull-from-below reveal tween. */
  revealFrom: { y: 40, opacity: 0, duration: duration.smooth / 1000 },
  stagger: 0.09,
} as const;

/* ═══════════════════════════════════════════════════════════════════════
   LENIS — smooth scroll configuration
   The slow, weighty glide that makes premium sites feel "expensive".
   ═══════════════════════════════════════════════════════════════════════ */
export const lenis = {
  /** Recommended Lenis constructor options. */
  options: {
    duration: 1.2,
    // exponential ease-out — long, smooth deceleration
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
    lerp: 0.1, // lower = smoother/heavier
    syncTouch: false,
  },
  note: 'Disable (or set duration 0) when prefers-reduced-motion is set.',
} as const;

/* ═══════════════════════════════════════════════════════════════════════
   KEYFRAMES — named CSS animations (defined in globals.css)
   Reference these names from components; durations bundled for clarity.
   ═══════════════════════════════════════════════════════════════════════ */
export const keyframes = {
  steamRise: { name: 'steam-rise', duration: '4s', timing: 'ease-in-out', loop: true },
  float: { name: 'float', duration: '6s', timing: 'ease-in-out', loop: true },
  shimmer: { name: 'shimmer', duration: '2.4s', timing: 'linear', loop: true }, // skeletons / gold sweep
  pulseGlow: { name: 'pulse-glow', duration: '3s', timing: 'ease-in-out', loop: true },
  marquee: { name: 'marquee', duration: '40s', timing: 'linear', loop: true }, // logo / bean strip
  spinSlow: { name: 'spin-slow', duration: '18s', timing: 'linear', loop: true },
  drawLine: { name: 'draw-line', duration: '900ms', timing: easingCss.out, loop: false },
} as const;

/* ═══════════════════════════════════════════════════════════════════════
   REDUCED MOTION — the safe fallback
   ═══════════════════════════════════════════════════════════════════════ */
export const reducedMotion = {
  /** Framer transition to swap in when the user prefers reduced motion. */
  transition: { duration: 0.001 },
  /** Variant that only fades (no transforms). */
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: duration.fast / 1000 },
  },
} as const;

export const animationSystem = {
  duration,
  durationCss,
  easing,
  easingCss,
  spring,
  motionPresets,
  interaction,
  viewport,
  gsap,
  lenis,
  keyframes,
  reducedMotion,
} as const;

export default animationSystem;
