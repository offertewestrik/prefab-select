/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";
import { Lock, MapPin, Calendar, Clock, Paperclip } from "lucide-react";
import { Button, Card, CardContent } from "@repo/ui";
import { PageHeading } from "@/components/dashboard/sidebar-layout";
import { getSessionUser, getCurrentCompany } from "@/lib/guards";
import Link from "next/link";
import { getLeadView } from "@/features/leads/server/access";
import { BuyLeadButton } from "@/features/leads/components/buy-lead-button";

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getSessionUser();
  const isAdmin = (user as { role?: string } | null)?.role === "ADMIN";
  const company = await getCurrentCompany();

  const view = await getLeadView(id, company?.id ?? null, isAdmin);
  if (view.status === "forbidden") notFound();

  const { unlocked, data } = view;

  return (
    <div>
      <PageHeading title={`${data.serviceName} — ${data.city}`} subtitle={`Status: ${data.status}`} />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Klusinformatie (altijd zichtbaar) */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardContent>
              <h2 className="font-semibold text-neutral-900">Klusinformatie</h2>
              <div className="mt-3 grid gap-2 text-sm text-neutral-700">
                <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-primary-600" /> {data.city}, {data.province} ({data.postcodeArea}…)</span>
                <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-primary-600" /> {data.urgencyLabel}</span>
                <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4 text-primary-600" /> {data.preferredDate ?? "Geen voorkeursdatum"} · {data.daypartLabel}</span>
                <span className="inline-flex items-center gap-2"><Paperclip className="h-4 w-4 text-primary-600" /> {data.attachmentCount} bijlage(n)</span>
              </div>
              <h3 className="mt-4 text-sm font-semibold text-neutral-900">Omschrijving</h3>
              <p className="mt-1 whitespace-pre-wrap text-sm text-neutral-700">{data.description}</p>
            </CardContent>
          </Card>

          {data.ai && (
            <Card>
              <CardContent>
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-neutral-900">AI-analyse</h2>
                  <span className="text-xs text-neutral-400">automatisch · ter indicatie</span>
                </div>
                <p className="mt-2 text-sm text-neutral-700">{data.ai.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-neutral-100 px-2 py-0.5">Urgentie: {data.ai.urgency}</span>
                  <span className="rounded-full bg-neutral-100 px-2 py-0.5">Complexiteit: {data.ai.complexity}</span>
                  <span className="rounded-full bg-neutral-100 px-2 py-0.5">± {data.ai.estimatedDurationHours} uur</span>
                </div>
                {data.ai.risks.length > 0 && (
                  <p className="mt-3 text-sm text-neutral-600"><span className="font-medium">Risico&apos;s:</span> {data.ai.risks.join(", ")}</p>
                )}
                {data.ai.missingInfo.length > 0 && (
                  <p className="mt-1 text-sm text-accent-600"><span className="font-medium">Ontbrekende info:</span> {data.ai.missingInfo.join(", ")}</p>
                )}
                {data.ai.recommendedServices.length > 0 && (
                  <p className="mt-1 text-sm text-neutral-600"><span className="font-medium">Aanbevolen diensten:</span> {data.ai.recommendedServices.join(", ")}</p>
                )}
              </CardContent>
            </Card>
          )}

          {data.priceIndication && (
            <Card>
              <CardContent>
                <h2 className="font-semibold text-neutral-900">Prijsindicatie (AI)</h2>
                <p className="mt-1 text-sm text-neutral-500">Vrijblijvende indicatie — geen offerte.</p>
                <p className="mt-2 text-2xl font-bold text-neutral-900">
                  € {(data.priceIndication.minCents / 100).toFixed(0)} – € {(data.priceIndication.maxCents / 100).toFixed(0)}
                </p>
              </CardContent>
            </Card>
          )}

          {data.fraud && data.fraud.score >= 50 && (
            <Card>
              <CardContent>
                <h2 className="font-semibold text-[color:var(--color-status-danger,#DC2626)]">⚠ Mogelijk verdachte aanvraag</h2>
                <p className="mt-1 text-sm text-neutral-700">Risicoscore: {data.fraud.score}/100</p>
                {data.fraud.flags.length > 0 && <p className="mt-1 text-sm text-neutral-600">{data.fraud.flags.join(", ")}</p>}
              </CardContent>
            </Card>
          )}

          {/* Klantgegevens: gegrendeld of vrijgegeven */}
          <Card>
            <CardContent>
              <h2 className="font-semibold text-neutral-900">Klantgegevens</h2>
              {unlocked ? (
                <dl className="mt-3 grid gap-2 text-sm">
                  <Row label="Naam" value={data.contactName} />
                  <Row label="Telefoon" value={data.contactPhone} />
                  <Row label="E-mail" value={data.contactEmail} />
                  <Row label="Adres" value={[data.street, data.houseNumber].filter(Boolean).join(" ")} />
                  <Row label="Postcode" value={data.postcode} />
                </dl>
              ) : (
                <div className="mt-3 rounded-[var(--radius-md)] bg-neutral-50 p-4 text-sm text-neutral-500">
                  <p className="flex items-center gap-2 font-medium text-neutral-700">
                    <Lock className="h-4 w-4" /> Gegevens vergrendeld
                  </p>
                  <dl className="mt-3 grid gap-2">
                    <Row label="Naam" value={data.maskedName} />
                    <Row label="Telefoon" value="•• •• •• ••" />
                    <Row label="E-mail" value="verborgen tot aankoop" />
                    <Row label="Adres" value="verborgen tot aankoop" />
                  </dl>
                </div>
              )}
            </CardContent>
          </Card>

          {unlocked && data.attachments && data.attachments.length > 0 && (
            <Card>
              <CardContent>
                <h2 className="font-semibold text-neutral-900">Foto&apos;s</h2>
                <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {data.attachments.map((a) => (
                    <a key={a.id} href={a.url} target="_blank" rel="noreferrer">
                      <img src={a.url} alt="" className="h-24 w-full rounded-[var(--radius-md)] object-cover" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {unlocked && data.photoAnalysis && (
            <Card>
              <CardContent>
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-neutral-900">AI foto-analyse</h2>
                  <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600">
                    {data.photoAnalysis.status}
                    {data.photoAnalysis.status === "COMPLETED" && ` · ${data.photoAnalysis.provider === "openai" ? "OpenAI" : "Mock"} · ${Math.round(data.photoAnalysis.confidence * 100)}%`}
                  </span>
                </div>
                {data.photoAnalysis.status === "PENDING" ? (
                  <p className="mt-2 text-sm text-neutral-500">Analyse wordt verwerkt…</p>
                ) : data.photoAnalysis.status === "FAILED" ? (
                  <p className="mt-2 text-sm text-neutral-500">Analyse niet beschikbaar.</p>
                ) : (
                  <div className="mt-2 space-y-2 text-sm text-neutral-700">
                    {data.photoAnalysis.summary && <p>{data.photoAnalysis.summary}</p>}
                    <p>
                      <span className="font-medium">Risico:</span> {data.photoAnalysis.riskLevel}
                      {data.photoAnalysis.estimatedPriceMin != null && (
                        <>
                          {" · "}
                          <span className="font-medium">Indicatie:</span> € {(data.photoAnalysis.estimatedPriceMin / 100).toFixed(0)}–€ {((data.photoAnalysis.estimatedPriceMax ?? 0) / 100).toFixed(0)}
                        </>
                      )}
                    </p>
                    {data.photoAnalysis.objects.length > 0 && (
                      <p><span className="font-medium">Herkend:</span> {data.photoAnalysis.objects.map((o) => o.label).join(", ")}</p>
                    )}
                    {data.photoAnalysis.recommendations.length > 0 && (
                      <p><span className="font-medium">Aanbevelingen:</span> {data.photoAnalysis.recommendations.join(", ")}</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {unlocked && (
            <Link href={`/dashboard/leads/${data.id}/offerte`}>
              <Button variant="outline">Maak offerte</Button>
            </Link>
          )}
        </div>

        {/* Aankoop-paneel */}
        <aside>
          <Card>
            <CardContent>
              {unlocked ? (
                <div className="text-sm">
                  <p className="font-semibold text-success-500">Lead in jouw bezit</p>
                  <p className="mt-1 text-neutral-500">Je hebt volledige toegang tot deze klant.</p>
                </div>
              ) : (
                <>
                  <div className="text-sm text-neutral-500">Prijs</div>
                  <div className="text-3xl font-bold text-neutral-900">{data.priceCredits} credits</div>
                  <p className="mt-1 text-xs text-neutral-500">
                    {data.soldCount}/{data.maxBuyers} verkocht
                  </p>
                  <div className="mt-4">
                    <BuyLeadButton
                      leadId={data.id}
                      priceCredits={data.priceCredits}
                      disabled={data.soldCount >= data.maxBuyers}
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-neutral-500">{label}</dt>
      <dd className="text-right font-medium text-neutral-900">{value || "—"}</dd>
    </div>
  );
}
