import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Inbox, Hammer, FileText, Briefcase, Building2, ShieldCheck, Users,
  CreditCard, PlusCircle, MessagesSquare, ArrowRight, TrendingUp, MapPin,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { StatCard } from '../components/StatCard';
import { Card, CardHeader, Badge, Button, EmptyState, Avatar, ProgressBar } from '../components/ui';
import { formatCurrency, formatRelative, formatDate } from '../lib/format';
import { requestStatusTone, leadStatusTone } from '../lib/status';
import { serviceLabel } from '../lib/services';

export default function DashboardPage() {
  const { user } = useAuth();
  if (user?.role === 'admin') return <AdminDashboard />;
  if (user?.role === 'aannemer') return <ContractorDashboard />;
  return <CustomerDashboard />;
}

// ---------------------------------------------------------------------------
// Admin
// ---------------------------------------------------------------------------
function AdminDashboard() {
  const { aanvragen, bouwbedrijven } = useData();
  const navigate = useNavigate();
  const all = aanvragen.items;
  const nieuw = all.filter((a) => a.status === 'Nieuw');
  const gewonnen = all.filter((a) => a.status === 'Gewonnen');
  const teVerifieren = bouwbedrijven.items.filter((b) => !b.verified);
  const leadwaarde = all.filter((a) => a.status !== 'Verloren').reduce((s, a) => s + a.value, 0);

  return (
    <div>
      <div className="abp-dash-hero p-6 sm:p-7 mb-6">
        <span className="abp-eyebrow abp-eyebrow-light">Platformbeheer</span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-2">Platform dashboard</h1>
        <p className="text-sm text-white/70 mt-1">Overzicht van alle aanvragen, bouwbedrijven en klanten op AanbouwPlatform.nl.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <StatCard label="Alle aanvragen" value={all.length} icon={<Inbox size={18} />} tone="navy" onClick={() => navigate('/aanbouw/aanvragen')} hint={`${nieuw.length} nieuw`} />
        <StatCard label="Bouwbedrijven" value={bouwbedrijven.items.length} icon={<Building2 size={18} />} tone="blue" onClick={() => navigate('/aanbouw/bouwbedrijven')} hint={`${teVerifieren.length} te verifiëren`} />
        <StatCard label="Gewonnen projecten" value={gewonnen.length} icon={<Briefcase size={18} />} tone="green" hint={formatCurrency(gewonnen.reduce((s, a) => s + a.value, 0))} />
        <StatCard label="Open leadwaarde" value={formatCurrency(leadwaarde)} icon={<TrendingUp size={18} />} tone="orange" onClick={() => navigate('/aanbouw/statistieken')} />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="p-5 lg:col-span-2">
          <CardHeader title="Recente aanvragen" subtitle="Nieuwste aanvragen die binnenkwamen" icon={<Inbox size={16} />}
            action={<Button size="sm" variant="ghost" onClick={() => navigate('/aanbouw/aanvragen')}>Alle <ArrowRight size={14} /></Button>} />
          <div className="space-y-1.5">
            {all.slice(0, 6).map((a) => {
              const company = bouwbedrijven.items.find((b) => b.id === a.assignedCompanyId);
              return (
                <div key={a.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[var(--abp-surface-2)] transition-colors">
                  <span className="w-9 h-9 rounded-lg bg-[var(--abp-navy)]/8 text-[var(--abp-navy)] flex items-center justify-center shrink-0"><Hammer size={16} /></span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold truncate">{a.buildType} — {a.klantName}</p>
                    <p className="text-[11px] text-[var(--abp-muted)] truncate">{a.plaats} · {company ? company.name : 'Nog niet toegewezen'} · {formatRelative(a.createdAt)}</p>
                  </div>
                  <span className="text-sm font-semibold text-[var(--abp-navy)] hidden sm:block">{formatCurrency(a.value)}</span>
                  <Badge tone={requestStatusTone[a.status]}>{a.status}</Badge>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-5">
          <CardHeader title="Te verifiëren" subtitle="Bouwbedrijven die wachten op goedkeuring" icon={<ShieldCheck size={16} />} />
          {teVerifieren.length === 0 ? (
            <EmptyState title="Alles geverifieerd" description="Er staan geen bouwbedrijven in de wachtrij." />
          ) : (
            <div className="space-y-2">
              {teVerifieren.map((b) => (
                <div key={b.id} className="flex items-center gap-3 p-2.5 rounded-xl border border-[var(--abp-border)]">
                  <Avatar name={b.name} color={b.accentColor} size={36} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold truncate">{b.name}</p>
                    <p className="text-[11px] text-[var(--abp-muted)] truncate">{b.city} · {b.region}</p>
                  </div>
                  <Button size="sm" variant="navy" onClick={() => navigate('/aanbouw/bouwbedrijven')}>Bekijk</Button>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Aannemer
// ---------------------------------------------------------------------------
function ContractorDashboard() {
  const { aanvragen, offertes, myCompany } = useData();
  const navigate = useNavigate();
  const mine = aanvragen.visible;
  const nieuweAanvragen = mine.filter((a) => a.leadStatus === 'Nieuw');
  const geaccepteerd = mine.filter((a) => a.leadStatus === 'Geaccepteerd' && !['Gewonnen', 'Verloren'].includes(a.status));
  const offertesInBehandeling = offertes.visible.filter((o) => o.status === 'Verzonden');
  const gewonnen = mine.filter((a) => a.status === 'Gewonnen');

  return (
    <div>
      <div className="abp-dash-hero p-6 sm:p-7 mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="abp-eyebrow abp-eyebrow-light">{myCompany?.verified ? 'Geverifieerd bouwbedrijf' : 'Bouwbedrijf'}</span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-2">Welkom, {myCompany?.contactPerson?.split(' ')[0] ?? 'aannemer'}</h1>
          <p className="text-sm text-white/70 mt-1">{myCompany?.name} — uw leads, offertes en projecten in één overzicht.</p>
        </div>
        {myCompany?.verified && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm text-white">
            <ShieldCheck size={15} className="text-emerald-400" /> Geverifieerd
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <StatCard label="Nieuwe aanvragen" value={nieuweAanvragen.length} icon={<Hammer size={18} />} tone="orange" onClick={() => navigate('/aanbouw/leads')} hint="Wachten op reactie" />
        <StatCard label="Geaccepteerde leads" value={geaccepteerd.length} icon={<Inbox size={18} />} tone="navy" onClick={() => navigate('/aanbouw/leads')} />
        <StatCard label="Offertes in behandeling" value={offertesInBehandeling.length} icon={<FileText size={18} />} tone="blue" onClick={() => navigate('/aanbouw/offertes')} />
        <StatCard label="Gewonnen projecten" value={gewonnen.length} icon={<Briefcase size={18} />} tone="green" onClick={() => navigate('/aanbouw/projecten')} hint={formatCurrency(gewonnen.reduce((s, a) => s + a.value, 0))} />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="p-5 lg:col-span-2">
          <CardHeader title="Nieuwe aanvragen voor u" subtitle="Toegewezen leads die wachten op acceptatie" icon={<Hammer size={16} />}
            action={<Button size="sm" variant="ghost" onClick={() => navigate('/aanbouw/leads')}>Alle <ArrowRight size={14} /></Button>} />
          {nieuweAanvragen.length === 0 ? (
            <EmptyState title="Geen nieuwe aanvragen" description="Zodra de beheerder een lead toewijst, verschijnt deze hier." />
          ) : (
            <div className="space-y-1.5">
              {nieuweAanvragen.slice(0, 5).map((a) => (
                <div key={a.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[var(--abp-surface-2)] transition-colors">
                  <span className="w-9 h-9 rounded-lg bg-[var(--abp-accent)]/12 text-[var(--abp-accent-strong)] flex items-center justify-center shrink-0"><Hammer size={16} /></span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold truncate">{a.buildType} — {a.plaats}</p>
                    <p className="text-[11px] text-[var(--abp-muted)] truncate">{a.oppervlakte ? `${a.oppervlakte} m² · ` : ''}{a.afwerking} · {formatRelative(a.createdAt)}</p>
                  </div>
                  <span className="text-sm font-semibold text-[var(--abp-navy)] hidden sm:block">{formatCurrency(a.value)}</span>
                  <Badge tone={leadStatusTone[a.leadStatus]} dot>{a.leadStatus}</Badge>
                </div>
              ))}
            </div>
          )}
        </Card>

        <div className="space-y-5">
          <Card className="p-5">
            <CardHeader title="Leadkosten & credits" icon={<CreditCard size={16} />} />
            <div className="flex items-end justify-between mb-2">
              <p className="text-3xl font-bold text-[var(--abp-navy)]">{myCompany?.credits ?? 0}</p>
              <span className="text-xs text-[var(--abp-muted)]">credits</span>
            </div>
            <ProgressBar value={Math.min(100, (myCompany?.credits ?? 0) * 5)} />
            <p className="text-[11px] text-[var(--abp-muted)] mt-2">€{myCompany?.leadPrice ?? 0} per geaccepteerde lead.</p>
            <Button size="sm" variant="secondary" className="w-full mt-3" onClick={() => navigate('/aanbouw/credits')}>Credits beheren</Button>
          </Card>

          <Card className="p-5">
            <CardHeader title="Mijn diensten" icon={<MapPin size={16} />} />
            <div className="flex flex-wrap gap-1.5">
              {(myCompany?.services ?? []).slice(0, 6).map((s) => <Badge key={s} tone="slate">{serviceLabel(s)}</Badge>)}
            </div>
            <Button size="sm" variant="ghost" className="mt-3" onClick={() => navigate('/aanbouw/diensten')}>Diensten beheren <ArrowRight size={14} /></Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Klant
// ---------------------------------------------------------------------------
function CustomerDashboard() {
  const { aanvragen, offertes, berichten } = useData();
  const navigate = useNavigate();
  const mine = aanvragen.visible;
  const myOffertes = offertes.visible.filter((o) => o.status !== 'Concept');
  const myIds = new Set(mine.map((a) => a.id));
  const myBerichten = berichten.items.filter((m) => myIds.has(m.aanvraagId));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Mijn aanbouwproject</h1>
        <p className="text-sm text-[var(--abp-muted)] mt-1">Plaats een aanvraag, volg de status en bekijk offertes van bouwbedrijven.</p>
      </div>

      {/* Hero CTA */}
      <Card className="p-6 mb-6 abp-navy-panel border-0 text-white overflow-hidden relative">
        <div className="relative z-10 max-w-xl">
          <h2 className="text-xl font-bold text-white">Klaar voor je volgende stap?</h2>
          <p className="text-white/70 text-sm mt-1.5 mb-4">Plaats gratis en vrijblijvend een aanvraag. Geverifieerde bouwbedrijven in jouw regio reageren met een passende offerte.</p>
          <Button variant="primary" onClick={() => navigate('/aanbouw/nieuwe-aanvraag')} icon={<PlusCircle size={16} />}>Nieuwe aanvraag plaatsen</Button>
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
        <StatCard label="Mijn aanvragen" value={mine.length} icon={<Inbox size={18} />} tone="navy" onClick={() => navigate('/aanbouw/mijn-aanvragen')} />
        <StatCard label="Ontvangen offertes" value={myOffertes.length} icon={<FileText size={18} />} tone="orange" onClick={() => navigate('/aanbouw/berichten')} />
        <StatCard label="Berichten" value={myBerichten.length} icon={<MessagesSquare size={18} />} tone="blue" onClick={() => navigate('/aanbouw/berichten')} />
      </div>

      <Card className="p-5">
        <CardHeader title="Mijn aanvragen" subtitle="Status van je lopende projecten" icon={<Inbox size={16} />}
          action={<Button size="sm" variant="ghost" onClick={() => navigate('/aanbouw/mijn-aanvragen')}>Alle <ArrowRight size={14} /></Button>} />
        {mine.length === 0 ? (
          <EmptyState title="Nog geen aanvragen" description="Plaats je eerste aanvraag om offertes te ontvangen."
            action={<Button onClick={() => navigate('/aanbouw/nieuwe-aanvraag')} icon={<PlusCircle size={16} />}>Nieuwe aanvraag</Button>} />
        ) : (
          <div className="space-y-1.5">
            {mine.map((a) => (
              <div key={a.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[var(--abp-surface-2)] transition-colors">
                <span className="w-9 h-9 rounded-lg bg-[var(--abp-accent)]/12 text-[var(--abp-accent-strong)] flex items-center justify-center shrink-0"><Hammer size={16} /></span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold truncate">{a.buildType} — {a.plaats}</p>
                  <p className="text-[11px] text-[var(--abp-muted)] truncate">{a.number} · ingediend {formatDate(a.createdAt)}</p>
                </div>
                <Badge tone={requestStatusTone[a.status]}>{a.status}</Badge>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
