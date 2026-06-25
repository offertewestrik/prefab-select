import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Home, Menu, X, ArrowRight, Star, ShieldCheck, Check, Sparkles,
  PencilRuler, Handshake, Hammer, Quote, MapPin, ChevronRight, Box,
} from 'lucide-react';
import { BUILD_TYPES, SERVICES } from '../lib/services';
import { BUILD_ICON, SHOWCASE_PROJECTS, REVIEWS, PLATFORM_STATS } from '../lib/showcase';

/* ========================================================================= */
/*  AanbouwPlatform.nl — premium public homepage (mounted at /aanbouw)        */
/* ========================================================================= */

export default function HomePage() {
  return (
    <div className="abp-root">
      <MarketingNav />
      <Hero />
      <TrustBar />
      <HowItWorks />
      <ConfiguratorSection />
      <Diensten />
      <Projecten />
      <Reviews />
      <CtaBand />
      <Footer />
    </div>
  );
}

/* --- Nav ----------------------------------------------------------------- */
function MarketingNav() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: '#hoe', label: 'Hoe het werkt' },
    { href: '#configurator', label: 'Configurator' },
    { href: '#diensten', label: 'Diensten' },
    { href: '#projecten', label: 'Projecten' },
  ];
  return (
    <header className="abp-mnav">
      <div className="abp-container flex items-center justify-between h-16">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-xl bg-[var(--abp-accent)] flex items-center justify-center shadow-lg shadow-orange-500/30">
            <Home size={18} className="text-white" />
          </span>
          <span className="font-bold text-[var(--abp-navy)] leading-none">AanbouwPlatform<span className="text-[var(--abp-accent)]">.nl</span></span>
        </a>
        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => <a key={l.href} href={l.href} className="abp-mnav-link">{l.label}</a>)}
        </nav>
        <div className="hidden md:flex items-center gap-2.5">
          <Link to="/aanbouw/login" className="abp-mnav-link px-2">Inloggen</Link>
          <Link to="/aanbouw/login" className="abp-btn-xl abp-btn-orange !px-4 !py-2 !text-sm">Gratis aanvraag <ArrowRight size={15} /></Link>
        </div>
        <button className="md:hidden text-[var(--abp-navy)]" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-[var(--abp-border)] bg-white">
          <div className="abp-container py-3 flex flex-col gap-1">
            {links.map((l) => <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2 abp-mnav-link">{l.label}</a>)}
            <Link to="/aanbouw/login" className="abp-btn-xl abp-btn-orange mt-2">Gratis aanvraag <ArrowRight size={16} /></Link>
          </div>
        </div>
      )}
    </header>
  );
}

/* --- Hero ---------------------------------------------------------------- */
function Hero() {
  const navigate = useNavigate();
  return (
    <section id="top" className="abp-hero">
      <div className="absolute inset-0 abp-grid-bg opacity-60" />
      <div className="abp-container relative grid lg:grid-cols-[1.05fr_1fr] gap-12 items-center pt-14 pb-20 lg:pt-20 lg:pb-28">
        <div>
          <span className="abp-eyebrow abp-rise">Hét platform voor woninguitbreiding</span>
          <h1 className="abp-display mt-5 abp-rise abp-rise-2">
            Bouw de <span className="abp-accent-ink">ruimte</span><br />die je altijd<br />al wilde.
          </h1>
          <p className="mt-6 text-lg text-[var(--abp-muted)] max-w-xl leading-relaxed abp-rise abp-rise-3">
            Van aanbouw tot prefab woning — ontwerp je project, ontvang offertes van geverifieerde
            bouwbedrijven in jouw regio en zie direct wat het kost. Gratis en vrijblijvend.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3 abp-rise abp-rise-4">
            <button onClick={() => navigate('/aanbouw/login')} className="abp-btn-xl abp-btn-orange">Start je ontwerp <ArrowRight size={18} /></button>
            <a href="#hoe" className="abp-btn-xl abp-btn-light">Hoe het werkt</a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[var(--abp-muted)] abp-rise abp-rise-4">
            <span className="flex items-center gap-1.5">
              <span className="flex">{[0, 1, 2, 3, 4].map((i) => <Star key={i} size={15} className="text-[var(--abp-gold)] fill-[var(--abp-gold)]" />)}</span>
              <strong className="text-[var(--abp-navy)]">4.8</strong> / 5
            </span>
            <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-emerald-500" /> Geverifieerde bouwbedrijven</span>
            <span className="hidden sm:flex items-center gap-1.5"><Check size={16} className="text-emerald-500" /> 1.200+ projecten</span>
          </div>
        </div>

        {/* Hero visual: configurator preview */}
        <div className="relative abp-rise abp-rise-3">
          <ConfiguratorPreview />
        </div>
      </div>
    </section>
  );
}

/** Compact 3D-ish render used in the hero. */
function ConfiguratorPreview() {
  return (
    <div className="relative">
      <div className="abp-config-stage aspect-[4/3.2] p-6">
        <HouseScene />
        <div className="abp-config-floor" />
        {/* floating chips */}
        <div className="absolute top-5 left-5 abp-glass-dark rounded-xl px-3 py-2 text-xs text-white/90 flex items-center gap-2">
          <Box size={14} className="text-[var(--abp-accent-2)]" /> Aanbouw · 24 m²
        </div>
        <div className="absolute bottom-6 right-5 abp-glass-dark rounded-xl px-3 py-2 text-xs text-white/90">
          Schuifpui 4 m
        </div>
      </div>
      {/* price card */}
      <div className="absolute -bottom-6 -left-4 sm:-left-6 abp-glass-card rounded-2xl p-4 w-52 shadow-xl">
        <p className="text-[11px] font-semibold text-[var(--abp-muted)]">Prijsindicatie</p>
        <p className="abp-stat-num text-2xl text-[var(--abp-navy)] mt-0.5">€ 54.800</p>
        <div className="mt-2 h-1.5 rounded-full bg-slate-200 overflow-hidden"><div className="h-full w-3/4 rounded-full" style={{ background: 'var(--abp-grad-orange)' }} /></div>
        <p className="text-[10px] text-[var(--abp-faint)] mt-1.5">live bijgewerkt tijdens ontwerp</p>
      </div>
    </div>
  );
}

/** A stylised house + glass aanbouw rendered purely with CSS. */
function HouseScene() {
  return (
    <div className="relative w-full h-full flex items-end justify-center pb-[12%]">
      <div className="relative flex items-end" style={{ filter: 'drop-shadow(0 24px 30px rgba(0,0,0,.45))' }}>
        {/* main house */}
        <div className="relative">
          <div className="abp-house w-28 sm:w-32 h-24 sm:h-28" style={{ background: 'linear-gradient(180deg,#e7eef6,#c7d6e6)' }} />
          {/* roof */}
          <div className="absolute -top-5 -left-2 right-[-8px] h-6"
            style={{ background: 'linear-gradient(180deg,#324d6b,#22384f)', clipPath: 'polygon(8% 100%, 50% 0, 92% 100%)' }} />
          {/* window */}
          <div className="absolute top-4 left-4 w-6 h-6 rounded-sm" style={{ background: 'linear-gradient(135deg,#9cc0e6,#5d87b3)' }} />
        </div>
        {/* glass aanbouw */}
        <div className="relative -ml-1 mb-0 w-20 sm:w-24 h-16 sm:h-20 rounded-md overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(160,200,235,.92), rgba(90,140,185,.85))', boxShadow: 'inset 0 0 0 2px rgba(255,255,255,.35)' }}>
          {/* schuifpui mullions */}
          <div className="absolute inset-0 grid grid-cols-3">
            <div className="border-r border-white/40" /><div className="border-r border-white/40" /><div />
          </div>
          {/* lichtstraat glint */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-white/60" />
        </div>
      </div>
    </div>
  );
}

/* --- Trust bar ----------------------------------------------------------- */
function TrustBar() {
  return (
    <section className="border-y border-[var(--abp-border)] bg-white">
      <div className="abp-container py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {PLATFORM_STATS.map((s) => (
          <div key={s.label} className="text-center lg:text-left">
            <p className="abp-stat-num text-3xl text-[var(--abp-navy)]">{s.value}</p>
            <p className="text-sm text-[var(--abp-muted)] mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* --- How it works -------------------------------------------------------- */
function HowItWorks() {
  const steps = [
    { icon: PencilRuler, title: 'Ontwerp & plaats je aanvraag', body: 'Stel je project samen in de configurator of via het aanvraagformulier. Je ziet meteen een prijsindicatie.' },
    { icon: Handshake, title: 'Ontvang gerichte offertes', body: 'Geverifieerde bouwbedrijven in jouw regio bekijken je aanvraag en sturen een passende offerte.' },
    { icon: Hammer, title: 'Kies je aannemer & bouw', body: 'Vergelijk offertes en reviews, stel vragen via berichten en kies met een gerust hart de beste match.' },
  ];
  return (
    <section id="hoe" className="abp-section">
      <div className="abp-container">
        <div className="max-w-2xl">
          <span className="abp-eyebrow">Zo werkt het</span>
          <h2 className="abp-display !text-[clamp(1.9rem,4vw,2.8rem)] mt-4">In drie stappen van idee naar oplevering</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5 mt-10">
          {steps.map((s, i) => (
            <div key={s.title} className="abp-tile p-7">
              <div className="flex items-center justify-between mb-5">
                <span className="abp-tile-icon"><s.icon size={22} /></span>
                <span className="abp-stat-num text-4xl text-slate-200">0{i + 1}</span>
              </div>
              <h3 className="text-lg font-bold">{s.title}</h3>
              <p className="text-[var(--abp-muted)] mt-2 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- Configurator showcase (the USP) ------------------------------------- */
function ConfiguratorSection() {
  const steps = ['Woningtype', 'Aanbouw', 'Afmetingen', 'Steen', 'Kozijnen', 'Schuifpui', 'Lichtstraat', 'Vloer'];
  const priceLines = [
    { label: 'Aanbouw 24 m² — casco', value: '€ 38.000' },
    { label: 'Schuifpui 4 m', value: '€ 6.500' },
    { label: 'Lichtstraat 2×1 m', value: '€ 2.800' },
    { label: 'Eiken vloer', value: '€ 4.200' },
    { label: 'Gevelsteen — handvorm', value: '€ 3.300' },
  ];
  return (
    <section id="configurator" className="abp-ink-section">
      <div className="absolute inset-0 abp-grid-bg opacity-[0.12]" />
      <div className="abp-container relative abp-section">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
          <div>
            <span className="abp-eyebrow abp-eyebrow-light">Binnenkort · uniek in Nederland</span>
            <h2 className="abp-display !text-[clamp(2rem,4.4vw,3.2rem)] mt-4 text-white">Ontwerp je aanbouw<br />in <span className="text-[var(--abp-accent-2)]">3D</span>.</h2>
            <p className="mt-5 text-white/70 text-lg leading-relaxed max-w-lg">
              Sleep de aanbouw tegen je woning, kies afmetingen, steen, kozijnen, schuifpui en vloer —
              en zie direct een realistische visual én prijsindicatie. Geen enkel platform in Nederland
              doet dit.
            </p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {steps.map((s, i) => (
                <span key={s} className={`px-3.5 py-1.5 rounded-full text-sm font-semibold border ${i === 1 ? 'bg-[var(--abp-accent)] text-white border-transparent' : 'abp-glass-dark text-white/80'}`}>
                  {i + 1}. {s}
                </span>
              ))}
            </div>
          </div>

          {/* Mock configurator UI */}
          <div className="abp-glass-dark rounded-3xl p-4 sm:p-5">
            <div className="flex items-center gap-1.5 px-1 pb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
              <span className="ml-2 text-[11px] text-white/50">AanbouwPlatform · Configurator</span>
            </div>
            <div className="grid sm:grid-cols-[1fr_auto] gap-3">
              <div className="abp-config-stage aspect-[5/4] p-6 relative">
                <HouseScene />
                <div className="abp-config-floor" />
                <div className="absolute top-4 left-4 abp-glass-dark rounded-lg px-2.5 py-1.5 text-[11px] text-white/90">Sleep om te draaien</div>
              </div>
              <div className="bg-white rounded-2xl p-4 w-full sm:w-56">
                <p className="text-[11px] font-semibold text-[var(--abp-muted)]">Live prijsindicatie</p>
                <div className="mt-2 space-y-1.5">
                  {priceLines.map((l) => (
                    <div key={l.label} className="flex items-center justify-between text-[12px]">
                      <span className="text-[var(--abp-text)] truncate pr-2">{l.label}</span>
                      <span className="text-[var(--abp-muted)] shrink-0">{l.value}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[var(--abp-border)] mt-2.5 pt-2.5 flex items-center justify-between">
                  <span className="text-sm font-bold text-[var(--abp-navy)]">Totaal</span>
                  <span className="abp-stat-num text-lg text-[var(--abp-navy)]">€ 54.800</span>
                </div>
                <button className="abp-btn-xl abp-btn-orange w-full mt-3 !py-2.5 !text-sm">Aanvraag versturen</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- Diensten ------------------------------------------------------------ */
function Diensten() {
  const types = BUILD_TYPES.filter((t) => t !== 'Anders');
  const descByService = Object.fromEntries(SERVICES.map((s) => [s.label, s.description]));
  return (
    <section id="diensten" className="abp-section bg-[var(--abp-surface-2)]">
      <div className="abp-container">
        <div className="max-w-2xl">
          <span className="abp-eyebrow">Wat kun je bouwen</span>
          <h2 className="abp-display !text-[clamp(1.9rem,4vw,2.8rem)] mt-4">Elke vorm van woninguitbreiding</h2>
          <p className="text-[var(--abp-muted)] mt-3 text-lg">Eén platform, alle specialisten. Kies je type en ontvang offertes van bouwbedrijven die er écht in uitblinken.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {types.map((t) => {
            const Icon = BUILD_ICON[t];
            return (
              <Link key={t} to="/aanbouw/login" className="abp-tile p-6 group">
                <div className="flex items-center justify-between">
                  <span className="abp-tile-icon"><Icon size={22} /></span>
                  <ChevronRight size={18} className="text-[var(--abp-faint)] group-hover:text-[var(--abp-accent)] transition-colors" />
                </div>
                <h3 className="text-lg font-bold mt-4">{t}</h3>
                <p className="text-sm text-[var(--abp-muted)] mt-1 leading-relaxed">{descByService[t] ?? 'Vakkundig gerealiseerd door geverifieerde bouwbedrijven.'}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --- Projecten / portfolio ----------------------------------------------- */
function Projecten() {
  return (
    <section id="projecten" className="abp-section">
      <div className="abp-container">
        <div className="flex flex-wrap items-end justify-between gap-4 max-w-full">
          <div className="max-w-2xl">
            <span className="abp-eyebrow">Gerealiseerde projecten</span>
            <h2 className="abp-display !text-[clamp(1.9rem,4vw,2.8rem)] mt-4">Inspiratie uit het hele land</h2>
          </div>
          <Link to="/aanbouw/login" className="abp-btn-xl abp-btn-light !py-2.5 !text-sm">Bekijk alle projecten <ArrowRight size={15} /></Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {SHOWCASE_PROJECTS.map((p) => {
            const Icon = BUILD_ICON[p.type];
            return (
              <article key={p.title} className="group">
                <div className="abp-photo abp-photo-grain aspect-[4/3]" style={{ background: p.gradient }}>
                  <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-white/90 text-[11px] font-semibold text-[var(--abp-navy)] flex items-center gap-1.5">
                    <Icon size={12} className="text-[var(--abp-accent-strong)]" /> {p.type}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-90">
                    <HouseScene />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 z-10 p-4 text-white">
                    <p className="font-semibold leading-tight">{p.title}</p>
                    <p className="text-xs text-white/80 flex items-center gap-1.5 mt-0.5"><MapPin size={12} /> {p.plaats} · {p.m2} m² · {p.finish}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between px-1 mt-3">
                  <span className="text-sm text-[var(--abp-muted)]">Indicatie</span>
                  <span className="font-bold text-[var(--abp-navy)]">{p.value}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --- Reviews ------------------------------------------------------------- */
function Reviews() {
  return (
    <section className="abp-section bg-[var(--abp-surface-2)]">
      <div className="abp-container">
        <div className="max-w-2xl">
          <span className="abp-eyebrow">Wat klanten zeggen</span>
          <h2 className="abp-display !text-[clamp(1.9rem,4vw,2.8rem)] mt-4">Beoordeeld met een 4.8</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5 mt-10">
          {REVIEWS.map((r) => (
            <div key={r.name} className="abp-tile p-7 flex flex-col">
              <Quote size={28} className="text-[var(--abp-accent)]/30" />
              <div className="flex gap-0.5 mt-3">{Array.from({ length: r.rating }).map((_, i) => <Star key={i} size={15} className="text-[var(--abp-gold)] fill-[var(--abp-gold)]" />)}</div>
              <p className="text-[var(--abp-text)] mt-3 leading-relaxed flex-1">“{r.quote}”</p>
              <div className="mt-5 pt-4 border-t border-[var(--abp-border)] flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-[var(--abp-navy)] text-white text-sm font-bold flex items-center justify-center">{r.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}</span>
                <div>
                  <p className="text-sm font-semibold">{r.name}</p>
                  <p className="text-[11px] text-[var(--abp-muted)]">{r.project} · {r.plaats}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- CTA band ------------------------------------------------------------ */
function CtaBand() {
  const navigate = useNavigate();
  const usps = ['Gratis & vrijblijvend', 'Geverifieerde bouwbedrijven', 'Direct een prijsindicatie', 'Alles op één plek'];
  return (
    <section className="abp-section">
      <div className="abp-container">
        <div className="abp-ink-section rounded-[2rem] px-7 sm:px-12 py-12 sm:py-16 text-center relative">
          <div className="absolute inset-0 abp-grid-bg opacity-[0.1] rounded-[2rem]" />
          <div className="relative max-w-2xl mx-auto">
            <Sparkles size={28} className="text-[var(--abp-accent-2)] mx-auto" />
            <h2 className="abp-display !text-[clamp(2rem,4.4vw,3rem)] mt-4 text-white">Klaar om te bouwen?</h2>
            <p className="text-white/70 text-lg mt-4">Plaats vandaag nog je aanvraag en ontvang offertes van de beste bouwbedrijven in jouw regio.</p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <button onClick={() => navigate('/aanbouw/login')} className="abp-btn-xl abp-btn-orange">Start je aanvraag <ArrowRight size={18} /></button>
              <Link to="/aanbouw/login" className="abp-btn-xl abp-btn-glass">Inloggen als bouwbedrijf</Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {usps.map((u) => <span key={u} className="flex items-center gap-1.5 text-sm text-white/80"><Check size={15} className="text-emerald-400" /> {u}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- Footer -------------------------------------------------------------- */
function Footer() {
  const cols = [
    { title: 'Diensten', links: ['Aanbouw', 'Uitbouw', 'Dakopbouw', 'Mantelzorgwoning', 'Prefab woning'] },
    { title: 'Platform', links: ['Hoe het werkt', 'Configurator', 'Projecten', 'Reviews'] },
    { title: 'Voor bouwbedrijven', links: ['Aanmelden', 'Leads ontvangen', 'Werkgebied', 'Inloggen'] },
  ];
  return (
    <footer className="abp-ink-section">
      <div className="abp-container py-14">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-9 h-9 rounded-xl bg-[var(--abp-accent)] flex items-center justify-center"><Home size={18} className="text-white" /></span>
              <span className="font-bold text-white">AanbouwPlatform<span className="text-[var(--abp-accent)]">.nl</span></span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">Hét platform voor woninguitbreiding in Nederland. Geverifieerde bouwbedrijven, gerichte offertes en een 3D-configurator.</p>
            <div className="flex items-center gap-1 mt-4">
              {[0, 1, 2, 3, 4].map((i) => <Star key={i} size={15} className="text-[var(--abp-gold)] fill-[var(--abp-gold)]" />)}
              <span className="text-white/70 text-sm ml-1.5">4.8 / 5 · 640+ reviews</span>
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <p className="text-white font-semibold text-sm mb-3">{c.title}</p>
              <ul className="space-y-2">
                {c.links.map((l) => <li key={l}><Link to="/aanbouw/login" className="text-white/60 hover:text-white text-sm transition-colors">{l}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="abp-divider-fade my-8 opacity-40" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-white/50 text-xs">
          <p>© 2026 AanbouwPlatform.nl — onderdeel van Prefab Select.</p>
          <p className="flex items-center gap-1.5"><ShieldCheck size={13} className="text-emerald-400" /> Veilig · geverifieerd · vrijblijvend</p>
        </div>
      </div>
    </footer>
  );
}
