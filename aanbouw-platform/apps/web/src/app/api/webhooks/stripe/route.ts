import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe, webhookSecret } from "@/lib/stripe";
import { fulfillPaymentBySession, markPaymentStatus } from "@/features/billing/server/fulfillment";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!stripe || !webhookSecret) {
    return NextResponse.json({ error: "Stripe niet geconfigureerd." }, { status: 500 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Geen signature." }, { status: 400 });

  const body = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Ongeldige signature." }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      // Credits worden PAS hier bijgeschreven (idempotent).
      await fulfillPaymentBySession(session.id, {
        eventId: event.id,
        paymentIntentId: typeof session.payment_intent === "string" ? session.payment_intent : null,
      });
      break;
    }
    case "checkout.session.expired": {
      await markPaymentStatus(event.data.object.id, "CANCELED");
      break;
    }
    case "checkout.session.async_payment_failed": {
      await markPaymentStatus(event.data.object.id, "FAILED");
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
