import { useState } from 'react';
import { ChevronLeft, ChevronRight, BadgeCheck } from 'lucide-react';
import { Stars } from './ui';

const reviews = [
  { author: 'Familie Jansen', city: 'Breda', rating: 5, body: 'Binnen drie dagen een nieuwe Intergas Xtreme geïnstalleerd. Monteur was vakkundig en netjes. Oude ketel direct meegenomen.' },
  { author: 'P. Hendriks', city: 'Utrecht', rating: 5, body: 'Top advies via de keuzehulp en een scherpe prijs. Echt een aanrader voor wie zonder gedoe een nieuwe ketel wil.' },
  { author: 'M. van Dijk', city: 'Eindhoven', rating: 5, body: 'Snelle reactie op mijn offerteaanvraag en duidelijke communicatie. De Remeha draait perfect.' },
  { author: 'S. de Boer', city: 'Rotterdam', rating: 4, body: 'Goede service en nette installatie. Klein plannetje verschoven, maar verder helemaal prima.' },
  { author: 'Familie Visser', city: 'Den Haag', rating: 5, body: 'Hybride warmtepomp laten plaatsen, inclusief subsidieaanvraag. Gasverbruik flink omlaag!' },
];

export function ReviewsSlider() {
  const [i, setI] = useState(0);
  const visible = 3;
  const max = Math.max(0, reviews.length - visible);
  const prev = () => setI((v) => Math.max(0, v - 1));
  const next = () => setI((v) => Math.min(max, v + 1));

  return (
    <div>
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-navy-500">Reviews</p>
          <h2 className="font-display text-3xl font-extrabold text-navy-900 md:text-4xl">
            Beoordeeld met een <span className="text-navy-600">4,9</span>
          </h2>
          <div className="mt-3 flex items-center gap-3">
            <Stars rating={5} size={18} />
            <span className="text-sm text-silver-500">1.842 reviews via Google &amp; Trustpilot</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={prev} disabled={i === 0} className="flex h-11 w-11 items-center justify-center rounded-full border border-silver-200 text-navy-700 disabled:opacity-40 hover:bg-navy-50">
            <ChevronLeft size={18} />
          </button>
          <button onClick={next} disabled={i === max} className="flex h-11 w-11 items-center justify-center rounded-full border border-silver-200 text-navy-700 disabled:opacity-40 hover:bg-navy-50">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex gap-6 transition-transform duration-500 ease-out"
          style={{ transform: `translateX(calc(-${i} * (100% / ${visible} )))` }}
        >
          {reviews.map((r, idx) => (
            <div key={idx} className="w-full shrink-0 md:w-[calc((100%-3rem)/3)]">
              <div className="flex h-full flex-col rounded-3xl border border-silver-100 bg-white p-7 shadow-soft">
                <div className="flex items-center justify-between">
                  <Stars rating={r.rating} />
                  <BadgeCheck size={18} className="text-emerald-500" />
                </div>
                <p className="mt-4 flex-1 leading-relaxed text-navy-800">“{r.body}”</p>
                <p className="mt-5 text-sm font-semibold text-navy-900">
                  {r.author} <span className="font-normal text-silver-500">— {r.city}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TrustBadges() {
  const items = ['Google 4,9 ★', 'Trustpilot 4,8 ★', 'Sterkin erkend', 'Gastec QA', 'Techniek Nederland'];
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
      {items.map((t) => (
        <span key={t} className="flex items-center gap-2 text-sm font-semibold text-navy-700">
          <BadgeCheck size={16} className="text-emerald-500" /> {t}
        </span>
      ))}
    </div>
  );
}
