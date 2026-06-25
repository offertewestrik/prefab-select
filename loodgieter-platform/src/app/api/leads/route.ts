import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getDb, LEADS_COLLECTION, admin } from "@/lib/firebaseAdmin";
import {
  validateLead,
  jobTypeLabel,
  urgencyLabels,
  daypartLabels,
  type LeadInput,
} from "@/lib/leads";
import { brand } from "@/lib/brand";

export const runtime = "nodejs";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

function row(label: string, value?: string) {
  return `<tr>
    <td style="padding:8px 10px;border:1px solid #e2e8f0;font-weight:600;width:200px;background:#f8fafc;">${label}</td>
    <td style="padding:8px 10px;border:1px solid #e2e8f0;">${value || "—"}</td>
  </tr>`;
}

function buildEmailHtml(lead: LeadInput) {
  return `
    <div style="font-family:system-ui,sans-serif;max-width:640px;margin:0 auto;">
      <h1 style="color:#0369a1;">Nieuwe aanvraag via ${brand.name}</h1>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        ${row("Soort werk", jobTypeLabel(lead.jobType))}
        ${row("Urgentie", urgencyLabels[lead.urgency])}
        ${row("Voorkeursdatum", lead.preferredDate)}
        ${row("Dagdeel", daypartLabels[lead.preferredDaypart])}
        ${row("Naam", lead.name)}
        ${row("Telefoon", lead.phone)}
        ${row("E-mail", lead.email)}
        ${row("Adres", [lead.street, `${lead.postcode} ${lead.city}`].filter(Boolean).join(", "))}
      </table>
      <h3 style="margin-top:20px;">Omschrijving</h3>
      <p style="white-space:pre-wrap;background:#f8fafc;border:1px solid #e2e8f0;padding:12px;border-radius:8px;">${
        lead.description || "Geen omschrijving achtergelaten."
      }</p>
      <hr style="margin:24px 0;border:none;border-top:1px solid #e2e8f0;" />
      <p style="color:#64748b;font-size:13px;">Deze aanvraag staat ook in jullie dashboard, klaar om in te plannen.</p>
    </div>`;
}

async function sendNotification(lead: LeadInput): Promise<"success" | "failed" | "not_sent"> {
  if (!resend) return "not_sent";
  const to = process.env.CONTACT_RECEIVER_EMAIL || brand.email;
  const subject = `Nieuwe aanvraag: ${jobTypeLabel(lead.jobType)} — ${lead.name} (${lead.city})`;
  const html = buildEmailHtml(lead);
  const primary = process.env.RESEND_SENDER_EMAIL || "onboarding@resend.dev";

  for (const from of [primary, "onboarding@resend.dev"]) {
    try {
      const res = await resend.emails.send({
        from: `${brand.shortName} <${from}>`,
        to,
        replyTo: lead.email,
        subject,
        html,
      });
      if (res.error) throw new Error(res.error.message);
      return "success";
    } catch (err) {
      console.warn(`[resend] afzender ${from} mislukt:`, (err as Error).message);
    }
  }
  return "failed";
}

async function forwardToWebhook(payload: unknown) {
  const url = process.env.MAKE_WEBHOOK_URL?.trim();
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("[webhook] doorzetten mislukt:", (err as Error).message);
  }
}

export async function POST(req: Request) {
  let body: Partial<LeadInput>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige aanvraag." }, { status: 400 });
  }

  const error = validateLead(body);
  if (error) return NextResponse.json({ error }, { status: 400 });

  const lead = body as LeadInput;

  // 1. E-mailmelding
  const emailDeliveryStatus = await sendNotification(lead);

  // 2. Opslaan in Firestore (bron van waarheid)
  const db = getDb();
  let id: string | null = null;
  if (db) {
    try {
      const ref = db.collection(LEADS_COLLECTION).doc();
      id = ref.id;
      await ref.set({
        ...lead,
        status: "nieuw",
        emailDeliveryStatus,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    } catch (err) {
      console.error("[firestore] opslaan mislukt:", (err as Error).message);
    }
  }

  // 3. Optioneel doorzetten naar Make.com (op de achtergrond)
  void forwardToWebhook({
    id,
    ...lead,
    source: brand.name,
    submittedAt: new Date().toISOString(),
  });

  if (emailDeliveryStatus === "failed" && !id) {
    return NextResponse.json(
      { error: "We konden je aanvraag nu niet verwerken. Bel ons gerust even." },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true, id });
}
