import { Star, Quote, BadgeCheck, ShieldCheck, MessageSquareQuote } from "lucide-react";
import { Reveal } from "./reveal";
import { StatCounter } from "./stat-counter";

type ReviewCard = {
  id: string;
  rating: number;
  title: string | null;
  body: string;
  authorLabel: string;
  cityName: string | null;
  serviceSlug: string | null;
  companyName: string;
  companySlug: string | null;
  createdAt: Date;
  reply: { body: string; companyName: string } | null;
};

type ReviewAggregate = {
  average: number;
  count: number;
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
  latest: ReviewCard[];
};

const dateFmt = new Intl.DateTimeFormat("nl-NL", { month: "long", year: "numeric" });

function formatDate(value: Date) {
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return dateFmt.format(d);
}

/** Rij met 5 sterren, gevuld t/m `rating`. */
function Stars({ rating, className = "h-4 w-4" }: { rating: number; className?: string }) {
  const filled = Math.round(rating);
  return (
    <span className="inline-flex text-accent-500" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${className} ${i < filled ? "fill-current" : "fill-none text-neutral-300"}`} />
      ))}
    </span>
  );
}

export function Reviews({ data }: { data: ReviewAggregate }) {
  const isEmpty = data.count === 0;

  return (
    <section
      id="reviews"
      className="relative overflow-hidden bg-gradient-to-b from-white via-primary-50/40 to-white py-24"
    >
      {/* Decoratieve gloed */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-primary-200/30 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-accent-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-(--container-max) px-6">
        {isEmpty ? <EmptyState /> : <PopulatedState data={data} />}
      </div>
    </section>
  );
}

/* ───────────────────────── Populated ───────────────────────── */

function PopulatedState({ data }: { data: ReviewAggregate }) {
  const total = data.count || 1;
  const tiers = [5, 4, 3, 2, 1] as const;

  return (
    <div>
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">Reviews</span>
        <h2 className="display mt-3 text-4xl text-neutral-900 sm:text-5xl">
          Wat klanten <span className="text-gradient">echt</span> vinden
        </h2>
        <p className="mt-4 text-lg text-neutral-500">
          Geverifieerde beoordelingen van huiseigenaren — geplaatst na een afgeronde klus.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-10 lg:grid-cols-[0.85fr_2.15fr] lg:items-start">
        {/* Aggregaat-paneel */}
        <Reveal as="div">
          <div className="glass rounded-[var(--radius-2xl)] p-8 shadow-premium ring-hairline">
            <div className="flex items-baseline gap-1.5">
              <span className="display text-6xl text-neutral-900">
                <StatCounter value={data.average} decimals={1} />
              </span>
              <span className="text-2xl font-semibold text-neutral-400">/5</span>
            </div>
            <div className="mt-3">
              <Stars rating={data.average} className="h-5 w-5" />
            </div>
            <p className="mt-2 text-sm font-medium text-neutral-500">
              <StatCounter value={data.count} /> beoordelingen
            </p>

            {/* Verdeling */}
            <div className="mt-7 space-y-2.5">
              {tiers.map((t) => {
                const value = data.distribution[t] ?? 0;
                const pct = Math.round((value / total) * 100);
                return (
                  <div key={t} className="flex items-center gap-3">
                    <span className="flex w-7 shrink-0 items-center gap-1 text-xs font-semibold text-neutral-500">
                      {t}
                      <Star className="h-3 w-3 fill-current text-accent-500" aria-hidden />
                    </span>
                    <span className="relative h-2 flex-1 overflow-hidden rounded-full bg-neutral-200/70" aria-hidden>
                      <span
                        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
                        style={{ width: `${pct}%` }}
                      />
                    </span>
                    <span className="w-9 shrink-0 text-right text-xs tabular-nums text-neutral-400">{pct}%</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-7 flex items-center gap-2 border-t border-neutral-200/70 pt-5 text-xs font-medium text-neutral-500">
              <BadgeCheck className="h-4 w-4 text-success-500" aria-hidden />
              Onafhankelijk geverifieerd
            </div>
          </div>
        </Reveal>

        {/* Testimonial-grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.latest.map((r, i) => (
            <Reveal key={r.id} delay={(i % 3) * 90} as="div" className="h-full">
              <ReviewTile review={r} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReviewTile({ review: r }: { review: ReviewCard }) {
  const date = formatDate(r.createdAt);
  return (
    <article className="lift flex h-full flex-col rounded-[var(--radius-2xl)] bg-white p-6 ring-hairline hover:shadow-float">
      <div className="flex items-center justify-between">
        <Stars rating={r.rating} />
        <Quote className="h-6 w-6 text-primary-100" aria-hidden />
      </div>

      {r.title ? (
        <h3 className="mt-4 text-base font-bold tracking-tight text-neutral-900">{r.title}</h3>
      ) : null}

      <p className={`${r.title ? "mt-2" : "mt-4"} text-sm leading-relaxed text-neutral-600`}>
        &ldquo;{r.body}&rdquo;
      </p>

      {r.reply ? (
        <div className="mt-4 rounded-[var(--radius-xl)] border-l-2 border-primary-200 bg-primary-50/60 p-3.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-primary-700">
            <MessageSquareQuote className="h-3.5 w-3.5" aria-hidden />
            Reactie van {r.reply.companyName}
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-neutral-600">{r.reply.body}</p>
        </div>
      ) : null}

      <footer className="mt-5 border-t border-neutral-100 pt-4">
        <div className="text-sm font-semibold text-neutral-900">
          {r.authorLabel}
          {r.cityName ? <span className="text-neutral-400"> · {r.cityName}</span> : null}
        </div>
        <div className="mt-0.5 text-xs text-neutral-400">
          via {r.companyName}
          {date ? <span> · {date}</span> : null}
        </div>
      </footer>
    </article>
  );
}

/* ───────────────────────── Empty ───────────────────────── */

const trustPoints = [
  { icon: BadgeCheck, title: "Geverifieerde klanten", text: "Alleen echte opdrachtgevers kunnen een beoordeling plaatsen." },
  { icon: ShieldCheck, title: "Alleen na afgeronde klus", text: "Reviews verschijnen pas wanneer het werk is opgeleverd." },
  { icon: MessageSquareQuote, title: "Inclusief reactie van de vakman", text: "Vakmannen kunnen openbaar reageren op elke beoordeling." },
];

function EmptyState() {
  return (
    <div>
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">Reviews</span>
        <h2 className="display mt-3 text-4xl text-neutral-900 sm:text-5xl">
          Vertrouwd door duizenden <span className="text-gradient">huiseigenaren</span>
        </h2>
        <p className="mt-4 text-lg text-neutral-500">
          Echte klantbeoordelingen verschijnen hier zodra de eerste klussen via het platform zijn afgerond.
        </p>
      </Reveal>

      <Reveal delay={120} className="mx-auto mt-14 max-w-3xl">
        <div className="glass relative overflow-hidden rounded-[var(--radius-2xl)] p-8 shadow-premium ring-hairline sm:p-10">
          <div className="text-center">
            <Stars rating={5} className="h-7 w-7" />
            <h3 className="mt-4 text-2xl font-bold tracking-tight text-neutral-900">
              Onafhankelijke, geverifieerde reviews
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-neutral-500">
              Ons reviewbeleid is bewust streng. Zo weet je zeker dat elke beoordeling die je hier straks leest
              te vertrouwen is.
            </p>
          </div>

          <div className="mt-9 grid gap-5 sm:grid-cols-3">
            {trustPoints.map((p) => (
              <div
                key={p.title}
                className="rounded-[var(--radius-xl)] bg-white/70 p-5 text-center ring-hairline backdrop-blur"
              >
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-md">
                  <p.icon className="h-5 w-5" aria-hidden />
                </span>
                <div className="mt-3 text-sm font-bold text-neutral-900">{p.title}</div>
                <p className="mt-1 text-xs leading-relaxed text-neutral-500">{p.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 border-t border-neutral-200/70 pt-6 text-xs font-medium text-neutral-500">
            <ShieldCheck className="h-4 w-4 text-success-500" aria-hidden />
            Beoordelingen worden gecontroleerd voordat ze worden gepubliceerd
          </div>
        </div>
      </Reveal>
    </div>
  );
}
