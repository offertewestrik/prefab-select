"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { siteUrl } from "@repo/seo";
import { brand } from "@repo/core";
import { requireRole, getCurrentCompany } from "@/lib/guards";
import { getPackage } from "./packages";
import { adjustCredits } from "./adjust";

export type CheckoutState = { url?: string; error?: string };

/** Start een Stripe Checkout voor een credit-pakket (alleen INSTALLER). */
export async function startCheckoutAction(_prev: CheckoutState, formData: FormData): Promise<CheckoutState> {
  await requireRole("INSTALLER");
  const company = await getCurrentCompany();
  if (!company) return { error: "Je account is niet aan een bedrijf gekoppeld." };

  if (!stripe) return { error: "Betalen is nog niet geconfigureerd (Stripe-sleutel ontbreekt)." };

  const packageId = String(formData.get("packageId") ?? "");
  const pkg = await getPackage(packageId);
  if (!pkg || !pkg.active) return { error: "Ongeldig pakket." };

  // Prijs & credits komen ALTIJD uit de database, nooit van de client.
  const payment = await prisma.payment.create({
    data: { companyId: company.id, packageId: pkg.id, credits: pkg.credits, amountCents: pkg.priceCents, currency: pkg.currency, status: "PENDING" },
  });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: pkg.currency,
          unit_amount: pkg.priceCents,
          product_data: { name: `${pkg.credits} credits — ${pkg.name}`, description: `${brand.name} credits` },
        },
      },
    ],
    success_url: siteUrl(`/dashboard/credits/success?session_id={CHECKOUT_SESSION_ID}`),
    cancel_url: siteUrl(`/dashboard/credits/cancel`),
    client_reference_id: payment.id,
    metadata: { paymentId: payment.id, companyId: company.id },
  });

  await prisma.payment.update({ where: { id: payment.id }, data: { stripeSessionId: session.id } });
  return { url: session.url ?? undefined };
}

export type AdjustState = { ok?: boolean; message?: string };

/** Handmatige credit-correctie (alleen ADMIN). */
export async function adminAdjustAction(_prev: AdjustState, formData: FormData): Promise<AdjustState> {
  await requireRole("ADMIN");
  const companyId = String(formData.get("companyId") ?? "");
  const amount = Number(formData.get("amount"));
  const reason = String(formData.get("reason") ?? "");
  if (!companyId || !Number.isFinite(amount)) return { ok: false, message: "Vul een bedrijf en geldig aantal in." };

  const result = await adjustCredits(companyId, Math.trunc(amount), reason);
  revalidatePath("/admin/payments");
  revalidatePath("/admin/installers");
  revalidatePath(`/admin/installers/${companyId}`);
  return result.ok
    ? { ok: true, message: `Saldo bijgewerkt naar ${result.balanceAfter} credits.` }
    : { ok: false, message: "Correctie mislukt." };
}
