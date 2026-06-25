import "server-only";
import { Resend } from "resend";
import { brand } from "@repo/core";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const sender = process.env.RESEND_SENDER_EMAIL || "onboarding@resend.dev";

export type SendResult = "success" | "failed" | "not_sent";

async function send(to: string, subject: string, html: string, replyTo?: string): Promise<SendResult> {
  if (!resend) return "not_sent";
  for (const from of [sender, "onboarding@resend.dev"]) {
    try {
      const res = await resend.emails.send({
        from: `${brand.shortName} <${from}>`,
        to,
        subject,
        html,
        replyTo,
      });
      if (res.error) throw new Error(res.error.message);
      return "success";
    } catch {
      // probeer fallback-afzender
    }
  }
  return "failed";
}

/** Bevestiging naar de huiseigenaar. */
export function sendLeadConfirmation(input: {
  to: string;
  name: string;
  serviceName: string;
  city: string;
}): Promise<SendResult> {
  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px">
      <h1 style="color:#1D4ED8">Bedankt voor je aanvraag, ${input.name}!</h1>
      <p>We hebben je aanvraag voor <strong>${input.serviceName}</strong> in
      <strong>${input.city}</strong> ontvangen. Gecertificeerde vakmannen uit je
      regio nemen zo snel mogelijk contact met je op.</p>
      <p style="color:#64748b">Met vriendelijke groet,<br/>${brand.name}</p>
    </div>`;
  return send(input.to, `Je aanvraag bij ${brand.name} is ontvangen`, html);
}

/** Interne melding naar het platform (en later naar gematchte vakmannen). */
export function sendInternalLeadNotification(input: {
  serviceName: string;
  city: string;
  name: string;
  phone: string;
  email: string;
}): Promise<SendResult> {
  const to = process.env.CONTACT_RECEIVER_EMAIL || brand.email;
  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px">
      <h2>Nieuwe lead: ${input.serviceName} — ${input.city}</h2>
      <p><strong>Naam:</strong> ${input.name}<br/>
      <strong>Telefoon:</strong> ${input.phone}<br/>
      <strong>E-mail:</strong> ${input.email}</p>
    </div>`;
  return send(to, `Nieuwe lead: ${input.serviceName} (${input.city})`, html, input.email);
}

function euro(cents: number): string {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(cents / 100);
}

/** Offerte verstuurd → naar de klant, met beveiligde link. */
export function sendQuoteSentEmail(input: {
  to: string;
  customerName: string;
  companyName: string;
  quoteNumber: string;
  totalCents: number;
  url: string;
}): Promise<SendResult> {
  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px">
      <h1 style="color:#1D4ED8">Je offerte van ${input.companyName}</h1>
      <p>Beste ${input.customerName},</p>
      <p>Je hebt een offerte ontvangen (nr. <strong>${input.quoteNumber}</strong>) met een
      totaalbedrag van <strong>${euro(input.totalCents)}</strong> incl. btw.</p>
      <p><a href="${input.url}" style="display:inline-block;background:#2563EB;color:#fff;padding:12px 20px;border-radius:10px;text-decoration:none">Bekijk &amp; reageer op je offerte</a></p>
      <p style="color:#64748b;font-size:13px">Of kopieer deze link: ${input.url}</p>
    </div>`;
  return send(input.to, `Je offerte ${input.quoteNumber} van ${input.companyName}`, html);
}

/** Offerte geaccepteerd → naar de installateur (en intern). */
export function sendQuoteAcceptedEmail(input: {
  to: string;
  quoteNumber: string;
  customerName: string;
}): Promise<SendResult> {
  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px">
      <h1 style="color:#16A34A">Offerte geaccepteerd 🎉</h1>
      <p>Goed nieuws! ${input.customerName} heeft offerte <strong>${input.quoteNumber}</strong> geaccepteerd.</p>
      <p>Neem contact op met de klant om de klus in te plannen.</p>
    </div>`;
  return send(input.to, `Offerte ${input.quoteNumber} geaccepteerd`, html);
}

/** Offerte afgewezen → naar de installateur (optioneel). */
export function sendQuoteRejectedEmail(input: {
  to: string;
  quoteNumber: string;
  customerName: string;
}): Promise<SendResult> {
  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px">
      <h1>Offerte afgewezen</h1>
      <p>${input.customerName} heeft offerte <strong>${input.quoteNumber}</strong> afgewezen.</p>
    </div>`;
  return send(input.to, `Offerte ${input.quoteNumber} afgewezen`, html);
}
