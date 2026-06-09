/**
 * AIAgency — Premium standalone landing page for an AI Automation, Marketing & Sales agency.
 *
 * Self-contained: ships its own nav + footer and renders without the Prefab Select chrome
 * (App.tsx hides the global Navbar/Footer for the /ai-agency route).
 *
 * Stack: React 19 + Vite + Tailwind v4 + `motion`. All animations use `motion/react`.
 *
 * To rebrand: change BRAND below. To recolor: edit the PALETTE constants.
 */
import { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
  type Variants,
} from 'motion/react';
import {
  Sparkles, Bot, Zap, Target, Globe, Filter, Workflow, MessageSquare, Code2,
  Search, LineChart, TrendingUp, Users, Clock, DollarSign, Heart, ArrowRight,
  Check, Star, Phone, Mail, ChevronDown, Rocket, Plus, ShieldCheck, Building2,
  Calendar, Cpu, Compass, PenTool, Settings2,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Brand + palette                                                     */
/* ------------------------------------------------------------------ */
const BRAND = 'Nexora Growth';
const TAGLINE = 'Website, Marketing & Sales growth for ambitious businesses';

const PALETTE = {
  blue: '#2563EB',
  blue2: '#3B82F6',
  cyan: '#06B6D4',
  violet: '#8B5CF6',
  sky: '#38BDF8',
};

const GRAD = `linear-gradient(135deg, ${PALETTE.blue} 0%, ${PALETTE.blue2} 35%, ${PALETTE.cyan} 70%, ${PALETTE.sky} 100%)`;
const GRAD_TEXT = `linear-gradient(120deg, ${PALETTE.sky} 0%, ${PALETTE.blue2} 40%, ${PALETTE.violet} 100%)`;

/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */

// Scroll-reveal wrapper with staggered children support.
const revealParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const revealItem: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={{ hidden: { opacity: 0, y: 28, filter: 'blur(6px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } } }}
    >
      {children}
    </motion.div>
  );
}

// requestAnimationFrame counter that fires when scrolled into view.
function useCountUp(target: number, decimals = 0, duration = 1800) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setValue(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);
  return { ref, display: value.toFixed(decimals) };
}

function Counter({ to, decimals = 0, prefix = '', suffix = '' }: { to: number; decimals?: number; prefix?: string; suffix?: string }) {
  const { ref, display } = useCountUp(to, decimals);
  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
}

function GradientText({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`bg-clip-text text-transparent ${className}`}
      style={{ backgroundImage: GRAD_TEXT }}
    >
      {children}
    </span>
  );
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ------------------------------------------------------------------ */
/* Logo                                                                */
/* ------------------------------------------------------------------ */
// Brand mark: a rising chart line with an upward arrow — "growth".
function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <span
      className="grid flex-shrink-0 place-items-center rounded-xl text-white shadow-lg"
      style={{ width: size, height: size, background: GRAD }}
      aria-hidden
    >
      <svg
        width={size * 0.58}
        height={size * 0.58}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="3 17 9 11 13 15 21 7" />
        <polyline points="15 7 21 7 21 13" />
      </svg>
    </span>
  );
}

// Full logo: mark + wordmark ("Nexora" + gradient "Growth").
function Logo({ markSize = 36 }: { markSize?: number }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark size={markSize} />
      <span className="text-lg font-black tracking-tight text-white">
        Nexora <GradientText>Growth</GradientText>
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */
const NAV_LINKS = [
  { label: 'Services', id: 'services' },
  { label: 'Results', id: 'features' },
  { label: 'Process', id: 'process' },
  { label: 'Case Studies', id: 'cases' },
  { label: 'Pricing', id: 'pricing' },
  { label: 'FAQ', id: 'faq' },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`mx-auto max-w-7xl px-5 transition-all duration-500 ${scrolled ? 'mt-3' : 'mt-5'}`}
      >
        <div
          className={`flex items-center justify-between rounded-2xl border px-5 py-3 transition-all duration-500 ${
            scrolled
              ? 'border-white/10 bg-[#0a0e27]/70 shadow-[0_20px_60px_-20px_rgba(37,99,235,0.5)] backdrop-blur-xl'
              : 'border-transparent bg-transparent'
          }`}
        >
          <button onClick={() => scrollToId('top')} aria-label={BRAND}>
            <Logo markSize={38} />
          </button>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollToId(l.id)}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToId('contact')}
              className="hidden items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95 sm:flex"
              style={{ background: GRAD }}
            >
              Book a Call <ArrowRight size={15} />
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white lg:hidden"
              aria-label="Toggle menu"
            >
              <ChevronDown size={18} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0e27]/90 backdrop-blur-xl lg:hidden"
            >
              <div className="flex flex-col p-2">
                {NAV_LINKS.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => { scrollToId(l.id); setOpen(false); }}
                    className="rounded-lg px-4 py-3 text-left text-sm font-medium text-white/80 hover:bg-white/5"
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yFast = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Mouse-follow glow.
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const gx = useSpring(mx, { stiffness: 60, damping: 20 });
  const gy = useSpring(my, { stiffness: 60, damping: 20 });
  const glowX = useTransform(gx, (v) => `${v * 100}%`);
  const glowY = useTransform(gy, (v) => `${v * 100}%`);

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      className="relative isolate overflow-hidden bg-[#05070f] pt-40 pb-28 sm:pt-48 sm:pb-36"
    >
      {/* animated gradient base */}
      <div className="ai-animated-bg absolute inset-0 -z-20 opacity-70" />
      {/* mouse-follow glow */}
      <motion.div
        className="pointer-events-none absolute -z-10 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
        style={{ left: glowX, top: glowY, background: `radial-gradient(circle, ${PALETTE.blue}55, transparent 60%)` }}
      />
      {/* floating glass orbs */}
      <motion.div style={{ y: yFast }} className="ai-float pointer-events-none absolute left-[8%] top-[22%] -z-10 h-40 w-40 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md" />
      <motion.div style={{ y: ySlow }} className="ai-float-slow pointer-events-none absolute right-[10%] top-[30%] -z-10 h-28 w-28 rounded-full border border-white/10 bg-white/5 backdrop-blur-md" />
      <motion.div style={{ y: yFast }} className="ai-float pointer-events-none absolute right-[20%] bottom-[12%] -z-10 h-20 w-20 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md" />
      {/* grid overlay */}
      <div className="ai-grid absolute inset-0 -z-10 opacity-[0.15]" />

      <motion.div style={{ opacity: fade }} className="mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/80 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
          </span>
          Website • Marketing • Sales Growth
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05 }}
          className="text-4xl font-black leading-[1.05] tracking-tighter text-white sm:text-6xl lg:text-7xl"
        >
          Website, Marketing &amp; Sales Growth For <GradientText>Ambitious Businesses</GradientText>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18 }}
          className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl"
        >
          We design high-converting websites and build the marketing &amp; sales systems that generate leads, automate operations, and accelerate growth.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button
            onClick={() => scrollToId('contact')}
            className="group flex w-full items-center justify-center gap-2.5 rounded-2xl px-8 py-4 text-base font-bold text-white shadow-[0_20px_50px_-15px_rgba(37,99,235,0.7)] transition-transform hover:-translate-y-1 active:scale-95 sm:w-auto"
            style={{ background: GRAD }}
          >
            <Calendar size={18} /> Book Strategy Call
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => scrollToId('cases')}
            className="flex w-full items-center justify-center gap-2.5 rounded-2xl border border-white/15 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur-md transition-all hover:-translate-y-1 hover:border-white/30 hover:bg-white/10 active:scale-95 sm:w-auto"
          >
            View Case Studies
          </button>
        </motion.div>

        {/* trust stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md sm:grid-cols-4"
        >
          {[
            { v: 250, suffix: '+', label: 'Systems shipped' },
            { v: 3.4, decimals: 1, suffix: 'M+', label: 'Leads generated' },
            { v: 40, suffix: '%', label: 'Avg. cost cut' },
            { v: 4.9, decimals: 1, suffix: '/5', label: 'Client rating' },
          ].map((s) => (
            <div key={s.label} className="bg-white/[0.02] px-4 py-6 text-center">
              <div className="text-2xl font-black text-white sm:text-3xl">
                <Counter to={s.v} decimals={s.decimals ?? 0} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-white/50">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* fade into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-white" />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */
const SERVICES = [
  { icon: Bot, title: 'AI Automation', desc: 'Custom AI workflows that handle repetitive operations end-to-end, around the clock.' },
  { icon: Target, title: 'Lead Generation', desc: 'Predictable pipelines that fill your CRM with qualified, sales-ready prospects.' },
  { icon: Globe, title: 'Website Development', desc: 'High-converting, lightning-fast sites engineered to turn traffic into revenue.' },
  { icon: Filter, title: 'Sales Funnels', desc: 'Optimized multi-step funnels that nurture leads and maximize conversion.' },
  { icon: Workflow, title: 'CRM Integrations', desc: 'Seamlessly connect your tools so data flows automatically across your stack.' },
  { icon: Zap, title: 'Marketing Automation', desc: 'Behavior-triggered campaigns across email, SMS, and ads that run themselves.' },
  { icon: MessageSquare, title: 'Chatbots & AI Agents', desc: 'Conversational agents that qualify, support, and book meetings 24/7.' },
  { icon: Code2, title: 'Custom Software', desc: 'Bespoke internal tools and platforms built around your exact processes.' },
  { icon: Search, title: 'SEO & Local SEO', desc: 'Technical and local SEO that compounds organic traffic month over month.' },
  { icon: LineChart, title: 'Performance Marketing', desc: 'Data-driven paid acquisition with relentless focus on ROAS and CAC.' },
];

function Services() {
  return (
    <section id="services" className="relative bg-white py-24 sm:py-32">
      <div className="container-custom">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionTag>What we do</SectionTag>
          <h2 className="mt-5 text-3xl font-black tracking-tighter text-[#0a0e27] sm:text-5xl">
            One partner for your entire <GradientText>growth engine</GradientText>
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            From first touch to closed deal — we design, build, and automate the systems that scale revenue.
          </p>
        </Reveal>

        <motion.div
          variants={revealParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {SERVICES.map((s) => (
            <motion.article
              key={s.title}
              variants={revealItem}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/70 p-6 shadow-[0_10px_40px_-20px_rgba(37,99,235,0.25)] backdrop-blur-xl transition-shadow hover:shadow-[0_30px_60px_-25px_rgba(37,99,235,0.45)]"
            >
              {/* gradient sheen on hover */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: `radial-gradient(120% 120% at 0% 0%, ${PALETTE.blue}12, transparent 55%)` }}
              />
              <div
                className="relative mb-5 grid h-12 w-12 place-items-center rounded-2xl text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                style={{ background: GRAD }}
              >
                <s.icon size={22} />
              </div>
              <h3 className="relative text-lg font-bold tracking-tight text-[#0a0e27]">{s.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-slate-500">{s.desc}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em]"
      style={{ borderColor: `${PALETTE.blue}33`, color: PALETTE.blue, background: `${PALETTE.blue}0d` }}
    >
      <Sparkles size={13} /> {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Features (why clients choose us) — animated counters                */
/* ------------------------------------------------------------------ */
const FEATURES = [
  { icon: TrendingUp, title: 'Increased Revenue', stat: 3.2, decimals: 1, suffix: 'x', sub: 'Average revenue multiple within 12 months.' },
  { icon: Settings2, title: 'Automated Workflows', stat: 85, suffix: '%', sub: 'Of manual busywork removed from operations.' },
  { icon: Users, title: 'More Qualified Leads', stat: 4.1, decimals: 1, suffix: 'x', sub: 'Increase in sales-qualified leads per month.' },
  { icon: Clock, title: 'Faster Sales Cycles', stat: 47, suffix: '%', sub: 'Shorter time from first touch to closed deal.' },
  { icon: DollarSign, title: 'Lower Operational Costs', stat: 38, suffix: '%', sub: 'Reduction in operational overhead on average.' },
  { icon: Heart, title: 'Better Customer Experience', stat: 4.9, decimals: 1, suffix: '/5', sub: 'Average post-implementation CSAT score.' },
];

function Features() {
  return (
    <section id="features" className="relative overflow-hidden bg-[#f6f8fc] py-24 sm:py-32">
      <div className="absolute -right-40 top-0 h-96 w-96 rounded-full opacity-30 blur-3xl" style={{ background: `${PALETTE.violet}33` }} />
      <div className="absolute -left-40 bottom-0 h-96 w-96 rounded-full opacity-30 blur-3xl" style={{ background: `${PALETTE.cyan}33` }} />
      <div className="container-custom relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionTag>Why clients choose us</SectionTag>
          <h2 className="mt-5 text-3xl font-black tracking-tighter text-[#0a0e27] sm:text-5xl">
            Outcomes you can <GradientText>measure</GradientText>
          </h2>
        </Reveal>

        <motion.div
          variants={revealParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURES.map((f) => (
            <motion.div
              key={f.title}
              variants={revealItem}
              whileHover={{ y: -6 }}
              className="group rounded-3xl border border-white bg-white/80 p-8 shadow-[0_20px_50px_-30px_rgba(37,99,235,0.4)] backdrop-blur-xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-2xl text-white shadow-lg" style={{ background: GRAD }}>
                  <f.icon size={22} />
                </div>
                <div className="text-4xl font-black tracking-tighter" style={{ color: PALETTE.blue }}>
                  <Counter to={f.stat} decimals={f.decimals ?? 0} suffix={f.suffix} />
                </div>
              </div>
              <h3 className="text-lg font-bold tracking-tight text-[#0a0e27]">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{f.sub}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Process timeline                                                    */
/* ------------------------------------------------------------------ */
const STEPS = [
  { icon: Compass, title: 'Discovery', desc: 'We map your goals, bottlenecks, and growth levers in a deep-dive workshop.' },
  { icon: PenTool, title: 'Strategy', desc: 'A clear, prioritized roadmap tied directly to revenue and efficiency targets.' },
  { icon: Code2, title: 'Development', desc: 'We build your systems, integrations, and assets to production quality.' },
  { icon: Cpu, title: 'Automation', desc: 'Workflows, AI agents, and triggers wired together to run without you.' },
  { icon: Rocket, title: 'Launch', desc: 'Controlled rollout with monitoring, training, and documentation.' },
  { icon: TrendingUp, title: 'Optimization', desc: 'Continuous testing and iteration to compound results over time.' },
];

function Process() {
  return (
    <section id="process" className="relative bg-white py-24 sm:py-32">
      <div className="container-custom">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionTag>How we work</SectionTag>
          <h2 className="mt-5 text-3xl font-black tracking-tighter text-[#0a0e27] sm:text-5xl">
            A proven path from <GradientText>idea to impact</GradientText>
          </h2>
        </Reveal>

        <div className="relative mx-auto mt-16 max-w-3xl">
          {/* vertical line */}
          <div className="absolute left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-[#2563EB] via-[#06B6D4] to-[#8B5CF6] sm:left-1/2 sm:-translate-x-1/2" />
          <div className="space-y-10">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className={`relative flex items-start gap-6 sm:w-1/2 ${i % 2 ? 'sm:ml-auto sm:flex-row sm:pl-12' : 'sm:flex-row-reverse sm:pr-12 sm:text-right'}`}
              >
                <div
                  className="z-10 grid h-14 w-14 flex-shrink-0 place-items-center rounded-2xl text-white shadow-lg ring-8 ring-white"
                  style={{ background: GRAD }}
                >
                  <s.icon size={22} />
                </div>
                <div className="rounded-3xl border border-slate-200/70 bg-white/70 p-6 shadow-[0_15px_40px_-25px_rgba(37,99,235,0.35)] backdrop-blur-xl">
                  <div className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: PALETTE.blue }}>
                    Step {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="mt-1 text-xl font-bold tracking-tight text-[#0a0e27]">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Case studies                                                        */
/* ------------------------------------------------------------------ */
const CASES = [
  {
    company: 'NorthPeak SaaS', tag: 'B2B SaaS',
    summary: 'Replaced manual SDR outreach with an AI lead engine and automated CRM routing.',
    metrics: [
      { label: 'Revenue growth', from: 100, to: 412, suffix: '%' },
      { label: 'Leads / month', from: 120, to: 940, suffix: '' },
      { label: 'Sales cycle', from: 0, to: 47, suffix: '% faster' },
    ],
  },
  {
    company: 'Lumen Retail', tag: 'E-commerce',
    summary: 'Built automated marketing flows and AI support agents across the funnel.',
    metrics: [
      { label: 'ROAS', from: 0, to: 6.3, decimals: 1, suffix: 'x' },
      { label: 'Support cost', from: 0, to: 58, suffix: '% lower' },
      { label: 'Conversion', from: 0, to: 2.9, decimals: 1, suffix: 'x' },
    ],
  },
  {
    company: 'Meridian Health', tag: 'Healthcare',
    summary: 'Automated intake, scheduling, and follow-up with HIPAA-aware AI agents.',
    metrics: [
      { label: 'Bookings', from: 0, to: 320, suffix: '%' },
      { label: 'No-shows', from: 0, to: 64, suffix: '% lower' },
      { label: 'Admin hours', from: 0, to: 1200, suffix: '+ saved' },
    ],
  },
];

function CaseStudies() {
  return (
    <section id="cases" className="relative overflow-hidden bg-[#05070f] py-24 sm:py-32">
      <div className="ai-animated-bg absolute inset-0 -z-10 opacity-40" />
      <div className="ai-grid absolute inset-0 -z-10 opacity-[0.12]" />
      <div className="container-custom relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionTag>Proof, not promises</SectionTag>
          <h2 className="mt-5 text-3xl font-black tracking-tighter text-white sm:text-5xl">
            Real systems, <GradientText>real growth</GradientText>
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {CASES.map((c, idx) => (
            <Reveal key={c.company} delay={idx * 0.1}>
              <motion.article
                whileHover={{ y: -8 }}
                className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70">{c.tag}</span>
                  <Building2 size={18} className="text-white/40" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-white">{c.company}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{c.summary}</p>
                <div className="mt-6 space-y-4 border-t border-white/10 pt-6">
                  {c.metrics.map((m) => (
                    <CaseMetric key={m.label} {...m} />
                  ))}
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseMetric({ label, to, decimals = 0, suffix = '' }: { label: string; from?: number; to: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <div ref={ref}>
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-white/60">{label}</span>
        <span className="text-lg font-black text-white">
          <Counter to={to} decimals={decimals} suffix={suffix} />
        </span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: '100%' } : {}}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: GRAD }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */
const TESTIMONIALS = [
  { name: 'Sarah Lindqvist', role: 'COO, NorthPeak', initials: 'SL', quote: 'They rebuilt our entire revenue engine. Within a quarter our pipeline tripled and our team finally stopped drowning in manual work.' },
  { name: 'Marcus Devine', role: 'Founder, Lumen Retail', initials: 'MD', quote: 'The AI agents handle 60% of our support and our ROAS has never been higher. It genuinely feels like we hired a 10-person team overnight.' },
  { name: 'Dr. Amira Hassan', role: 'Director, Meridian Health', initials: 'AH', quote: 'Intake and scheduling now run themselves. Our staff focus on patients, not paperwork. Easily the best investment we made this year.' },
  { name: 'Tom Bergström', role: 'CEO, Vantage Labs', initials: 'TB', quote: 'Strategic, fast, and obsessed with results. They treat our numbers like their own. I recommend them to every founder I meet.' },
];

function Testimonials() {
  return (
    <section className="relative bg-white py-24 sm:py-32">
      <div className="container-custom">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionTag>Loved by operators</SectionTag>
          <h2 className="mt-5 text-3xl font-black tracking-tighter text-[#0a0e27] sm:text-5xl">
            Trusted by <GradientText>ambitious teams</GradientText>
          </h2>
        </Reveal>

        <motion.div
          variants={revealParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {TESTIMONIALS.map((t) => (
            <motion.figure
              key={t.name}
              variants={revealItem}
              whileHover={{ y: -6 }}
              className="rounded-3xl border border-slate-200/70 bg-white/70 p-8 shadow-[0_20px_50px_-30px_rgba(37,99,235,0.4)] backdrop-blur-xl"
            >
              <div className="mb-4 flex gap-1" style={{ color: PALETTE.sky }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <blockquote className="text-lg leading-relaxed text-[#0a0e27]">“{t.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-full text-sm font-black text-white" style={{ background: GRAD }}>
                  {t.initials}
                </span>
                <span>
                  <span className="block font-bold text-[#0a0e27]">{t.name}</span>
                  <span className="block text-sm text-slate-500">{t.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>

        {/* logo strip */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60">
          {['NorthPeak', 'Lumen', 'Meridian', 'Vantage', 'Aeroflow', 'Quantia'].map((l) => (
            <span key={l} className="text-xl font-black tracking-tight text-slate-400">{l}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Pricing                                                             */
/* ------------------------------------------------------------------ */
const TIERS = [
  {
    name: 'Starter', price: '€2,500', period: '/mo', highlight: false,
    tagline: 'For teams validating their first automations.',
    features: ['1 automation workflow', 'Lead capture funnel', 'CRM setup & integration', 'Email automation', 'Monthly reporting'],
  },
  {
    name: 'Growth', price: '€6,500', period: '/mo', highlight: true,
    tagline: 'For companies ready to scale revenue fast.',
    features: ['Everything in Starter', 'Up to 5 AI workflows', 'AI chat & voice agents', 'Multi-channel marketing automation', 'Performance marketing management', 'Bi-weekly optimization sprints', 'Priority support'],
  },
  {
    name: 'Enterprise', price: 'Custom', period: '', highlight: false,
    tagline: 'For complex orgs needing bespoke systems.',
    features: ['Unlimited workflows', 'Custom software & integrations', 'Dedicated solutions architect', 'SLA & security review', 'Quarterly strategy roadmap'],
  },
];

function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden bg-[#f6f8fc] py-24 sm:py-32">
      <div className="container-custom">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionTag>Pricing</SectionTag>
          <h2 className="mt-5 text-3xl font-black tracking-tighter text-[#0a0e27] sm:text-5xl">
            Simple plans, <GradientText>serious leverage</GradientText>
          </h2>
          <p className="mt-4 text-lg text-slate-500">No long-term lock-in. Cancel anytime. Scale up as you grow.</p>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
          {TIERS.map((t, idx) => (
            <Reveal key={t.name} delay={idx * 0.08} className="h-full">
              <motion.div
                whileHover={{ y: -10 }}
                className={`relative flex h-full flex-col rounded-3xl p-8 backdrop-blur-xl transition-shadow ${
                  t.highlight
                    ? 'border-2 text-white shadow-[0_40px_80px_-30px_rgba(37,99,235,0.7)]'
                    : 'border border-slate-200/70 bg-white/70 shadow-[0_20px_50px_-30px_rgba(37,99,235,0.35)]'
                }`}
                style={t.highlight ? { background: `linear-gradient(160deg, #0b1230 0%, #111a4a 100%)`, borderColor: PALETTE.blue2 } : undefined}
              >
                {t.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-lg" style={{ background: GRAD }}>
                    Most Popular
                  </span>
                )}
                <h3 className={`text-lg font-bold ${t.highlight ? 'text-white' : 'text-[#0a0e27]'}`}>{t.name}</h3>
                <p className={`mt-1 text-sm ${t.highlight ? 'text-white/60' : 'text-slate-500'}`}>{t.tagline}</p>
                <div className="mt-6 flex items-end gap-1">
                  <span className={`text-4xl font-black tracking-tighter ${t.highlight ? 'text-white' : 'text-[#0a0e27]'}`}>{t.price}</span>
                  <span className={`pb-1 text-sm ${t.highlight ? 'text-white/50' : 'text-slate-400'}`}>{t.period}</span>
                </div>
                <ul className="mt-7 flex-1 space-y-3">
                  {t.features.map((f) => (
                    <li key={f} className={`flex items-start gap-3 text-sm ${t.highlight ? 'text-white/80' : 'text-slate-600'}`}>
                      <span className="mt-0.5 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full" style={{ background: t.highlight ? GRAD : `${PALETTE.blue}15` }}>
                        <Check size={12} className={t.highlight ? 'text-white' : ''} style={t.highlight ? undefined : { color: PALETTE.blue }} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => scrollToId('contact')}
                  className={`mt-8 flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-bold transition-transform hover:-translate-y-0.5 active:scale-95 ${
                    t.highlight ? 'text-white shadow-lg' : 'border border-slate-200 bg-white text-[#0a0e27] hover:border-[#2563EB]'
                  }`}
                  style={t.highlight ? { background: GRAD } : undefined}
                >
                  {t.name === 'Enterprise' ? 'Talk to Sales' : 'Get Started'} <ArrowRight size={15} />
                </button>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */
const FAQS = [
  { q: 'How quickly can we see results?', a: 'Most clients see their first automations live within 2–3 weeks, with measurable pipeline and efficiency gains inside the first 90 days.' },
  { q: 'Do you work with our existing tools?', a: 'Yes. We integrate with your current CRM, marketing, and data stack — or recommend a better-fit setup if it accelerates results.' },
  { q: 'Is the AI safe and compliant?', a: 'We build with privacy and security first, including data-handling reviews and compliance-aware agents for regulated industries.' },
  { q: 'What if we need something custom?', a: 'Custom software is one of our core services. If an off-the-shelf tool can’t do it, we build it around your exact process.' },
  { q: 'How does onboarding work?', a: 'It starts with a strategy call and discovery workshop, followed by a prioritized roadmap so you know exactly what we ship and when.' },
  { q: 'Can we cancel anytime?', a: 'Starter and Growth plans are month-to-month with no long-term lock-in. Enterprise terms are tailored to your needs.' },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative bg-white py-24 sm:py-32">
      <div className="container-custom">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionTag>FAQ</SectionTag>
          <h2 className="mt-5 text-3xl font-black tracking-tighter text-[#0a0e27] sm:text-5xl">
            Questions, <GradientText>answered</GradientText>
          </h2>
        </Reveal>

        <div className="mx-auto mt-14 max-w-3xl space-y-4">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.04}>
                <div className={`overflow-hidden rounded-2xl border bg-white/70 backdrop-blur-xl transition-colors ${isOpen ? 'border-[#2563EB]/40' : 'border-slate-200/70'}`}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-base font-bold text-[#0a0e27]">{f.q}</span>
                    <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full" style={{ background: isOpen ? GRAD : `${PALETTE.blue}12` }}>
                      <Plus size={16} className={`transition-transform duration-300 ${isOpen ? 'rotate-45 text-white' : ''}`} style={isOpen ? undefined : { color: PALETTE.blue }} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="px-6 pb-6 text-sm leading-relaxed text-slate-500">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */
function Field({ id, label, type = 'text', textarea = false }: { id: string; label: string; type?: string; textarea?: boolean }) {
  const cls =
    'peer w-full rounded-2xl border border-white/15 bg-white/5 px-4 pb-2.5 pt-6 text-white placeholder-transparent outline-none backdrop-blur-md transition-colors focus:border-[#38BDF8]';
  return (
    <div className="relative">
      {textarea ? (
        <textarea id={id} name={id} rows={4} placeholder={label} className={cls} />
      ) : (
        <input id={id} name={id} type={type} placeholder={label} className={cls} />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-2 text-xs font-medium text-white/50 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/40 peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#38BDF8]"
      >
        {label}
      </label>
    </div>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="relative overflow-hidden bg-[#05070f] py-24 sm:py-32">
      <div className="ai-animated-bg absolute inset-0 -z-10 opacity-50" />
      <div className="container-custom relative">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionTag>Let’s talk</SectionTag>
            <h2 className="mt-5 text-3xl font-black tracking-tighter text-white sm:text-5xl">
              Book your <GradientText>strategy call</GradientText>
            </h2>
            <p className="mt-4 max-w-md text-lg text-white/60">
              Tell us about your business and goals. We’ll map the highest-leverage automations and show you exactly what’s possible.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                { icon: ShieldCheck, t: 'No obligation, no hard sell' },
                { icon: Clock, t: '30-minute focused working session' },
                { icon: Rocket, t: 'Leave with a concrete action plan' },
              ].map((b) => (
                <li key={b.t} className="flex items-center gap-3 text-white/80">
                  <span className="grid h-9 w-9 place-items-center rounded-xl text-white" style={{ background: GRAD }}>
                    <b.icon size={16} />
                  </span>
                  {b.t}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-2 text-sm text-white/50 sm:flex-row sm:gap-6">
              <span className="inline-flex items-center gap-2"><Mail size={15} /> hello@nexoragrowth.com</span>
              <span className="inline-flex items-center gap-2"><Phone size={15} /> +31 (0)20 123 4567</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-[0_40px_100px_-40px_rgba(37,99,235,0.6)] backdrop-blur-2xl sm:p-9">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center py-12 text-center"
                  >
                    <span className="grid h-16 w-16 place-items-center rounded-full text-white" style={{ background: GRAD }}>
                      <Check size={28} />
                    </span>
                    <h3 className="mt-5 text-xl font-bold text-white">Thanks — we’ll be in touch!</h3>
                    <p className="mt-2 text-sm text-white/60">We’ve received your request and will reach out within one business day.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field id="name" label="Name" />
                      <Field id="company" label="Company" />
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field id="email" label="Email" type="email" />
                      <Field id="phone" label="Phone" type="tel" />
                    </div>
                    <Field id="message" label="Message" textarea />
                    <button
                      type="submit"
                      className="mt-2 flex w-full items-center justify-center gap-2.5 rounded-2xl px-8 py-4 text-base font-bold text-white shadow-[0_20px_50px_-15px_rgba(37,99,235,0.7)] transition-transform hover:-translate-y-1 active:scale-95"
                      style={{ background: GRAD }}
                    >
                      <Calendar size={18} /> Book Strategy Call
                    </button>
                    <p className="text-center text-xs text-white/40">We respect your privacy. Your details are never shared.</p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */
function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#05070f] py-14">
      <div className="container-custom">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <Logo markSize={36} />
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {NAV_LINKS.map((l) => (
              <button key={l.id} onClick={() => scrollToId(l.id)} className="text-sm text-white/50 transition-colors hover:text-white">
                {l.label}
              </button>
            ))}
          </nav>
          <button
            onClick={() => scrollToId('contact')}
            className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5"
            style={{ background: GRAD }}
          >
            Book a Call <ArrowRight size={15} />
          </button>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} {BRAND}. All rights reserved. · {TAGLINE}.
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Page-scoped styles (animated gradient bg, grid, floating)           */
/* ------------------------------------------------------------------ */
const PageStyles = () => (
  <style>{`
    .ai-animated-bg {
      background: radial-gradient(60% 60% at 20% 20%, ${PALETTE.blue}40, transparent 60%),
                  radial-gradient(50% 50% at 80% 10%, ${PALETTE.violet}40, transparent 60%),
                  radial-gradient(60% 60% at 70% 80%, ${PALETTE.cyan}33, transparent 60%),
                  linear-gradient(135deg, #05070f, #0a0e27 50%, #060a1c);
      background-size: 200% 200%;
      animation: ai-gradient-shift 18s ease infinite;
    }
    @keyframes ai-gradient-shift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .ai-grid {
      background-image: linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px);
      background-size: 48px 48px;
      mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 75%);
    }
    .ai-float { animation: ai-float 7s ease-in-out infinite; }
    .ai-float-slow { animation: ai-float 11s ease-in-out infinite; }
    @keyframes ai-float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-26px) rotate(6deg); }
    }
    @media (prefers-reduced-motion: reduce) {
      .ai-animated-bg, .ai-float, .ai-float-slow { animation: none; }
    }
  `}</style>
);

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export default function AIAgency() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${BRAND} — ${TAGLINE}`;

    // Swap the favicon to the Nexora mark while on this standalone-brand page.
    const link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
    const prevIcon = link?.getAttribute('href') ?? null;
    if (link) link.setAttribute('href', '/nexora-logo.svg');

    return () => {
      document.title = prevTitle;
      if (link && prevIcon !== null) link.setAttribute('href', prevIcon);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#05070f] font-sans antialiased">
      <PageStyles />
      <Nav />
      <main>
        <Hero />
        <Services />
        <Features />
        <Process />
        <CaseStudies />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}
