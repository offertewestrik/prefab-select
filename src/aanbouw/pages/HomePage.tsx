import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import heroVilla from '../assets/hero-villa.webp';
import { BUILD_TYPES } from '../lib/services';
import { REVIEWS, PLATFORM_STATS } from '../lib/showcase';

/* =========================================================================
   AanbouwPlatform.nl — cinematic homepage. Apple daylight-minimal.
   One signature architecture render, editorial whitespace, scroll storytelling.
   Functionaliteit identiek: alle CTA's leiden naar /aanbouw/login.
   ========================================================================= */

const EASE = [0.2, 0.7, 0.2, 1] as const;

function Reveal({ children, y = 26, delay = 0, className }: { children: React.ReactNode; y?: number; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.85, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <div className="abp-root abp-h">
      <Nav />
      <Hero />
      <Intro />
      <BleedBand />
      <Configurator />
      <Diensten />
      <Proof />
      <Voices />
      <ClosingCta />
      <Footer />
    </div>
  );
}

/* --- Nav ----------------------------------------------------------------- */
function Nav() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = [
    { href: '#ontwerp', label: 'Ontwerpen' },
    { href: '#configurator', label: 'Configurator' },
    { href: '#diensten', label: 'Mogelijkheden' },
    { href: '#verhaal', label: 'Verhaal' },
  ];
  return (
    <div className="abp-h-nav">
      <motion.div
        initial={false}
        animate={{
          backgroundColor: solid ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0)',
          borderColor: solid ? 'rgba(232,237,243,1)' : 'rgba(232,237,243,0)',
          backdropFilter: solid ? 'blur(16px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.4, ease: EASE }}
        style={{ borderBottom: '1px solid' }}
      >
        <div className="abp-h-container-wide flex items-center justify-between h-[68px]">
          <a href="#top" className="flex items-center gap-2.5">
            <span className={`w-8 h-8 rounded-[10px] flex items-center justify-center transition-colors ${solid ? 'bg-[var(--abp-accent)]' : 'bg-white/85'}`}>
              <BrandMark className={solid ? 'text-white' : 'text-[var(--h-ink)]'} />
            </span>
            <span className={`font-semibold tracking-tight transition-colors ${solid ? 'text-[var(--h-ink)]' : 'abp-on-img text-white'}`}>
              AanbouwPlatform<span className="text-[var(--abp-accent)]">.</span>
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a key={l.href} href={l.href} className={`abp-h-navlink ${solid ? 'text-[var(--h-soft)] hover:text-[var(--h-ink)]' : 'abp-on-img text-white/90 hover:text-white'}`}>{l.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/aanbouw/login" className={`abp-h-navlink hidden sm:inline ${solid ? 'text-[var(--h-soft)] hover:text-[var(--h-ink)]' : 'abp-on-img text-white/90 hover:text-white'}`}>Inloggen</Link>
            <Link to="/aanbouw/login" className={`abp-pill !py-2.5 !px-4 !text-sm ${solid ? 'abp-pill-dark' : 'abp-pill-glass'}`}>Start je ontwerp</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function BrandMark({ className = '' }: { className?: string }) {
  // Custom mark: a roofline + extension — not a stock icon.
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3 11.5 12 4l9 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 10.5V20h7v-5.5h4.5V20H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* --- Hero ---------------------------------------------------------------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // mouse parallax for the floating card
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 20 });
  const sy = useSpring(my, { stiffness: 120, damping: 20 });
  const onMove = (e: React.MouseEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 18);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 18);
  };

  return (
    <section id="top" ref={ref} className="abp-h-hero" onMouseMove={onMove}>
      <motion.div className="abp-h-hero-media" style={{ y, scale }}>
        <img src={heroVilla} alt="Moderne villa met glazen aanbouw en zwembad" className="abp-h-hero-img abp-kenburns" />
      </motion.div>
      <div className="abp-hero-veil" />
      <div className="abp-hero-veil-2" />

      <motion.div className="absolute inset-0 flex flex-col justify-center" style={{ y: textY, opacity: textOpacity }}>
        <div className="abp-h-container-wide w-full">
          <motion.span
            className="abp-h-kicker abp-h-kicker-light block mb-5"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          >
            Woninguitbreiding · opnieuw uitgevonden
          </motion.span>
          <h1 className="abp-h-display abp-h-mega abp-on-img abp-hw max-w-[16ch]">
            {['Bouw de ruimte', 'die je altijd', 'al wilde.'].map((line, i) => (
              <motion.span key={line} className="block" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.25 + i * 0.12 }}>
                {line}
              </motion.span>
            ))}
          </h1>
          <motion.p
            className="abp-on-img text-white/85 text-lg sm:text-xl max-w-xl mt-7 leading-relaxed"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
          >
            Ontwerp je aanbouw, zie direct wat het kost en laat geverifieerde bouwbedrijven
            in jouw regie strijden om jouw project.
          </motion.p>
          <motion.div
            className="flex flex-wrap items-center gap-3 mt-9"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.85 }}
          >
            <a href="#configurator" className="abp-pill abp-pill-orange !px-6 !py-3.5 !text-base">Ontwerp jouw aanbouw</a>
            <a href="#verhaal" className="abp-pill abp-pill-glass !px-6 !py-3.5 !text-base">Ontdek hoe het werkt</a>
          </motion.div>
        </div>
      </motion.div>

      {/* floating glass spec card */}
      <motion.div
        className="hidden lg:block absolute right-[6%] bottom-[12%] abp-glass-ondark rounded-2xl p-5 w-64"
        style={{ x: sx, y: sy }}
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 1 }}
      >
        <p className="text-white/60 text-[11px] font-semibold uppercase tracking-wider">Live prijsindicatie</p>
        <p className="abp-h-display text-white text-3xl mt-1">€ 54.800</p>
        <div className="h-1 rounded-full bg-white/20 mt-3 overflow-hidden"><div className="h-full w-3/4 rounded-full" style={{ background: 'var(--abp-grad-orange)' }} /></div>
        <p className="text-white/55 text-[11px] mt-2">Aanbouw 24 m² · schuifpui · eiken vloer</p>
      </motion.div>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 flex flex-col items-center gap-2">
        <span className="abp-on-img text-white/70 text-[11px] tracking-widest uppercase">Scroll</span>
        <motion.span className="w-[1px] h-8 bg-white/50" animate={{ scaleY: [0.3, 1, 0.3], originY: 0 }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} style={{ transformOrigin: 'top' }} />
      </div>
    </section>
  );
}

/* --- Intro story --------------------------------------------------------- */
function Intro() {
  return (
    <section id="verhaal" className="abp-h-section bg-white">
      <div className="abp-h-container">
        <Reveal><span className="abp-h-kicker">Het begint met een droom</span></Reveal>
        <Reveal delay={0.05}>
          <h2 className="abp-h-display abp-h-h2 mt-6 max-w-[20ch]">
            Meer ruimte begint niet met een offerte.<br />
            <span className="text-[var(--h-soft)]">Het begint met een idee.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="abp-h-lead max-w-2xl mt-8">
            Een lichtere keuken. Een thuiswerkplek met zicht op de tuin. Ruimte voor wie je
            liefhebt. Wij brengen die droom tot leven — van eerste schets tot de dag dat je
            de schuifpui voor het eerst opent.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* --- Full-bleed parallax band -------------------------------------------- */
function BleedBand() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  return (
    <section ref={ref} className="abp-bleed">
      <motion.div className="abp-bleed-media" style={{ y }}>
        <img src={heroVilla} alt="Glazen aanbouw met zwembad" style={{ objectPosition: '50% 70%' }} />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1626]/60 via-transparent to-transparent" />
      <div className="absolute inset-0 flex items-end">
        <div className="abp-h-container-wide w-full pb-12">
          <Reveal>
            <p className="abp-on-img abp-h-display text-white text-[clamp(1.8rem,4vw,3.4rem)] max-w-[18ch] leading-[1.05]">
              Van schets tot sleutel.<br />Alles op één plek.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --- Configurator (Apple-style showcase) --------------------------------- */
const MATERIALS = [
  { name: 'Eiken', c: 'linear-gradient(135deg,#d6a772,#b07d44)' },
  { name: 'Antraciet', c: 'linear-gradient(135deg,#5b6470,#363c45)' },
  { name: 'Wit stucwerk', c: 'linear-gradient(135deg,#f4f5f7,#d9dde2)' },
  { name: 'Handvorm steen', c: 'linear-gradient(135deg,#a6735a,#774634)' },
  { name: 'Zwart staal', c: 'linear-gradient(135deg,#2a2e34,#101316)' },
];

function Configurator() {
  const [mat, setMat] = useState(0);
  const navigate = useNavigate();
  const lines = [
    ['Aanbouw 24 m² — casco', '€ 38.000'],
    ['Schuifpui 4 meter', '€ 6.500'],
    ['Lichtstraat 2×1 m', '€ 2.800'],
    [`Afwerking — ${MATERIALS[mat].name}`, '€ 7.500'],
  ];
  return (
    <section id="configurator" className="abp-h-section bg-[#f6f8fb]">
      <div className="abp-h-container-wide">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal><span className="abp-h-kicker">De configurator · uniek in Nederland</span></Reveal>
          <Reveal delay={0.05}>
            <h2 className="abp-h-display abp-h-h2 mt-6">Ontwerp 'm zelf.<br />Tot op de laatste steen.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="abp-h-lead mt-6 mx-auto max-w-xl">Kies woningtype, afmetingen, materialen, kozijnen en vloer — en zie je aanbouw én de prijs live veranderen. Alsof Apple een woningconfigurator bouwde.</p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-14">
          <div className="abp-glass-white rounded-[28px] p-3 sm:p-4 max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-[1.55fr_1fr] gap-3">
              {/* stage */}
              <div className="relative rounded-[22px] overflow-hidden bg-[#0a1626] aspect-[16/11]">
                <motion.img
                  key={mat}
                  src={heroVilla} alt="Configuratie preview"
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0.6, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: EASE }}
                  style={{ objectPosition: '50% 55%' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1626]/40 to-transparent" />
                <div className="absolute top-4 left-4 abp-glass-ondark rounded-xl px-3 py-2 text-xs text-white/90">Sleep om te draaien</div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex gap-2.5">
                    {MATERIALS.map((m, i) => (
                      <button key={m.name} aria-label={m.name} onClick={() => setMat(i)} className={`abp-swatch ${mat === i ? 'abp-swatch-active' : ''}`} style={{ background: m.c }} />
                    ))}
                  </div>
                  <span className="abp-glass-ondark rounded-lg px-3 py-1.5 text-xs text-white font-medium">{MATERIALS[mat].name}</span>
                </div>
              </div>
              {/* price panel */}
              <div className="bg-white rounded-[22px] p-6 flex flex-col">
                <p className="abp-h-kicker">Jouw ontwerp</p>
                <div className="mt-4 space-y-2.5 flex-1">
                  {lines.map(([l, v]) => (
                    <div key={l} className="flex items-center justify-between text-sm">
                      <span className="text-[var(--h-soft)] pr-2">{l}</span>
                      <span className="font-medium text-[var(--h-ink)] shrink-0">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[var(--h-line)] mt-4 pt-4">
                  <div className="flex items-end justify-between">
                    <span className="text-sm text-[var(--h-soft)]">Indicatie totaal</span>
                    <span className="abp-h-display text-3xl">€ 54.800</span>
                  </div>
                  <button onClick={() => navigate('/aanbouw/login')} className="abp-pill abp-pill-orange w-full justify-center mt-5">Probeer de configurator</button>
                  <p className="text-center text-[11px] text-[var(--h-soft)] mt-3">Gratis · vrijblijvend · in 2 minuten</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --- Diensten (editorial rows, geen kleine cards) ------------------------ */
function Diensten() {
  const types = BUILD_TYPES.filter((t) => t !== 'Anders');
  return (
    <section id="diensten" className="abp-h-section bg-white">
      <div className="abp-h-container">
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20 items-start">
          <div className="lg:sticky lg:top-28">
            <Reveal><span className="abp-h-kicker">Wat we bouwen</span></Reveal>
            <Reveal delay={0.05}><h2 className="abp-h-display abp-h-h2 mt-6">Elke vorm van<br />woninguitbreiding.</h2></Reveal>
            <Reveal delay={0.1}><p className="abp-h-lead mt-6 max-w-sm">Eén platform, alle specialisten. Van een lichte uitbouw tot een complete prefab woning — altijd door geverifieerde vakmensen.</p></Reveal>
          </div>
          <div id="ontwerp">
            {types.map((t, i) => (
              <Reveal key={t} delay={Math.min(i * 0.04, 0.2)}>
                <Link to="/aanbouw/login" className="abp-row flex items-center gap-6 py-6 group">
                  <span className="abp-row-num text-2xl w-12 shrink-0">0{i + 1}</span>
                  <span className="abp-row-title abp-h-display text-[clamp(1.5rem,3.2vw,2.4rem)] flex-1">{t}</span>
                  <Arrow className="text-[var(--h-soft)] group-hover:text-[var(--abp-accent)] transition-colors shrink-0" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* --- Proof (big numbers) ------------------------------------------------- */
function Proof() {
  return (
    <section className="abp-h-section bg-[#0a1626] text-white relative overflow-hidden">
      <div className="absolute inset-0 abp-grid-bg opacity-[0.08]" />
      <div className="abp-h-container relative">
        <Reveal><span className="abp-h-kicker abp-h-kicker-light">Vertrouwd door heel Nederland</span></Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 mt-12">
          {PLATFORM_STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <p className="abp-h-display text-[clamp(2.6rem,6vw,4.5rem)] text-white">{s.value}</p>
              <p className="text-white/55 mt-2">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- Voices (one big quote) ---------------------------------------------- */
function Voices() {
  const r = REVIEWS[0];
  return (
    <section className="abp-h-section bg-white">
      <div className="abp-h-container text-center max-w-4xl">
        <Reveal>
          <p className="abp-h-display text-[clamp(1.6rem,3.6vw,2.8rem)] leading-[1.18] tracking-[-0.02em]">
            “{r.quote}”
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="w-11 h-11 rounded-full bg-[var(--h-ink)] text-white text-sm font-bold flex items-center justify-center">{r.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}</span>
            <div className="text-left">
              <p className="font-semibold text-[var(--h-ink)]">{r.name}</p>
              <p className="text-sm text-[var(--h-soft)]">{r.project} · {r.plaats}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --- Closing CTA --------------------------------------------------------- */
function ClosingCta() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  return (
    <section ref={ref} className="relative h-[88vh] min-h-[560px] overflow-hidden">
      <motion.div className="absolute inset-[-10%_0]" style={{ y }}>
        <img src={heroVilla} alt="" className="w-full h-[120%] object-cover" style={{ objectPosition: '50% 30%' }} />
      </motion.div>
      <div className="absolute inset-0 bg-[#0a1626]/55" />
      <div className="absolute inset-0 flex items-center">
        <div className="abp-h-container-wide w-full text-center">
          <Reveal>
            <h2 className="abp-h-display abp-hw text-[clamp(2.4rem,6vw,5rem)] leading-[1.02]">Klaar om te bouwen?</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="abp-on-img text-white/80 text-lg mt-6 max-w-xl mx-auto">Ontwerp je aanbouw vandaag en ontvang offertes van de beste bouwbedrijven in jouw regio.</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-9">
              <Link to="/aanbouw/login" className="abp-pill abp-pill-orange !px-7 !py-4 !text-base">Start je ontwerp</Link>
              <Link to="/aanbouw/login" className="abp-pill abp-pill-glass !px-7 !py-4 !text-base">Inloggen als bouwbedrijf</Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --- Footer -------------------------------------------------------------- */
function Footer() {
  const cols = [
    { title: 'Bouwen', links: ['Aanbouw', 'Uitbouw', 'Dakopbouw', 'Mantelzorgwoning', 'Prefab woning'] },
    { title: 'Platform', links: ['Configurator', 'Hoe het werkt', 'Projecten', 'Reviews'] },
    { title: 'Bouwbedrijven', links: ['Aanmelden', 'Leads ontvangen', 'Werkgebied', 'Inloggen'] },
  ];
  return (
    <footer className="bg-white border-t border-[var(--h-line)]">
      <div className="abp-h-container py-16">
        <div className="grid md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-8 h-8 rounded-[10px] bg-[var(--abp-accent)] flex items-center justify-center"><BrandMark className="text-white" /></span>
              <span className="font-semibold text-[var(--h-ink)]">AanbouwPlatform<span className="text-[var(--abp-accent)]">.</span></span>
            </div>
            <p className="text-[var(--h-soft)] text-sm leading-relaxed max-w-xs">Hét platform voor woninguitbreiding in Nederland. Ontwerp, vergelijk en bouw — met geverifieerde vakmensen.</p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <p className="font-semibold text-[var(--h-ink)] text-sm mb-3">{c.title}</p>
              <ul className="space-y-2.5">
                {c.links.map((l) => <li key={l}><Link to="/aanbouw/login" className="text-[var(--h-soft)] hover:text-[var(--h-ink)] text-sm transition-colors">{l}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-[var(--h-line)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--h-soft)]">
          <p>© 2026 AanbouwPlatform.nl — onderdeel van Prefab Select.</p>
          <p>Ontworpen in Nederland · gebouwd met vakmanschap</p>
        </div>
      </div>
    </footer>
  );
}
