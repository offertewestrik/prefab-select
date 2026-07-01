import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Mail, ArrowRight, ShieldCheck, Hammer, Users, Building2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ROLE_LABELS } from '../lib/rbac';
import { Button, Spinner, cn } from '../components/ui';
import type { Role } from '../types';

const DEMO_ACCOUNTS: { email: string; role: Role; name: string; icon: React.ReactNode }[] = [
  { email: 'admin@aanbouwplatform.nl', role: 'admin', name: 'Platform Beheer', icon: <Building2 size={15} /> },
  { email: 'aannemer@aanbouwplatform.nl', role: 'aannemer', name: 'Brabant Bouw Experts', icon: <Hammer size={15} /> },
  { email: 'klant@aanbouwplatform.nl', role: 'klant', name: 'Familie Jansen', icon: <Users size={15} /> },
];

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('aannemer@aanbouwplatform.nl');
  const [busy, setBusy] = useState(false);

  const go = async (value: string) => {
    if (!value.trim() || busy) return;
    setBusy(true);
    await login(value);
    navigate('/aanbouw/dashboard');
  };

  return (
    <div className="abp-root min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Brand side */}
        <div className="hidden lg:block">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[var(--abp-accent)] flex items-center justify-center shadow-xl shadow-orange-500/30">
              <Home size={24} className="text-white" />
            </div>
            <div>
              <p className="text-xl font-bold text-[var(--abp-navy)]">AanbouwPlatform<span className="text-[var(--abp-accent)]">.nl</span></p>
              <p className="text-xs text-[var(--abp-muted)] tracking-wide">HÉT PLATFORM VOOR WONINGUITBREIDING</p>
            </div>
          </div>
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Van aanvraag tot<br /><span className="text-[var(--abp-accent)]">opgeleverd project</span>.
          </h1>
          <p className="text-[var(--abp-muted)] text-base leading-relaxed max-w-md mb-8">
            Particulieren vinden geverifieerde bouwbedrijven voor élke woninguitbreiding — aanbouw, uitbouw, dakopbouw, mantelzorgwoning, poolhouse, veranda, tuinkantoor of prefab woning. Aannemers ontvangen gerichte aanvragen in hun werkgebied.
          </p>
          <div className="grid grid-cols-2 gap-3 max-w-md">
            {['Geverifieerde bouwbedrijven', 'Gerichte aanvragen per regio', 'Offertes & berichten op één plek', 'Projecten van €30k tot €150k'].map((f) => (
              <div key={f} className="abp-card p-3 text-sm flex items-center gap-2">
                <ShieldCheck size={15} className="text-emerald-500 shrink-0" /> <span className="text-[var(--abp-text)]">{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form side */}
        <div className="abp-card p-8 shadow-xl">
          <div className="lg:hidden flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[var(--abp-accent)] flex items-center justify-center">
              <Home size={20} className="text-white" />
            </div>
            <p className="font-bold text-[var(--abp-navy)]">AanbouwPlatform<span className="text-[var(--abp-accent)]">.nl</span></p>
          </div>
          <h2 className="text-2xl font-bold mb-1">Welkom terug</h2>
          <p className="text-sm text-[var(--abp-muted)] mb-6">Log in op je dashboard.</p>

          <form onSubmit={(e) => { e.preventDefault(); go(email); }} className="space-y-4">
            <label className="block">
              <span className="block text-xs font-semibold text-[var(--abp-muted)] mb-1.5">E-mailadres</span>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--abp-faint)]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="abp-input w-full pl-10 pr-3 py-3 text-sm"
                  placeholder="jij@bedrijf.nl"
                  autoComplete="email"
                />
              </div>
            </label>
            <Button type="submit" disabled={busy} className="w-full py-3" icon={busy ? <Spinner /> : undefined}>
              {busy ? 'Inloggen…' : 'Inloggen'} {!busy && <ArrowRight size={16} />}
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-[var(--abp-border)]">
            <p className="text-[11px] uppercase tracking-wider text-[var(--abp-faint)] font-semibold mb-2">Demo-accounts (klik om in te loggen)</p>
            <div className="space-y-1.5">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.email}
                  onClick={() => go(acc.email)}
                  className={cn('w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[var(--abp-surface-2)] hover:bg-white border border-[var(--abp-border)] hover:border-[var(--abp-accent)] transition-colors text-left')}
                >
                  <span className="w-8 h-8 rounded-lg bg-[var(--abp-navy)]/8 text-[var(--abp-navy)] flex items-center justify-center shrink-0">{acc.icon}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-semibold truncate">{acc.name}</span>
                    <span className="block text-[10px] text-[var(--abp-muted)] truncate">{acc.email}</span>
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[var(--abp-accent)]/12 text-[var(--abp-accent-strong)] border border-[var(--abp-accent)]/25 shrink-0">{ROLE_LABELS[acc.role]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
