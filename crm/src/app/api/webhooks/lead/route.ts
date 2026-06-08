import { createLead } from "@/lib/data/leads-repo";
import { createQuote } from "@/lib/data/quotes-repo";
import { isSupabaseAdminConfigured } from "@/lib/supabase/server";
import { PRODUCT_LABEL } from "@/lib/constants";
import type { LeadSource, ProductType } from "@/lib/types";

// ----------------------------------------------------------------------------
// Inbound webhook voor Make (website-formulier + configurator).
// Maakt van een binnenkomende aanvraag automatisch een lead in het CRM.
//
// POST /api/webhooks/lead
// Body (alle velden optioneel, meerdere namen worden herkend):
//   naam | name | (firstName + lastName)
//   email, telefoon | phone, plaats | city, postcode, adres | address
//   product, waarde | prijs | price, bericht | message, bron | source, tags
//
// Beveiliging (optioneel): zet LEAD_WEBHOOK_SECRET als env. Stuur die mee als
//   header "x-webhook-secret" of queryparameter ?secret=...  Is de env niet
//   gezet, dan is het endpoint open (zet de secret aan zodra het werkt).
// ----------------------------------------------------------------------------
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function str(v: unknown): string | undefined {
  if (typeof v === "string" && v.trim()) return v.trim();
  if (typeof v === "number") return String(v);
  return undefined;
}

/** Probeer een binnenkomende productwaarde te koppelen aan een ProductType. */
function mapProduct(raw?: string): ProductType {
  if (!raw) return "overig";
  const norm = raw.toLowerCase().trim();
  const keys = Object.keys(PRODUCT_LABEL) as ProductType[];
  const directeSleutel = keys.find((k) => k === norm || k.replace(/_/g, " ") === norm);
  if (directeSleutel) return directeSleutel;
  const viaLabel = keys.find((k) => PRODUCT_LABEL[k].toLowerCase() === norm);
  if (viaLabel) return viaLabel;
  const bevat = keys.find((k) => norm.includes(k.replace(/_/g, " ")) || norm.includes(PRODUCT_LABEL[k].toLowerCase()));
  return bevat ?? "overig";
}

function mapSource(raw?: string): LeadSource {
  const geldig: LeadSource[] = [
    "website_formulier", "configurator", "meta_ads", "google_ads", "telefoon", "handmatig", "referral",
  ];
  const norm = (raw ?? "").toLowerCase().trim();
  if (geldig.includes(norm as LeadSource)) return norm as LeadSource;
  if (norm.includes("configurator")) return "configurator";
  if (norm.includes("website") || norm.includes("formulier") || norm.includes("form")) return "website_formulier";
  return "website_formulier";
}

export async function POST(req: Request) {
  // Optionele beveiliging
  const secret = process.env.LEAD_WEBHOOK_SECRET;
  if (secret) {
    const url = new URL(req.url);
    const aangeleverd = req.headers.get("x-webhook-secret") ?? url.searchParams.get("secret");
    if (aangeleverd !== secret) {
      return Response.json({ ok: false, error: "Ongeldige of ontbrekende secret" }, { status: 401 });
    }
  }

  if (!isSupabaseAdminConfigured()) {
    return Response.json({ ok: false, error: "Supabase niet geconfigureerd" }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Ongeldige JSON" }, { status: 400 });
  }

  const samengesteld = [str(body.firstName), str(body.lastName)].filter(Boolean).join(" ");
  const naam = str(body.naam) ?? str(body.name) ?? (samengesteld || undefined);

  if (!naam) {
    return Response.json({ ok: false, error: "Veld 'naam' (of name / firstName+lastName) is verplicht" }, { status: 400 });
  }

  // Configurator-details netjes meenemen in het bericht.
  const losseDetails = [
    str(body.afmetingen) && `Afmetingen: ${str(body.afmetingen)}`,
    str(body.configuratie) && `Configuratie: ${str(body.configuratie)}`,
  ].filter(Boolean);
  const bericht =
    [str(body.bericht) ?? str(body.message) ?? str(body.opmerking), ...losseDetails]
      .filter(Boolean)
      .join("\n") || undefined;

  const tagsRaw = body.tags;
  const tags = Array.isArray(tagsRaw)
    ? tagsRaw.map((t) => String(t))
    : str(tagsRaw)
      ? [str(tagsRaw)!]
      : [];

  try {
    const lead = await createLead({
      naam,
      email: str(body.email) ?? "",
      telefoon: str(body.telefoon) ?? str(body.phone) ?? str(body.telefoonnummer) ?? "",
      plaats: str(body.plaats) ?? str(body.city) ?? str(body.woonplaats),
      postcode: str(body.postcode) ?? str(body.zip),
      adres: str(body.adres) ?? str(body.address) ?? str(body.straat),
      product: mapProduct(str(body.product) ?? str(body.producttype)),
      source: mapSource(str(body.source) ?? str(body.bron)),
      stage: "nieuwe_lead",
      waarde: Number(str(body.waarde) ?? str(body.prijs) ?? str(body.price) ?? 0) || 0,
      kans: 15,
      toegewezenAan: str(body.toegewezenAan) ?? "",
      tags,
      bericht,
    });

    // Optioneel: automatisch een concept-offerte maken van de aangeleverde regels.
    let quoteId: string | undefined;
    const regelsRaw = body.offerteRegels ?? body.regels;
    if (Array.isArray(regelsRaw) && regelsRaw.length) {
      const inclBtw = body.btwInclusief !== false; // configurator rekent meestal incl. btw
      const regels = regelsRaw
        .map((r: any) => {
          const omschrijving = str(r?.omschrijving) ?? str(r?.naam) ?? str(r?.label);
          if (!omschrijving) return null;
          const prijs = Number(r?.prijs ?? r?.bedrag ?? r?.price ?? 0) || 0;
          const prijsPerStuk = inclBtw ? Math.round(prijs / 1.21) : Math.round(prijs);
          return {
            id: crypto.randomUUID(),
            omschrijving,
            aantal: Number(r?.aantal ?? 1) || 1,
            eenheid: str(r?.eenheid) ?? "post",
            prijsPerStuk,
            btwPercentage: 21,
          };
        })
        .filter(Boolean) as any[];

      if (regels.length) {
        try {
          const geldig = new Date();
          geldig.setDate(geldig.getDate() + 30);
          const quote = await createQuote({
            leadId: lead.id,
            projecttype: mapProduct(str(body.product) ?? str(body.producttype)),
            projectomschrijving: "Aanvraag via configurator",
            afmetingen: str(body.afmetingen),
            regels,
            korting: 0,
            notitie: bericht,
            geldigTot: geldig.toISOString(),
          });
          quoteId = quote.id;
        } catch (e) {
          console.error("Automatische offerte aanmaken mislukt:", e);
        }
      }
    }

    return Response.json({ ok: true, id: lead.id, quoteId }, { status: 201 });
  } catch (err) {
    console.error("Webhook-lead aanmaken mislukt:", err);
    return Response.json({ ok: false, error: (err as Error).message }, { status: 500 });
  }
}

// Handige GET om te testen of het endpoint live is.
export async function GET() {
  return Response.json({ ok: true, info: "Lead-webhook actief. Gebruik POST om een lead aan te maken." });
}
