"use client";

import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lenis as lenisConfig } from "../../design-system/animation";

/**
 * Lenis smooth scroll, synced with the GSAP ticker + ScrollTrigger so both
 * libraries read one authoritative scroll position. Honours reduced-motion.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: lenisConfig.options.duration,
      easing: lenisConfig.options.easing,
      smoothWheel: lenisConfig.options.smoothWheel,
      wheelMultiplier: lenisConfig.options.wheelMultiplier,
      touchMultiplier: lenisConfig.options.touchMultiplier,
      lerp: lenisConfig.options.lerp,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  // reducedMotion="user" makes framer-motion collapse transform/layout
  // animations to instant for visitors who prefer reduced motion (opacity
  // still cross-fades), complementing the CSS contract in globals.css.
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
