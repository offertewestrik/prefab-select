import { cn } from "../../lib/utils";

/**
 * La Vigor wordmark — a typographic logo treatment in the brand's voice:
 * "La Vigor" set in Fraunces italic (gold), with a tracked "DONUTS CAFE"
 * lockup beneath. Crisp at any size, no image dependency.
 *
 * The full circular badge logo (the supplied PNG) can be dropped in at
 * /public/la-vigor-badge.png and shown via <Badge/> below for the preloader.
 */
export function Logo({
  className,
  onDark = true,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-3 select-none", className)}>
      <BadgeMark className="size-9 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "script-accent text-[1.6rem] leading-none",
            onDark ? "text-gold-300" : "text-espresso-900"
          )}
        >
          La&nbsp;Vigor
        </span>
        <span
          className={cn(
            "mt-0.5 text-[0.5rem] font-semibold uppercase tracking-[0.42em]",
            onDark ? "text-cream-100/70" : "text-espresso-700/70"
          )}
        >
          Donuts&nbsp;Cafe
        </span>
      </span>
    </span>
  );
}

/**
 * Compact circular "LV" badge mark — an SVG echo of the brand badge
 * (gold ring · monogram · steam). Used in the wordmark and the preloader.
 */
export function BadgeMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="lv-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E8D29C" />
          <stop offset="0.5" stopColor="#C8A063" />
          <stop offset="1" stopColor="#A1742F" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="#171411" />
      <circle cx="50" cy="50" r="46" fill="none" stroke="url(#lv-gold)" strokeWidth="3" />
      <circle cx="50" cy="50" r="39" fill="none" stroke="url(#lv-gold)" strokeWidth="1" opacity="0.5" />
      {/* steam */}
      <path
        d="M44 24c-3-3 3-6 0-9M50 24c-3-3 3-6 0-9M56 24c-3-3 3-6 0-9"
        fill="none"
        stroke="url(#lv-gold)"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.8"
      />
      {/* LV monogram */}
      <text
        x="50"
        y="64"
        textAnchor="middle"
        fontFamily="Fraunces, serif"
        fontStyle="italic"
        fontWeight="600"
        fontSize="34"
        fill="url(#lv-gold)"
      >
        LV
      </text>
    </svg>
  );
}

export default Logo;
