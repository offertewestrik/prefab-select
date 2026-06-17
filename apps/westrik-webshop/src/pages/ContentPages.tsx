import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { ChevronDown, Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Button, SectionHeader } from '../components/ui';
import { TrustBadges } from '../components/Reviews';

function PageHero({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <section className="bg-hero-gradient text-white">
      <div className="container-wide py-16">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-accent">{eyebrow}</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-navy-100">{sub}</p>
      </div>
    </section>
  );
}

function FeatureGrid({ items }: { items: { icon: string; title: string; text: string }[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((f) => {
        const Icon = (Icons as any)[f.icon] ?? Icons.Check;
        return (
          <div key={f.title} className="rounded-3xl border border-silver-100 bg-white p-7 shadow-soft">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-50 text-navy-600">
              <Icon size={22} />
            </span>
            <h3 className="mt-5 font-display text-lg font-bold text-navy-900">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-silver-500">{f.text}</p>
          </div>
        );
      })}
    </div>
  );
}

function CtaBlock() {
  return (
    <section className="py-16">
      <div className="container-wide">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-hero-gradient px-8 py-14 text-center text-white md:px-16">
          <div className="bg-mesh absolute inset-0 opacity-80" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-extrabold md:text-4xl">Klaar voor warm water zonder zorgen?</h2>
            <p className="mt-4 text-navy-100">Vraag vrijblijvend een offerte aan of bel direct met onze adviseurs.</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button to="/offerte" variant="white" size="lg">Offerte aanvragen</Button>
              <Button href="tel:+31850001234" variant="secondary" size="lg"><Phone size={18} /> 085 000 1234</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Over ons ───────────────────────── */
export function OverOnsPage() {
  const stats = [
    ['15.000+', 'Installaties'],
    ['25 jaar', 'Ervaring'],
    ['4,9 ★', 'Klantbeoordeling'],
    ['24/7', 'Storingsdienst'],
  ];
  return (
    <>
      <PageHero
        eyebrow="Over ons"
        title="Vakmanschap in warmte sinds 2001"
        sub="Westrik Installaties is dé specialist in CV-ketels, boilers en warmwateroplossingen. We leveren, installeren en onderhouden — door heel Nederland, met gecertificeerde monteurs."
      />
      <section className="py-16">
        <div className="container-wide grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader eyebrow="Onze missie" title="Comfortabel én duurzaam wonen, voor iedereen" />
            <div className="space-y-4 text-navy-800">
              <p>
                Al meer dan 25 jaar helpen we particulieren en bedrijven aan de juiste verwarmings- en
                warmwateroplossing. Van een eenvoudige ketelvervanging tot een complete hybride installatie met
                warmtepomp.
              </p>
              <p>
                Onze gecertificeerde monteurs werken volgens de hoogste kwaliteitsnormen (Sterkin, Gastec QA) en we
                staan voor eerlijk advies, scherpe prijzen en snelle service.
              </p>
            </div>
            <Button to="/contact" className="mt-7">Neem contact op <ArrowRight size={16} /></Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map(([n, l]) => (
              <div key={l} className="rounded-3xl border border-silver-100 bg-white p-7 text-center shadow-soft">
                <p className="font-display text-3xl font-extrabold text-navy-700">{n}</p>
                <p className="mt-1 text-sm text-silver-500">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-silver-50 py-16">
        <div className="container-wide">
          <SectionHeader eyebrow="Waarom Westrik" title="Waar we voor staan" center />
          <FeatureGrid
            items={[
              { icon: 'BadgeCheck', title: 'Gecertificeerd', text: 'Sterkin en Gastec QA erkend. Veilig en volgens de norm geïnstalleerd.' },
              { icon: 'HandCoins', title: 'Eerlijke prijzen', text: 'Transparante offertes zonder verrassingen achteraf.' },
              { icon: 'Truck', title: 'Snel geregeld', text: 'Vaak binnen 3 tot 5 werkdagen geplaatst.' },
              { icon: 'Leaf', title: 'Duurzaam advies', text: 'We adviseren altijd de meest energiezuinige oplossing.' },
              { icon: 'Headphones', title: '24/7 service', text: 'Een storing? Onze storingsdienst staat dag en nacht klaar.' },
              { icon: 'ShieldCheck', title: 'Garantie', text: 'Volledige fabrieks- en installatiegarantie op al onze producten.' },
            ]}
          />
        </div>
      </section>
      <section className="py-12"><div className="container-wide"><TrustBadges /></div></section>
      <CtaBlock />
    </>
  );
}

/* ───────────────────────── Onderhoud ───────────────────────── */
export function OnderhoudPage() {
  return (
    <>
      <PageHero
        eyebrow="Onderhoud"
        title="Onderhoud & onderhoudscontracten"
        sub="Houd je ketel jarenlang storingsvrij en zuinig. Kies een onderhoudscontract dat bij je past en geniet van voorrang bij storingen."
      />
      <section className="py-16">
        <div className="container-wide">
          <FeatureGrid
            items={[
              { icon: 'CalendarCheck', title: 'Jaarlijkse beurt', text: 'Een complete onderhoudsbeurt door een gecertificeerde monteur.' },
              { icon: 'Clock', title: '24/7 storingsdienst', text: 'Voorrang en gereduceerd tarief bij storingen.' },
              { icon: 'PiggyBank', title: 'Lagere energierekening', text: 'Een goed onderhouden ketel stookt zuiniger en gaat langer mee.' },
            ]}
          />
          <div className="mt-10 text-center">
            <Button to="/onderhoudscontracten" size="lg">Bekijk onderhoudscontracten <ArrowRight size={18} /></Button>
          </div>
        </div>
      </section>
      <CtaBlock />
    </>
  );
}

/* ───────────────────────── Storingsdienst ───────────────────────── */
export function StoringsdienstPage() {
  return (
    <>
      <PageHero
        eyebrow="Storingsdienst"
        title="Storing aan je ketel? Wij staan 24/7 klaar"
        sub="Geen warm water of een storingscode op je display? Onze monteurs helpen je snel, dag en nacht."
      />
      <section className="py-16">
        <div className="container-wide grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <FeatureGrid
            items={[
              { icon: 'PhoneCall', title: 'Direct bereikbaar', text: 'Bel onze storingslijn en je krijgt direct een monteur aan de lijn.' },
              { icon: 'Zap', title: 'Snel ter plaatse', text: 'Vaak nog dezelfde dag een monteur bij je thuis.' },
              { icon: 'Wrench', title: 'Vakkundig opgelost', text: 'Onze monteurs hebben de meeste onderdelen direct bij zich.' },
            ]}
          />
          <div className="rounded-[2rem] bg-navy-950 p-8 text-center text-white shadow-glow">
            <p className="text-sm text-navy-200">Storingslijn — 24 uur per dag</p>
            <a href="tel:+31850001234" className="mt-2 block font-display text-3xl font-extrabold">085 000 1234</a>
            <Button to="/offerte" variant="white" className="mt-6 w-full">Onderhoudscontract aanvragen</Button>
          </div>
        </div>
      </section>
    </>
  );
}

/* ───────────────────────── Zakelijk ───────────────────────── */
export function ZakelijkPage() {
  return (
    <>
      <PageHero
        eyebrow="Zakelijk"
        title="Voor woningcorporaties, VvE's en bedrijven"
        sub="Van projectmatige ketelvervanging tot meerjarige onderhoudscontracten. Westrik ontzorgt je volledig."
      />
      <section className="py-16">
        <div className="container-wide">
          <FeatureGrid
            items={[
              { icon: 'Building2', title: 'Projectmatige aanpak', text: 'Vervanging van tientallen of honderden ketels, strak gepland.' },
              { icon: 'FileSpreadsheet', title: 'Raamcontracten', text: 'Vaste tarieven en SLA-afspraken voor onderhoud en storingen.' },
              { icon: 'Users', title: 'Eén aanspreekpunt', text: 'Een vaste accountmanager voor je hele portefeuille.' },
              { icon: 'Leaf', title: 'Verduurzaming', text: 'Advies en uitvoering van hybride en all-electric oplossingen.' },
              { icon: 'ShieldCheck', title: 'Gecertificeerd', text: 'Werken volgens Sterkin, Gastec QA en VCA.' },
              { icon: 'BarChart3', title: 'Rapportage', text: 'Inzicht in status, kosten en onderhoudshistorie.' },
            ]}
          />
          <div className="mt-10 text-center">
            <Button to="/offerte" size="lg">Vraag een zakelijke offerte aan <ArrowRight size={18} /></Button>
          </div>
        </div>
      </section>
      <CtaBlock />
    </>
  );
}

/* ───────────────────────── Installatieservice ───────────────────────── */
export function InstallatieservicePage() {
  const steps = [
    ['1', 'Advies & offerte', 'Via de keuzehulp of een persoonlijk gesprek bepalen we de juiste oplossing.'],
    ['2', 'Inplannen', 'We plannen een installatiedatum die jou uitkomt — vaak binnen een week.'],
    ['3', 'Installatie', 'Onze monteur plaatst de ketel, sluit alles aan en voert de oude ketel af.'],
    ['4', 'Uitleg & nazorg', 'Je krijgt uitleg over je nieuwe installatie en thermostaat. Plus garantie en service.'],
  ];
  return (
    <>
      <PageHero
        eyebrow="Installatieservice"
        title="Van bestelling tot werkende ketel — wij regelen alles"
        sub="Inclusief afvoer van je oude ketel, inbedrijfstelling en uitleg. Door gecertificeerde monteurs."
      />
      <section className="py-16">
        <div className="container-wide grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map(([n, t, d]) => (
            <div key={n} className="rounded-3xl border border-silver-100 bg-white p-7 shadow-soft">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-600 font-display text-lg font-extrabold text-white">{n}</span>
              <h3 className="mt-5 font-display text-lg font-bold text-navy-900">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-silver-500">{d}</p>
            </div>
          ))}
        </div>
      </section>
      <CtaBlock />
    </>
  );
}

/* ───────────────────────── FAQ ───────────────────────── */
const faqData = [
  { q: 'Leveren en installeren jullie door heel Nederland?', a: 'Ja. We werken met gecertificeerde monteurs door heel Nederland en plannen de installatie op een moment dat jou uitkomt.' },
  { q: 'Voeren jullie mijn oude ketel af?', a: 'Zeker. Kies bij je bestelling of offerte voor de optie "installatie inclusief afvoer oude ketel" en wij regelen de milieuvriendelijke afvoer.' },
  { q: 'Welke betaalmethoden accepteren jullie?', a: 'Je kunt betalen met iDEAL, Bancontact, Klarna (achteraf of gespreid), creditcard, Apple Pay en Google Pay.' },
  { q: 'Hoe snel kan een nieuwe ketel geplaatst worden?', a: 'In de meeste gevallen binnen 3 tot 5 werkdagen. Bij een storing kan dit via onze 24/7 storingsdienst sneller.' },
  { q: 'Wat is het verschil tussen de CW-klassen?', a: 'De CW-klasse geeft het warmwatercomfort aan. CW3 is geschikt voor een appartement, CW4 voor een gemiddeld gezin, CW5 voor een regendouche of bad en CW6 voor woningen met twee badkamers. Onze keuzehulp adviseert de juiste klasse.' },
  { q: 'Kom ik in aanmerking voor subsidie?', a: 'Voor hybride warmtepompen geldt de ISDE-subsidie (vaak rond €2.500). Wij verzorgen desgewenst de aanvraag voor je.' },
  { q: 'Krijg ik garantie op mijn nieuwe ketel?', a: 'Ja, je krijgt volledige fabrieks- en installatiegarantie. Met een onderhoudscontract kun je de dekking uitbreiden.' },
];

export function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <PageHero eyebrow="Veelgestelde vragen" title="Antwoord op je vragen" sub="Staat je vraag er niet bij? Neem gerust contact met ons op." />
      <section className="py-16">
        <div className="container-wide max-w-3xl">
          <div className="space-y-3">
            {faqData.map((f, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-silver-100 bg-white shadow-soft">
                <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
                  <span className="font-semibold text-navy-900">{f.q}</span>
                  <ChevronDown size={18} className={`shrink-0 text-navy-500 transition-transform ${open === i ? 'rotate-180' : ''}`} />
                </button>
                {open === i && <p className="px-6 pb-5 leading-relaxed text-silver-600">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBlock />
    </>
  );
}

/* ───────────────────────── Contact ───────────────────────── */
export function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Neem contact op" sub="We helpen je graag verder met advies, een offerte of een storing." />
      <section className="py-16">
        <div className="container-wide grid gap-6 md:grid-cols-3">
          {[
            { icon: Phone, title: 'Bel ons', lines: ['085 000 1234', 'Ma–vr 08:00–18:00'], href: 'tel:+31850001234' },
            { icon: Mail, title: 'Mail ons', lines: ['offerte@westrik.nl', 'Reactie binnen 24 uur'], href: 'mailto:offerte@westrik.nl' },
            { icon: MapPin, title: 'Werkgebied', lines: ['Heel Nederland', 'Montage aan huis'] },
          ].map((c) => (
            <div key={c.title} className="rounded-3xl border border-silver-100 bg-white p-7 shadow-soft">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-50 text-navy-600"><c.icon size={22} /></span>
              <h3 className="mt-5 font-display text-lg font-bold text-navy-900">{c.title}</h3>
              {c.lines.map((l) => (
                c.href ? (
                  <a key={l} href={c.href} className="mt-1 block text-navy-700 hover:underline">{l}</a>
                ) : (
                  <p key={l} className="mt-1 text-silver-500">{l}</p>
                )
              ))}
            </div>
          ))}
        </div>
        <div className="container-wide mt-10 flex items-center gap-3 rounded-3xl bg-navy-50 p-6">
          <Clock size={22} className="text-navy-600" />
          <p className="text-sm text-navy-800">
            <span className="font-semibold">24/7 storingsdienst.</span> Voor spoed buiten kantooruren bel je hetzelfde nummer.
          </p>
        </div>
        <div className="container-wide mt-6 text-center">
          <Button to="/offerte" size="lg">Liever direct een offerte? <ArrowRight size={18} /></Button>
        </div>
      </section>
    </>
  );
}

/* ───────────────────────── Blog (placeholder) ───────────────────────── */
export function BlogPage() {
  const posts = [
    ['Welke CV-ketel past bij mijn woning in 2026?', 'Een complete gids langs CW-klassen, merken en vermogens.'],
    ['Hybride warmtepomp: is het iets voor jou?', 'Bespaar tot 60% op gas en profiteer van ISDE-subsidie.'],
    ['Intergas, Remeha, Vaillant of Nefit?', 'We vergelijken de vier grote merken op comfort en onderhoud.'],
  ];
  return (
    <>
      <PageHero eyebrow="Blog" title="Kennis & advies" sub="Tips over CV-ketels, boilers, warmtepompen en verduurzaming." />
      <section className="py-16">
        <div className="container-wide grid gap-6 md:grid-cols-3">
          {posts.map(([t, d]) => (
            <article key={t} className="overflow-hidden rounded-3xl border border-silver-100 bg-white shadow-soft">
              <div className="h-40 bg-hero-gradient" />
              <div className="p-6">
                <h3 className="font-display text-lg font-bold text-navy-900">{t}</h3>
                <p className="mt-2 text-sm text-silver-500">{d}</p>
                <Link to="/keuzehulp" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-600 hover:underline">
                  Lees meer <ArrowRight size={15} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaBlock />
    </>
  );
}
