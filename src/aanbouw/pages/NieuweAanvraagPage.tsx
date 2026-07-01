import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home, Ruler, ClipboardList, User, ArrowLeft, ArrowRight, Check, CheckCircle2,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Card, Button, Input, Field, Select, Textarea, cn } from '../components/ui';
import { BUILD_TYPES, FINISHES, BUDGET_RANGES } from '../lib/services';
import type { Aanvraag, BuildType, Finish, YesNoUnknown } from '../types';

const STEPS = [
  { n: 1, label: 'Wat wil je bouwen?', icon: Home },
  { n: 2, label: 'Afmetingen', icon: Ruler },
  { n: 3, label: 'Situatie', icon: ClipboardList },
  { n: 4, label: 'Contactgegevens', icon: User },
];

const START_OPTIONS = ['Zo snel mogelijk', 'Binnen 3 maanden', 'Binnen 6 maanden', 'Dit jaar nog', 'Oriënterend / geen haast'];

export default function NieuweAanvraagPage() {
  const { aanvragen } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [done, setDone] = useState<string | null>(null);

  // Form state
  const [buildType, setBuildType] = useState<BuildType | ''>('');
  const [breedte, setBreedte] = useState('');
  const [diepte, setDiepte] = useState('');
  const [afwerking, setAfwerking] = useState<Finish>('standaard');
  const [bestaandeWoning, setBestaandeWoning] = useState(true);
  const [funderingNodig, setFunderingNodig] = useState<YesNoUnknown>('weet ik niet');
  const [vergunningNodig, setVergunningNodig] = useState<YesNoUnknown>('weet ik niet');
  const [startdatum, setStartdatum] = useState(START_OPTIONS[1]);
  const [budgetIdx, setBudgetIdx] = useState(1);
  const [toelichting, setToelichting] = useState('');
  const [naam, setNaam] = useState(user?.name && user.name !== 'Familie Jansen' ? user.name : (user?.role === 'klant' ? user.name : ''));
  const [telefoon, setTelefoon] = useState(user?.phone ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [postcode, setPostcode] = useState('');
  const [plaats, setPlaats] = useState('');

  const oppervlakte = useMemo(() => {
    const b = parseFloat(breedte), d = parseFloat(diepte);
    return b && d ? Math.round(b * d) : 0;
  }, [breedte, diepte]);

  const canNext = useMemo(() => {
    if (step === 1) return !!buildType;
    if (step === 4) return naam.trim() && email.trim() && postcode.trim() && plaats.trim();
    return true;
  }, [step, buildType, naam, email, postcode, plaats]);

  const submit = () => {
    const budget = BUDGET_RANGES[budgetIdx];
    const number = `AP-2026-${String(1000 + aanvragen.items.length).padStart(4, '0')}`;
    const now = new Date().toISOString();
    const created = aanvragen.create({
      number,
      klantId: user?.id ?? 'u_klant',
      klantName: naam,
      phone: telefoon,
      email,
      postcode,
      plaats,
      buildType: buildType as BuildType,
      breedte: parseFloat(breedte) || 0,
      diepte: parseFloat(diepte) || 0,
      oppervlakte,
      afwerking,
      bestaandeWoning,
      funderingNodig,
      vergunningNodig,
      startdatum,
      budgetIndicatie: budget.mid,
      toelichting,
      status: 'Nieuw',
      value: budget.mid,
      assignedCompanyId: undefined,
      leadStatus: 'Nieuw',
      timeline: [{ id: `tl_${Date.now()}`, type: 'system', message: 'Aanvraag ingediend via aanvraagformulier', author: 'Systeem', at: now }],
      createdAt: now,
      updatedAt: now,
    } as Omit<Aanvraag, 'id'>);
    setDone(created.number);
  };

  if (done) {
    return (
      <div className="max-w-xl mx-auto text-center py-10">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={32} />
        </div>
        <h1 className="text-2xl font-bold">Aanvraag verzonden!</h1>
        <p className="text-[var(--abp-muted)] mt-2 mb-1">Uw aanvraag <span className="font-semibold text-[var(--abp-navy)]">{done}</span> is ontvangen.</p>
        <p className="text-sm text-[var(--abp-muted)] mb-6 max-w-md mx-auto">Geverifieerde bouwbedrijven in uw regio bekijken uw aanvraag. U ontvangt bericht zodra er een offerte klaarstaat.</p>
        <div className="flex items-center justify-center gap-2">
          <Button variant="secondary" onClick={() => navigate('/aanbouw/mijn-aanvragen')}>Mijn aanvragen</Button>
          <Button variant="primary" onClick={() => navigate('/aanbouw/dashboard')}>Naar dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Nieuwe aanvraag</h1>
        <p className="text-sm text-[var(--abp-muted)] mt-1">Vul de 4 stappen in. Gratis en vrijblijvend — u zit nergens aan vast.</p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-between mb-8">
        {STEPS.map((s, i) => (
          <React.Fragment key={s.n}>
            <div className="flex flex-col items-center gap-1.5 text-center">
              <div className={cn('abp-step-dot', step === s.n && 'abp-step-dot-active', step > s.n && 'abp-step-dot-done')}>
                {step > s.n ? <Check size={16} /> : s.n}
              </div>
              <span className={cn('text-[10px] sm:text-xs font-medium max-w-[70px] sm:max-w-none', step >= s.n ? 'text-[var(--abp-navy)]' : 'text-[var(--abp-faint)]')}>{s.label}</span>
            </div>
            {i < STEPS.length - 1 && <div className={cn('flex-1 h-0.5 mx-1 sm:mx-2 rounded -mt-5', step > s.n ? 'bg-[var(--abp-navy)]' : 'bg-[var(--abp-border-strong)]')} />}
          </React.Fragment>
        ))}
      </div>

      <Card className="p-5 sm:p-7">
        {/* Stap 1 */}
        {step === 1 && (
          <div>
            <h2 className="text-lg font-bold mb-1">Wat wilt u laten bouwen?</h2>
            <p className="text-sm text-[var(--abp-muted)] mb-5">Kies het type project dat het beste past.</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {BUILD_TYPES.map((t) => (
                <button key={t} onClick={() => setBuildType(t)} className={cn('abp-choice p-4 flex items-center gap-3', buildType === t && 'abp-choice-active')}>
                  <span className={cn('w-9 h-9 rounded-lg flex items-center justify-center shrink-0', buildType === t ? 'bg-[var(--abp-accent)] text-white' : 'bg-[var(--abp-surface-2)] text-[var(--abp-muted)]')}><Home size={17} /></span>
                  <span className="font-semibold text-[var(--abp-navy)]">{t}</span>
                  {buildType === t && <Check size={18} className="ml-auto text-[var(--abp-accent)]" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Stap 2 */}
        {step === 2 && (
          <div>
            <h2 className="text-lg font-bold mb-1">Afmetingen</h2>
            <p className="text-sm text-[var(--abp-muted)] mb-5">Een schatting is voldoende — de aannemer meet later exact in.</p>
            <div className="grid sm:grid-cols-3 gap-3 mb-5">
              <Field label="Breedte (m)"><Input type="number" inputMode="decimal" value={breedte} onChange={(e) => setBreedte(e.target.value)} placeholder="bijv. 4" /></Field>
              <Field label="Diepte (m)"><Input type="number" inputMode="decimal" value={diepte} onChange={(e) => setDiepte(e.target.value)} placeholder="bijv. 5" /></Field>
              <Field label="Oppervlakte (m²)"><Input value={oppervlakte ? `${oppervlakte} m²` : '—'} readOnly className="bg-[var(--abp-surface-2)]" /></Field>
            </div>
            <p className="text-xs font-semibold text-[var(--abp-muted)] mb-2">Gewenste afwerking</p>
            <div className="grid sm:grid-cols-3 gap-3">
              {FINISHES.map((f) => (
                <button key={f.key} onClick={() => setAfwerking(f.key)} className={cn('abp-choice p-4 text-left', afwerking === f.key && 'abp-choice-active')}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-[var(--abp-navy)]">{f.label}</span>
                    {afwerking === f.key && <Check size={16} className="text-[var(--abp-accent)]" />}
                  </div>
                  <span className="text-xs text-[var(--abp-muted)]">{f.description}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Stap 3 */}
        {step === 3 && (
          <div>
            <h2 className="text-lg font-bold mb-1">De situatie</h2>
            <p className="text-sm text-[var(--abp-muted)] mb-5">Help de bouwbedrijven met een paar details.</p>
            <div className="space-y-4">
              <YesNoField label="Gaat het om een bestaande woning?"
                value={bestaandeWoning ? 'ja' : 'nee'} options={['ja', 'nee']}
                onChange={(v) => setBestaandeWoning(v === 'ja')} />
              <YesNoField label="Is er een fundering nodig?" value={funderingNodig} options={['ja', 'nee', 'weet ik niet']} onChange={(v) => setFunderingNodig(v as YesNoUnknown)} />
              <YesNoField label="Is er een vergunning nodig?" value={vergunningNodig} options={['ja', 'nee', 'weet ik niet']} onChange={(v) => setVergunningNodig(v as YesNoUnknown)} />
              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Gewenste startdatum">
                  <Select value={startdatum} onChange={(e) => setStartdatum(e.target.value)}>
                    {START_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </Select>
                </Field>
                <Field label="Budgetindicatie">
                  <Select value={budgetIdx} onChange={(e) => setBudgetIdx(Number(e.target.value))}>
                    {BUDGET_RANGES.map((b, i) => <option key={b.label} value={i}>{b.label}</option>)}
                  </Select>
                </Field>
              </div>
              <Field label="Toelichting (optioneel)">
                <Textarea rows={3} value={toelichting} onChange={(e) => setToelichting(e.target.value)} placeholder="Vertel kort wat u voor ogen heeft…" />
              </Field>
            </div>
          </div>
        )}

        {/* Stap 4 */}
        {step === 4 && (
          <div>
            <h2 className="text-lg font-bold mb-1">Contactgegevens</h2>
            <p className="text-sm text-[var(--abp-muted)] mb-5">Zodat de bouwbedrijven contact met u kunnen opnemen.</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Naam *"><Input value={naam} onChange={(e) => setNaam(e.target.value)} placeholder="Voor- en achternaam" /></Field>
              <Field label="Telefoon"><Input value={telefoon} onChange={(e) => setTelefoon(e.target.value)} placeholder="+31 6 …" /></Field>
              <Field label="E-mail *"><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="naam@email.nl" /></Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Postcode *"><Input value={postcode} onChange={(e) => setPostcode(e.target.value)} placeholder="1234 AB" /></Field>
                <Field label="Plaats *"><Input value={plaats} onChange={(e) => setPlaats(e.target.value)} placeholder="Plaats" /></Field>
              </div>
            </div>
            <div className="mt-5 p-4 rounded-xl bg-[var(--abp-surface-2)] text-sm">
              <p className="font-semibold text-[var(--abp-navy)] mb-1">Samenvatting</p>
              <p className="text-[var(--abp-muted)]">{buildType || '—'} · {oppervlakte ? `${oppervlakte} m²` : 'afmetingen in overleg'} · {afwerking} · budget {BUDGET_RANGES[budgetIdx].label}</p>
            </div>
          </div>
        )}

        {/* Nav */}
        <div className="flex items-center justify-between mt-7 pt-5 border-t border-[var(--abp-border)]">
          <Button variant="ghost" onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1} icon={<ArrowLeft size={16} />}>Vorige</Button>
          {step < 4 ? (
            <Button variant="primary" onClick={() => setStep((s) => s + 1)} disabled={!canNext}>Volgende <ArrowRight size={16} /></Button>
          ) : (
            <Button variant="primary" onClick={submit} disabled={!canNext} icon={<Check size={16} />}>Aanvraag verzenden</Button>
          )}
        </div>
      </Card>
    </div>
  );
}

function YesNoField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div>
      <p className="text-xs font-semibold text-[var(--abp-muted)] mb-1.5">{label}</p>
      <div className="flex gap-2 flex-wrap">
        {options.map((o) => (
          <button key={o} onClick={() => onChange(o)}
            className={cn('px-4 py-2 rounded-xl text-sm font-medium border capitalize transition-colors',
              value === o ? 'border-[var(--abp-accent)] bg-[var(--abp-accent-soft)] text-[var(--abp-accent-strong)]' : 'border-[var(--abp-border-strong)] text-[var(--abp-muted)] hover:border-[var(--abp-navy)]')}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
