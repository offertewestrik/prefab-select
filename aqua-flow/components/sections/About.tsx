"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { facilityHighlights, asset } from "@/lib/site";
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
              src={asset("/facility-1.jpg")}
              alt="منشأة تنقية المياه مع محطة التعبئة والغالونات"
              label="منشأة الإنتاج"
              className="col-span-2 aspect-[16/11]"
            />
            <PhotoSlot
              src={asset("/facility-2.jpg")}
              alt="خط الترشيح والتعبئة من الستانلس ستيل"
              label="خط الترشيح"
              className="aspect-[4/5]"
            />
            <div className="flex flex-col justify-between gap-4">
              <div className="glass flex flex-1 flex-col justify-center rounded-3xl p-6 text-center">
                <span className="text-gradient-aqua font-display text-3xl font-extrabold">
                  تعقيم
                </span>
                <span className="mt-1 text-xs font-medium text-navy/55">
                  بالأشعة فوق البنفسجية
                </span>
              </div>
              <div className="glass flex flex-1 flex-col justify-center rounded-3xl p-6 text-center">
                <span className="text-gradient-aqua font-display text-4xl font-extrabold">
                  ١٠٠٪
                </span>
                <span className="mt-1 text-xs font-medium text-navy/55">
                  نقاء
                </span>
              </div>
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm font-bold text-aqua-deep">
              من نحن
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-navy sm:text-4xl lg:text-5xl">
              نقاءٌ <span className="text-gradient-aqua">تراه وتثق به</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-navy/70">
              تُنقّى مياهنا في منشأة إنتاج حديثة هدفها واحد: مياه شرب نظيفة وآمنة
              ولذيذة المذاق. يمر كل غالون عبر مراحل ترشيح متعددة وتعقيم بالأشعة
              فوق البنفسجية، تحت رقابة جودة صارمة — لتصل إلى بابك مياه نقية حقاً.
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
