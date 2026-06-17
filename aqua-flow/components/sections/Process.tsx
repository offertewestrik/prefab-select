"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { processSteps } from "@/lib/site";
import { cn } from "@/lib/utils";

// 3D scene is client-only — never render on the server.
const PurificationScene = dynamic(
  () => import("@/components/three/PurificationScene"),
  { ssr: false },
);

export function Process() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const progressRef = React.useRef(0);
  const [active, setActive] = React.useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progressRef.current = v;
    const idx = Math.min(
      processSteps.length - 1,
      Math.floor(v * processSteps.length),
    );
    setActive(idx);
  });

  return (
    <section id="process" ref={sectionRef} className="relative h-[320vh]">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden bg-navy-deep">
        <div className="absolute inset-0 aurora-deep opacity-80" />

        {/* 3D canvas */}
        <div className="absolute inset-0">
          <PurificationScene progressRef={progressRef} />
        </div>

        {/* Heading */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-24 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-aqua-bright">
            The Purification Journey
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            From a single drop to your front door
          </h2>
          <p className="mt-3 max-w-xl text-white/60">
            Scroll to follow every drop through our modern filtration facility.
          </p>
        </div>

        {/* Step rail */}
        <div className="relative z-10 mt-auto w-full px-4 pb-10 sm:px-6">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 md:grid-cols-5">
            {processSteps.map((s, i) => (
              <motion.div
                key={s.step}
                animate={{
                  opacity: active === i ? 1 : 0.45,
                  y: active === i ? 0 : 6,
                }}
                transition={{ duration: 0.4 }}
                className={cn(
                  "rounded-2xl p-4 transition-colors duration-300",
                  active === i ? "glass-dark" : "border border-white/5",
                )}
              >
                <span
                  className={cn(
                    "text-xs font-bold tracking-widest",
                    active === i ? "text-aqua-bright" : "text-white/40",
                  )}
                >
                  {s.step}
                </span>
                <h3 className="mt-1 text-sm font-semibold text-white">
                  {s.title}
                </h3>
                <p className="mt-1 hidden text-xs leading-relaxed text-white/55 md:block">
                  {s.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* progress bar */}
          <div className="mx-auto mt-5 h-1 max-w-7xl overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-aqua-deep to-aqua-bright"
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
