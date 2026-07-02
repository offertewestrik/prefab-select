/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Phone, Star, ShieldCheck, Wrench, Zap } from "lucide-react";
import { brand, regionsSentence } from "@repo/core";
import { urls, breadcrumbLd, localBusinessLd, itemListLd, siteUrl } from "@repo/seo";
import { Button } from "@repo/ui";
import { prisma } from "@/lib/prisma";
import { JsonLd } from "@/components/json-ld";
import { CoverageMap } from "@/components/marketing/coverage-map";
import { InstallerDirectory } from "@/components/marketing/installer-directory";
import { buildMetadata } from "@/features/seo/metadata";
import { getPublicProfile } from "@/features/installers/server/profile";
import {
  searchInstallers,
  getDirectoryFilterOptions,
  parseDirectoryParams,
  resolveDirectorySegment,
  type DirectorySegment,
} from "@/features/installers/server/directory";
import { staticParamsOrEmpty } from "@/lib/static-params";

export const revalidate = 3600;
export const dynamicParams = true;

/** Prerender: dienst- en stadfilters + goedgekeurde bedrijfsprofielen. */
export async function generateStaticParams() {
  return staticParamsOrEmpty(async () => {
    const [services, cities, companies] = await Promise.all([
      prisma.service.findMany({ where: { publish: "ACTIVE" }, select: { slug: true } }),
      prisma.municipality.findMany({ where: { publish: "ACTIVE" }, select: { slug: true } }),
      prisma.installerCompany.findMany({
        where: { status: "APPROVED", publicVisible: true },
        select: { slug: true },
      }),
    ]);
    return [...services, ...cities, ...companies].map((r) => ({ slug: r.slug }));
  });
}

function facetCopy(seg: DirectorySegment) {
  if (seg.kind === "service") {
    return {
      title: `${seg.name} — vakmannen vergelijken`,
      metaTitle: `${seg.name}: loodgieters & installateurs vergelijken`,
      intro: `Gecertificeerde vakmannen voor ${seg.name.toLowerCase()} in ${regionsSentence()}. Vergelijk beoordelingen en vraag gratis offertes aan.`,
      metaDesc: `Vergelijk vakmannen voor ${seg.name.toLowerCase()} via ${brand.name}. Filter op plaats, beoordeling en spoedservice en vraag gratis offertes aan.`,
    };
  }
  return {
    title: `Vakmannen in ${seg.name}`,
    metaTitle: `Loodgieters & installateurs in ${seg.name}`,
    intro: `Gecertificeerde loodgieters en installateurs met werkgebied ${seg.name} (${seg.province}). Vergelijk beoordelingen en vraag gratis offertes aan.`,
    metaDesc: `Vind een betrouwbare loodgieter of installateur in ${seg.name}. Vergelijk vakmannen op beoordeling en keurmerk via ${brand.name}.`,
  };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  const c = await getPublicProfile(slug);
  if (c) {
    return buildMetadata({
      title: c.city ? `${c.name} — loodgieter in ${c.city}` : `${c.name} — loodgieter & installateur`,
      description:
        c.shortDescription ??
        `Bekijk beoordelingen, diensten en het werkgebied van ${c.name}${c.city ? ` in ${c.city}` : ""}. Vraag vrijblijvend een gratis offerte aan.`,
      path: urls.installer(slug),
      ogImageUrl: c.logoUrl ?? undefined,
    });
  }

  const seg = await resolveDirectorySegment(slug);
  if (seg) {
    const copy = facetCopy(seg);
    return buildMetadata({ title: copy.metaTitle, description: copy.metaDesc, path: urls.installersByFacet(slug) });
  }

  return { robots: { index: false, follow: false } };
}

export default async function InstallerSlugPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;

  // 1) Bedrijfsprofiel (alleen APPROVED + zichtbaar).
  const c = await getPublicProfile(slug);
  if (c) return <ProfileView slug={slug} c={c} />;

  // 2) Anders: dienst- of stadfilterpagina.
  const seg = await resolveDirectorySegment(slug);
  if (!seg) notFound();
  return <FacetView slug={slug} seg={seg} searchParams={await searchParams} />;
}

async function FacetView({
  slug,
  seg,
  searchParams,
}: {
  slug: string;
  seg: DirectorySegment;
  searchParams: Record<string, string | string[] | undefined>;
}) {
  // De facet uit het pad heeft voorrang; overige filters mogen uit de query komen.
  const base = parseDirectoryParams(searchParams);
  const filter =
    seg.kind === "service"
      ? { ...base, service: seg.slug }
      : { ...base, city: seg.slug };

  const [{ items, total, truncated }, options] = await Promise.all([
    searchInstallers(filter),
    getDirectoryFilterOptions(),
  ]);
  const copy = facetCopy(seg);
  const path = urls.installersByFacet(slug);

  return (
    <main className="mx-auto max-w-(--container-max) px-6 py-10">
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Vakmannen", path: urls.installers() },
            { name: seg.name, path },
          ]),
          itemListLd(items.map((x) => ({ name: x.name, path: urls.installer(x.slug) }))),
        ]}
      />
      <InstallerDirectory
        title={copy.title}
        intro={copy.intro}
        items={items}
        total={total}
        truncated={truncated}
        options={options}
        current={filter}
        ctaServiceSlug={filter.service}
        ctaCitySlug={filter.city}
      />
    </main>
  );
}

type PublicProfile = NonNullable<Awaited<ReturnType<typeof getPublicProfile>>>;

function ProfileView({ slug, c }: { slug: string; c: PublicProfile }) {
  const coverageMunis = c.coverage
    .map((cv) => cv.municipality)
    .filter((m): m is NonNullable<typeof m> => !!m)
    .map((m) => ({ name: m.name, lat: m.lat, lng: m.lng }));
  const homeBase =
    (c.city && coverageMunis.find((m) => m.name.toLowerCase() === c.city!.toLowerCase())) || null;

  return (
    <main className="mx-auto max-w-(--container-max) px-6 py-10">
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Vakmannen", path: urls.installers() },
            { name: c.name, path: urls.installer(slug) },
          ]),
          localBusinessLd({ name: c.name, slug: c.slug, city: c.city ?? undefined, ratingAvg: c.ratingAvg, ratingCount: c.ratingCount }),
        ]}
      />

      {c.coverImageUrl && <img src={c.coverImageUrl} alt={`${c.name} — loodgieter en installateur${c.city ? ` in ${c.city}` : ""}`} className="mb-6 h-48 w-full rounded-[var(--radius-2xl)] object-cover" />}
      <div className="flex flex-wrap items-center gap-4">
        {c.logoUrl ? <img src={c.logoUrl} alt={`Logo van ${c.name}`} className="h-20 w-20 rounded-[var(--radius-lg)] object-cover" /> : <div className="grid h-20 w-20 place-items-center rounded-[var(--radius-lg)] bg-primary-50 text-primary-600"><Wrench className="h-8 w-8" /></div>}
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
                {c.photos.map((ph, i) => <img key={ph.id} src={ph.url} alt={ph.caption ?? `Werk van ${c.name} — foto ${i + 1}`} className="h-36 w-full rounded-[var(--radius-md)] object-cover" />)}
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
                    <div className="mt-2 text-xs text-neutral-400">{r.showName ? r.customerName : "Anonieme klant"}{r.cityName ? ` · ${r.cityName}` : ""}</div>
                    {r.replyEntry && r.replyEntry.status === "APPROVED" && (
                      <div className="mt-3 rounded-[var(--radius-md)] border-l-2 border-primary-200 bg-neutral-50 p-3">
                        <div className="text-xs font-semibold text-neutral-700">Reactie van {c.name}</div>
                        <p className="mt-1 text-sm text-neutral-600">{r.replyEntry.body}</p>
                      </div>
                    )}
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
              {c.coverage[0]?.radiusKm ? <p className="mt-1 text-neutral-500">Straal: ± {c.coverage[0].radiusKm} km</p> : null}
              {c.emergencyService && (
                <p className="mt-2 inline-flex items-center gap-1.5 text-accent-600">
                  <Zap className="h-4 w-4" /> 24/7 spoedservice in dit gebied
                </p>
              )}
            </div>
          )}
        </aside>
      </div>

      {coverageMunis.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-neutral-900">Werkgebied op de kaart</h2>
          <div className="mt-4">
            <CoverageMap municipalities={coverageMunis} homeBase={homeBase} radiusKm={c.coverage[0]?.radiusKm ?? null} />
          </div>
        </section>
      )}

      <p className="mt-10 text-center text-xs text-neutral-400">{siteUrl(urls.installer(slug))}</p>
    </main>
  );
}
