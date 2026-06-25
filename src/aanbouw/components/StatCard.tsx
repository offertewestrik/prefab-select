import React from 'react';
import { cn } from './ui';

/** Compact metric tile used across the dashboards. */
export function StatCard({
  label, value, icon, tone = 'navy', hint, onClick,
}: {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  tone?: 'navy' | 'orange' | 'green' | 'amber' | 'red' | 'blue';
  hint?: string;
  onClick?: () => void;
}) {
  const tones: Record<string, string> = {
    navy: 'text-[#0e2a47] bg-[#0e2a47]/8',
    orange: 'text-[#c2410c] bg-[#f97316]/12',
    green: 'text-emerald-700 bg-emerald-500/12',
    amber: 'text-amber-700 bg-amber-500/15',
    red: 'text-red-700 bg-red-500/12',
    blue: 'text-sky-700 bg-sky-500/12',
  };
  return (
    <div
      className={cn('abp-card abp-statcard-accent p-4 sm:p-5', onClick && 'abp-card-hover cursor-pointer')}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-[var(--abp-muted)] truncate">{label}</p>
          <p className="text-2xl font-bold text-[var(--abp-navy)] mt-1 leading-none">{value}</p>
          {hint && <p className="text-[11px] text-[var(--abp-faint)] mt-1.5">{hint}</p>}
        </div>
        {icon && <span className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', tones[tone])}>{icon}</span>}
      </div>
    </div>
  );
}
