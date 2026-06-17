"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { facilityHighlights } from "@/lib/site";
import { PhotoSlot } from "@/components/PhotoSlot";

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 aurora-light opacity-60" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Photo collage */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 gap-4"
          >
            <PhotoSlot
              src="/facility-1.jpg"
              alt="Water filtration installation"
              label="Filtration line"
              className="col-span-2 aspect-[16/10]"
            />
            <PhotoSlot
              src="/facility-2.jpg"
              alt="UV disinfection stage"
              label="UV disinfection"
              className="aspect-square"
            />
            <PhotoSlot
              src="/facility-3.jpg"
              alt="Gallon filling line"
              label="Gallon filling"
              className="aspect-square"
            />
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-aqua-deep">
              About Us
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-navy sm:text-4xl lg:text-5xl">
              Purity you can{" "}
              <span className="text-gradient-aqua">see and trust</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-navy/70">
              Our water is purified in a modern production facility built around
              one goal: clean, safe, great-tasting drinking water. Every gallon
              passes through multiple filtration stages and UV disinfection,
              under strict quality control — so what reaches your door is
              genuinely pure.
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {facilityHighlights.map((h) => (
                <li
                  key={h}
                  className="glass flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-medium text-navy"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-aqua-deep" />
                  {h}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
