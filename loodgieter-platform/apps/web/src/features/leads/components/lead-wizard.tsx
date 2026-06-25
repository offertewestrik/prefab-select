"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui";
import {
  leadStep1Schema,
  leadStep3Schema,
  leadStep4Schema,
  urgencyLabels,
  daypartLabels,
  type LeadInput,
  type Urgency,
  type Daypart,
} from "@repo/core";

type ServiceOption = { slug: string; name: string; category: string };

const STEPS = ["Dienst", "Klusdetails", "Foto's", "Locatie", "Gegevens", "Klaar"] as const;

export function LeadWizard({
  services,
  initialService,
  initialCity,
}: {
  services: ServiceOption[];
  initialService?: string;
  initialCity?: string;
}) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Partial<LeadInput>>({
    serviceId: initialService,
    city: initialCity,
    preferredDaypart: "MAAKT_NIET_UIT",
    urgency: "FLEXIBEL",
  });

  const set = (patch: Partial<LeadInput>) => setData((d) => ({ ...d, ...patch }));

  function validateStep(): boolean {
    setError(null);
    if (step === 0) {
      const r = leadStep1Schema.safeParse(data);
      if (!r.success) return fail("Kies een dienst.");
    }
    if (step === 1) {
      if (!data.urgency) return fail("Kies de urgentie.");
      if (!data.description || data.description.length < 5) return fail("Geef een korte omschrijving.");
    }
    if (step === 3) {
      const r = leadStep3Schema.safeParse(data);
      if (!r.success) return fail(r.error.issues[0]?.message ?? "Controleer je locatie.");
    }
    if (step === 4) {
      const r = leadStep4Schema.safeParse(data);
      if (!r.success) return fail(r.error.issues[0]?.message ?? "Controleer je gegevens.");
    }
    return true;
  }
  const fail = (msg: string) => {
    setError(msg);
    return false;
  };

  const next = () => {
    if (validateStep()) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  async function submit() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Er ging iets mis.");
      router.push("/bedankt");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Er ging iets mis.");
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Stappen-indicator */}
      <ol className="mb-8 flex flex-wrap gap-2 text-sm">
        {STEPS.map((label, i) => (
          <li
            key={label}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 ${
              i === step ? "bg-primary-500 text-white" : i < step ? "bg-primary-50 text-primary-700" : "bg-neutral-100 text-neutral-500"
            }`}
          >
            <span className="font-semibold">{i + 1}</span> {label}
          </li>
        ))}
      </ol>

      <div className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-6">
        {step === 0 && (
          <Field label="Waarmee kunnen we je helpen?">
            <div className="grid gap-2 sm:grid-cols-2">
              {services.map((s) => (
                <button
                  key={s.slug}
                  type="button"
                  onClick={() => set({ serviceId: s.slug })}
                  className={`rounded-[var(--radius-md)] border p-3 text-left text-sm ${
                    data.serviceId === s.slug ? "border-primary-500 bg-primary-50" : "border-neutral-200 hover:border-neutral-300"
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </Field>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <Field label="Hoe snel heb je hulp nodig?">
              <div className="flex flex-wrap gap-2">
                {(Object.keys(urgencyLabels) as Urgency[]).map((u) => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => set({ urgency: u })}
                    className={`rounded-full border px-4 py-2 text-sm ${
                      data.urgency === u ? "border-primary-500 bg-primary-50" : "border-neutral-200"
                    }`}
                  >
                    {urgencyLabels[u]}
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Omschrijf je klus">
              <textarea
                className="min-h-28 w-full rounded-[var(--radius-md)] border border-neutral-200 p-3 text-sm"
                value={data.description ?? ""}
                onChange={(e) => set({ description: e.target.value })}
                placeholder="Bijv. mijn cv-ketel is 15 jaar oud en geeft storingen…"
              />
            </Field>
          </div>
        )}

        {step === 2 && (
          <Field label="Foto's toevoegen (optioneel)">
            <p className="text-sm text-neutral-500">
              Foto&apos;s helpen vakmannen een betere inschatting te maken. Deze stap is
              optioneel — uploaden wordt binnenkort toegevoegd. Je kunt deze stap overslaan.
            </p>
          </Field>
        )}

        {step === 3 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Postcode">
              <Input value={data.postcode ?? ""} onChange={(v) => set({ postcode: v })} placeholder="1234 AB" />
            </Field>
            <Field label="Huisnummer">
              <Input value={data.houseNumber ?? ""} onChange={(v) => set({ houseNumber: v })} placeholder="12" />
            </Field>
            <Field label="Plaats">
              <Input value={data.city ?? ""} onChange={(v) => set({ city: v })} placeholder="Amsterdam" />
            </Field>
            <Field label="Straat (optioneel)">
              <Input value={data.street ?? ""} onChange={(v) => set({ street: v })} placeholder="Voorbeeldstraat" />
            </Field>
          </div>
        )}

        {step === 4 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Naam">
              <Input value={data.contactName ?? ""} onChange={(v) => set({ contactName: v })} />
            </Field>
            <Field label="Telefoonnummer">
              <Input value={data.contactPhone ?? ""} onChange={(v) => set({ contactPhone: v })} placeholder="06 12345678" />
            </Field>
            <Field label="E-mailadres">
              <Input value={data.contactEmail ?? ""} onChange={(v) => set({ contactEmail: v })} placeholder="jouw@email.nl" />
            </Field>
            <Field label="Voorkeur dagdeel">
              <select
                className="h-11 w-full rounded-[var(--radius-md)] border border-neutral-200 px-3 text-sm"
                value={data.preferredDaypart ?? "MAAKT_NIET_UIT"}
                onChange={(e) => set({ preferredDaypart: e.target.value as Daypart })}
              >
                {(Object.keys(daypartLabels) as Daypart[]).map((d) => (
                  <option key={d} value={d}>
                    {daypartLabels[d]}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        )}

        {step === 5 && (
          <div>
            <h3 className="text-lg font-semibold text-neutral-900">Controleer je aanvraag</h3>
            <dl className="mt-4 space-y-1 text-sm text-neutral-700">
              <Row label="Dienst" value={services.find((s) => s.slug === data.serviceId)?.name} />
              <Row label="Urgentie" value={data.urgency && urgencyLabels[data.urgency]} />
              <Row label="Plaats" value={data.city} />
              <Row label="Naam" value={data.contactName} />
              <Row label="Contact" value={[data.contactEmail, data.contactPhone].filter(Boolean).join(" · ")} />
            </dl>
            <p className="mt-4 text-xs text-neutral-500">
              Door te verzenden ga je akkoord dat we je aanvraag delen met gecertificeerde
              vakmannen uit je regio. 100% vrijblijvend en gratis.
            </p>
          </div>
        )}

        {error && <p className="mt-4 text-sm text-[color:var(--color-status-danger,#DC2626)]">{error}</p>}

        <div className="mt-6 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={back} disabled={step === 0 || submitting}>
            Vorige
          </Button>
          {step < STEPS.length - 1 ? (
            <Button onClick={next}>{step === 2 ? "Overslaan / volgende" : "Volgende stap"}</Button>
          ) : (
            <Button variant="accent" onClick={submit} disabled={submitting}>
              {submitting ? "Versturen…" : "Aanvraag versturen"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-neutral-900">{label}</span>
      {children}
    </label>
  );
}

function Input({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      className="h-11 w-full rounded-[var(--radius-md)] border border-neutral-200 px-3 text-sm focus:border-primary-500 focus:outline-none"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-neutral-100 py-1.5">
      <dt className="text-neutral-500">{label}</dt>
      <dd className="text-right font-medium text-neutral-900">{value || "—"}</dd>
    </div>
  );
}
