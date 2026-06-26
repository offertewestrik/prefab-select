import React from 'react';
import { initials } from '../../lib/format';

/** Tiny classnames joiner. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------
export function Card({ className, hover, children, ...rest }: React.HTMLAttributes<HTMLDivElement> & { hover?: boolean }) {
  return (
    <div className={cn('abp-card', hover && 'abp-card-hover', className)} {...rest}>
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, action, icon }: { title: React.ReactNode; subtitle?: React.ReactNode; action?: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3 mb-4">
      <div className="flex items-center gap-3 min-w-0">
        {icon && <div className="text-[var(--abp-accent)] shrink-0">{icon}</div>}
        <div className="min-w-0">
          <h3 className="text-sm font-semibold truncate">{title}</h3>
          {subtitle && <p className="text-xs text-[var(--abp-muted)] mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Button
// ---------------------------------------------------------------------------
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'navy';
type ButtonSize = 'sm' | 'md';

const buttonStyles: Record<ButtonVariant, string> = {
  primary: 'bg-[var(--abp-accent)] hover:bg-[var(--abp-accent-strong)] text-white shadow-[0_10px_24px_-12px_rgba(249,115,22,0.8)]',
  navy: 'bg-[var(--abp-navy)] hover:bg-[var(--abp-navy-2)] text-white shadow-[0_10px_24px_-14px_rgba(14,42,71,0.8)]',
  secondary: 'bg-white border border-[var(--abp-border-strong)] hover:border-[var(--abp-navy)] text-[var(--abp-navy)]',
  ghost: 'hover:bg-[var(--abp-surface-2)] text-[var(--abp-muted)] hover:text-[var(--abp-text)]',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
};

export function Button({
  variant = 'primary', size = 'md', icon, className, children, ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; size?: ButtonSize; icon?: React.ReactNode }) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none',
        size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2.5 text-sm',
        buttonStyles[variant],
        className,
      )}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}

export function IconButton({ className, children, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn('inline-flex items-center justify-center w-9 h-9 rounded-xl text-[var(--abp-muted)] hover:text-[var(--abp-text)] hover:bg-[var(--abp-surface-2)] transition-colors', className)}
      {...rest}
    >
      {children}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Badge
// ---------------------------------------------------------------------------
export type BadgeTone = 'navy' | 'orange' | 'green' | 'amber' | 'red' | 'slate' | 'blue';

const badgeTones: Record<BadgeTone, string> = {
  navy: 'bg-[#0e2a47]/10 text-[#0e2a47] border-[#0e2a47]/15',
  orange: 'bg-[#f97316]/12 text-[#c2410c] border-[#f97316]/25',
  green: 'bg-emerald-500/12 text-emerald-700 border-emerald-500/25',
  amber: 'bg-amber-500/15 text-amber-700 border-amber-500/30',
  red: 'bg-red-500/12 text-red-700 border-red-500/25',
  slate: 'bg-slate-500/10 text-slate-600 border-slate-400/25',
  blue: 'bg-sky-500/12 text-sky-700 border-sky-500/25',
};

export function Badge({ tone = 'slate', dot, className, children }: { tone?: BadgeTone; dot?: boolean; className?: string; children: React.ReactNode }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border whitespace-nowrap', badgeTones[tone], className)}>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Avatar
// ---------------------------------------------------------------------------
export function Avatar({ name, color, size = 36 }: { name: string; color?: string; size?: number }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-full font-bold text-white shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.36, background: color ?? 'var(--abp-navy)' }}
      title={name}
    >
      {initials(name)}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Progress
// ---------------------------------------------------------------------------
export function ProgressBar({ value, tone = 'var(--abp-accent)', className }: { value: number; tone?: string; className?: string }) {
  return (
    <div className={cn('h-1.5 rounded-full bg-slate-200 overflow-hidden', className)}>
      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, Math.max(0, value))}%`, background: tone }} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Inputs
// ---------------------------------------------------------------------------
export function Input({ className, ...rest }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn('abp-input px-3.5 py-2.5 text-sm w-full', className)} {...rest} />;
}

export function Textarea({ className, ...rest }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn('abp-input px-3.5 py-2.5 text-sm w-full resize-y', className)} {...rest} />;
}

export function Select({ className, children, ...rest }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn('abp-input px-3.5 py-2.5 text-sm w-full appearance-none cursor-pointer', className)} {...rest}>
      {children}
    </select>
  );
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-[var(--abp-muted)] mb-1.5">{label}</span>
      {children}
      {hint && <span className="block text-[11px] text-[var(--abp-faint)] mt-1">{hint}</span>}
    </label>
  );
}

// ---------------------------------------------------------------------------
// Modal
// ---------------------------------------------------------------------------
export function Modal({ open, onClose, title, children, footer, wide }: {
  open: boolean; onClose: () => void; title: React.ReactNode; children: React.ReactNode; footer?: React.ReactNode; wide?: boolean;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto abp-scroll p-4 sm:p-8" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-[#0e2a47]/40 backdrop-blur-sm" onClick={onClose} />
      <div className={cn('relative bg-white border border-[var(--abp-border)] rounded-2xl w-full my-8 shadow-2xl', wide ? 'max-w-3xl' : 'max-w-lg')}>
        <div className="flex items-center justify-between gap-3 px-6 py-4 border-b border-[var(--abp-border)]">
          <h3 className="text-base font-semibold">{title}</h3>
          <IconButton onClick={onClose} aria-label="Sluiten">✕</IconButton>
        </div>
        <div className="px-6 py-5 max-h-[70vh] overflow-y-auto abp-scroll">{children}</div>
        {footer && <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-[var(--abp-border)] bg-[var(--abp-surface-2)] rounded-b-2xl">{footer}</div>}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tabs
// ---------------------------------------------------------------------------
export function Tabs({ tabs, active, onChange }: { tabs: { id: string; label: string; count?: number }[]; active: string; onChange: (id: string) => void }) {
  return (
    <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--abp-surface-2)] border border-[var(--abp-border)] w-fit max-w-full overflow-x-auto abp-scroll">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={cn(
            'px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors',
            active === t.id ? 'bg-white text-[var(--abp-navy)] shadow-sm' : 'text-[var(--abp-muted)] hover:text-[var(--abp-navy)]',
          )}
        >
          {t.label}
          {typeof t.count === 'number' && <span className="ml-1.5 opacity-60">{t.count}</span>}
        </button>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Table
// ---------------------------------------------------------------------------
export function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto abp-scroll -mx-1">
      <table className="w-full text-sm border-collapse min-w-[640px]">{children}</table>
    </div>
  );
}
export function Th({ children, className }: { children?: React.ReactNode; className?: string }) {
  return <th className={cn('text-left text-[11px] uppercase tracking-wider font-semibold text-[var(--abp-faint)] px-3.5 py-3', className)}>{children}</th>;
}
export function Td({ children, className }: { children?: React.ReactNode; className?: string }) {
  return <td className={cn('px-3.5 py-4 border-t border-[#f1f4f8] align-middle', className)}>{children}</td>;
}

// ---------------------------------------------------------------------------
// Misc
// ---------------------------------------------------------------------------
export function EmptyState({ icon, title, description, action }: { icon?: React.ReactNode; title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-6">
      {icon && <div className="text-[var(--abp-faint)] mb-3">{icon}</div>}
      <p className="font-semibold text-[var(--abp-navy)]">{title}</p>
      {description && <p className="text-sm text-[var(--abp-muted)] mt-1 max-w-sm">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function Spinner({ size = 16 }: { size?: number }) {
  return (
    <span
      className="inline-block rounded-full border-2 border-[var(--abp-border-strong)] border-t-[var(--abp-accent)] animate-spin"
      style={{ width: size, height: size }}
    />
  );
}

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-[var(--abp-muted)] mt-1">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
    </div>
  );
}
