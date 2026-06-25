import "server-only";
import { Resend } from "resend";
import { brand } from "@repo/core";
import { prisma } from "@/lib/prisma";
import * as t from "./templates";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const sender = process.env.RESEND_SENDER_EMAIL || "onboarding@resend.dev";
const adminEmail = process.env.CONTACT_RECEIVER_EMAIL || brand.email;

export type SendResult = "success" | "failed" | "not_sent";

/** Centrale verzendfunctie: stuurt via Resend (met fallback-afzender) en logt in EmailLog. */
export async function sendEmail(to: string, content: t.EmailContent, replyTo?: string): Promise<SendResult> {
  let status: SendResult = "not_sent";
  if (resend) {
    for (const from of [sender, "onboarding@resend.dev"]) {
      try {
        const res = await resend.emails.send({ from: `${brand.shortName} <${from}>`, to, subject: content.subject, html: content.html, replyTo });
        if (res.error) throw new Error(res.error.message);
        status = "success";
        break;
      } catch {
        status = "failed";
      }
    }
  }
  await prisma.emailLog.create({ data: { to, template: content.subject, status } }).catch(() => {});
  return status;
}

// ── Getypeerde wrappers (gebruiken de pure templates) ──
export const sendLeadConfirmation = (i: Parameters<typeof t.leadConfirmation>[0] & { to: string }) =>
  sendEmail(i.to, t.leadConfirmation(i));

export const sendLeadAvailable = (i: Parameters<typeof t.leadAvailable>[0] & { to: string }) =>
  sendEmail(i.to, t.leadAvailable(i));

export const sendQuoteSent = (i: Parameters<typeof t.quoteSent>[0] & { to: string }) =>
  sendEmail(i.to, t.quoteSent(i));

export const sendQuoteAccepted = (i: Parameters<typeof t.quoteAccepted>[0] & { to: string }) =>
  sendEmail(i.to, t.quoteAccepted(i));

export const sendQuoteRejected = (i: Parameters<typeof t.quoteRejected>[0] & { to: string }) =>
  sendEmail(i.to, t.quoteRejected(i));

export const sendOnboardingApproved = (i: Parameters<typeof t.onboardingApproved>[0] & { to: string }) =>
  sendEmail(i.to, t.onboardingApproved(i));

export const sendOnboardingRejected = (i: Parameters<typeof t.onboardingRejected>[0] & { to: string }) =>
  sendEmail(i.to, t.onboardingRejected(i));

export const sendAdminNotification = (i: Parameters<typeof t.adminNotification>[0]) =>
  sendEmail(adminEmail, t.adminNotification(i));
