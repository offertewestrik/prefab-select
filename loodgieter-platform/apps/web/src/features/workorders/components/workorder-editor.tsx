"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@repo/ui";
import { saveWorkOrderAction, signWorkOrderAction } from "../server/actions";

interface WLine { description: string; qty: number; unitPriceEuro: string; kind: "LABOUR" | "MATERIAL" | "OTHER" }
const KIND: Record<WLine["kind"], string> = { LABOUR: "Werk", MATERIAL: "Materiaal", OTHER: "Overig" };

export function WorkOrderEditor({
  workOrderId, status, initial,
}: {
  workOrderId: string;
  status: string;
  initial: { description: string; hoursWorked: number; customerName: string; address: string; notes: string; lineItems: { description: string; qty: number; unitPriceCents: number; kind?: string }[]; signedByName?: string | null };
}) {
  const router = useRouter();
  const signed = status === "SIGNED";
  const [description, setDescription] = useState(initial.description);
  const [hours, setHours] = useState(String(initial.hoursWorked));
  const [cName, setCName] = useState(initial.customerName);
  const [address, setAddress] = useState(initial.address);
  const [notes, setNotes] = useState(initial.notes);
  const [lines, setLines] = useState<WLine[]>(
    initial.lineItems.map((li) => ({ description: li.description, qty: li.qty, unitPriceEuro: (li.unitPriceCents / 100).toFixed(2), kind: (li.kind as WLine["kind"]) ?? "MATERIAL" })),
  );
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [signName, setSignName] = useState("");
  const [pending, start] = useTransition();

  const setLine = (i: number, patch: Partial<WLine>) => setLines((ls) => ls.map((l, idx) => (idx === i ? { ...l, ...patch } : l)));

  function save() {
    start(async () => {
      const payload = {
        description, hoursWorked: Number(hours) || 0, customerName: cName, address, notes,
        lineItems: lines.filter((l) => l.description.trim()).map((l) => ({ description: l.description.trim(), qty: Number(l.qty) || 0, unitPriceCents: Math.round((parseFloat(l.unitPriceEuro) || 0) * 100), kind: l.kind })),
      };
      const f = new FormData();
      f.set("payload", JSON.stringify(payload));
      const r = await saveWorkOrderAction(workOrderId, {}, f);
      setMsg({ ok: !!r.ok, text: r.message ?? "" });
      if (r.ok) router.refresh();
    });
  }
  function sign() {
    start(async () => {
      const f = new FormData();
      f.set("signedByName", signName);
      const r = await signWorkOrderAction(workOrderId, {}, f);
      setMsg({ ok: !!r.ok, text: r.message ?? "" });
      if (r.ok) router.refresh();
    });
  }

  return (
    <div className="mt-4 max-w-2xl space-y-4">
      {signed && (
        <div className="rounded-[var(--radius-md)] bg-green-50 p-3 text-sm text-green-700">
          Ondertekend door <strong>{initial.signedByName}</strong> — deze werkbon staat vast.
        </div>
      )}
      <div className="grid grid-cols-2 gap-3">
        <F label="Klant"><input className="wi" value={cName} disabled={signed} onChange={(e) => setCName(e.target.value)} /></F>
        <F label="Gewerkte uren"><input className="wi" type="number" step="0.25" min={0} value={hours} disabled={signed} onChange={(e) => setHours(e.target.value)} /></F>
      </div>
      <F label="Adres / locatie"><input className="wi" value={address} disabled={signed} onChange={(e) => setAddress(e.target.value)} /></F>
      <F label="Uitgevoerde werkzaamheden"><textarea className="wi min-h-20" value={description} disabled={signed} onChange={(e) => setDescription(e.target.value)} placeholder="Beschrijf wat er is gedaan" /></F>

      <div>
        <div className="mb-1 text-sm font-medium text-neutral-900">Gebruikt materiaal / werk</div>
        <div className="space-y-2">
          {lines.map((l, i) => (
            <div key={i} className="grid grid-cols-[1fr_90px_60px_90px_auto] gap-2">
              <input className="wi" placeholder="Omschrijving" value={l.description} disabled={signed} onChange={(e) => setLine(i, { description: e.target.value })} />
              <select className="wi" value={l.kind} disabled={signed} onChange={(e) => setLine(i, { kind: e.target.value as WLine["kind"] })}>
                {(["LABOUR", "MATERIAL", "OTHER"] as const).map((k) => <option key={k} value={k}>{KIND[k]}</option>)}
              </select>
              <input className="wi" type="number" min={0} step="0.5" value={l.qty} disabled={signed} onChange={(e) => setLine(i, { qty: Number(e.target.value) })} />
              <input className="wi" type="number" min={0} step="0.01" value={l.unitPriceEuro} disabled={signed} onChange={(e) => setLine(i, { unitPriceEuro: e.target.value })} />
              {!signed && <button type="button" onClick={() => setLines((ls) => ls.filter((_, idx) => idx !== i))} className="grid place-items-center px-2 text-neutral-400 hover:text-[color:var(--color-status-danger,#DC2626)]"><Trash2 className="h-4 w-4" /></button>}
            </div>
          ))}
        </div>
        {!signed && <button type="button" onClick={() => setLines((ls) => [...ls, { description: "", qty: 1, unitPriceEuro: "0.00", kind: "MATERIAL" }])} className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary-600"><Plus className="h-4 w-4" /> Regel toevoegen</button>}
      </div>

      <F label="Interne notities"><textarea className="wi min-h-16" value={notes} disabled={signed} onChange={(e) => setNotes(e.target.value)} /></F>

      {!signed && (
        <>
          <div className="flex items-center gap-3"><Button variant="outline" onClick={save} disabled={pending}>Opslaan</Button></div>
          <div className="rounded-[var(--radius-lg)] border border-neutral-200 bg-neutral-50/60 p-3">
            <div className="text-sm font-medium text-neutral-900">Klant akkoord (aftekenen)</div>
            <p className="mb-2 text-xs text-neutral-500">Vul de naam van de klant in. Na aftekenen staat de werkbon vast.</p>
            <div className="flex items-center gap-2">
              <input className="wi" placeholder="Naam klant" value={signName} onChange={(e) => setSignName(e.target.value)} style={{ maxWidth: 260 }} />
              <Button variant="accent" onClick={sign} disabled={pending || signName.trim().length < 2}>Aftekenen</Button>
            </div>
          </div>
        </>
      )}
      {msg && <p className={`text-sm ${msg.ok ? "text-success-500" : "text-[color:var(--color-status-danger,#DC2626)]"}`}>{msg.text}</p>}
      <style>{`.wi{height:2.6rem;width:100%;border:1px solid var(--color-neutral-200);border-radius:var(--radius-md);padding:0 .6rem;font-size:.875rem}textarea.wi{height:auto;padding:.5rem .6rem}`}</style>
    </div>
  );
}

function F({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-1 block text-sm font-medium text-neutral-900">{label}</span>{children}</label>;
}
