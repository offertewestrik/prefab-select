/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Phone, Star, ShieldCheck, Wrench } from "lucide-react";
import { brand } from "@repo/core";
import { urls, breadcrumbLd, localBusinessLd, siteUrl } from "@repo/seo";
import { Button } from "@repo/ui";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata } from "@/features/seo/metadata";
import { getPublicProfile } from "@/features/installers/server/profile";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = await getPublicProfile(slug);
  if (!c) return { robots: { index: false, follow: false } };
  return buildMetadata({
    title: `${c.name} — installateur & loodgieter`,
    description: c.shortDescription ?? `${c.name} via ${brand.name}. Vraag vrijblijvend een offerte aan.`,
    path: `/vakmannen/${slug}`,
    ogImageUrl: c.logoUrl ?? undefined,
  });
}

export default async function PublicProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = await getPublicProfile(slug);
  if (!c) notFound(); // niet APPROVED / verborgen / bestaat niet

  return (
    <main className="mx-auto max-w-(--container-max) px-6 py-10">
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Vakmannen", path: "/vakmannen" },
            { name: c.name, path: `/vakmannen/${slug}` },
          ]),
          localBusinessLd({ name: c.name, slug: c.slug, city: c.city ?? undefined, ratingAvg: c.ratingAvg, ratingCount: c.ratingCount }),
        ]}
      />

      {/* Omslag + kop */}
      {c.coverImageUrl && <img src={c.coverImageUrl} alt="" className="mb-6 h-48 w-full rounded-[var(--radius-2xl)] object-cover" />}
      <div className="flex flex-wrap items-center gap-4">
        {c.logoUrl ? <img src={c.logoUrl} alt={c.name} className="h-20 w-20 rounded-[var(--radius-lg)] object-cover" /> : <div className="grid h-20 w-20 place-items-center rounded-[var(--radius-lg)] bg-primary-50 text-primary-600"><Wrench className="h-8 w-8" /></div>}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">{c.name}</h1>
          <div className="mt-1 flex items-center gap-3 text-sm text-neutral-500">
            {c.ratingCount > 0 && (
              <span className="inline-flex items-center gap-1 text-trust"><Star className="h-4 w-4 fill-current" /> {c.ratingAvg.toFixed(1)} ({c.ratingCount})</span>
            )}
            {c.city && <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {c.city}</span>}
            {c.emergencyService && <span className="rounded-full bg-accent-500/10 px-2 py-0.5 text-accent-600">24/7 spoedservice</span>}
          </div>
        </div>
        <div className="ml-auto flex gap-2">
          <Link href="/aanvraag"><Button variant="accent">Offerte aanvragen</Button></Link>
          <Link href={urls.services()}><Button variant="outline">Bekijk diensten</Button></Link>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          {c.description && (
            <section><h2 className="text-xl font-bold text-neutral-900">Over {c.name}</h2><p className="mt-2 whitespace-pre-wrap text-neutral-700">{c.description}</p></section>
          )}

          {c.services.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-neutral-900">Diensten</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {c.services.map((s) => (
                  <Link key={s.serviceId} href={urls.service(s.service.slug)} className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-sm text-neutral-700 hover:border-primary-500">{s.service.name}</Link>
                ))}
              </div>
            </section>
          )}

          {c.photos.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-neutral-900">Portfolio</h2>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {c.photos.map((ph) => <img key={ph.id} src={ph.url} alt={ph.caption ?? ""} className="h-36 w-full rounded-[var(--radius-md)] object-cover" />)}
              </div>
            </section>
          )}

          {c.reviews.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-neutral-900">Reviews</h2>
              <div className="mt-3 space-y-3">
                {c.reviews.map((r) => (
                  <div key={r.id} className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-4">
                    <div className="text-trust">{"★".repeat(r.rating)}</div>
                    {r.title && <div className="mt-1 font-medium text-neutral-900">{r.title}</div>}
                    <p className="mt-1 text-sm text-neutral-500">{r.body}</p>
                    <div className="mt-2 text-xs text-neutral-400">{r.authorName}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-6">
          <div className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-5 text-sm">
            <h3 className="font-semibold text-neutral-900">Gegevens</h3>
            <div className="mt-3 space-y-1.5 text-neutral-700">
              {c.phone && <div className="inline-flex items-center gap-2"><Phone className="h-4 w-4 text-primary-600" /> {c.phone}</div>}
              {c.yearsExperience != null && <div>{c.yearsExperience} jaar ervaring</div>}
              {c.employees != null && <div>{c.employees} monteurs</div>}
              {c.specialties.length > 0 && <div>Specialisaties: {c.specialties.join(", ")}</div>}
            </div>
          </div>

          {c.certifications.length > 0 && (
            <div className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-5 text-sm">
              <h3 className="font-semibold text-neutral-900">Keurmerken</h3>
              <ul className="mt-3 space-y-1.5">
                {c.certifications.map((cert) => (
                  <li key={cert.id} className="inline-flex items-center gap-2 text-neutral-700"><ShieldCheck className="h-4 w-4 text-success-500" /> {cert.type}</li>
                ))}
              </ul>
            </div>
          )}

          {c.coverage.length > 0 && (
            <div className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-5 text-sm">
              <h3 className="font-semibold text-neutral-900">Werkgebied</h3>
              <p className="mt-2 text-neutral-700">{c.coverage.map((cv) => cv.municipality?.name).filter(Boolean).join(", ")}</p>
            </div>
          )}
        </aside>
      </div>

      <p className="mt-10 text-center text-xs text-neutral-400">{siteUrl(`/vakmannen/${slug}`)}</p>
    </main>
  );
}
