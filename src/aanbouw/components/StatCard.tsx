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
  const iconTone: Record<string, string> = {
    navy: 'text-[#1e3a5f]', orange: 'text-[#c2410c]', green: 'text-emerald-600',
    amber: 'text-amber-600', red: 'text-red-600', blue: 'text-sky-600',
  };
  return (
    <div
      className={cn('abp-card p-5 sm:p-6', onClick && 'abp-card-hover cursor-pointer')}
      onClick={onClick}
    >
      <div className="flex items-center justify-between gap-3 mb-3.5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--abp-faint)] truncate">{label}</p>
        {icon && <span className={cn('shrink-0 opacity-80', iconTone[tone])}>{icon}</span>}
      </div>
      <p className="text-[1.85rem] font-bold text-[var(--abp-navy)] leading-none tracking-tight">{value}</p>
      {hint && <p className="text-xs text-[var(--abp-muted)] mt-2.5">{hint}</p>}
    </div>
  );
}
