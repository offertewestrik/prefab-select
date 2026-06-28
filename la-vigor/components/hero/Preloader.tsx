"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BadgeMark } from "../brand/Logo";

/**
 * Premium loading animation. The badge mark fades in, a gold meter fills from
 * 0 → 100, then a warm curtain lifts to reveal the hero. Calls onDone() once
 * the reveal finishes so the hero can orchestrate its entrance.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [lifting, setLifting] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      onDone();
      return;
    }
    let raf = 0;
    const start = performance.now();
    const total = 1700;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / total);
      // ease-out for an accelerating-then-settling meter
      setProgress(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setLifting(true), 220);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-coffee-black"
      initial={false}
      animate={lifting ? { clipPath: "inset(0 0 100% 0)" } : { clipPath: "inset(0 0 0% 0)" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (lifting) onDone();
      }}
    >
      <div className="aura-dark absolute inset-0 opacity-60" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex flex-col items-center gap-6"
      >
        <BadgeMark className="size-20 drop-shadow-[0_8px_30px_rgba(200,160,99,0.35)]" />
        <div className="flex flex-col items-center gap-1.5">
          <span className="script-accent text-3xl text-gold-300">La Vigor</span>
          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.5em] text-cream-100/60">
            Donuts Cafe
          </span>
        </div>

        {/* gold meter */}
        <div className="mt-2 h-px w-44 overflow-hidden bg-cream-100/15">
          <motion.div
            className="h-full bg-gradient-to-r from-gold-500 via-gold-300 to-gold-200"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="font-mono text-[0.7rem] tabular-nums tracking-widest text-cream-100/50">
          {String(progress).padStart(3, "0")}
        </span>
      </motion.div>
    </motion.div>
  );
}

export default Preloader;
