import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import {
  ArrowRight, Award, Truck, Wrench, ShieldCheck, Clock, BadgeCheck, Sparkles,
} from 'lucide-react';
import { categories } from '../data/categories';
import { featuredProducts } from '../data/products';
import { Button, ProductImage, SectionHeader, Stars } from '../components/ui';
import { ProductCard } from '../components/ProductCard';
import { ReviewsSlider, TrustBadges } from '../components/Reviews';

const usps = [
  { icon: Sparkles, label: 'Gratis advies' },
  { icon: Award, label: 'A-merken' },
  { icon: Wrench, label: 'Installatieservice' },
  { icon: Truck, label: 'Snelle levering' },
  { icon: ShieldCheck, label: 'Gecertificeerde monteurs' },
  { icon: Clock, label: '24/7 service' },
];

export default function HomePage() {
  const featured = featuredProducts();
  return (
    <>
      {/* ───────── Hero ───────── */}
      <section className="relative overflow-hidden bg-hero-gradient text-white">
        <div className="absolute inset-0 bg-mesh opacity-90" />
        <div className="container-wide relative grid items-center gap-12 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-sky-light">
                <BadgeCheck size={14} className="text-sky-accent" /> Erkend installateur · 4,9 ★ uit 1.842 reviews
              </span>
              <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
                Dé specialist in <span className="text-gradient">CV-ketels, boilers</span> en warmwateroplossingen
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-100">
                Levering, installatie en onderhoud door gecertificeerde monteurs. A-merken zoals Intergas, Remeha,
                Vaillant en Nefit Bosch — scherp geprijsd en snel geplaatst.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button to="/cv-ketels" size="lg">
                  Bekijk CV-ketels <ArrowRight size={18} />
                </Button>
                <Button to="/offerte" size="lg" variant="secondary">
                  Vraag offerte aan
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-3 text-sm text-navy-200">
                <Stars rating={5} />
                <span>Niet zeker welke ketel? Doe de <Link to="/keuzehulp" className="font-semibold text-white underline decoration-sky-accent underline-offset-4">keuzehulp</Link></span>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="glass rounded-[2rem] p-6"
            >
              <div className="rounded-2xl bg-white p-4">
                <ProductImage product={featured[0]} className="aspect-square" large />
              </div>
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-sky-light">Best presterende ketel 2026</p>
                  <p className="font-display text-lg font-bold text-white">{featured[0].brand} {featured[0].model}</p>
                </div>
                <Link to={`/product/${featured[0].slug}`} className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-navy-800 hover:bg-silver-100">
                  Bekijk
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* USP bar */}
        <div className="relative border-t border-white/10 bg-navy-950/50 backdrop-blur">
          <div className="container-wide grid grid-cols-2 gap-x-6 gap-y-4 py-6 sm:grid-cols-3 lg:grid-cols-6">
            {usps.map((u) => (
              <div key={u.label} className="flex items-center gap-2.5 text-sm">
                <u.icon size={18} className="shrink-0 text-sky-accent" />
                <span className="font-medium text-navy-100">{u.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Categorieën ───────── */}
      <section className="bg-silver-50 py-20">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Assortiment"
            title="Alles voor warmte en warm water"
            sub="Honderden producten van A-merken, met filters op CW-klasse, vermogen, inhoud en meer."
            center
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c, idx) => {
              const Icon = (Icons as any)[c.icon] ?? Icons.Package;
              return (
                <motion.div
                  key={c.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.04 }}
                >
                  <Link
                    to={`/${c.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-silver-100 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
                  >
                    <div className="relative h-28 overflow-hidden" style={{ background: c.image }}>
                      <Icon className="absolute bottom-4 left-5 text-white/90" size={30} />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-display text-lg font-bold text-navy-900">{c.title}</h3>
                      <p className="mt-1 text-sm text-silver-500">{c.short}</p>
                      <span className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-navy-600 group-hover:gap-2.5 transition-all">
                        Bekijk <ArrowRight size={15} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────── Uitgelichte producten ───────── */}
      <section className="py-20">
        <div className="container-wide">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <SectionHeader eyebrow="Populair" title="Onze bestsellers" sub="De meest gekozen ketels van dit moment." />
            <Button to="/cv-ketels" variant="ghost">Alle CV-ketels <ArrowRight size={16} /></Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Keuzehulp teaser ───────── */}
      <section className="py-10">
        <div className="container-wide">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-hero-gradient px-8 py-14 text-white md:px-16">
            <div className="absolute inset-0 bg-mesh opacity-80" />
            <div className="relative grid items-center gap-10 lg:grid-cols-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-accent">Slimme keuzehulp</span>
                <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight md:text-4xl">
                  Niet zeker welke ketel je nodig hebt?
                </h2>
                <p className="mt-4 max-w-md text-navy-100">
                  Beantwoord 6 korte vragen over je woning en wij adviseren direct de juiste CW-klasse en ketel —
                  inclusief offerte op maat.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button to="/keuzehulp" variant="white" size="lg">Start de keuzehulp <ArrowRight size={18} /></Button>
                  <Button to="/vergelijken" variant="secondary" size="lg">Vergelijk ketels</Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  ['Appartement', 'CW3'],
                  ['Gemiddeld gezin', 'CW4'],
                  ['Regendouche + bad', 'CW5'],
                  ['2 badkamers', 'CW6'],
                ].map(([k, v]) => (
                  <div key={k} className="glass rounded-2xl p-5">
                    <p className="text-sm text-navy-100">{k}</p>
                    <p className="mt-1 font-display text-2xl font-extrabold text-white">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Reviews ───────── */}
      <section className="bg-silver-50 py-20">
        <div className="container-wide">
          <ReviewsSlider />
        </div>
      </section>

      {/* ───────── Trust ───────── */}
      <section className="border-t border-silver-100 py-12">
        <div className="container-wide">
          <TrustBadges />
        </div>
      </section>
    </>
  );
}
