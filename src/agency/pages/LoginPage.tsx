import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ROLE_LABELS } from '../lib/rbac';
import { Button, Spinner, cn } from '../components/ui';
import type { Role } from '../types';

const DEMO_ACCOUNTS: { email: string; role: Role; name: string }[] = [
  { email: 'offerte@prefabselect.nl', role: 'super_admin', name: 'Sjoerd Westrik' },
  { email: 'lisa@agency.nl', role: 'admin', name: 'Lisa de Vries' },
  { email: 'daan@agency.nl', role: 'marketeer', name: 'Daan Bakker' },
  { email: 'noa@agency.nl', role: 'sales', name: 'Noa Jansen' },
  { email: 'mark@luckyzonwering.nl', role: 'klant', name: 'Mark Lucky' },
];

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('offerte@prefabselect.nl');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || busy) return;
    setBusy(true);
    await login(email);
    navigate('/agency/dashboard');
  };

  return (
    <div className="acc-root min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Brand side */}
        <div className="hidden lg:block">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-xl shadow-blue-500/30">
              <Sparkles size={24} className="text-white" />
            </div>
            <div>
              <p className="text-xl font-bold acc-gradient-text">Agency Command Center</p>
              <p className="text-xs text-[var(--acc-muted)] tracking-wide">MARKETING OPERATING SYSTEM</p>
            </div>
          </div>
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Bestuur al je klanten<br />vanuit één <span className="acc-gradient-text">command center</span>.
          </h1>
          <p className="text-[var(--acc-muted)] text-base leading-relaxed max-w-md mb-8">
            Leads, offertes, campagnes, projecten, AI-agents en rapportages — alles voor jouw marketingbureau op één plek.
          </p>
          <div className="grid grid-cols-2 gap-3 max-w-md">
            {['Leads & CRM pipeline', 'Meta Ads & Analytics', 'AI Agents & Command', 'Projecten & GitHub'].map((f) => (
              <div key={f} className="acc-card p-3 text-sm flex items-center gap-2">
                <ShieldCheck size={15} className="text-emerald-400 shrink-0" /> {f}
              </div>
            ))}
          </div>
        </div>

        {/* Form side */}
        <div className="acc-glass-strong rounded-3xl p-8 shadow-2xl">
          <div className="lg:hidden flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
              <Sparkles size={20} className="text-white" />
            </div>
            <p className="font-bold acc-gradient-text">Agency Command Center</p>
          </div>
          <h2 className="text-2xl font-bold mb-1">Welkom terug</h2>
          <p className="text-sm text-[var(--acc-muted)] mb-6">Log in om je dashboard te openen.</p>

          <form onSubmit={submit} className="space-y-4">
            <label className="block">
              <span className="block text-xs font-semibold text-[var(--acc-muted)] mb-1.5">E-mailadres</span>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--acc-muted)]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="acc-input w-full pl-10 pr-3 py-3 text-sm"
                  placeholder="jij@bureau.nl"
                  autoComplete="email"
                />
              </div>
            </label>
            <Button type="submit" disabled={busy} className="w-full py-3" icon={busy ? <Spinner /> : undefined}>
              {busy ? 'Inloggen…' : 'Inloggen'} {!busy && <ArrowRight size={16} />}
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-[var(--acc-border)]">
            <p className="text-[11px] uppercase tracking-wider text-[var(--acc-muted)] font-semibold mb-2">Demo-accounts (klik om in te loggen)</p>
            <div className="space-y-1.5">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.email}
                  onClick={async () => { setBusy(true); await login(acc.email); navigate('/agency/dashboard'); }}
                  className={cn('w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl acc-glass hover:border-white/20 border border-transparent transition-colors text-left')}
                >
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold truncate">{acc.name}</span>
                    <span className="block text-[10px] text-[var(--acc-muted)] truncate">{acc.email}</span>
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-violet-500/15 text-violet-300 border border-violet-400/20 shrink-0">{ROLE_LABELS[acc.role]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
