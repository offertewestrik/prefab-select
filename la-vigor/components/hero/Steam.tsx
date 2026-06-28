"use client";

import { motion } from "framer-motion";

/**
 * Rising steam particles. A cluster of soft, blurred plumes that drift up and
 * fade — the unmistakable signal of fresh, hot coffee. Pure CSS/motion, cheap.
 */
export function Steam({
  className,
  count = 7,
}: {
  className?: string;
  count?: number;
}) {
  return (
    <div className={`pointer-events-none absolute ${className ?? ""}`} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => {
        const left = 10 + (i / (count - 1)) * 80; // spread across the source
        const delay = (i % 4) * 0.9;
        const duration = 4.2 + (i % 3) * 0.8;
        const size = 14 + (i % 3) * 6;
        return (
          <motion.span
            key={i}
            className="absolute bottom-0 rounded-full bg-cream-100/40 blur-md"
            style={{ left: `${left}%`, width: size, height: size * 2.2 }}
            initial={{ opacity: 0, y: 0, scaleX: 1 }}
            animate={{
              opacity: [0, 0.5, 0.35, 0],
              y: [-4, -70, -150],
              scaleX: [1, 1.5, 2.1],
              x: [0, i % 2 ? 14 : -14, i % 2 ? -8 : 8],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}

export default Steam;
