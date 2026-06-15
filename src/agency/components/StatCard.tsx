import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from './ui';
import { Sparkline } from './charts';

export function StatCard({
  label, value, delta, icon, spark, sparkColor = '#3B82F6', suffix,
}: {
  label: string;
  value: React.ReactNode;
  delta?: number;
  icon?: React.ReactNode;
  spark?: number[];
  sparkColor?: string;
  suffix?: string;
}) {
  const up = (delta ?? 0) >= 0;
  return (
    <Card hover className="p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium text-[var(--acc-muted)] truncate">{label}</p>
          <p className="text-2xl font-bold mt-1.5 tracking-tight tabular-nums">
            {value}
            {suffix && <span className="text-sm text-[var(--acc-muted)] ml-1 font-medium">{suffix}</span>}
          </p>
          {typeof delta === 'number' && (
            <div className={`inline-flex items-center gap-1 mt-2 text-xs font-semibold ${up ? 'text-emerald-400' : 'text-red-400'}`}>
              {up ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
              {up ? '+' : ''}{delta}%
              <span className="text-[var(--acc-muted)] font-normal ml-1">vs vorige maand</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="w-10 h-10 rounded-xl acc-glass flex items-center justify-center text-blue-300 shrink-0">
            {icon}
          </div>
        )}
      </div>
      {spark && spark.length > 1 && (
        <div className="mt-3 -mb-1">
          <Sparkline data={spark} color={sparkColor} width={260} height={34} />
        </div>
      )}
    </Card>
  );
}
