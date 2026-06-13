"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "./ui/Modal";
import { useCrm } from "@/lib/store";
import { PRODUCT_LABEL, SOURCE_LABEL, STAGE_META, STAGE_ORDER, TEAM } from "@/lib/constants";
import type { LeadSource, PipelineStage, ProductType } from "@/lib/types";

export function NewLeadDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const addLead = useCrm((s) => s.addLead);

  const [form, setForm] = useState({
    naam: "",
    email: "",
    telefoon: "",
    plaats: "",
    product: "mantelzorgwoning" as ProductType,
    source: "handmatig" as LeadSource,
    stage: "nieuwe_lead" as PipelineStage,
    waarde: "",
    toegewezenAan: TEAM[0],
    bericht: "",
  });

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function opslaan() {
    if (!form.naam.trim()) return;
    const id = addLead({
      naam: form.naam.trim(),
      email: form.email.trim(),
      telefoon: form.telefoon.trim(),
      plaats: form.plaats.trim() || undefined,
      product: form.product,
      source: form.source,
      stage: form.stage,
      waarde: Number(form.waarde) || 0,
      kans: 15,
      toegewezenAan: form.toegewezenAan,
      tags: [],
      bericht: form.bericht.trim() || undefined,
    });
    onClose();
    router.push(`/leads/${id}`);
  }

  const inputCls =
    "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500";
  const labelCls = "mb-1 block text-xs font-semibold text-slate-500";

  return (
    <Modal open={open} onClose={onClose} title="Nieuwe lead toevoegen" breed>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelCls}>Naam *</label>
          <input className={inputCls} value={form.naam} onChange={(e) => set("naam", e.target.value)} placeholder="Bijv. Familie De Vries" />
        </div>
        <div>
          <label className={labelCls}>E-mail</label>
          <input className={inputCls} value={form.email} onChange={(e) => set("email", e.target.value)} type="email" />
        </div>
        <div>
          <label className={labelCls}>Telefoon</label>
          <input className={inputCls} value={form.telefoon} onChange={(e) => set("telefoon", e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Plaats</label>
          <input className={inputCls} value={form.plaats} onChange={(e) => set("plaats", e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Geschatte waarde (€)</label>
          <input className={inputCls} value={form.waarde} onChange={(e) => set("waarde", e.target.value)} type="number" placeholder="0" />
        </div>
        <div>
          <label className={labelCls}>Product</label>
          <select className={inputCls} value={form.product} onChange={(e) => set("product", e.target.value as ProductType)}>
            {Object.entries(PRODUCT_LABEL).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>Bron</label>
          <select className={inputCls} value={form.source} onChange={(e) => set("source", e.target.value as LeadSource)}>
            {Object.entries(SOURCE_LABEL).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>Pijplijn-stap</label>
          <select className={inputCls} value={form.stage} onChange={(e) => set("stage", e.target.value as PipelineStage)}>
            {STAGE_ORDER.map((s) => (
              <option key={s} value={s}>{STAGE_META[s].label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>Toegewezen aan</label>
          <select className={inputCls} value={form.toegewezenAan} onChange={(e) => set("toegewezenAan", e.target.value)}>
            {TEAM.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>Bericht / opmerking</label>
          <textarea className={inputCls} rows={3} value={form.bericht} onChange={(e) => set("bericht", e.target.value)} />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button onClick={onClose} className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">
          Annuleren
        </button>
        <button
          onClick={opslaan}
          disabled={!form.naam.trim()}
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-40"
        >
          Lead aanmaken
        </button>
      </div>
    </Modal>
  );
}
