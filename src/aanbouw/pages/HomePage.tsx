import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Star, ShieldCheck, BadgeCheck, MapPin, ArrowRight, Check, ChevronLeft, ChevronRight,
  PencilLine, Users, FileText, KeyRound, Facebook, Instagram, Linkedin,
} from 'lucide-react';
import heroVilla from '../assets/hero-villa.webp';

/* =========================================================================
   AanbouwPlatform.nl — homepage volgens goedgekeurde mockup (warm dusk
   marketplace). Functionaliteit identiek: alle CTA's -> /aanbouw/login.
   Beeld: hero/CTA gebruiken de bespoke render (warm getint); diensten- en
   projecttegels zijn placeholders die 1-op-1 inwisselbaar zijn voor
   bespoke avondfotografie.
   ========================================================================= */

const EASE = [0.2, 0.7, 0.2, 1] as const;
function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, ease: EASE, delay }}>
      {children}
    </motion.div>
  );
}

const SERVICES: { label: string; grad: string }[] = [
  { label: 'Aanbouw', grad: 'linear-gradient(150deg,#c9803f,#6f3717)' },
  { label: 'Uitbouw', grad: 'linear-gradient(150deg,#3f6f8b,#15324a)' },
  { label: 'Dakopbouw', grad: 'linear-gradient(150deg,#6b6e74,#2f343b)' },
  { label: 'Mantelzorgwoning', grad: 'linear-gradient(150deg,#9a7d52,#4a3a1f)' },
  { label: 'Poolhouse', grad: 'linear-gradient(150deg,#3f7d86,#123c40)' },
  { label: 'Garage verbouwen', grad: 'linear-gradient(150deg,#6f6457,#332c22)' },
  { label: 'Veranda', grad: 'linear-gradient(150deg,#b5793f,#5c3318)' },
  { label: 'Tuinkantoor', grad: 'linear-gradient(150deg,#5d7a4f,#243a22)' },
  { label: 'Prefab woning', grad: 'linear-gradient(150deg,#4a5a78,#1c2740)' },
];

const PROJECTS: { title: string; plaats: string; m2: number; prijs: string; pos: string; tint: string }[] = [
  { title: 'Moderne uitbouw', plaats: 'Eindhoven', m2: 28, prijs: '€ 42.500', pos: '50% 50%', tint: 'rgba(20,40,60,.30)' },
  { title: 'Aanbouw met lichtstraat', plaats: 'Tilburg', m2: 24, prijs: '€ 38.950', pos: '30% 60%', tint: 'rgba(120,60,20,.32)' },
  { title: 'Dakopbouw', plaats: 'Amersfoort', m2: 36, prijs: '€ 55.000', pos: '70% 40%', tint: 'rgba(40,40,55,.34)' },
  { title: 'Poolhouse met overkapping', plaats: 'Breda', m2: 30, prijs: '€ 48.750', pos: '50% 75%', tint: 'rgba(20,60,64,.32)' },
  { title: 'Mantelzorgwoning', plaats: 'Den Bosch', m2: 45, prijs: '€ 67.500', pos: '60% 50%', tint: 'rgba(90,70,40,.32)' },
];

const REVIEWS = [
  { quote: 'Binnen een week 3 offertes ontvangen. Uiteindelijk een geweldige aannemer gevonden voor onze uitbouw!', name: 'Lisa uit Eindhoven', c: '#c2410c' },
  { quote: 'Super handig platform. Je bespaart zoveel tijd en krijgt eerlijke prijzen.', name: 'Mark uit Utrecht', c: '#15426b' },
  { quote: 'De 3D configurator is echt next level. Je ziet direct wat mogelijk is.', name: 'Sophie uit Rotterdam', c: '#0e7d6b' },
];

export default function HomePage() {
  return (
    <div className="abp-root abp-m">
      <Nav />
      <Hero />
      <ServicesCard />
      <HowAndConfigurator />
      <Projects />
      <Trust />
      <CtaBand />
      <Footer />
    </div>
  );
}

/* --- Brand mark ---------------------------------------------------------- */
function BrandMark({ size = 34 }: { size?: number }) {
  return (
    <span className="inline-flex items-center justify-center rounded-xl" style={{ width: size, height: size, background: 'var(--abp-grad-orange)' }}>
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none">
        <path d="M3 11.5 12 4l9 7.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 10.5V20h5v-4h2v4h5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
function Wordmark({ dark }: { dark?: boolean }) {
  return (
    <span className="leading-none">
      <span className={`block font-extrabold tracking-tight text-[15px] ${dark ? 'text-[#0f1c2e]' : 'text-white'}`}>AANBOUW</span>
      <span className="block text-[9px] font-bold tracking-[0.2em] text-[var(--abp-accent)]">PLATFORM.NL</span>
    </span>
  );
}

/* --- Nav ----------------------------------------------------------------- */
function Nav() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = [
    ['#diensten', 'Diensten'], ['#hoe', 'Hoe het werkt'], ['#projecten', 'Projecten'],
    ['/aanbouw/login', 'Aannemers'], ['/aanbouw/login', 'Over ons'], ['/aanbouw/login', 'Kennisbank'],
  ];
  return (
    <motion.header
      className="fixed top-0 inset-x-0 z-50"
      initial={false}
      animate={{ backgroundColor: solid ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0)', boxShadow: solid ? '0 1px 0 rgba(15,28,46,.08)' : '0 0 0 rgba(0,0,0,0)' }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      <div className="abp-h-container-wide flex items-center justify-between h-[72px]">
        <a href="#top" className="flex items-center gap-2.5"><BrandMark /><Wordmark dark={solid} /></a>
        <nav className="hidden lg:flex items-center gap-7">
          {links.map(([href, label]) => (
            href.startsWith('#')
              ? <a key={label} href={href} className={solid ? 'text-[#42536b] hover:text-[#0f1c2e] text-[15px] font-medium' : 'abp-m-navlink'}>{label}</a>
              : <Link key={label} to={href} className={solid ? 'text-[#42536b] hover:text-[#0f1c2e] text-[15px] font-medium' : 'abp-m-navlink'}>{label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/aanbouw/login" className={`hidden sm:inline text-[15px] font-medium ${solid ? 'text-[#42536b] hover:text-[#0f1c2e]' : 'abp-m-navlink'}`}>Inloggen</Link>
          <Link to="/aanbouw/login" className="abp-pill abp-pill-orange !py-2.5 !px-5 !text-sm">Gratis aanvragen</Link>
        </div>
      </div>
    </motion.header>
  );
}

/* --- Hero ---------------------------------------------------------------- */
function Hero() {
  const trust = [
    { icon: <Star size={18} className="text-[var(--abp-gold)] fill-[var(--abp-gold)]" />, t: '4.8/5 gemiddeld', s: 'Uit 1.350+ reviews' },
    { icon: <ShieldCheck size={18} className="text-emerald-400" />, t: 'Geverifieerde', s: 'bouwbedrijven' },
    { icon: <BadgeCheck size={18} className="text-[var(--abp-accent-2)]" />, t: 'Gratis en vrijblijvend', s: '100% kosteloos' },
    { icon: <MapPin size={18} className="text-sky-300" />, t: 'Landelijke dekking', s: 'In heel Nederland' },
  ];
  return (
    <section id="top" className="relative min-h-[760px] overflow-hidden bg-[#0a1626]">
      <img src={heroVilla} alt="Moderne woninguitbreiding in avondlicht" className="absolute inset-0 w-full h-full object-cover abp-m-warm-grade" />
      <div className="abp-m-hero-veil" />
      <div className="relative abp-h-container-wide pt-[150px] pb-[150px]">
        <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE }} className="max-w-2xl">
          <h1 className="abp-h-display abp-hw text-[clamp(2.6rem,6vw,4.6rem)] leading-[1.02]">
            Jouw droomuitbreiding.<br /><span className="text-[var(--abp-accent)]">Onze vakmensen.</span>
          </h1>
          <p className="abp-on-img text-white/85 text-lg mt-6 max-w-lg leading-relaxed">
            Vergelijk geverifieerde bouwbedrijven, bekijk richtprijzen en ontvang offertes op maat. Gratis en vrijblijvend.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link to="/aanbouw/login" className="abp-pill abp-pill-orange !px-6 !py-3.5 !text-base">Start gratis aanvraag <ArrowRight size={18} /></Link>
            <a href="#projecten" className="abp-pill abp-pill-glass !px-6 !py-3.5 !text-base">Bekijk projecten</a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
          className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-5 max-w-3xl">
          {trust.map((x) => (
            <div key={x.t} className="flex items-center gap-2.5">
              <span className="shrink-0">{x.icon}</span>
              <span className="leading-tight"><span className="block abp-on-img text-white font-semibold text-sm">{x.t}</span><span className="block text-white/65 text-xs">{x.s}</span></span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* --- Services card (overlapping hero) ------------------------------------ */
function ServicesCard() {
  return (
    <section id="diensten" className="abp-h-container-wide relative z-20 -mt-24">
      <Reveal>
        <div className="abp-card p-6 sm:p-8">
          <h2 className="text-xl font-bold text-[#0f1c2e] mb-5">Waarmee kunnen we je helpen?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
            {SERVICES.map((s) => (
              <Link key={s.label} to="/aanbouw/login" className="abp-m-tile group">
                <div className="abp-m-thumb abp-m-thumb-grain" style={{ background: s.grad }}>
                  <HouseGlyph />
                </div>
                <p className="text-center text-[13px] font-semibold text-[#0f1c2e] py-2.5 px-1">{s.label}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link to="/aanbouw/login" className="text-[var(--abp-accent-strong)] font-semibold text-sm inline-flex items-center gap-1.5 hover:gap-2.5 transition-all">Bekijk alle diensten <ArrowRight size={15} /></Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
function HouseGlyph() {
  return (
    <svg viewBox="0 0 64 40" className="absolute inset-0 w-full h-full opacity-90" preserveAspectRatio="xMidYMid slice">
      <g fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="1.4">
        <path d="M10 30h20V16l8-5 8 5v14h8" />
        <path d="M14 30v-8h6v8M40 22h6v8" />
      </g>
    </svg>
  );
}

/* --- How it works + configurator ----------------------------------------- */
function HowAndConfigurator() {
  const navigate = useNavigate();
  const steps = [
    { icon: PencilLine, t: 'Beschrijf jouw project', s: 'Vertel ons wat je wilt laten realiseren.' },
    { icon: Users, t: 'Wij matchen de juiste aannemers', s: 'De aanvraag wordt verstuurd naar passende vakmensen.' },
    { icon: FileText, t: 'Vergelijk offertes', s: 'Ontvang offertes en vergelijk op prijs, reviews en kwaliteit.' },
    { icon: KeyRound, t: 'Kies jouw aannemer', s: 'Kies de beste match en jouw project gaat van start!' },
  ];
  const configSteps = ['Woningtype', 'Afmetingen', 'Afwerking', 'Kozijnen', 'Lichtstraat', 'Vloer'];
  const swatches = ['linear-gradient(135deg,#d6a772,#b07d44)', 'linear-gradient(135deg,#b9c0c7,#8a939c)', 'linear-gradient(135deg,#a6735a,#774634)', 'linear-gradient(135deg,#2a2e34,#101316)'];
  const lines = [['Uitbouw 5 × 3m', ''], ['Aluminium schuifpui', ''], ['Lichtstraat 1 × 3m', ''], ['Stucwerk buiten', ''], ['PVC visgraat vloer', '']];
  return (
    <section id="hoe" className="abp-h-container-wide py-20 lg:py-28 grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">
      {/* how it works */}
      <Reveal>
        <div className="pt-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0f1c2e]">Zo werkt het</h2>
          <div className="relative mt-10">
            <div className="abp-m-steps-line hidden sm:block" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {steps.map((s, i) => (
                <div key={s.t} className="relative">
                  <div className="w-11 h-11 rounded-full bg-white border-2 border-[var(--abp-border-strong)] flex items-center justify-center font-bold text-[#0f1c2e] mb-4 relative z-10">{i + 1}</div>
                  <s.icon size={20} className="text-[var(--abp-accent)] mb-2" />
                  <p className="font-semibold text-sm text-[#0f1c2e] leading-snug">{s.t}</p>
                  <p className="text-xs text-[#5a6b80] mt-1.5 leading-relaxed">{s.s}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4 mt-9">
            <Link to="/aanbouw/login" className="abp-pill abp-pill-orange !px-5 !py-3 !text-sm">Start gratis aanvraag <ArrowRight size={16} /></Link>
            <span className="text-sm text-[#5a6b80] flex items-center gap-1.5"><Check size={15} className="text-emerald-500" /> Binnen 2 minuten geregeld</span>
          </div>
        </div>
      </Reveal>

      {/* configurator */}
      <Reveal delay={0.1}>
        <div className="abp-m-dark rounded-3xl p-5 sm:p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-white">Configureer jouw uitbreiding</h3>
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-white/80">Binnenkort beschikbaar</span>
          </div>
          <div className="grid sm:grid-cols-[auto_1fr] gap-4">
            <div className="hidden sm:flex flex-col gap-1.5">
              {configSteps.map((s, i) => (
                <div key={s} className={`flex items-center gap-2 text-xs rounded-lg px-2.5 py-2 ${i === 0 ? 'bg-[var(--abp-accent)] text-white' : 'text-white/70'}`}>
                  <span className="opacity-70 font-mono">0{i + 1}</span> {s}
                </div>
              ))}
            </div>
            <div>
              <div className="rounded-xl overflow-hidden aspect-[16/10] relative">
                <img src={heroVilla} alt="Configuratie" className="w-full h-full object-cover abp-m-warm-grade" style={{ objectPosition: '50% 55%' }} />
              </div>
              <div className="flex gap-2 mt-3">
                {swatches.map((g, i) => <span key={i} className="w-9 h-9 rounded-lg border-2 border-white/30" style={{ background: g }} />)}
                <span className="w-9 h-9 rounded-lg border-2 border-white/20 flex items-center justify-center text-white/50 text-xs">+3</span>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-[1fr_auto] gap-4 mt-5 pt-5 border-t border-white/10">
            <div className="space-y-1.5">
              {lines.map(([l]) => <div key={l} className="flex items-center gap-2 text-[13px] text-white/75"><Check size={13} className="text-[var(--abp-accent-2)]" /> {l}</div>)}
            </div>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 min-w-[180px]">
              <p className="text-[11px] text-white/60">Jouw indicatie</p>
              <p className="abp-h-display text-3xl text-[var(--abp-accent)] leading-none mt-1">€ 47.950</p>
              <p className="text-[11px] text-white/50 mt-0.5">incl. BTW</p>
              <button onClick={() => navigate('/aanbouw/login')} className="abp-pill w-full justify-center mt-3 !py-2.5 !text-sm bg-white text-[#0f1c2e] hover:bg-white/90">Bekijk details</button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-5">
            <p className="text-xs text-white/55 max-w-xs">Uniek in Nederland: 3D configurator met live prijsindicatie voor jouw project.</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
              {['Live preview', 'Directe prijsindicatie', 'Vrijblijvend'].map((b) => (
                <span key={b} className="text-[11px] text-white/70 flex items-center gap-1"><Check size={12} className="text-emerald-400" /> {b}</span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* --- Projects ------------------------------------------------------------ */
function Projects() {
  return (
    <section id="projecten" className="abp-h-container-wide pb-20">
      <div className="flex items-center justify-between mb-7">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0f1c2e]">Gerealiseerde projecten</h2>
        <Link to="/aanbouw/login" className="text-[var(--abp-accent-strong)] font-semibold text-sm inline-flex items-center gap-1.5 hover:gap-2.5 transition-all">Bekijk alle projecten <ArrowRight size={15} /></Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.05}>
            <div className="abp-m-proj aspect-[4/5] group cursor-pointer">
              <img src={heroVilla} alt={p.title} className="w-full h-full object-cover abp-m-warm-grade" style={{ objectPosition: p.pos }} />
              <div className="absolute inset-0" style={{ background: p.tint }} />
              <div className="absolute bottom-0 left-0 right-0 p-3.5 z-10 text-white">
                <p className="font-semibold text-sm leading-tight">{p.title}</p>
                <p className="text-[11px] text-white/80 mt-0.5">{p.plaats} · {p.m2} m² · {p.prijs}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* --- Trust / reviews ----------------------------------------------------- */
function Trust() {
  return (
    <section className="bg-[#f6f8fb] py-20">
      <div className="abp-h-container-wide grid lg:grid-cols-[300px_1fr] gap-8 items-center">
        <Reveal>
          <div className="abp-m-review p-7">
            <h2 className="text-2xl font-bold text-[#0f1c2e] leading-tight">Vertrouwd door<br />1.000+ huiseigenaren</h2>
            <div className="flex items-center gap-2 mt-5">
              <span className="flex">{[0, 1, 2, 3, 4].map((i) => <Star key={i} size={18} className="text-emerald-500 fill-emerald-500" />)}</span>
              <span className="font-bold text-[#0f1c2e]">4.8 / 5</span>
            </div>
            <p className="text-xs text-[#5a6b80] mt-1.5 flex items-center gap-1"><Star size={11} className="text-emerald-500 fill-emerald-500" /> Trustpilot</p>
          </div>
        </Reveal>
        <div className="relative">
          <div className="grid sm:grid-cols-3 gap-4">
            {REVIEWS.map((r, i) => (
              <Reveal key={r.name} delay={i * 0.07}>
                <div className="abp-m-review p-5 h-full flex flex-col">
                  <div className="flex gap-0.5 mb-3">{[0, 1, 2, 3, 4].map((k) => <Star key={k} size={14} className="text-[var(--abp-gold)] fill-[var(--abp-gold)]" />)}</div>
                  <p className="text-sm text-[#2a3648] leading-relaxed flex-1">“{r.quote}”</p>
                  <div className="flex items-center gap-2.5 mt-4 pt-3 border-t border-[var(--abp-border)]">
                    <span className="w-8 h-8 rounded-full text-white text-[11px] font-bold flex items-center justify-center" style={{ background: r.c }}>{r.name.split(' ')[0][0]}</span>
                    <span className="text-xs font-semibold text-[#0f1c2e]">– {r.name}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="hidden sm:flex absolute -left-3 top-1/2 -translate-y-1/2"><span className="w-9 h-9 rounded-full bg-white shadow-md border border-[var(--abp-border)] flex items-center justify-center text-[#5a6b80]"><ChevronLeft size={16} /></span></div>
          <div className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2"><span className="w-9 h-9 rounded-full bg-white shadow-md border border-[var(--abp-border)] flex items-center justify-center text-[#5a6b80]"><ChevronRight size={16} /></span></div>
        </div>
      </div>
    </section>
  );
}

/* --- CTA band ------------------------------------------------------------ */
function CtaBand() {
  const usps = ['Gratis en vrijblijvend', 'Binnen 2 minuten geregeld', 'Richtprijs binnen enkele minuten', '100% veilig & betrouwbaar'];
  return (
    <section className="abp-h-container-wide py-16">
      <div className="abp-m-dark rounded-3xl relative overflow-hidden">
        <img src={heroVilla} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25 abp-m-warm-grade" style={{ objectPosition: '50% 40%' }} />
        <div className="relative grid lg:grid-cols-[1.3fr_1fr] gap-8 items-center p-8 sm:p-12">
          <div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white leading-tight">Benieuwd wat jouw<br />uitbreiding kost?</h2>
            <p className="text-white/70 mt-4 max-w-md">Start nu gratis jouw aanvraag en ontvang snel een richtprijs op maat.</p>
          </div>
          <div>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-6">
              {usps.map((u) => <span key={u} className="flex items-center gap-2 text-sm text-white/85"><Check size={15} className="text-[var(--abp-accent-2)]" /> {u}</span>)}
            </div>
            <Link to="/aanbouw/login" className="abp-pill abp-pill-orange !px-6 !py-3.5 !text-base">Start gratis aanvraag <ArrowRight size={18} /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- Footer -------------------------------------------------------------- */
function Footer() {
  const cols = [
    { title: 'Diensten', links: ['Aanbouw', 'Uitbouw', 'Dakopbouw', 'Mantelzorgwoning', 'Poolhouse', 'Alle diensten'] },
    { title: 'Platform', links: ['Hoe het werkt', 'Voor aannemers', 'Reviews', 'Kennisbank', 'Over ons', 'Contact'] },
    { title: 'Voor aannemers', links: ['Inloggen', 'Registreren', 'Voordelen', 'Tarieven'] },
  ];
  return (
    <footer className="abp-m-dark">
      <div className="abp-h-container-wide py-14">
        <div className="grid md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4"><BrandMark /><Wordmark /></div>
            <p className="text-white/55 text-sm max-w-xs leading-relaxed">Het platform voor jouw droomuitbreiding.</p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <p className="text-white font-semibold text-sm mb-3">{c.title}</p>
              <ul className="space-y-2.5">{c.links.map((l) => <li key={l}><Link to="/aanbouw/login" className="text-white/55 hover:text-white text-sm transition-colors">{l}</Link></li>)}</ul>
            </div>
          ))}
          <div className="md:col-start-4 md:row-start-1 md:justify-self-end">
            <p className="text-white font-semibold text-sm mb-3">Volg ons</p>
            <div className="flex gap-2.5">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <span key={i} className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/80 hover:bg-white/20 transition-colors"><Icon size={16} /></span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© 2025 AanbouwPlatform.nl · Alle rechten voorbehouden</p>
          <div className="flex gap-5"><Link to="/aanbouw/login" className="hover:text-white">Privacy</Link><Link to="/aanbouw/login" className="hover:text-white">Voorwaarden</Link><Link to="/aanbouw/login" className="hover:text-white">Cookies</Link></div>
        </div>
      </div>
    </footer>
  );
}
