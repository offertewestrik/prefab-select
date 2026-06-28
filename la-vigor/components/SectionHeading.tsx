"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Consistent centered section title + subtitle with a scroll-in animation. */
export function SectionHeading({
  title,
  subtitle,
  tone = "dark",
  className,
}: {
  title: string;
  subtitle?: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={cn("mx-auto max-w-2xl text-center", className)}
    >
      <h2
        className={cn(
          "font-display text-3xl font-extrabold sm:text-4xl lg:text-5xl",
          tone === "dark" ? "text-espresso" : "text-cream",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base sm:text-lg",
            tone === "dark" ? "text-coffee/80" : "text-cream/75",
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
