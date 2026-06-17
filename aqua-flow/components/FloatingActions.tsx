"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { contact, whatsappLink } from "@/lib/site";

export function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      <motion.a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.08 }}
        className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-6px_rgba(37,211,102,0.6)]"
      >
        <span className="absolute inset-0 animate-ripple rounded-full bg-[#25D366]/50" />
        {/* WhatsApp glyph */}
        <svg viewBox="0 0 32 32" className="relative h-7 w-7 fill-current">
          <path d="M16.003 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.256.59 4.46 1.71 6.402L3.2 28.8l6.56-1.71a12.74 12.74 0 0 0 6.243 1.59h.005c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.332-6.635-3.752-9.055A12.71 12.71 0 0 0 16.003 3.2Zm0 23.2h-.004a10.62 10.62 0 0 1-5.41-1.48l-.388-.23-4.022 1.05 1.073-3.92-.253-.402a10.6 10.6 0 0 1-1.625-5.62c0-5.866 4.773-10.64 10.64-10.64 2.842 0 5.513 1.108 7.523 3.118a10.57 10.57 0 0 1 3.116 7.525c0 5.867-4.773 10.64-10.64 10.64Zm5.835-7.97c-.32-.16-1.892-.933-2.185-1.04-.293-.107-.507-.16-.72.16-.213.32-.826 1.04-1.013 1.253-.187.213-.373.24-.693.08-.32-.16-1.35-.498-2.572-1.587-.95-.847-1.592-1.894-1.779-2.214-.187-.32-.02-.493.14-.652.144-.143.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.986-2.373-.26-.624-.524-.54-.72-.55l-.613-.01c-.213 0-.56.08-.853.4-.293.32-1.12 1.094-1.12 2.667 0 1.573 1.146 3.093 1.306 3.307.16.213 2.253 3.44 5.46 4.823.763.33 1.36.527 1.825.674.767.244 1.464.21 2.015.127.615-.092 1.892-.773 2.158-1.52.267-.747.267-1.387.187-1.52-.08-.133-.293-.213-.613-.373Z" />
        </svg>
      </motion.a>

      <motion.a
        href={`tel:${contact.phoneHref}`}
        aria-label="Call us"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.1, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.08 }}
        className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-aqua to-aqua-deep text-white shadow-[0_12px_30px_-6px_rgba(8,145,178,0.6)]"
      >
        <Phone className="h-6 w-6" />
      </motion.a>
    </div>
  );
}
