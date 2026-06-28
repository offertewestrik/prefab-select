"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useImageExists } from "../../lib/useImageExists";

/**
 * Cinematic hero backdrop — fully layered, image-optional:
 *
 *   1. Deep warm base gradient (coffee black → espresso).
 *   2. Optional photographic layer  → /hero/hero-bg.jpg  (drop-in; auto-used).
 *   3. Golden "candlelight" auras + volumetric light shafts.
 *   4. Vignette + film grain for analog warmth.
 *
 * GSAP ScrollTrigger drives a slow zoom + drift as the hero scrolls away,
 * and the whole stage eases in with a slow scale-down on load.
 */
export function HeroBackground({ started }: { started: boolean }) {
  const zoomRef = useRef<HTMLDivElement>(null);
  const hasPhoto = useImageExists("hero/hero-bg.jpg");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = zoomRef.current;
    if (!el) return;

    // Entrance: slow settle from a slightly larger scale.
    if (!reduce && started) {
      gsap.fromTo(
        el,
        { scale: 1.16 },
        { scale: 1.04, duration: 2.2, ease: "power2.out" }
      );
    }

    if (reduce) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: 14,
        scale: 1.14,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    });
    return () => ctx.revert();
  }, [started]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div ref={zoomRef} className="absolute inset-0 will-change-transform">
        {/* 1 · base */}
        <div className="absolute inset-0 bg-gradient-espresso" />
        {/* 2 · optional photographic layer — drop /public/hero/hero-bg.jpg in
               and it is used automatically; 404 falls back to the gradient. */}
        {hasPhoto && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="hero/hero-bg.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-[center_right] opacity-90"
            draggable={false}
          />
        )}
        {/* warm tone wash to unify any photo with the palette */}
        <div className="absolute inset-0 bg-gradient-to-tr from-espresso-950/85 via-espresso-950/35 to-transparent" />
        {/* 3 · golden auras */}
        <div className="absolute inset-0 aura-dark opacity-90" />
        <div className="absolute -right-[10%] top-1/2 h-[60vmax] w-[60vmax] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(200,160,99,0.20),transparent_60%)]" />
      </div>

      {/* light shafts (front of zoom layer, fixed angle) */}
      <div className="light-shaft -top-[20%] right-[22%] h-[120%] w-[120px] [animation-delay:0s]" />
      <div className="light-shaft -top-[20%] right-[40%] h-[120%] w-[80px] opacity-70 [animation-delay:2s]" />

      {/* readability scrim toward the bottom for the feature strip */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-espresso-950 via-espresso-950/50 to-transparent" />

      {/* vignette + grain overlays */}
      <div className="vignette film-grain absolute inset-0" />
    </div>
  );
}

export default HeroBackground;
