/**
 * Framer Motion variants for the hero — built on the La Vigor motion tokens
 * (design-system/animation.ts) so coded motion matches the design language:
 * slow, soft, confident. House easing = cubic-bezier(0.22, 1, 0.36, 1).
 */
import type { Variants, Transition } from "framer-motion";
import { easing, duration } from "../design-system/animation";

const sig = easing.signature;
const out = easing.out;

const sec = (ms: number) => ms / 1000;

export const EASE = { sig, out, smooth: easing.smooth } as const;
export const DUR = duration;

/** Base transition presets. */
export const tBase: Transition = { duration: sec(duration.base), ease: sig };
export const tSmooth: Transition = { duration: sec(duration.smooth), ease: sig };
export const tSlow: Transition = { duration: sec(duration.slow), ease: out };

/** Mask reveal — the inner line slides up from a clipped wrapper. */
export const maskLineChild: Variants = {
  hidden: { y: "110%" },
  show: (i: number = 0) => ({
    y: "0%",
    transition: { duration: sec(duration.slow), ease: out, delay: 0.1 + i * 0.12 },
  }),
};

/** Generic fade-up. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: sec(duration.smooth), ease: sig, delay },
  }),
};

/** Blur-up — used for the eyebrow / location chip. */
export const blurUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(10px)" },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: sec(duration.slow), ease: out, delay },
  }),
};

/** Stagger container for the CTA group + feature strip. */
export const stagger = (staggerChildren = 0.1, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: sec(duration.smooth), ease: sig } },
};

/** Nav slide-down. */
export const navDrop: Variants = {
  hidden: { y: -28, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: sec(duration.smooth), ease: out } },
};
