import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Upload, Check, ShieldCheck, Clock, Phone, ImagePlus, X, ArrowRight,
} from 'lucide-react';
import { products } from '../data/products';
import { Button } from '../components/ui';

interface FormState {
  naam: string;
  adres: string;
  postcode: string;
  telefoon: string;
  email: string;
  product: string;
  toelichting: string;
  ketelFoto?: File;
  ruimteFoto?: File;
}

const usps = [
  { icon: Clock, title: 'Binnen 24 uur reactie', text: 'Onze adviseurs nemen snel contact op.' },
  { icon: ShieldCheck, title: 'Vrijblijvend & gratis', text: 'Geen kosten, geen verplichtingen.' },
  { icon: Phone, title: 'Persoonlijk advies', text: 'Altijd een vaste contactpersoon.' },
];

export default function OffertePage() {
  const [params] = useSearchParams();
  const [form, setForm] = useState<FormState>({
    naam: '', adres: '', postcode: '', telefoon: '', email: '',
    product: params.get('product') ?? '', toelichting: '',
  });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const set = (k: keyof FormState, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      const endpoint = (import.meta as any).env?.VITE_OFFERTE_ENDPOINT as string | undefined;
      const payload = {
        ...form,
        ketelFoto: form.ketelFoto?.name,
        ruimteFoto: form.ruimteFoto?.name,
        bron: 'webshop',
        ingediendOp: new Date().toISOString(),
      };
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('mislukt');
      } else {
        // Geen endpoint geconfigureerd: bewaar lokaal zodat de aanvraag niet verloren gaat.
        const stored = JSON.parse(localStorage.getItem('westrik:offertes') ?? '[]');
        stored.push(payload);
        localStorage.setItem('westrik:offertes', JSON.stringify(stored));
        await new Promise((r) => setTimeout(r, 600));
      }
      setSent(true);
    } catch {
      setError('Er ging iets mis. Bel ons gerust op 085 000 1234.');
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <section className="bg-silver-50 py-24">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto max-w-lg rounded-[2rem] bg-white p-10 text-center shadow-card"
          >
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <Check size={32} />
            </span>
            <h1 className="mt-6 font-display text-2xl font-extrabold text-navy-900">Bedankt, {form.naam.split(' ')[0]}!</h1>
            <p className="mt-3 text-silver-500">
              Je offerteaanvraag is ontvangen. Een van onze adviseurs neemt binnen 24 uur contact met je op via{' '}
              <span className="font-semibold text-navy-700">{form.telefoon || form.email}</span>.
            </p>
            <Button to="/" className="mt-7">Terug naar home <ArrowRight size={16} /></Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-hero-gradient text-white">
        <div className="container-wide py-14">
          <h1 className="font-display text-4xl font-extrabold md:text-5xl">Vraag je offerte aan</h1>
          <p className="mt-3 max-w-xl text-navy-100">
            Vul het formulier in en ontvang een offerte op maat. Upload een foto van je huidige ketel en technische
            ruimte voor het scherpste advies.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-wide grid gap-10 lg:grid-cols-[1fr_340px]">
          <form onSubmit={submit} className="rounded-[2rem] border border-silver-100 bg-white p-7 shadow-soft md:p-9">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Naam" required>
                <input required value={form.naam} onChange={(e) => set('naam', e.target.value)} className={inputCls} placeholder="Voor- en achternaam" />
              </Field>
              <Field label="Telefoon" required>
                <input required type="tel" value={form.telefoon} onChange={(e) => set('telefoon', e.target.value)} className={inputCls} placeholder="06 12 34 56 78" />
              </Field>
              <Field label="E-mail" required>
                <input required type="email" value={form.email} onChange={(e) => set('email', e.target.value)} className={inputCls} placeholder="naam@email.nl" />
              </Field>
              <Field label="Postcode" required>
                <input required value={form.postcode} onChange={(e) => set('postcode', e.target.value)} className={inputCls} placeholder="1234 AB" />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Adres" required>
                  <input required value={form.adres} onChange={(e) => set('adres', e.target.value)} className={inputCls} placeholder="Straat en huisnummer" />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Welk product heeft je interesse?">
                  <select value={form.product} onChange={(e) => set('product', e.target.value)} className={inputCls}>
                    <option value="">Geen voorkeur / advies gewenst</option>
                    {products.filter((p) => p.category === 'cv-ketels' || p.category === 'hybride-warmtepompen').map((p) => (
                      <option key={p.id} value={`${p.brand} ${p.model}`}>{p.brand} {p.model}</option>
                    ))}
                  </select>
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Toelichting">
                  <textarea value={form.toelichting} onChange={(e) => set('toelichting', e.target.value)} rows={3} className={inputCls} placeholder="Vertel ons over je situatie, wensen of huidige ketel..." />
                </Field>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <PhotoUpload label="Foto huidige ketel" file={form.ketelFoto} onChange={(f) => set('ketelFoto', f)} />
              <PhotoUpload label="Foto technische ruimte" file={form.ruimteFoto} onChange={(f) => set('ruimteFoto', f)} />
            </div>

            {error && <p className="mt-4 text-sm font-semibold text-red-600">{error}</p>}

            <Button type="submit" size="lg" className="mt-7 w-full" disabled={sending}>
              {sending ? 'Versturen…' : 'Verstuur offerteaanvraag'}
            </Button>
            <p className="mt-3 text-center text-xs text-silver-400">
              Door te verzenden ga je akkoord met onze privacyverklaring. We delen je gegevens nooit met derden.
            </p>
          </form>

          <aside className="space-y-4">
            {usps.map((u) => (
              <div key={u.title} className="flex gap-3 rounded-2xl border border-silver-100 bg-white p-5 shadow-soft">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-600">
                  <u.icon size={20} />
                </span>
                <div>
                  <p className="font-semibold text-navy-900">{u.title}</p>
                  <p className="text-sm text-silver-500">{u.text}</p>
                </div>
              </div>
            ))}
            <div className="rounded-2xl bg-navy-950 p-6 text-white">
              <p className="text-sm text-navy-200">Liever direct contact?</p>
              <a href="tel:+31850001234" className="mt-1 block font-display text-2xl font-extrabold">085 000 1234</a>
              <Link to="/keuzehulp" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-accent hover:underline">
                Of doe eerst de keuzehulp <ArrowRight size={15} />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

const inputCls =
  'w-full rounded-xl border border-silver-200 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-colors placeholder:text-silver-400 focus:border-navy-500 focus:ring-2 focus:ring-navy-100';

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-navy-800">
        {label} {required && <span className="text-navy-400">*</span>}
      </span>
      {children}
    </label>
  );
}

function PhotoUpload({ label, file, onChange }: { label: string; file?: File; onChange: (f?: File) => void }) {
  return (
    <div>
      <span className="mb-1.5 block text-sm font-semibold text-navy-800">{label}</span>
      {file ? (
        <div className="flex items-center justify-between rounded-xl border border-navy-200 bg-navy-50 px-4 py-3">
          <span className="flex items-center gap-2 truncate text-sm text-navy-800">
            <ImagePlus size={16} className="text-navy-600" /> <span className="truncate">{file.name}</span>
          </span>
          <button type="button" onClick={() => onChange(undefined)} className="text-navy-500 hover:text-navy-700">
            <X size={16} />
          </button>
        </div>
      ) : (
        <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-silver-200 px-4 py-3 text-sm text-silver-500 hover:border-navy-300 hover:text-navy-600">
          <Upload size={16} /> Kies een foto
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onChange(e.target.files?.[0])}
          />
        </label>
      )}
    </div>
  );
}
