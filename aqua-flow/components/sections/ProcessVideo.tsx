"use client";

import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import { processClip } from "@/lib/site";

export function ProcessVideo() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-navy-deep" />
      <div className="absolute inset-0 -z-10 aurora-deep opacity-70" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="flex items-center justify-center gap-2 text-sm font-bold text-aqua-bright">
            <PlayCircle className="h-4 w-4" />
            شاهد العملية
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            نقاء يُملأ أمام عينيك
          </h2>
          <p className="mt-4 text-lg text-white/65">
            مياه نقية تماماً تُعبّأ في غالونات 19 لتر تحت رقابة جودة صارمة.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="glass-dark mx-auto mt-12 overflow-hidden rounded-[2rem] p-2"
        >
          <video
            className="aspect-video w-full rounded-3xl object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={processClip.posterUrl}
          >
            <source src={processClip.videoUrl} type="video/mp4" />
          </video>
        </motion.div>
      </div>
    </section>
  );
}
