"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Bean } from "../icons/Bean";

type BeanSpec = {
  top: string;
  left: string;
  size: number;
  rot: number;
  depth: number; // parallax strength (0–1)
  float: number; // float duration
  delay: number;
  blur?: boolean;
};

// Hand-placed for composition — clustered toward the product, sparse over text.
const BEANS: BeanSpec[] = [
  { top: "18%", left: "60%", size: 34, rot: -20, depth: 0.5, float: 7, delay: 0 },
  { top: "30%", left: "86%", size: 26, rot: 30, depth: 0.85, float: 9, delay: 1.2 },
  { top: "62%", left: "72%", size: 44, rot: 12, depth: 0.4, float: 8, delay: 0.6 },
  { top: "78%", left: "54%", size: 22, rot: -34, depth: 0.7, float: 10, delay: 2.1, blur: true },
  { top: "44%", left: "94%", size: 30, rot: 8, depth: 0.6, float: 7.5, delay: 1.6 },
  { top: "12%", left: "40%", size: 18, rot: 40, depth: 0.9, float: 11, delay: 0.9, blur: true },
  { top: "86%", left: "84%", size: 28, rot: -12, depth: 0.55, float: 8.5, delay: 1.9 },
  { top: "52%", left: "8%", size: 20, rot: 22, depth: 0.95, float: 12, delay: 0.3, blur: true },
];

/**
 * Floating coffee beans with scroll parallax. Each bean drifts gently (float)
 * and translates on scroll proportional to its `depth`, creating layered
 * cinematic depth as the hero leaves the viewport.
 */
export function FloatingBeans() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {BEANS.map((b, i) => (
        <ParallaxBean key={i} spec={b} progress={scrollYProgress} />
      ))}
    </div>
  );
}

function ParallaxBean({
  spec,
  progress,
}: {
  spec: BeanSpec;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const y = useTransform(progress, [0, 1], [0, -180 * spec.depth]);
  const rotate = useTransform(progress, [0, 1], [spec.rot, spec.rot + 40 * spec.depth]);
  const opacity = useTransform(progress, [0, 0.7, 1], [1, 0.7, 0]);

  return (
    <motion.div
      className="absolute"
      style={{ top: spec.top, left: spec.left, y, rotate, opacity }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: spec.blur ? 0.55 : 0.95, scale: 1 }}
      transition={{ duration: 1, delay: 0.6 + spec.delay * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        style={{ width: spec.size }}
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: spec.float, delay: spec.delay, repeat: Infinity, ease: "easeInOut" }}
      >
        <Bean className={spec.blur ? "block h-auto w-full blur-[1.5px] drop-shadow-lg" : "block h-auto w-full drop-shadow-xl"} />
      </motion.div>
    </motion.div>
  );
}

export default FloatingBeans;
