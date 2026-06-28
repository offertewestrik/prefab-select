"use client";

import { motion } from "framer-motion";

/** Animated "scroll" cue — a mouse outline with a falling dot + label. */
export function ScrollIndicator({ started }: { started: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={started ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 1.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none absolute bottom-[150px] left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
    >
      <span className="text-[0.62rem] font-semibold uppercase tracking-[0.4em] text-cream-100/55">
        Scroll
      </span>
      <div className="flex h-10 w-6 justify-center rounded-full border border-cream-100/30 p-1.5">
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-gold-300"
          animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}

export default ScrollIndicator;
