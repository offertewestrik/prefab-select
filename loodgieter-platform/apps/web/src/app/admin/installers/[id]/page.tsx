import Link from "next/link";
import { notFound } from "next/navigation";
import { companyStatusLabels, type CompanyStatus } from "@repo/core";
import { Button, Card, CardContent } from "@repo/ui";
import { PageHeading } from "@/components/dashboard/sidebar-layout";
import { CoverageMap } from "@/components/marketing/coverage-map";
import { getCompanyForAdmin } from "@/features/installers/server/admin";
import { summarizeReviewsAction } from "@/features/ai/actions";
import { approveCompanyAction, rejectCompanyAction, suspendCompanyAction } from "@/features/installers/server/actions";
import { setVisibilityAction } from "@/features/installers/server/profile-actions";

export default async function AdminInstallerDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const company = await getCompanyForAdmin(id);
  if (!company) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/installers" className="text-sm text-neutral-500 hover:text-neutral-900">← Vakmannen</Link>
        <PageHeading title={company.name} subtitle={`Status: ${companyStatusLabels[company.status as CompanyStatus]}`} />
      </div>

      <Card>
        <CardContent>
          <h2 className="font-semibold text-neutral-900">Bedrijfsgegevens</h2>
          <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            <Row label="Contactpersoon" value={company.contactName} />
            <Row label="E-mail" value={company.email} />
            <Row label="Telefoon" value={company.phone} />
            <Row label="KVK" value={company.kvk} />
            <Row label="Btw" value={company.vatNumber} />
            <Row label="Website" value={company.website} />
            <Row label="Adres" value={[company.street, company.postcode, company.city, company.province].filter(Boolean).join(", ")} />
          </dl>
        </CardContent>
      </Card>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardContent>
            <h2 className="font-semibold text-neutral-900">Diensten ({company.services.length})</h2>
            <ul className="mt-2 text-sm text-neutral-700">
              {company.services.map((s) => <li key={s.serviceId}>{s.service.name}</li>)}
              {company.services.length === 0 && <li className="text-neutral-400">Geen</li>}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h2 className="font-semibold text-neutral-900">Werkgebied ({company.coverage.length})</h2>
            <ul className="mt-2 text-sm text-neutral-700">
              {company.coverage.map((c) => <li key={c.id}>{c.municipality?.name ?? "—"}</li>)}
              {company.coverage.length === 0 && <li className="text-neutral-400">Geen</li>}
            </ul>
            {company.coverage[0]?.radiusKm ? <p className="mt-2 text-sm text-neutral-500">Straal: ± {company.coverage[0].radiusKm} km</p> : null}
          </CardContent>
        </Card>
      </div>

      {company.coverage.some((c) => c.municipality) && (
        <Card>
          <CardContent>
            <h2 className="font-semibold text-neutral-900">Werkgebied op de kaart</h2>
            <div className="mt-3">
              <CoverageMap
                municipalities={company.coverage
                  .map((c) => c.municipality)
                  .filter((m): m is NonNullable<typeof m> => !!m)
                  .map((m) => ({ name: m.name, lat: m.lat, lng: m.lng }))}
                homeBase={
                  (company.city &&
                    company.coverage
                      .map((c) => c.municipality)
                      .filter((m): m is NonNullable<typeof m> => !!m)
                      .map((m) => ({ name: m.name, lat: m.lat, lng: m.lng }))
                      .find((m) => m.name.toLowerCase() === company.city!.toLowerCase())) ||
                  null
                }
                radiusKm={company.coverage[0]?.radiusKm ?? null}
                height={280}
              />
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-neutral-900">Review-samenvatting (AI, intern)</h2>
            <form action={summarizeReviewsAction}>
              <input type="hidden" name="companyId" value={company.id} />
              <button className="rounded-[var(--radius-md)] border border-neutral-200 px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
                Reviews samenvatten
              </button>
            </form>
          </div>
          {(() => {
            const s = company.reviewSummary as
              | { sentiment?: string; strengths?: string[]; weaknesses?: string[]; improvements?: string[] }
              | null;
            if (!s) return <p className="mt-2 text-sm text-neutral-500">Nog geen samenvatting. Niet publiek zichtbaar zonder goedkeuring.</p>;
            return (
              <div className="mt-3 space-y-1 text-sm text-neutral-700">
                {s.sentiment && <p><span className="font-medium">Sentiment:</span> {s.sentiment}</p>}
                {s.strengths?.length ? <p><span className="font-medium">Sterke punten:</span> {s.strengths.join(", ")}</p> : null}
                {s.weaknesses?.length ? <p><span className="font-medium">Zwakke punten:</span> {s.weaknesses.join(", ")}</p> : null}
                {s.improvements?.length ? <p><span className="font-medium">Verbeterpunten:</span> {s.improvements.join(", ")}</p> : null}
                {company.reviewSummaryAt && <p className="text-xs text-neutral-400">Bijgewerkt: {company.reviewSummaryAt.toLocaleString("nl-NL")}</p>}
              </div>
            );
          })()}
        </CardContent>
      </Card>

      {/* Acties */}
      <div className="flex flex-wrap gap-3">
        <form action={approveCompanyAction}>
          <input type="hidden" name="companyId" value={company.id} />
          <Button type="submit" variant="accent" disabled={company.status === "APPROVED"}>Goedkeuren</Button>
        </form>
        <form action={rejectCompanyAction}>
          <input type="hidden" name="companyId" value={company.id} />
          <Button type="submit" variant="outline" disabled={company.status === "REJECTED"}>Afwijzen</Button>
        </form>
        <form action={suspendCompanyAction}>
          <input type="hidden" name="companyId" value={company.id} />
          <Button type="submit" variant="outline" disabled={company.status === "SUSPENDED"}>Schorsen</Button>
        </form>
        <form action={setVisibilityAction}>
          <input type="hidden" name="companyId" value={company.id} />
          <input type="hidden" name="visible" value={company.publicVisible ? "false" : "true"} />
          <Button type="submit" variant="outline">{company.publicVisible ? "Verberg publiek profiel" : "Toon publiek profiel"}</Button>
        </form>
      </div>

      {company.status === "APPROVED" && company.publicVisible && (
        <Link href={`/vakmannen/${company.slug}`} className="text-sm font-medium text-primary-600 hover:underline">
          Bekijk publiek profiel →
        </Link>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex justify-between gap-4 border-b border-neutral-100 py-1.5">
      <dt className="text-neutral-500">{label}</dt>
      <dd className="text-right font-medium text-neutral-900">{value || "—"}</dd>
    </div>
  );
}
