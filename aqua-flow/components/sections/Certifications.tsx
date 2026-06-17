"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { qualityBadges, accreditations } from "@/lib/site";
import { SmartImage } from "@/components/SmartImage";
import { asset } from "@/lib/site";

export function Certifications() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 aurora-light opacity-50" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold text-aqua-deep">الجودة والاعتمادات</p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-navy sm:text-4xl lg:text-5xl">
            معايير جودة تثق بها عائلتك
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-navy/65">
            نلتزم بأعلى معايير السلامة في كل خطوة — من المصدر حتى باب منزلك.
          </p>
        </div>

        {/* Quality commitments */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {qualityBadges.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.06 }}
              className="glass flex flex-col items-center gap-3 rounded-3xl p-5 text-center"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-aqua to-aqua-deep text-white shadow-glow">
                <b.icon className="h-6 w-6" />
              </span>
              <span className="text-[13px] font-semibold leading-snug text-navy">
                {b.title}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Official accreditation logos (drop real logos into /public/certs) */}
        <div className="mt-14">
          <p className="mb-6 text-center text-sm font-medium text-navy/45">
            معتمدون ونلتزم بمعايير الجهات الرسمية
          </p>
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            {accreditations.map((a) => (
              <div
                key={a.label}
                className="glass flex flex-col items-center gap-3 rounded-2xl px-4 py-6 text-center"
              >
                <div className="relative grid h-14 w-full place-items-center">
                  <Award className="h-8 w-8 text-aqua/40" />
                  <SmartImage
                    src={asset(a.image)}
                    alt={a.label}
                    className="absolute inset-0 mx-auto h-full w-auto object-contain"
                  />
                </div>
                <span className="text-xs font-semibold text-navy/70">
                  {a.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
