import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import type { Product } from '../data/types';

/* ───────────────────────── Button ───────────────────────── */
type ButtonProps = {
  children: React.ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'white';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
};

const variants: Record<string, string> = {
  primary:
    'bg-navy-600 text-white hover:bg-navy-700 shadow-glow hover:shadow-[0_28px_70px_rgba(29,65,145,0.4)]',
  secondary: 'glass text-white hover:bg-white/15',
  ghost: 'text-navy-700 hover:bg-navy-50',
  white: 'bg-white text-navy-800 hover:bg-silver-100 shadow-card',
};
const sizes: Record<string, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-[15px]',
};

export function Button({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled,
}: ButtonProps) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-xl font-semibold tracking-tight transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`;
  if (to) return <Link to={to} className={cls}>{children}</Link>;
  if (href) return <a href={href} className={cls}>{children}</a>;
  return (
    <button type={type} onClick={onClick} className={cls} disabled={disabled}>
      {children}
    </button>
  );
}

/* ───────────────────────── Stars ───────────────────────── */
export function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center" aria-label={`${rating} van 5 sterren`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={i <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-silver-300'}
        />
      ))}
    </span>
  );
}

/* ───────────────────────── Badge ───────────────────────── */
export function Badge({ children, tone = 'navy' }: { children: React.ReactNode; tone?: 'navy' | 'amber' | 'green' | 'sky' }) {
  const tones: Record<string, string> = {
    navy: 'bg-navy-600 text-white',
    amber: 'bg-amber-400 text-navy-900',
    green: 'bg-emerald-500 text-white',
    sky: 'bg-sky-light text-navy-700',
  };
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${tones[tone]}`}>
      {children}
    </span>
  );
}

/* ─────────────────── Product visual (SVG) ─────────────────── */
function KetelArt({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 200 240" className="h-full w-full" aria-hidden>
      <rect x="55" y="30" width="90" height="150" rx="12" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
      <rect x="55" y="30" width="90" height="34" rx="12" fill={accent} />
      <rect x="68" y="78" width="64" height="40" rx="6" fill="#0a1838" />
      <rect x="74" y="86" width="36" height="6" rx="3" fill={accent} />
      <rect x="74" y="98" width="24" height="6" rx="3" fill="#2e9bff" />
      <circle cx="120" cy="138" r="9" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
      <circle cx="80" cy="138" r="9" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
      <rect x="70" y="180" width="10" height="26" rx="3" fill="#cbd5e1" />
      <rect x="120" y="180" width="10" height="26" rx="3" fill="#cbd5e1" />
      <rect x="92" y="180" width="16" height="20" rx="3" fill="#94a3b8" />
    </svg>
  );
}

function BoilerArt({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 200 240" className="h-full w-full" aria-hidden>
      <rect x="62" y="24" width="76" height="170" rx="38" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
      <rect x="62" y="24" width="76" height="48" rx="38" fill={accent} opacity="0.18" />
      <circle cx="100" cy="120" r="22" fill="none" stroke={accent} strokeWidth="4" />
      <path d="M100 104c8 8 8 14 0 22-8-8-8-14 0-22z" fill="#2e9bff" />
      <rect x="86" y="196" width="10" height="24" rx="3" fill="#cbd5e1" />
      <rect x="104" y="196" width="10" height="24" rx="3" fill="#cbd5e1" />
    </svg>
  );
}

function PumpArt({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 200 240" className="h-full w-full" aria-hidden>
      <rect x="44" y="60" width="112" height="120" rx="14" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
      <circle cx="100" cy="120" r="40" fill="#f1f5f9" />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <rect key={deg} x="98" y="84" width="4" height="36" rx="2" fill={accent} transform={`rotate(${deg} 100 120)`} />
      ))}
      <circle cx="100" cy="120" r="8" fill="#0a1838" />
    </svg>
  );
}

function SmallArt({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 200 240" className="h-full w-full" aria-hidden>
      <circle cx="100" cy="120" r="56" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
      <circle cx="100" cy="120" r="40" fill="none" stroke={accent} strokeWidth="4" />
      <rect x="96" y="80" width="8" height="28" rx="4" fill={accent} />
      <circle cx="100" cy="120" r="8" fill="#0a1838" />
    </svg>
  );
}

export function ProductImage({
  product,
  className = '',
  large = false,
  src,
}: {
  product: Product;
  className?: string;
  large?: boolean;
  /** Forceer een specifieke afbeelding (bijv. een galerij-item). */
  src?: string;
}) {
  const Art =
    product.category === 'boilers'
      ? BoilerArt
      : product.category === 'hybride-warmtepompen'
        ? PumpArt
        : product.category === 'cv-ketels'
          ? KetelArt
          : SmallArt;

  const photo = src ?? product.imageUrl;
  const [broken, setBroken] = React.useState(false);

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl ${className}`}
      style={{ background: `radial-gradient(120% 120% at 50% 0%, ${product.accent}14 0%, #f8fafc 55%, #eef3fb 100%)` }}
    >
      <div className="absolute right-3 top-3 z-10 rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-navy-700 backdrop-blur">
        {product.brand}
      </div>
      {photo && !broken ? (
        <img
          src={photo}
          alt={`${product.brand} ${product.model}`}
          loading="lazy"
          onError={() => setBroken(true)}
          className="h-full w-full object-contain p-4"
        />
      ) : (
        <div className={large ? 'h-72 w-56' : 'h-44 w-36'}>
          <Art accent={product.accent} />
        </div>
      )}
    </div>
  );
}

/* ─────────────────── Section header ─────────────────── */
export function SectionHeader({
  eyebrow,
  title,
  sub,
  center,
  light,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  sub?: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div className={`${center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} mb-12`}>
      {eyebrow && (
        <p className={`mb-3 text-xs font-bold uppercase tracking-[0.2em] ${light ? 'text-sky-accent' : 'text-navy-500'}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`font-display text-3xl font-extrabold leading-tight md:text-4xl ${light ? 'text-white' : 'text-navy-900'}`}>
        {title}
      </h2>
      {sub && <p className={`mt-4 text-lg leading-relaxed ${light ? 'text-navy-100' : 'text-silver-500'}`}>{sub}</p>}
    </div>
  );
}
