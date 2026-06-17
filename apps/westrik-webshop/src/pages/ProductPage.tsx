import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ChevronRight, Check, FileText, Download, Truck, ShieldCheck, Wrench, Zap,
  RotateCw, ZoomIn, ChevronDown, GitCompareArrows,
} from 'lucide-react';
import { productBySlug, products } from '../data/products';
import { categoryBySlug } from '../data/categories';
import { cvInstallOptions, boilerInstallOptions } from '../data/installOptions';
import type { InstallOption } from '../data/types';
import { euro, euroCents } from '../lib/format';
import { Badge, Button, ProductImage, Stars } from '../components/ui';
import { ProductCard } from '../components/ProductCard';
import { useCompare } from '../lib/compare';

export default function ProductPage() {
  const { slug } = useParams();
  const product = productBySlug(slug ?? '');
  const { has, toggle } = useCompare();
  const [angle, setAngle] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [tab, setTab] = useState<'specs' | 'geschikt' | 'downloads' | 'reviews'>('specs');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const installOptions = product?.category === 'boilers' ? boilerInstallOptions : cvInstallOptions;
  const [selected, setSelected] = useState<string>(installOptions[1]?.id ?? 'levering');

  const related = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="container-wide py-24 text-center">
        <h1 className="font-display text-2xl font-bold">Product niet gevonden</h1>
        <Button to="/" className="mt-6">Terug naar home</Button>
      </div>
    );
  }

  const category = categoryBySlug(product.category);
  const chosen: InstallOption | undefined = installOptions.find((o) => o.id === selected);
  const total = product.price + (chosen?.price ?? 0);
  const angles = ['Vooraanzicht', 'Zijaanzicht', 'Aansluitingen', 'Display'];

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-silver-100 bg-silver-50">
        <div className="container-wide flex items-center gap-1.5 py-4 text-sm text-silver-500">
          <Link to="/" className="hover:text-navy-700">Home</Link>
          <ChevronRight size={14} />
          <Link to={`/${product.category}`} className="hover:text-navy-700">{category?.title}</Link>
          <ChevronRight size={14} />
          <span className="text-navy-900">{product.model}</span>
        </div>
      </div>

      <section className="py-10 md:py-14">
        <div className="container-wide grid gap-12 lg:grid-cols-2">
          {/* ───────── Gallery ───────── */}
          <div>
            <div className="relative">
              <button
                onClick={() => setZoom(true)}
                className="block w-full"
                aria-label="Vergroot afbeelding"
              >
                <ProductImage product={product} className="aspect-square" large src={product.gallery?.[angle]} />
              </button>
              <div className="absolute left-4 top-4 flex flex-col gap-2">
                {product.badge && <Badge tone="amber">{product.badge}</Badge>}
                {product.hybridReady && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-sky-light px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-navy-700">
                    <Zap size={11} /> Hybrid Ready
                  </span>
                )}
              </div>
              <div className="absolute bottom-4 right-4 flex gap-2">
                <span className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-2 text-xs font-semibold text-navy-700 shadow-soft backdrop-blur">
                  <RotateCw size={14} /> 360° — {angles[angle]}
                </span>
                <button onClick={() => setZoom(true)} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-navy-700 shadow-soft backdrop-blur hover:bg-white">
                  <ZoomIn size={16} />
                </button>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {angles.map((a, i) => (
                <button
                  key={a}
                  onClick={() => setAngle(i)}
                  className={`flex flex-col items-center gap-1 rounded-2xl border p-3 text-[11px] font-semibold transition-colors ${
                    angle === i ? 'border-navy-600 bg-navy-50 text-navy-700' : 'border-silver-100 text-silver-500 hover:border-silver-300'
                  }`}
                >
                  <div className="h-12 w-12">
                    <ProductImage product={product} className="h-full w-full" src={product.gallery?.[i]} />
                  </div>
                  {a}
                </button>
              ))}
            </div>
          </div>

          {/* ───────── Info ───────── */}
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-navy-500">{product.brand}</p>
            <h1 className="mt-1 font-display text-3xl font-extrabold leading-tight text-navy-900 md:text-4xl">
              {product.model}
            </h1>
            <p className="mt-2 text-lg text-silver-500">{product.tagline}</p>

            <div className="mt-4 flex items-center gap-3">
              <Stars rating={product.rating} size={16} />
              <span className="text-sm text-silver-500">{product.rating} · {product.reviewCount} reviews</span>
              {product.inStock && (
                <span className="flex items-center gap-1 text-sm font-semibold text-emerald-600">
                  <Check size={15} /> Op voorraad
                </span>
              )}
            </div>

            <p className="mt-5 leading-relaxed text-navy-800">{product.description}</p>

            {/* Key specs */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {product.cwKlasse && <KeyStat label="CW-klasse" value={`CW${product.cwKlasse}`} />}
              {product.vermogenKw && <KeyStat label="Vermogen" value={`${product.vermogenKw} kW`} />}
              {product.warmwaterLpm && <KeyStat label="Warmwater" value={`${product.warmwaterLpm} l/m`} />}
              {product.inhoudLiter && <KeyStat label="Inhoud" value={`${product.inhoudLiter} L`} />}
              {product.energielabel && <KeyStat label="Energielabel" value={product.energielabel} />}
              <KeyStat label="Garantie" value={`${product.garantieJaar} jaar`} />
            </div>

            {/* Install options */}
            <div className="mt-7 rounded-3xl border border-silver-100 bg-white p-5 shadow-soft">
              <h3 className="mb-3 font-display text-base font-bold text-navy-900">Kies je installatie-optie</h3>
              <div className="space-y-2.5">
                {installOptions.map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-3.5 transition-colors ${
                      selected === opt.id ? 'border-navy-600 bg-navy-50' : 'border-silver-100 hover:border-silver-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="install"
                      checked={selected === opt.id}
                      onChange={() => setSelected(opt.id)}
                      className="mt-1 h-4 w-4 accent-navy-600"
                    />
                    <span className="flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-navy-900">{opt.label}</span>
                        <span className="text-sm font-bold text-navy-700">
                          {opt.price === 0 ? 'Gratis' : `+ ${euro(opt.price)}`}
                        </span>
                      </span>
                      <span className="mt-0.5 block text-xs text-silver-500">{opt.description}</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price + CTA */}
            <div className="mt-6 rounded-3xl bg-navy-950 p-6 text-white">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-navy-300">Totaalprijs incl. btw</p>
                  <p className="font-display text-4xl font-extrabold">{euroCents(total)}</p>
                  {product.listPrice && (
                    <p className="text-sm text-navy-300">
                      <span className="line-through">{euro(product.listPrice)}</span>{' '}
                      <span className="font-semibold text-sky-accent">
                        je bespaart {euro(product.listPrice - product.price)}
                      </span>
                    </p>
                  )}
                </div>
                <span className="rounded-lg bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
                  {chosen?.label}
                </span>
              </div>
              <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                <Button to="/offerte" variant="white" size="lg" className="flex-1">
                  Offerte op maat aanvragen
                </Button>
                <button
                  onClick={() => toggle(product.id)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-4 text-sm font-semibold text-white hover:bg-white/10"
                >
                  <GitCompareArrows size={16} /> {has(product.id) ? 'In vergelijking' : 'Vergelijk'}
                </button>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 border-t border-white/10 pt-5 text-xs text-navy-200">
                <span className="flex items-center gap-1.5"><Truck size={14} className="text-sky-accent" /> Snelle levering</span>
                <span className="flex items-center gap-1.5"><Wrench size={14} className="text-sky-accent" /> Vakkundige montage</span>
                <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-sky-accent" /> {product.garantieJaar} jaar garantie</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Tabs ───────── */}
      <section className="border-t border-silver-100 bg-silver-50 py-14">
        <div className="container-wide">
          <div className="mb-8 flex flex-wrap gap-2">
            {([
              ['specs', 'Specificaties'],
              ['geschikt', 'Geschikt voor'],
              ['downloads', `Downloads (${product.downloads.length})`],
              ['reviews', `Reviews (${product.reviews.length})`],
            ] as const).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors ${
                  tab === key ? 'bg-navy-900 text-white' : 'bg-white text-navy-700 hover:bg-navy-50'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="rounded-3xl border border-silver-100 bg-white p-7 md:p-9">
            {tab === 'specs' && (
              <dl className="grid gap-x-10 gap-y-0 sm:grid-cols-2">
                {product.specs.map((s, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-silver-100 py-3.5">
                    <dt className="text-sm text-silver-500">{s.label}</dt>
                    <dd className="text-sm font-semibold text-navy-900">{s.value}</dd>
                  </div>
                ))}
                {product.afmetingen && (
                  <div className="flex items-center justify-between border-b border-silver-100 py-3.5">
                    <dt className="text-sm text-silver-500">Afmetingen (h×b×d)</dt>
                    <dd className="text-sm font-semibold text-navy-900">{product.afmetingen}</dd>
                  </div>
                )}
                {product.gewichtKg && (
                  <div className="flex items-center justify-between border-b border-silver-100 py-3.5">
                    <dt className="text-sm text-silver-500">Gewicht</dt>
                    <dd className="text-sm font-semibold text-navy-900">{product.gewichtKg} kg</dd>
                  </div>
                )}
              </dl>
            )}

            {tab === 'geschikt' && (
              <div>
                {product.geschiktVoor?.length ? (
                  <>
                    <p className="mb-4 text-navy-800">Deze {category?.title.toLowerCase().replace(/s$/, '')} is geschikt voor:</p>
                    <div className="flex flex-wrap gap-2.5">
                      {product.geschiktVoor.map((w) => (
                        <span key={w} className="inline-flex items-center gap-2 rounded-xl bg-navy-50 px-4 py-2.5 text-sm font-semibold text-navy-700">
                          <Check size={15} className="text-emerald-500" /> {w}
                        </span>
                      ))}
                      {product.badkamers && (
                        <span className="inline-flex items-center gap-2 rounded-xl bg-navy-50 px-4 py-2.5 text-sm font-semibold text-navy-700">
                          <Check size={15} className="text-emerald-500" /> Tot {product.badkamers} badkamer{product.badkamers > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                    <div className="mt-6 rounded-2xl bg-sky-light p-5 text-sm text-navy-800">
                      Twijfel je of dit het juiste model is? Onze <Link to="/keuzehulp" className="font-semibold underline">keuzehulp</Link> adviseert in 1 minuut het juiste model voor jouw woning.
                    </div>
                  </>
                ) : (
                  <p className="text-silver-500">Geschikt voor de meeste woningen en installaties.</p>
                )}
              </div>
            )}

            {tab === 'downloads' && (
              <div className="grid gap-3 sm:grid-cols-2">
                {product.downloads.length === 0 && <p className="text-silver-500">Geen downloads beschikbaar.</p>}
                {product.downloads.map((d) => (
                  <a
                    key={d.label}
                    href={d.url}
                    className="flex items-center justify-between rounded-2xl border border-silver-100 p-4 hover:border-navy-300 hover:bg-navy-50"
                  >
                    <span className="flex items-center gap-3">
                      <FileText size={20} className="text-navy-600" />
                      <span>
                        <span className="block text-sm font-semibold text-navy-900">{d.type}</span>
                        <span className="block text-xs text-silver-500">{d.label}</span>
                      </span>
                    </span>
                    <Download size={18} className="text-silver-400" />
                  </a>
                ))}
              </div>
            )}

            {tab === 'reviews' && (
              <div className="space-y-5">
                {product.reviews.map((r, i) => (
                  <div key={i} className="border-b border-silver-100 pb-5 last:border-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-navy-900">{r.author}</span>
                      <span className="text-xs text-silver-400">{new Date(r.date).toLocaleDateString('nl-NL')}</span>
                    </div>
                    <Stars rating={r.rating} size={13} />
                    <p className="mt-2 text-sm leading-relaxed text-navy-800">{r.body}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* FAQ */}
          {product.faq.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-5 font-display text-2xl font-extrabold text-navy-900">Veelgestelde vragen</h2>
              <div className="space-y-3">
                {product.faq.map((f, i) => (
                  <div key={i} className="overflow-hidden rounded-2xl border border-silver-100 bg-white">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span className="font-semibold text-navy-900">{f.q}</span>
                      <ChevronDown size={18} className={`shrink-0 text-navy-500 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaq === i && <p className="px-5 pb-5 text-sm leading-relaxed text-silver-600">{f.a}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ───────── Related ───────── */}
      {related.length > 0 && (
        <section className="py-16">
          <div className="container-wide">
            <h2 className="mb-8 font-display text-2xl font-extrabold text-navy-900">Gerelateerde producten</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Zoom lightbox */}
      {zoom && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-950/80 p-6"
          onClick={() => setZoom(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-2xl rounded-3xl bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <ProductImage product={product} className="aspect-square" large src={product.gallery?.[angle]} />
            <p className="mt-3 text-center text-sm text-silver-500">{product.brand} {product.model} — {angles[angle]}</p>
          </motion.div>
        </div>
      )}
    </>
  );
}

function KeyStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-silver-100 bg-white p-3.5 text-center">
      <p className="text-[11px] uppercase tracking-wider text-silver-400">{label}</p>
      <p className="mt-1 font-display text-lg font-extrabold text-navy-900">{value}</p>
    </div>
  );
}
