import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Home, Users, Bath, ShowerHead, Waves, Wind, ArrowRight, ArrowLeft, RotateCcw, Sparkles, Check,
} from 'lucide-react';
import { products } from '../data/products';
import type { Product, WoningType } from '../data/types';
import { Button, ProductImage, Stars } from '../components/ui';
import { euro } from '../lib/format';

interface Answers {
  woning?: WoningType;
  bewoners?: '1-2' | '3-4' | '5+';
  badkamers?: 1 | 2;
  regendouche?: boolean;
  bad?: boolean;
  hybride?: boolean;
}

const steps = [
  {
    key: 'woning' as const,
    icon: Home,
    q: 'Wat voor woning heb je?',
    options: [
      { value: 'Appartement', label: 'Appartement' },
      { value: 'Tussenwoning', label: 'Tussenwoning' },
      { value: 'Hoekwoning', label: 'Hoekwoning' },
      { value: '2-onder-1-kap', label: '2-onder-1-kap' },
      { value: 'Vrijstaande woning', label: 'Vrijstaande woning' },
    ],
  },
  {
    key: 'bewoners' as const,
    icon: Users,
    q: 'Hoeveel personen wonen er in huis?',
    options: [
      { value: '1-2', label: '1 – 2 personen' },
      { value: '3-4', label: '3 – 4 personen' },
      { value: '5+', label: '5 of meer' },
    ],
  },
  {
    key: 'badkamers' as const,
    icon: Bath,
    q: 'Hoeveel badkamers heb je?',
    options: [
      { value: 1, label: '1 badkamer' },
      { value: 2, label: '2 badkamers' },
    ],
  },
  {
    key: 'regendouche' as const,
    icon: ShowerHead,
    q: 'Heb je een regendouche (of wens je die)?',
    options: [
      { value: true, label: 'Ja, regendouche' },
      { value: false, label: 'Nee, gewone douche' },
    ],
  },
  {
    key: 'bad' as const,
    icon: Waves,
    q: 'Is er een ligbad aanwezig?',
    options: [
      { value: true, label: 'Ja, ligbad' },
      { value: false, label: 'Nee' },
    ],
  },
  {
    key: 'hybride' as const,
    icon: Wind,
    q: 'Wil je later een hybride warmtepomp kunnen koppelen?',
    options: [
      { value: true, label: 'Ja, Hybrid Ready' },
      { value: false, label: 'Geen voorkeur' },
    ],
  },
];

function adviseCw(a: Answers): 3 | 4 | 5 | 6 {
  let cw = 4;
  if (a.woning === 'Appartement') cw = 3;
  if (a.woning === 'Vrijstaande woning' || a.woning === '2-onder-1-kap') cw = 5;
  if (a.bewoners === '1-2' && a.woning === 'Appartement') cw = 3;
  if (a.bewoners === '5+') cw = Math.max(cw, 5);
  if (a.regendouche) cw = Math.max(cw, 5);
  if (a.bad && a.regendouche) cw = Math.max(cw, 5);
  if (a.badkamers === 2) cw = 6;
  return Math.min(6, Math.max(3, cw)) as 3 | 4 | 5 | 6;
}

export default function KeuzehulpPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);

  const current = steps[step];
  const selectedValue = answers[current?.key as keyof Answers];

  const pick = (value: any) => {
    const next = { ...answers, [current.key]: value };
    setAnswers(next);
    setTimeout(() => {
      if (step < steps.length - 1) setStep(step + 1);
      else setDone(true);
    }, 220);
  };

  const advisedCw = useMemo(() => adviseCw(answers), [answers]);

  const recommendation = useMemo<{ main?: Product; alts: Product[] }>(() => {
    const cvs = products.filter((p) => p.category === 'cv-ketels');
    const scored = cvs
      .map((p) => {
        let score = 0;
        if (p.cwKlasse === advisedCw) score += 10;
        else score -= Math.abs((p.cwKlasse ?? 4) - advisedCw) * 4;
        if (answers.woning && p.geschiktVoor?.includes(answers.woning)) score += 4;
        if (answers.hybride && p.hybridReady) score += 3;
        if (answers.badkamers === 2 && p.badkamers === 2) score += 3;
        score += p.rating;
        return { p, score };
      })
      .sort((a, b) => b.score - a.score);
    return { main: scored[0]?.p, alts: scored.slice(1, 4).map((s) => s.p) };
  }, [advisedCw, answers]);

  const restart = () => {
    setAnswers({});
    setStep(0);
    setDone(false);
  };

  return (
    <section className="bg-hero-gradient min-h-[80vh] py-16 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-mesh absolute inset-0 opacity-80" />
      </div>
      <div className="container-wide relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-sky-light">
            <Sparkles size={14} className="text-sky-accent" /> Slimme keuzehulp
          </span>
          <h1 className="mt-5 font-display text-3xl font-extrabold md:text-5xl">
            Vind in 1 minuut de juiste ketel
          </h1>
          <p className="mt-3 text-navy-100">Beantwoord 6 korte vragen en wij adviseren de juiste CW-klasse én ketel.</p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl">
          {!done ? (
            <div className="glass rounded-[2rem] p-7 md:p-10">
              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between text-xs text-navy-200">
                  <span>Vraag {step + 1} van {steps.length}</span>
                  <span>{Math.round(((step) / steps.length) * 100)}%</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-sky-accent"
                    animate={{ width: `${((step) / steps.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="mb-6 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-accent/20 text-sky-accent">
                      <current.icon size={22} />
                    </span>
                    <h2 className="font-display text-xl font-bold md:text-2xl">{current.q}</h2>
                  </div>
                  <div className="grid gap-3">
                    {current.options.map((opt) => {
                      const active = selectedValue === opt.value;
                      return (
                        <button
                          key={String(opt.value)}
                          onClick={() => pick(opt.value)}
                          className={`flex items-center justify-between rounded-2xl border px-5 py-4 text-left text-sm font-semibold transition-all ${
                            active
                              ? 'border-sky-accent bg-sky-accent/15 text-white'
                              : 'border-white/15 bg-white/5 text-navy-100 hover:border-white/40 hover:bg-white/10'
                          }`}
                        >
                          {opt.label}
                          <span className={`flex h-6 w-6 items-center justify-center rounded-full border ${active ? 'border-sky-accent bg-sky-accent' : 'border-white/30'}`}>
                            {active && <Check size={14} className="text-white" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>

              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-navy-200 hover:text-white"
                >
                  <ArrowLeft size={16} /> Vorige
                </button>
              )}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[2rem] bg-white p-7 text-navy-900 shadow-glow md:p-10"
            >
              <div className="text-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600">
                  <Check size={14} /> Ons advies
                </span>
                <h2 className="mt-4 font-display text-2xl font-extrabold md:text-3xl">
                  Wij adviseren een <span className="text-navy-600">CW{advisedCw}</span> ketel
                </h2>
                <p className="mt-2 text-silver-500">
                  Op basis van een {answers.woning?.toLowerCase()} met {answers.bewoners} bewoners
                  {answers.badkamers === 2 ? ', 2 badkamers' : ''}{answers.regendouche ? ' en een regendouche' : ''}.
                </p>
              </div>

              {recommendation.main && (
                <div className="mt-8 grid gap-6 rounded-3xl border border-silver-100 bg-silver-50 p-5 sm:grid-cols-[200px_1fr] sm:items-center">
                  <ProductImage product={recommendation.main} className="aspect-square" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-navy-500">{recommendation.main.brand}</p>
                    <h3 className="font-display text-xl font-extrabold">{recommendation.main.model}</h3>
                    <p className="mt-1 text-sm text-silver-500">{recommendation.main.tagline}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Stars rating={recommendation.main.rating} size={14} />
                      <span className="text-xs text-silver-500">{recommendation.main.rating}</span>
                    </div>
                    <p className="mt-3 font-display text-2xl font-extrabold text-navy-900">{euro(recommendation.main.price)}</p>
                    <div className="mt-4 flex flex-wrap gap-2.5">
                      <Button to={`/product/${recommendation.main.slug}`}>Bekijk ketel <ArrowRight size={16} /></Button>
                      <Button to="/offerte" variant="ghost">Offerte aanvragen</Button>
                    </div>
                  </div>
                </div>
              )}

              {recommendation.alts.length > 0 && (
                <div className="mt-7">
                  <p className="mb-3 text-sm font-semibold text-navy-700">Ook geschikt:</p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {recommendation.alts.map((p) => (
                      <Link
                        key={p.id}
                        to={`/product/${p.slug}`}
                        className="rounded-2xl border border-silver-100 p-3 hover:border-navy-300"
                      >
                        <p className="text-xs font-bold uppercase tracking-wider text-navy-500">{p.brand}</p>
                        <p className="text-sm font-semibold text-navy-900">{p.model}</p>
                        <p className="mt-1 text-sm font-bold text-navy-700">{euro(p.price)}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <button onClick={restart} className="mx-auto mt-8 flex items-center gap-1.5 text-sm font-semibold text-navy-600 hover:underline">
                <RotateCcw size={15} /> Opnieuw beginnen
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
