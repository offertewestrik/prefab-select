/** A single roasted coffee bean — organic SVG, inherits currentColor. */
export function Bean({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 52" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="bean-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7A4E2E" />
          <stop offset="0.55" stopColor="#4A2C1A" />
          <stop offset="1" stopColor="#241208" />
        </linearGradient>
      </defs>
      <ellipse cx="20" cy="26" rx="16" ry="24" fill="url(#bean-g)" transform="rotate(-18 20 26)" />
      <path
        d="M20 6c-5 8-5 32 0 40"
        fill="none"
        stroke="#1c0f07"
        strokeWidth="2.4"
        strokeLinecap="round"
        transform="rotate(-18 20 26)"
        opacity="0.85"
      />
      <ellipse
        cx="14"
        cy="16"
        rx="5"
        ry="9"
        fill="#ffffff"
        opacity="0.07"
        transform="rotate(-18 20 26)"
      />
    </svg>
  );
}

export default Bean;
