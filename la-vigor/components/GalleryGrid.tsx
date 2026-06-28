"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { SectionHeading } from "@/components/SectionHeading";
import { PhotoSlot } from "@/components/PhotoSlot";
import { asset } from "@/lib/site";

// Drop real photos at these paths to replace the placeholders.
// See /public/PHOTOS.md.
const photos = [
  { src: "/gallery/interior-seating.jpg", tall: true },
  { src: "/gallery/donut-display.jpg", tall: false },
  { src: "/gallery/cappuccino-art.jpg", tall: false },
  { src: "/gallery/storefront-la-vigor.jpg", tall: false },
  { src: "/gallery/iced-coffee-table.jpg", tall: true },
  { src: "/gallery/chocolate-donut.jpg", tall: false },
  { src: "/gallery/cold-drinks.jpg", tall: false },
  { src: "/gallery/dessert-plate.jpg", tall: false },
];

export function GalleryGrid() {
  const { t } = useLang();
  const [open, setOpen] = React.useState<string | null>(null);

  return (
    <section id="gallery" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading title={t.gallery.title} subtitle={t.gallery.subtitle} />

        <div className="mt-14 columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
          {photos.map((p, i) => (
            <motion.button
              key={p.src}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
              onClick={() => setOpen(asset(p.src))}
              className="group block w-full overflow-hidden rounded-2xl ring-1 ring-espresso/5"
            >
              <PhotoSlot
                src={asset(p.src)}
                alt="La Vigor"
                label={p.src.split("/").pop()}
                className={`w-full ${p.tall ? "aspect-[3/4]" : "aspect-square"} transition-transform duration-700 group-hover:scale-110`}
              />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-choco/90 p-6 backdrop-blur-sm"
          >
            <button
              aria-label="Close"
              className="absolute right-5 top-5 rounded-full bg-white/10 p-2 text-cream hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] w-full max-w-3xl overflow-hidden rounded-3xl"
            >
              <PhotoSlot src={open} alt="La Vigor" className="aspect-[4/3] w-full" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
