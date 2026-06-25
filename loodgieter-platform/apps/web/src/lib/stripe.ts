import "server-only";
import Stripe from "stripe";

// Stripe-client. Optioneel: zonder key is `stripe` null, zodat de app blijft
// werken (de credits-pagina toont dan dat betalen nog niet is geconfigureerd).
export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2025-02-24.acacia" as Stripe.LatestApiVersion })
  : null;

export const stripeEnabled = !!stripe;
export const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? "";
