import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring, type MotionValue } from 'motion/react';
import {
  Star, ShieldCheck, ArrowRight, Check, Plus, Minus, Play, MapPin, MoveHorizontal,
} from 'lucide-react';
import heroVilla from '../assets/hero-villa.webp';

/* =========================================================================
   AanbouwPlatform.nl — homepage v3. Behandeld als product design (Apple /
   Airbnb): gelaagde hero met depth & parallax, emotie, een Porsche-achtige
   live configurator, magazine-portfolio en before/after review.
   Functionaliteit identiek: alle CTA's -> /aanbouw/login.
   ========================================================================= */

const EASE = [0.2, 0.7, 0.2, 1] as const;

function Reveal({ children, delay = 0, y = 26, className }: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-70px' }} transition={{ duration: 0.85, ease: EASE, delay }}>
      {children}
    </motion.div>
  );
}

/* Count-up that runs once when scrolled into view. */
function Stat({ to, label, prefix = '', suffix = '', decimals = 0 }: { to: number; label: string; prefix?: string; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) {
        const t0 = performance.now(); const dur = 1300;
        const tick = (t: number) => { const p = Math.min(1, (t - t0) / dur); setV(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(tick); };
        requestAnimationFrame(tick); io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el); return () => io.disconnect();
  }, [to]);
  return (
    <div ref={ref}>
      <p className="abp-num text-[clamp(2.2rem,5vw,3.6rem)] text-[var(--p-ink)]">{prefix}{v.toFixed(decimals)}{suffix}</p>
      <p className="text-[var(--p-soft)] mt-1 text-sm">{label}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="abp-root abp-p">
      <Nav />
      <Hero />
      <Emotion />
      <Configurator />
      <Portfolio />
      <Reviews />
      <Closing />
      <Footer />
    </div>
  );
}

/* --- Brand --------------------------------------------------------------- */
function BrandMark({ size = 34 }: { size?: number }) {
  return (
    <span className="inline-flex items-center justify-center rounded-xl shrink-0" style={{ width: size, height: size, background: 'var(--abp-grad-orange)' }}>
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none">
        <path d="M3 11.5 12 4l9 7.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 10.5V20h5v-4h2v4h5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/* --- Nav ----------------------------------------------------------------- */
function Nav() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = [['#ontwerp', 'Ontwerpen'], ['#configurator', 'Configurator'], ['#projecten', 'Projecten'], ['/aanbouw/login', 'Aannemers']];
  return (
    <motion.header className="fixed top-0 inset-x-0 z-50" initial={false}
      animate={{ backgroundColor: solid ? 'rgba(251,250,248,0.82)' : 'rgba(251,250,248,0)', borderColor: solid ? 'rgba(236,236,240,1)' : 'rgba(236,236,240,0)', backdropFilter: solid ? 'blur(16px)' : 'blur(0px)' }}
      transition={{ duration: 0.4, ease: EASE }} style={{ borderBottom: '1px solid' }}>
      <div className="abp-p-wrap flex items-center justify-between h-[74px]">
        <a href="#top" className="flex items-center gap-2.5"><BrandMark /><span className="font-extrabold tracking-tight text-[var(--p-ink)]">AanbouwPlatform<span className="text-[var(--abp-accent)]">.</span></span></a>
        <nav className="hidden lg:flex items-center gap-9">
          {links.map(([h, l]) => h.startsWith('#')
            ? <a key={l} href={h} className="text-[var(--p-soft)] hover:text-[var(--p-ink)] text-[15px] font-medium transition-colors">{l}</a>
            : <Link key={l} to={h} className="text-[var(--p-soft)] hover:text-[var(--p-ink)] text-[15px] font-medium transition-colors">{l}</Link>)}
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/aanbouw/login" className="hidden sm:inline text-[15px] font-medium text-[var(--p-soft)] hover:text-[var(--p-ink)]">Inloggen</Link>
          <Link to="/aanbouw/login" className="abp-pill abp-pill-dark !py-2.5 !px-5 !text-sm">Ontwerp jouw ruimte</Link>
        </div>
      </div>
    </motion.header>
  );
}

/* --- Floating card (mouse parallax + idle float) ------------------------- */
function FloatCard({ mx, my, depth, idle = 4, className, style, children }: {
  mx: MotionValue<number>; my: MotionValue<number>; depth: number; idle?: number; className?: string; style?: React.CSSProperties; children: React.ReactNode;
}) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return (
    <motion.div style={{ x, y, ...style }} className={`absolute ${className ?? ''}`}>
      <motion.div initial={{ opacity: 0, scale: 0.94, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}>
        <motion.div animate={{ y: [0, -idle, 0] }} transition={{ duration: 5 + depth, repeat: Infinity, ease: 'easeInOut' }}>
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* --- Hero ---------------------------------------------------------------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const frameY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const rawX = useMotionValue(0); const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 90, damping: 18 });
  const my = useSpring(rawY, { stiffness: 90, damping: 18 });
  const onMove = (e: React.MouseEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    rawX.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    rawY.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };
  const tiltX = useTransform(my, (v) => -v * 3);
  const tiltY = useTransform(mx, (v) => v * 4);

  return (
    <section id="top" ref={ref} onMouseMove={onMove} className="relative overflow-hidden pt-[120px] pb-24 lg:pb-32">
      <div className="abp-amb" style={{ width: 460, height: 460, background: 'rgba(249,140,60,.28)', top: -120, right: -80 }} />
      <div className="abp-amb" style={{ width: 380, height: 380, background: 'rgba(120,170,220,.22)', bottom: -120, left: -100 }} />

      <div className="abp-p-wrap relative grid lg:grid-cols-[1.02fr_1.1fr] gap-10 lg:gap-8 items-center">
        <motion.div style={{ y: textY, opacity: fade }}>
          <motion.span className="abp-p-eyebrow block mb-6" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}>Woninguitbreiding, opnieuw bedacht</motion.span>
          <h1 className="abp-p-display abp-p-mega">
            {['Meer ruimte.', 'Meer licht.'].map((l, i) => (
              <motion.span key={l} className="block" initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.2 + i * 0.1 }}>{l}</motion.span>
            ))}
            <motion.span className="block text-[var(--abp-accent)]" initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}>Meer thuis.</motion.span>
          </h1>
          <motion.p className="abp-p-lead max-w-md mt-7" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}>
            Ontwerp je aanbouw, voel hoe je huis groeit, en laat de beste vakmensen van Nederland het bouwen.
          </motion.p>
          <motion.div className="flex flex-wrap items-center gap-3 mt-9" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.72 }}>
            <a href="#configurator" className="abp-pill abp-pill-orange !px-6 !py-3.5 !text-base">Ontwerp jouw ruimte <ArrowRight size={18} /></a>
            <a href="#projecten" className="abp-pill abp-pill-light !px-6 !py-3.5 !text-base">Bekijk projecten</a>
          </motion.div>
          <motion.div className="flex items-center gap-3 mt-8 text-sm text-[var(--p-soft)]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.9 }}>
            <span className="flex">{[0, 1, 2, 3, 4].map((i) => <Star key={i} size={15} className="text-[var(--abp-gold)] fill-[var(--abp-gold)]" />)}</span>
            <span><strong className="text-[var(--p-ink)]">4.8</strong> uit 1.350+ reviews · geverifieerde vakmensen</span>
          </motion.div>
        </motion.div>

        {/* framed architecture object with floating cards */}
        <motion.div style={{ y: frameY }} className="relative">
          <motion.div className="abp-frame aspect-[5/6] sm:aspect-[4/4.4] max-w-[560px] mx-auto" style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1000 }}>
            <img src={heroVilla} alt="Moderne woning met glazen aanbouw" className="abp-grade-warm" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(10,16,24,.35))' }} />
          </motion.div>

          <FloatCard mx={mx} my={my} depth={14} idle={6} className="left-[-4%] top-[14%]">
            <div className="abp-float px-4 py-3 flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center"><ShieldCheck size={17} /></span>
              <span className="leading-tight"><span className="block text-[13px] font-semibold text-[var(--p-ink)]">Geverifieerde vakmensen</span><span className="block text-[11px] text-[var(--p-soft)]">180+ bouwbedrijven</span></span>
            </div>
          </FloatCard>

          <FloatCard mx={mx} my={my} depth={24} idle={9} className="right-[-5%] top-[40%]">
            <div className="abp-float px-4 py-3.5 w-44">
              <span className="text-[11px] font-semibold text-[var(--p-soft)] uppercase tracking-wide">Live indicatie</span>
              <p className="abp-num text-2xl text-[var(--p-ink)] mt-0.5">€ 54.800</p>
              <div className="h-1 rounded-full bg-slate-200 mt-2 overflow-hidden"><div className="h-full w-3/4 rounded-full" style={{ background: 'var(--abp-grad-orange)' }} /></div>
            </div>
          </FloatCard>

          <FloatCard mx={mx} my={my} depth={18} idle={7} className="left-[6%] bottom-[6%]">
            <div className="abp-float px-3.5 py-2.5 flex items-center gap-2">
              <span className="flex">{[0, 1, 2, 3, 4].map((i) => <Star key={i} size={12} className="text-[var(--abp-gold)] fill-[var(--abp-gold)]" />)}</span>
              <span className="text-[12px] font-semibold text-[var(--p-ink)]">4.8 · 1.350+</span>
            </div>
          </FloatCard>
        </motion.div>
      </div>
    </section>
  );
}

/* --- Emotion ------------------------------------------------------------- */
function Emotion() {
  const words = ['een grotere woonkamer', 'een droomkeuken', 'licht', 'ruimte voor wie je liefhebt', 'kwaliteit van leven'];
  return (
    <section className="abp-p-section bg-white relative">
      <div className="abp-p-wrap grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
        <div>
          <Reveal><span className="abp-p-eyebrow">Waarom uitbreiden</span></Reveal>
          <Reveal delay={0.05}><h2 className="abp-p-display abp-p-h2 mt-6">Je koopt geen aanbouw.</h2></Reveal>
          <Reveal delay={0.1}><p className="abp-p-lead mt-6 max-w-md">Je koopt meer ruimte om te leven. En dat verdient meer dan een offerteformulier.</p></Reveal>
          <ul className="mt-8 space-y-3">
            {words.map((w, i) => (
              <Reveal key={w} delay={0.12 + i * 0.06}>
                <li className="flex items-center gap-3 text-[clamp(1.1rem,2.2vw,1.5rem)] font-medium text-[var(--p-ink)]">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--abp-accent)' }} /> {w}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
        <Reveal delay={0.1} className="relative">
          <div className="abp-frame aspect-[4/5]"><img src={heroVilla} alt="Interieur met veel licht" className="abp-grade-cool" style={{ objectPosition: '60% 50%' }} /></div>
          <div className="abp-float absolute -bottom-6 -left-6 px-5 py-4 max-w-[210px]">
            <p className="abp-num text-2xl text-[var(--p-ink)]">+38%</p>
            <p className="text-[12px] text-[var(--p-soft)] mt-0.5">meer woonoppervlak gemiddeld</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --- Configurator (Porsche-style, live) ---------------------------------- */
const CFG_TYPES = [
  { key: 'aanbouw', label: 'Aanbouw', base: 32000 },
  { key: 'uitbouw', label: 'Uitbouw', base: 28000 },
  { key: 'dakopbouw', label: 'Dakopbouw', base: 41000 },
];
const CFG_MAT = [
  { key: 'eiken', label: 'Warm eiken', add: 7500, grade: 'abp-grade-warm', c: 'linear-gradient(135deg,#d6a772,#b07d44)' },
  { key: 'stuc', label: 'Wit stucwerk', add: 5500, grade: '', c: 'linear-gradient(135deg,#f1f2f4,#d4d9df)' },
  { key: 'steen', label: 'Handvorm steen', add: 8500, grade: 'abp-grade-dusk', c: 'linear-gradient(135deg,#a6735a,#774634)' },
  { key: 'staal', label: 'Zwart staal', add: 9500, grade: 'abp-grade-cool', c: 'linear-gradient(135deg,#2a2e34,#101316)' },
];

function useCountUp(target: number, dur = 700) {
  const [v, setV] = useState(target);
  const prev = useRef(target);
  useEffect(() => {
    const from = prev.current; const t0 = performance.now(); let raf = 0;
    const tick = (t: number) => { const p = Math.min(1, (t - t0) / dur); setV(Math.round(from + (target - from) * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(tick); else prev.current = target; };
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf);
  }, [target, dur]);
  return v;
}

function Configurator() {
  const navigate = useNavigate();
  const [type, setType] = useState(0);
  const [m2, setM2] = useState(24);
  const [mat, setMat] = useState(0);
  const [pui, setPui] = useState(true);
  const [licht, setLicht] = useState(true);

  const price = CFG_TYPES[type].base + (m2 - 20) * 1450 + CFG_MAT[mat].add + (pui ? 6500 : 0) + (licht ? 2800 : 0);
  const shown = useCountUp(price);

  return (
    <section id="configurator" className="abp-p-section relative overflow-hidden">
      <div className="abp-amb" style={{ width: 420, height: 420, background: 'rgba(249,140,60,.16)', top: '20%', left: '-10%' }} />
      <div className="abp-p-wrap relative">
        <div className="max-w-2xl mb-12">
          <Reveal><span className="abp-p-eyebrow">De configurator · uniek in Nederland</span></Reveal>
          <Reveal delay={0.05}><h2 className="abp-p-display abp-p-h2 mt-6">Stel 'm samen.<br />Zoals je een Porsche configureert.</h2></Reveal>
        </div>

        <Reveal delay={0.08}>
          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-6 items-stretch">
            {/* choices */}
            <div className="abp-float p-5 sm:p-6">
              <p className="abp-p-eyebrow !text-[0.66rem]">Type uitbreiding</p>
              <div className="grid grid-cols-3 gap-2 mt-3 mb-5">
                {CFG_TYPES.map((t, i) => (
                  <button key={t.key} onClick={() => setType(i)} className={`abp-cfg-row !justify-center !px-2 !py-3 text-sm font-semibold ${type === i ? 'abp-cfg-row-active' : ''}`}>{t.label}</button>
                ))}
              </div>

              <div className="flex items-center justify-between mb-1">
                <p className="abp-p-eyebrow !text-[0.66rem]">Oppervlakte</p>
                <span className="text-sm font-semibold text-[var(--p-ink)]">{m2} m²</span>
              </div>
              <div className="flex items-center gap-3 mb-5">
                <button onClick={() => setM2((v) => Math.max(12, v - 2))} className="w-9 h-9 rounded-full border border-[var(--p-line)] flex items-center justify-center hover:border-[var(--abp-accent)]"><Minus size={15} /></button>
                <input type="range" min={12} max={40} step={2} value={m2} onChange={(e) => setM2(Number(e.target.value))} className="flex-1 accent-[var(--abp-accent)]" />
                <button onClick={() => setM2((v) => Math.min(40, v + 2))} className="w-9 h-9 rounded-full border border-[var(--p-line)] flex items-center justify-center hover:border-[var(--abp-accent)]"><Plus size={15} /></button>
              </div>

              <p className="abp-p-eyebrow !text-[0.66rem] mb-3">Materiaal & afwerking</p>
              <div className="grid grid-cols-2 gap-2 mb-5">
                {CFG_MAT.map((m, i) => (
                  <button key={m.key} onClick={() => setMat(i)} className={`abp-cfg-row !py-2.5 ${mat === i ? 'abp-cfg-row-active' : ''}`}>
                    <span className="w-7 h-7 rounded-lg border-2 border-white shadow shrink-0" style={{ background: m.c }} />
                    <span className="text-[13px] font-medium">{m.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <button onClick={() => setPui((v) => !v)} className={`abp-cfg-row flex-1 !justify-between ${pui ? 'abp-cfg-row-active' : ''}`}><span className="text-[13px] font-medium">Schuifpui</span><Toggle on={pui} /></button>
                <button onClick={() => setLicht((v) => !v)} className={`abp-cfg-row flex-1 !justify-between ${licht ? 'abp-cfg-row-active' : ''}`}><span className="text-[13px] font-medium">Lichtstraat</span><Toggle on={licht} /></button>
              </div>
            </div>

            {/* live stage */}
            <div className="abp-float-dark p-5 sm:p-6 relative overflow-hidden">
              <div className="abp-frame aspect-[16/10]">
                <motion.img key={mat} src={heroVilla} alt="Live preview" className={CFG_MAT[mat].grade} initial={{ opacity: 0.5, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: EASE }} style={{ objectPosition: '50% 55%' }} />
              </div>
              <div className="absolute top-9 right-9 abp-float-dark px-3 py-2 text-xs text-white/90">{CFG_TYPES[type].label} · {m2} m²</div>
              <div className="flex items-end justify-between mt-5 flex-wrap gap-3">
                <div>
                  <p className="text-white/55 text-[11px] uppercase tracking-wide">Jouw indicatie</p>
                  <p className="abp-num text-[2.6rem] leading-none text-white mt-1">€ {shown.toLocaleString('nl-NL')}</p>
                  <p className="text-white/45 text-[11px] mt-1">incl. BTW · richtprijs</p>
                </div>
                <button onClick={() => navigate('/aanbouw/login')} className="abp-pill abp-pill-orange !px-6 !py-3.5">Vraag deze aan <ArrowRight size={17} /></button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
function Toggle({ on }: { on: boolean }) {
  return (
    <span className={`w-9 h-5 rounded-full relative transition-colors ${on ? 'bg-[var(--abp-accent)]' : 'bg-slate-300'}`}>
      <motion.span className="absolute top-0.5 w-4 h-4 rounded-full bg-white" animate={{ left: on ? 18 : 2 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
    </span>
  );
}

/* --- Portfolio (magazine) ------------------------------------------------ */
const PORTFOLIO = [
  { title: 'Glazen aanbouw met infinity pool', plaats: 'Noord-Brabant', m2: 42, grade: 'abp-grade-warm', pos: '50% 50%', span: 'lg:col-span-2 lg:row-span-2', ar: 'aspect-[4/5] lg:aspect-auto lg:h-full' },
  { title: 'Uitbouw woonkamer', plaats: 'Tilburg', m2: 24, grade: 'abp-grade-cool', pos: '30% 60%', span: '', ar: 'aspect-[4/3]' },
  { title: 'Dakopbouw met terras', plaats: 'Den Haag', m2: 35, grade: 'abp-grade-dusk', pos: '70% 40%', span: '', ar: 'aspect-[4/3]' },
  { title: 'Mantelzorgwoning', plaats: 'Oss', m2: 48, grade: 'abp-grade-mono', pos: '50% 65%', span: '', ar: 'aspect-[4/3]' },
  { title: 'Tuinkantoor', plaats: 'Eindhoven', m2: 16, grade: 'abp-grade-warm', pos: '60% 45%', span: '', ar: 'aspect-[4/3]' },
];

function Portfolio() {
  return (
    <section id="projecten" className="abp-p-section bg-white">
      <div className="abp-p-wrap">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div className="max-w-xl">
            <Reveal><span className="abp-p-eyebrow">Gerealiseerd</span></Reveal>
            <Reveal delay={0.05}><h2 className="abp-p-display abp-p-h2 mt-5">Projecten die je<br />wilt naleven.</h2></Reveal>
          </div>
          <Reveal delay={0.1}><Link to="/aanbouw/login" className="abp-pill abp-pill-light !py-3 !px-5 !text-sm">Bekijk portfolio <ArrowRight size={15} /></Link></Reveal>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 lg:auto-rows-[200px] gap-4 lg:gap-5">
          {PORTFOLIO.map((p, i) => (
            <Reveal key={p.title} delay={Math.min(i * 0.06, 0.25)} className={`${p.span}`}>
              <div className={`abp-mag-img group cursor-pointer ${p.ar} ${p.span ? 'lg:h-full' : ''}`}>
                <img src={heroVilla} alt={p.title} className={p.grade} style={{ objectPosition: p.pos }} />
                <div className="abp-mag-cap">
                  <p className={`font-semibold ${p.span ? 'text-xl' : 'text-base'} leading-tight`}>{p.title}</p>
                  <p className="text-white/75 text-xs mt-1 flex items-center gap-1.5"><MapPin size={12} /> {p.plaats} · {p.m2} m²</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- Reviews (before/after + pull quote) --------------------------------- */
function Reviews() {
  return (
    <section className="abp-p-section relative overflow-hidden">
      <div className="abp-p-wrap grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">
        <Reveal className="relative">
          <div className="abp-ba aspect-[4/3]">
            <img src={heroVilla} alt="Na de verbouwing" className="w-full h-full object-cover abp-grade-warm" />
            <div className="absolute inset-0 overflow-hidden" style={{ clipPath: 'inset(0 50% 0 0)' }}>
              <img src={heroVilla} alt="Voor de verbouwing" className="w-full h-full object-cover abp-grade-mono" />
            </div>
            <div className="abp-ba-divider" style={{ left: '50%' }}>
              <span className="abp-ba-handle" style={{ left: '50%', top: '50%' }}><MoveHorizontal size={17} className="text-[var(--p-ink)]" /></span>
            </div>
            <span className="absolute top-3 left-3 text-[11px] font-semibold text-white bg-black/35 rounded-full px-2.5 py-1">Voor</span>
            <span className="absolute top-3 right-3 text-[11px] font-semibold text-white bg-[var(--abp-accent)] rounded-full px-2.5 py-1">Na</span>
            <button className="absolute left-1/2 bottom-4 -translate-x-1/2 abp-float px-3.5 py-2 flex items-center gap-2 text-[13px] font-semibold text-[var(--p-ink)]"><span className="w-6 h-6 rounded-full bg-[var(--abp-accent)] text-white flex items-center justify-center"><Play size={11} className="ml-0.5" /></span> Bekijk videoreview</button>
          </div>
        </Reveal>

        <div>
          <Reveal><span className="abp-p-eyebrow">Echte verhalen</span></Reveal>
          <Reveal delay={0.05}>
            <p className="abp-p-display text-[clamp(1.6rem,3.4vw,2.6rem)] leading-[1.2] tracking-[-0.02em] mt-6">
              “Onze keuken kwam tot leven. Binnen een week drie offertes, en de aannemer die we kozen was <span className="text-[var(--abp-accent)]">precies goed</span>.”
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-7 flex items-center gap-3">
              <span className="w-11 h-11 rounded-full bg-[var(--p-ink)] text-white text-sm font-bold flex items-center justify-center">FH</span>
              <div><p className="font-semibold text-[var(--p-ink)]">Familie Hendriks</p><p className="text-sm text-[var(--p-soft)]">Aanbouw 16 m² · Waalwijk</p></div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex gap-8 mt-10 pt-8 border-t border-[var(--p-line)]">
              <Stat to={1350} label="reviews" suffix="+" />
              <Stat to={4.8} label="gemiddeld" decimals={1} />
              <Stat to={180} label="vakmensen" suffix="+" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --- Closing ------------------------------------------------------------- */
function Closing() {
  return (
    <section id="ontwerp" className="pb-24">
      <div className="abp-p-wrap">
        <Reveal>
          <div className="relative rounded-[32px] overflow-hidden">
            <img src={heroVilla} alt="" className="absolute inset-0 w-full h-full object-cover abp-grade-dusk" style={{ objectPosition: '50% 40%' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(110deg, rgba(10,16,24,.86), rgba(10,16,24,.45) 60%, rgba(10,16,24,.2))' }} />
            <div className="relative px-8 sm:px-14 py-16 sm:py-24 max-w-2xl">
              <h2 className="abp-p-display text-white text-[clamp(2.2rem,5vw,4rem)] leading-[1.04]">Begin bij de droom.<br />Wij regelen de rest.</h2>
              <p className="text-white/75 text-lg mt-6 max-w-lg">Ontwerp je uitbreiding in twee minuten en ontvang offertes van de beste bouwbedrijven in jouw regio.</p>
              <div className="flex flex-wrap gap-3 mt-9">
                <Link to="/aanbouw/login" className="abp-pill abp-pill-orange !px-7 !py-4 !text-base">Ontwerp jouw ruimte <ArrowRight size={18} /></Link>
                <Link to="/aanbouw/login" className="abp-pill abp-pill-glass !px-7 !py-4 !text-base">Voor bouwbedrijven</Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --- Footer -------------------------------------------------------------- */
function Footer() {
  const cols = [
    { title: 'Bouwen', links: ['Aanbouw', 'Uitbouw', 'Dakopbouw', 'Mantelzorgwoning', 'Prefab woning'] },
    { title: 'Platform', links: ['Configurator', 'Hoe het werkt', 'Projecten', 'Reviews'] },
    { title: 'Bouwbedrijven', links: ['Aanmelden', 'Voordelen', 'Tarieven', 'Inloggen'] },
  ];
  return (
    <footer className="bg-white border-t border-[var(--p-line)]">
      <div className="abp-p-wrap py-16">
        <div className="grid md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4"><BrandMark /><span className="font-extrabold tracking-tight text-[var(--p-ink)]">AanbouwPlatform<span className="text-[var(--abp-accent)]">.</span></span></div>
            <p className="text-[var(--p-soft)] text-sm max-w-xs leading-relaxed">Meer ruimte, meer licht, meer thuis. Het platform voor woninguitbreiding in Nederland.</p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <p className="font-semibold text-[var(--p-ink)] text-sm mb-3">{c.title}</p>
              <ul className="space-y-2.5">{c.links.map((l) => <li key={l}><Link to="/aanbouw/login" className="text-[var(--p-soft)] hover:text-[var(--p-ink)] text-sm transition-colors">{l}</Link></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-[var(--p-line)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--p-soft)]">
          <p>© 2026 AanbouwPlatform.nl — onderdeel van Prefab Select.</p>
          <p>Ontworpen in Nederland</p>
        </div>
      </div>
    </footer>
  );
}
