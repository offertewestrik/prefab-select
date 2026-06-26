import Link from "next/link";
import { Star } from "lucide-react";
import { urls } from "@repo/seo";
import type { ReviewAggregate } from "@/features/reviews/server/aggregation";

function Stars({ value }: { value: number }) {
  return (
    <span className="inline-flex" aria-label={`${value.toFixed(1)} van 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} className={`h-4 w-4 ${n <= Math.round(value) ? "fill-current text-trust" : "text-neutral-300"}`} />
      ))}
    </span>
  );
}

// Herbruikbare review-sectie voor dienst-, stad- en combinatiepagina's.
export function ReviewsSection({ data, heading }: { data: ReviewAggregate; heading: string }) {
  if (data.count === 0) return null;

  return (
    <section className="rounded-[var(--radius-2xl)] border border-neutral-200 bg-white p-6">
      <h2 className="text-xl font-bold text-neutral-900">{heading}</h2>

      <div className="mt-4 flex flex-wrap items-center gap-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-neutral-900">{data.average.toFixed(1)}</div>
          <Stars value={data.average} />
          <div className="mt-1 text-sm text-neutral-500">{data.count} beoordelingen</div>
        </div>
        <div className="flex-1 min-w-48 space-y-1">
          {[5, 4, 3, 2, 1].map((n) => {
            const c = data.distribution[n as 1 | 2 | 3 | 4 | 5];
            const pct = data.count > 0 ? Math.round((c / data.count) * 100) : 0;
            return (
              <div key={n} className="flex items-center gap-2 text-xs text-neutral-500">
                <span className="w-3">{n}</span>
                <Star className="h-3 w-3 fill-current text-trust" />
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-100">
                  <div className="h-full bg-trust" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-8 text-right">{c}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.latest.map((r) => (
          <div key={r.id} className="rounded-[var(--radius-xl)] border border-neutral-200 p-4">
            <Stars value={r.rating} />
            {r.title && <div className="mt-1 font-medium text-neutral-900">{r.title}</div>}
            <p className="mt-1 line-clamp-4 text-sm text-neutral-500">{r.body}</p>
            <div className="mt-2 text-xs text-neutral-400">
              {r.authorLabel}
              {r.cityName ? ` · ${r.cityName}` : ""} ·{" "}
              {r.companySlug ? (
                <Link href={`/vakmannen/${r.companySlug}`} className="text-primary-600 hover:underline">{r.companyName}</Link>
              ) : (
                r.companyName
              )}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-sm text-neutral-500">
        <Link href={urls.request()} className="font-medium text-primary-600 hover:underline">Vraag gratis offertes aan →</Link>
      </p>
    </section>
  );
}
