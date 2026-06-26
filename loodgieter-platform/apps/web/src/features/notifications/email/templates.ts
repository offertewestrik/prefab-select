// Pure e-mailtemplate-builders: geven { subject, html } terug. Geen I/O, geen
// Resend — daardoor goed te unit-testen (o.a. dat installateur-mails GEEN PII
// bevatten vóór aankoop). Verzenden gebeurt in send.ts.

import { brand } from "@repo/core";

export interface EmailContent {
  subject: string;
  html: string;
}

function layout(opts: { heading: string; bodyHtml: string; cta?: { label: string; url: string } }): string {
  const cta = opts.cta
    ? `<p style="margin:24px 0"><a href="${opts.cta.url}" style="display:inline-block;background:#2563EB;color:#fff;padding:12px 22px;border-radius:10px;text-decoration:none;font-weight:600">${opts.cta.label}</a></p>`
    : "";
  return `
  <div style="font-family:system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto;color:#0F172A">
    <div style="padding:20px 0;font-weight:700;font-size:18px;color:#1D4ED8">${brand.name}</div>
    <div style="border:1px solid #E2E8F0;border-radius:14px;padding:28px">
      <h1 style="font-size:22px;margin:0 0 12px">${opts.heading}</h1>
      ${opts.bodyHtml}
      ${cta}
    </div>
    <p style="color:#64748B;font-size:12px;margin-top:20px">${brand.name} · ${brand.email}</p>
  </div>`;
}

const p = (t: string) => `<p style="margin:0 0 12px;line-height:1.6">${t}</p>`;
const muted = (t: string) => `<p style="margin:0 0 8px;color:#64748B;font-size:13px">${t}</p>`;

// 1. Klant — aanvraag ontvangen
export function leadConfirmation(input: {
  customerName: string;
  serviceName: string;
  city: string;
  priceText?: string;
  accountUrl?: string;
}): EmailContent {
  return {
    subject: `Je aanvraag bij ${brand.name} is ontvangen`,
    html: layout({
      heading: `Bedankt voor je aanvraag, ${input.customerName}!`,
      bodyHtml:
        p(`We hebben je aanvraag voor <strong>${input.serviceName}</strong> in <strong>${input.city}</strong> ontvangen.`) +
        (input.priceText ? p(`Indicatie: <strong>${input.priceText}</strong>. De definitieve prijs volgt in de offerte(s).`) : "") +
        p("Gecertificeerde vakmannen uit jouw regio nemen zo snel mogelijk contact met je op. Je ontvangt hun offertes per e-mail."),
      cta: input.accountUrl ? { label: "Bekijk je aanvraag", url: input.accountUrl } : undefined,
    }),
  };
}

// 2. Installateur — nieuwe lead beschikbaar (GEEN PII)
export function leadAvailable(input: {
  serviceName: string;
  city: string;
  urgencyLabel: string;
  leadUrl: string;
}): EmailContent {
  return {
    subject: `Nieuwe lead: ${input.serviceName} in ${input.city}`,
    html: layout({
      heading: "Er is een nieuwe lead beschikbaar",
      bodyHtml:
        p(`<strong>Dienst:</strong> ${input.serviceName}`) +
        p(`<strong>Regio:</strong> ${input.city}`) +
        p(`<strong>Urgentie:</strong> ${input.urgencyLabel}`) +
        muted("De klantgegevens worden vrijgegeven zodra je de lead koopt."),
      cta: { label: "Bekijk lead", url: input.leadUrl },
    }),
  };
}

// 3. Klant — offerte ontvangen
export function quoteSent(input: {
  companyName: string;
  quoteNumber: string;
  totalText: string;
  validUntil?: string;
  url: string;
}): EmailContent {
  return {
    subject: `Je offerte ${input.quoteNumber} van ${input.companyName}`,
    html: layout({
      heading: `Je offerte van ${input.companyName}`,
      bodyHtml:
        p(`Je hebt offerte <strong>${input.quoteNumber}</strong> ontvangen.`) +
        p(`Totaalbedrag: <strong>${input.totalText}</strong> incl. btw.`) +
        (input.validUntil ? muted(`Geldig tot ${input.validUntil}`) : ""),
      cta: { label: "Bekijk & reageer op je offerte", url: input.url },
    }),
  };
}

// 4. Installateur — offerte geaccepteerd (met klantgegevens, want eigen klant)
export function quoteAccepted(input: {
  quoteNumber: string;
  customerName: string;
  customerContact: string;
  totalText: string;
  dashboardUrl: string;
}): EmailContent {
  return {
    subject: `Offerte ${input.quoteNumber} geaccepteerd 🎉`,
    html: layout({
      heading: "Je offerte is geaccepteerd!",
      bodyHtml:
        p(`<strong>${input.customerName}</strong> heeft offerte <strong>${input.quoteNumber}</strong> (${input.totalText}) geaccepteerd.`) +
        p(`Contact: ${input.customerContact}`) +
        p("Neem contact op om de klus in te plannen."),
      cta: { label: "Naar mijn dashboard", url: input.dashboardUrl },
    }),
  };
}

// 5. Installateur — offerte afgewezen
export function quoteRejected(input: { quoteNumber: string; customerName: string }): EmailContent {
  return {
    subject: `Offerte ${input.quoteNumber} afgewezen`,
    html: layout({
      heading: "Offerte afgewezen",
      bodyHtml: p(`${input.customerName} heeft offerte <strong>${input.quoteNumber}</strong> afgewezen.`),
    }),
  };
}

// 6. Vakman — onboarding goedgekeurd
export function onboardingApproved(input: { companyName: string; creditsUrl: string }): EmailContent {
  return {
    subject: `${input.companyName} is goedgekeurd op ${brand.name}`,
    html: layout({
      heading: "Je profiel is goedgekeurd! 🎉",
      bodyHtml:
        p(`Gefeliciteerd, <strong>${input.companyName}</strong> is goedgekeurd. Je ontvangt nu leads uit je werkgebied.`) +
        p("Zo werkt het: je ziet nieuwe leads in je dashboard, koopt ze met credits, en krijgt daarna de klantgegevens om een offerte te maken."),
      cta: { label: "Waardeer je credits op", url: input.creditsUrl },
    }),
  };
}

// 7. Vakman — onboarding afgewezen
export function onboardingRejected(input: { companyName: string; reason?: string; profileUrl: string }): EmailContent {
  return {
    subject: `Update over je aanmelding bij ${brand.name}`,
    html: layout({
      heading: "Je aanmelding is (nog) niet goedgekeurd",
      bodyHtml:
        p(`Helaas kunnen we <strong>${input.companyName}</strong> nog niet goedkeuren.`) +
        (input.reason ? p(`Reden: ${input.reason}`) : "") +
        p("Pas je gegevens aan en dien opnieuw in, of neem contact met ons op."),
      cta: { label: "Profiel aanpassen", url: input.profileUrl },
    }),
  };
}

// Review — uitnodiging (na geaccepteerde offerte) of bedankje (na indienen)
export function reviewThanks(input: { companyName: string; url: string; kind: "invite" | "thanks" }): EmailContent {
  if (input.kind === "invite") {
    return {
      subject: `Hoe was je ervaring met ${input.companyName}?`,
      html: layout({
        heading: "Deel je ervaring",
        bodyHtml: p(`Je hebt de offerte van <strong>${input.companyName}</strong> geaccepteerd. We horen graag hoe het ging — je review helpt andere klanten.`),
        cta: { label: "Laat een review achter", url: input.url },
      }),
    };
  }
  return {
    subject: "Bedankt voor je review!",
    html: layout({
      heading: "Bedankt voor je review",
      bodyHtml: p("We hebben je review ontvangen. Na een korte controle plaatsen we 'm op het profiel van de vakman."),
    }),
  };
}

// 8. Admin — interne meldingen
export function adminNotification(input: { title: string; lines: string[]; url: string }): EmailContent {
  return {
    subject: `[Admin] ${input.title}`,
    html: layout({
      heading: input.title,
      bodyHtml: input.lines.map(p).join(""),
      cta: { label: "Bekijk in admin", url: input.url },
    }),
  };
}
