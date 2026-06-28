"use client";

import { useEffect, useState } from "react";
import { useMounted } from "@/lib/use-mounted";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { datumTijd } from "@/lib/format";
import { Instagram, Facebook, Linkedin, Music2, Send, Image as ImageIcon, Settings, Clock } from "lucide-react";
import type { SocialPost } from "@/lib/types";

const PLATFORMS = [
  { id: "instagram", label: "Instagram", icon: Instagram, kleur: "border-pink-300 bg-pink-50 text-pink-700" },
  { id: "facebook", label: "Facebook", icon: Facebook, kleur: "border-blue-300 bg-blue-50 text-blue-700" },
  { id: "tiktok", label: "TikTok", icon: Music2, kleur: "border-slate-300 bg-slate-900 text-white" },
  { id: "linkedin", label: "LinkedIn", icon: Linkedin, kleur: "border-sky-300 bg-sky-50 text-sky-700" },
] as const;

const STATUS_KLEUR: Record<string, string> = {
  verzonden: "bg-emerald-100 text-emerald-700",
  gepland: "bg-amber-100 text-amber-700",
  mislukt: "bg-rose-100 text-rose-700",
};

export default function SocialPage() {
  const mounted = useMounted();
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [tekst, setTekst] = useState("");
  const [afbeelding, setAfbeelding] = useState("");
  const [gekozen, setGekozen] = useState<string[]>(["instagram", "facebook"]);
  const [geplandOp, setGeplandOp] = useState("");
  const [bezig, setBezig] = useState(false);
  const [melding, setMelding] = useState<string | null>(null);
  const [instellingenOpen, setInstellingenOpen] = useState(false);

  async function laad() {
    const r = await fetch("/api/social", { cache: "no-store" });
    const d = await r.json();
    setPosts(d.posts ?? []);
    setWebhookUrl(d.webhookUrl ?? "");
  }
  useEffect(() => {
    laad();
  }, []);

  function toggle(id: string) {
    setGekozen((g) => (g.includes(id) ? g.filter((x) => x !== id) : [...g, id]));
  }

  async function plaats() {
    setBezig(true);
    setMelding(null);
    const res = await fetch("/api/social/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tekst, afbeelding: afbeelding || undefined, platforms: gekozen, geplandOp: geplandOp || undefined }),
    });
    const d = await res.json();
    setBezig(false);
    if (d.ok) {
      setMelding(geplandOp ? "Post ingepland! ✅" : "Post verzonden naar je platforms! 🎉");
      setTekst(""); setAfbeelding(""); setGeplandOp("");
      laad();
    } else {
      setMelding(d.error ?? "Plaatsen mislukt.");
    }
  }

  async function bewaarWebhook() {
    await fetch("/api/social/settings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ webhookUrl }) });
    setMelding("Make-webhook opgeslagen. ✅");
    setInstellingenOpen(false);
  }

  if (!mounted) return <div className="h-96 animate-pulse rounded-2xl bg-slate-100" />;

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        titel="Social media"
        subtitel="Plaats in één keer op Instagram, Facebook, TikTok en LinkedIn"
        actie={
          <button onClick={() => setInstellingenOpen((o) => !o)} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">
            <Settings className="h-4 w-4" /> Instellingen
          </button>
        }
      />

      {melding && <div className="mb-4 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-800">{melding}</div>}

      {(instellingenOpen || !webhookUrl) && (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50/60 p-5">
          <h3 className="mb-1 font-bold text-slate-900">Make-koppeling</h3>
          <p className="mb-3 text-sm text-slate-600">
            Plak hier de <strong>webhook-URL</strong> van je Make-scenario (een Custom webhook → modules voor Instagram, Facebook, TikTok en LinkedIn). Daar koppel je je accounts.
          </p>
          <div className="flex flex-wrap gap-2">
            <input value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} placeholder="https://hook.eu1.make.com/..." className="flex-1 min-w-[240px] rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500" />
            <button onClick={bewaarWebhook} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">Opslaan</button>
          </div>
        </div>
      )}

      {/* Composer */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
        <textarea
          value={tekst}
          onChange={(e) => setTekst(e.target.value)}
          rows={5}
          placeholder="Wat wil je delen? Schrijf je bericht…"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-500"
        />

        <div className="mt-3 flex items-center gap-2">
          <ImageIcon className="h-4 w-4 text-slate-400" />
          <input value={afbeelding} onChange={(e) => setAfbeelding(e.target.value)} placeholder="Afbeelding-URL (optioneel)" className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500" />
        </div>

        <p className="mt-5 mb-2 text-xs font-semibold uppercase text-slate-400">Plaats op</p>
        <div className="flex flex-wrap gap-2">
          {PLATFORMS.map((p) => {
            const aan = gekozen.includes(p.id);
            const Icon = p.icon;
            return (
              <button key={p.id} onClick={() => toggle(p.id)} className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-semibold transition ${aan ? p.kleur : "border-slate-200 bg-white text-slate-400"}`}>
                <Icon className="h-4 w-4" /> {p.label}
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex flex-wrap items-end justify-between gap-3 border-t border-slate-100 pt-4">
          <div>
            <label className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-slate-500"><Clock className="h-3.5 w-3.5" /> Inplannen (optioneel)</label>
            <input type="datetime-local" value={geplandOp} onChange={(e) => setGeplandOp(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500" />
          </div>
          <button
            onClick={plaats}
            disabled={bezig || !tekst.trim() || gekozen.length === 0}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-40"
          >
            <Send className="h-4 w-4" /> {bezig ? "Bezig…" : geplandOp ? "Inplannen" : "Nu plaatsen"}
          </button>
        </div>
      </div>

      {/* Historie */}
      <h2 className="mb-3 mt-8 text-sm font-bold text-slate-900">Recente posts</h2>
      <div className="space-y-2">
        {posts.map((post) => (
          <div key={post.id} className="rounded-xl border border-slate-100 bg-white p-4 shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <p className="flex-1 whitespace-pre-wrap text-sm text-slate-700">{post.tekst}</p>
              <Badge className={STATUS_KLEUR[post.status] ?? "bg-slate-100 text-slate-600"}>{post.status}</Badge>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {post.platforms.map((pl) => (
                <span key={pl} className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">{pl}</span>
              ))}
              <span className="ml-auto text-[11px] text-slate-400">{post.geplandOp ? `Gepland: ${datumTijd(post.geplandOp)}` : datumTijd(post.aangemaaktOp)}</span>
            </div>
          </div>
        ))}
        {posts.length === 0 && <p className="text-sm text-slate-400">Nog geen posts geplaatst.</p>}
      </div>
    </div>
  );
}
