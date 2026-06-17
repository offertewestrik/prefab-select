"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle, ShieldCheck, Sun, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contact, whatsappLink, heroMedia, brand } from "@/lib/site";

const trust = [
  { icon: ShieldCheck, label: "نقاء 100%" },
  { icon: Sun, label: "تعقيم بالأشعة فوق البنفسجية" },
  { icon: Truck, label: "توصيل يومي" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* AI-generated hero footage (Higgsfield). The animated aqua layer below
          always shows as a graceful fallback while the video loads. */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-paper via-mist to-white" />
      <div className="absolute inset-0 -z-10 aurora-light" />
      <video
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-70"
        autoPlay
        muted
        loop
        playsInline
        poster={heroMedia.posterUrl}
      >
        <source src={heroMedia.videoUrl} type="video/mp4" />
      </video>
      {/* Light wash so headline text stays readable over the footage */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-l from-paper/85 via-paper/55 to-paper/20" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-paper via-paper/20 to-transparent" />

      {/* Floating bubbles */}
      {[...Array(8)].map((_, i) => (
        <span
          key={i}
          className="animate-float absolute rounded-full bg-aqua/20 ring-1 ring-aqua/30 blur-[1px]"
          style={{
            width: `${12 + i * 6}px`,
            height: `${12 + i * 6}px`,
            left: `${8 + i * 11}%`,
            top: `${20 + (i % 4) * 18}%`,
            animationDelay: `${i * 0.6}s`,
          }}
        />
      ))}

      <div className="mx-auto w-full max-w-7xl px-4 pt-28 sm:px-6">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-aqua-deep"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aqua opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-aqua-deep" />
            </span>
            {brand.fullAr} · {brand.location}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 font-display text-5xl font-extrabold leading-[1.15] tracking-tight text-navy sm:text-6xl lg:text-7xl"
          >
            مياه نقية
            <br />
            <span className="text-gradient-aqua">تصل إليك يومياً</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 font-display text-2xl font-semibold text-aqua-deep sm:text-3xl"
          >
            {brand.taglineAr}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-navy/70"
          >
            نوصّل مياه شرب نقية ومُعالَجة طازجة كل يوم — للمنازل والمكاتب
            والشركات في جميع أنحاء الإمارات.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button size="lg">
                <MessageCircle className="h-4 w-4" />
                اطلب عبر واتساب
              </Button>
            </a>
            <a href={`tel:${contact.phoneHref}`}>
              <Button size="lg" variant="outline">
                <Phone className="h-4 w-4" />
                اتصل الآن
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            {trust.map((t) => (
              <div
                key={t.label}
                className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-navy/80"
              >
                <t.icon className="h-4 w-4 text-aqua-deep" />
                {t.label}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
