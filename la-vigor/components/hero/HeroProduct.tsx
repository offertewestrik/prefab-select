"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Steam } from "./Steam";
import { useImageExists } from "../../lib/useImageExists";

/**
 * The hero "product hero shot" — a slowly floating, pointer-reactive stage.
 *
 * If /public/hero/product.png exists it is used automatically; otherwise an
 * art-directed CSS composition (iced caramel mocha + chocolate donut) stands
 * in so the hero is never empty and never looks like a placeholder.
 */
export function HeroProduct({ started }: { started: boolean }) {
  const hasImage = useImageExists("hero/product.png");

  // Pointer tilt — subtle parallax that tracks the cursor.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 18 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 18 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      className="perspective-hero relative flex scale-[0.82] items-center justify-center sm:scale-90 lg:scale-100"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      animate={started ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* golden glow behind the product */}
      <div className="absolute aspect-square w-[78%] rounded-full bg-[radial-gradient(circle,rgba(200,160,99,0.42),transparent_62%)] blur-2xl" />

      {/* slow float loop wrapper */}
      <motion.div
        className="relative"
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <Steam className="-top-6 left-1/2 h-24 w-40 -translate-x-1/2" count={7} />

        {hasImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="hero/product.png"
            alt="La Vigor signature iced caramel mocha beside a chocolate glazed donut"
            className="relative z-10 w-[min(72vw,460px)] select-none drop-shadow-[0_40px_80px_rgba(15,9,5,0.6)]"
            draggable={false}
          />
        ) : (
          <CssProduct />
        )}

        {/* reflection */}
        <div className="absolute inset-x-8 -bottom-8 h-16 rounded-[50%] bg-espresso-950/60 blur-xl" />
      </motion.div>
    </motion.div>
  );
}

/**
 * Art-directed CSS fallback — a layered iced caramel mocha in a tall glass
 * with whipped cream, caramel drizzle and a straw, beside a chocolate donut.
 */
function CssProduct() {
  return (
    <div className="relative z-10 flex w-[min(72vw,440px)] items-end justify-center gap-0">
      {/* ── Glass ── */}
      <div className="relative h-[360px] w-[150px] -rotate-2">
        {/* straw */}
        <div className="absolute -top-6 left-[58%] h-[120px] w-3 -rotate-12 rounded-full bg-gradient-to-b from-gold-200 to-gold-400 shadow-md" />
        {/* glass body */}
        <div className="absolute inset-0 overflow-hidden rounded-b-[26px] rounded-t-[14px] border border-white/30 bg-white/10 backdrop-blur-[2px]">
          {/* drink layers */}
          <div className="absolute inset-x-0 bottom-0 top-[26%]">
            <div className="h-[16%] bg-[#c9a36a]" />
            <div className="h-[30%] bg-gradient-to-b from-[#a8743e] to-[#6e4429]" />
            <div className="h-[54%] bg-gradient-to-b from-[#4a2c1a] to-[#241208]" />
            {/* ice shards */}
            <span className="absolute left-3 top-3 h-8 w-8 rotate-12 rounded-md bg-white/20" />
            <span className="absolute right-4 top-8 h-7 w-7 -rotate-6 rounded-md bg-white/15" />
            <span className="absolute left-6 top-12 h-6 w-6 rotate-45 rounded-md bg-white/10" />
          </div>
          {/* glass highlight */}
          <div className="absolute inset-y-0 left-2 w-3 rounded-full bg-white/30 blur-[1px]" />
          {/* LV band */}
          <div className="absolute left-1/2 top-[46%] flex h-9 w-[78%] -translate-x-1/2 items-center justify-center rounded-full bg-cream-100/90">
            <span className="script-accent text-lg text-espresso-800">LV</span>
          </div>
        </div>
        {/* whipped cream dome */}
        <div className="absolute -top-7 left-1/2 h-16 w-[140px] -translate-x-1/2 rounded-[50%] bg-gradient-to-b from-cream-50 to-cream-200 shadow-[0_6px_16px_rgba(46,27,17,0.3)]" />
        {/* caramel drizzle */}
        <svg viewBox="0 0 140 40" className="absolute -top-5 left-1/2 h-10 w-[140px] -translate-x-1/2">
          <path d="M14 8c10 14 22-6 34 8s22-4 34 8 22-2 30 6" fill="none" stroke="#a8743e" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
        </svg>
      </div>

      {/* ── Donut ── */}
      <div className="relative -ml-6 mb-2 size-[150px] rotate-6">
        {/* dough */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#8a5e3b] to-[#4a2c1a] shadow-[0_18px_36px_rgba(15,9,5,0.5)]" />
        {/* chocolate glaze */}
        <div className="absolute inset-[6px] rounded-full bg-gradient-to-br from-[#43291a] to-[#241208]" />
        {/* hole */}
        <div className="absolute left-1/2 top-1/2 size-[46px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-espresso-950 shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)]" />
        {/* sprinkles */}
        {[
          ["18%", "30%", "12deg", "#E8D29C"],
          ["26%", "62%", "-20deg", "#F8F2E8"],
          ["60%", "20%", "40deg", "#C8A063"],
          ["68%", "66%", "8deg", "#E7DAC4"],
          ["44%", "12%", "-32deg", "#F4E6C8"],
          ["50%", "78%", "24deg", "#C8A063"],
          ["80%", "44%", "-10deg", "#F8F2E8"],
        ].map(([top, left, rot, color], i) => (
          <span
            key={i}
            className="absolute h-[3px] w-3 rounded-full"
            style={{ top, left, background: color as string, transform: `rotate(${rot})` }}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroProduct;
