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
    <div className={cn('acc-card', hover && 'acc-card-hover', className)} {...rest}>
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, action, icon }: { title: React.ReactNode; subtitle?: React.ReactNode; action?: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3 mb-4">
      <div className="flex items-center gap-3 min-w-0">
        {icon && <div className="text-blue-400 shrink-0">{icon}</div>}
        <div className="min-w-0">
          <h3 className="text-sm font-semibold truncate">{title}</h3>
          {subtitle && <p className="text-xs text-[var(--acc-muted)] mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Button
// ---------------------------------------------------------------------------
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md';

const buttonStyles: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 hover:bg-blue-500 text-white border border-blue-400/30 shadow-[0_8px_24px_-10px_rgba(59,130,246,0.7)]',
  secondary: 'acc-glass-strong hover:border-white/30 text-[var(--acc-text)]',
  ghost: 'hover:bg-white/5 text-[var(--acc-muted)] hover:text-[var(--acc-text)]',
  danger: 'bg-red-500/90 hover:bg-red-500 text-white border border-red-400/30',
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
      className={cn('inline-flex items-center justify-center w-9 h-9 rounded-xl text-[var(--acc-muted)] hover:text-[var(--acc-text)] hover:bg-white/5 transition-colors', className)}
      {...rest}
    >
      {children}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Badge
// ---------------------------------------------------------------------------
export type BadgeTone = 'blue' | 'green' | 'amber' | 'red' | 'purple' | 'slate' | 'cyan';

const badgeTones: Record<BadgeTone, string> = {
  blue: 'bg-blue-500/15 text-blue-300 border-blue-400/20',
  green: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/20',
  amber: 'bg-amber-500/15 text-amber-300 border-amber-400/20',
  red: 'bg-red-500/15 text-red-300 border-red-400/20',
  purple: 'bg-violet-500/15 text-violet-300 border-violet-400/20',
  slate: 'bg-white/8 text-[var(--acc-muted)] border-white/10',
  cyan: 'bg-cyan-500/15 text-cyan-300 border-cyan-400/20',
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
      style={{ width: size, height: size, fontSize: size * 0.36, background: color ?? '#3B82F6' }}
      title={name}
    >
      {initials(name)}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Progress
// ---------------------------------------------------------------------------
export function ProgressBar({ value, tone = '#3B82F6', className }: { value: number; tone?: string; className?: string }) {
  return (
    <div className={cn('h-1.5 rounded-full bg-white/8 overflow-hidden', className)}>
      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, Math.max(0, value))}%`, background: tone }} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Inputs
// ---------------------------------------------------------------------------
export function Input({ className, ...rest }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn('acc-input px-3.5 py-2.5 text-sm w-full', className)} {...rest} />;
}

export function Textarea({ className, ...rest }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn('acc-input px-3.5 py-2.5 text-sm w-full resize-y', className)} {...rest} />;
}

export function Select({ className, children, ...rest }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn('acc-input px-3.5 py-2.5 text-sm w-full appearance-none cursor-pointer [&>option]:bg-[#0d1322] [&>option]:text-white', className)} {...rest}>
      {children}
    </select>
  );
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-[var(--acc-muted)] mb-1.5">{label}</span>
      {children}
      {hint && <span className="block text-[11px] text-[var(--acc-muted)] mt-1">{hint}</span>}
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
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto acc-scroll p-4 sm:p-8" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className={cn('relative acc-glass-strong rounded-2xl w-full my-8 shadow-2xl', wide ? 'max-w-3xl' : 'max-w-lg')}>
        <div className="flex items-center justify-between gap-3 px-6 py-4 border-b border-[var(--acc-border)]">
          <h3 className="text-base font-semibold">{title}</h3>
          <IconButton onClick={onClose} aria-label="Sluiten">✕</IconButton>
        </div>
        <div className="px-6 py-5 max-h-[70vh] overflow-y-auto acc-scroll">{children}</div>
        {footer && <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-[var(--acc-border)]">{footer}</div>}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tabs
// ---------------------------------------------------------------------------
export function Tabs({ tabs, active, onChange }: { tabs: { id: string; label: string; count?: number }[]; active: string; onChange: (id: string) => void }) {
  return (
    <div className="flex items-center gap-1 p-1 rounded-xl acc-glass w-fit max-w-full overflow-x-auto acc-scroll">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={cn(
            'px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors',
            active === t.id ? 'bg-white/10 text-white' : 'text-[var(--acc-muted)] hover:text-white',
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
    <div className="overflow-x-auto acc-scroll -mx-1">
      <table className="w-full text-sm border-collapse min-w-[640px]">{children}</table>
    </div>
  );
}
export function Th({ children, className }: { children?: React.ReactNode; className?: string }) {
  return <th className={cn('text-left text-[11px] uppercase tracking-wider font-semibold text-[var(--acc-muted)] px-3 py-2.5', className)}>{children}</th>;
}
export function Td({ children, className }: { children?: React.ReactNode; className?: string }) {
  return <td className={cn('px-3 py-3 border-t border-[var(--acc-border)] align-middle', className)}>{children}</td>;
}

// ---------------------------------------------------------------------------
// Misc
// ---------------------------------------------------------------------------
export function EmptyState({ icon, title, description, action }: { icon?: React.ReactNode; title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-6">
      {icon && <div className="text-[var(--acc-muted)] mb-3 opacity-60">{icon}</div>}
      <p className="font-semibold">{title}</p>
      {description && <p className="text-sm text-[var(--acc-muted)] mt-1 max-w-sm">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function Spinner({ size = 16 }: { size?: number }) {
  return (
    <span
      className="inline-block rounded-full border-2 border-white/20 border-t-blue-400 animate-spin"
      style={{ width: size, height: size }}
    />
  );
}

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-[var(--acc-muted)] mt-1">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
    </div>
  );
}
