import client from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Production Stripe Client Initialization
const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY ||
  process.env.STRIPE_CLIENT_SECRET ||
  "dummy_stripe_key"
);

// Idempotency cache to prevent duplicate processing from webhook replays
const processedEventIds = new Set<string>();

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (webhookSecret && signature) {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } else {
      // Development / Fallback parsing when webhook secret is not configured
      event = JSON.parse(body) as Stripe.Event;
    }
  } catch (err: any) {
    console.error("❌ [Stripe Webhook Error] Invalid signature:", err.message);
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${err.message}` },
      { status: 400 }
    );
  }

  // Idempotency check: Guard against duplicate event execution
  if (processedEventIds.has(event.id)) {
    console.log(`⚠️ [Stripe Webhook] Event ${event.id} already processed. Skipping (Idempotency ACK).`);
    return NextResponse.json({ received: true, idempotent_duplicate: true });
  }

  processedEventIds.add(event.id);
  // Cap idempotency set size
  if (processedEventIds.size > 2000) {
    const oldestKey = processedEventIds.values().next().value;
    if (oldestKey) processedEventIds.delete(oldestKey);
  }

  console.log(`🔔 [Stripe Webhook] Handling event: ${event.type} (${event.id})`);

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const customerId = session.customer as string;
        const clientReferenceId = session.client_reference_id; // Clerk user ID or DB User ID
        const customerEmail = session.customer_details?.email;

        console.log(`[Stripe Webhook] Checkout completed for Customer: ${customerId}, Email: ${customerEmail}`);

        if (clientReferenceId) {
          await client.user.updateMany({
            where: {
              OR: [
                { clerkid: clientReferenceId },
                { email: customerEmail || "" },
              ],
            },
            data: {
              trial: false,
            },
          });

          // Update subscription to PRO
          const user = await client.user.findFirst({
            where: {
              OR: [
                { clerkid: clientReferenceId },
                { email: customerEmail || "" },
              ],
            },
            include: { subscription: true },
          });

          if (user) {
            await client.subscription.upsert({
              where: { userId: user.id },
              create: {
                userId: user.id,
                plan: "PRO",
                customerId,
              },
              update: {
                plan: "PRO",
                customerId,
                updatedAt: new Date(),
              },
            });
            console.log(`✅ [Stripe Webhook] User ${user.email} upgraded to PRO plan.`);
          }
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        const status = subscription.status;

        const isPro = status === "active" || status === "trialing";

        await client.subscription.updateMany({
          where: { customerId },
          data: {
            plan: isPro ? "PRO" : "FREE",
            updatedAt: new Date(),
          },
        });
        console.log(`✅ [Stripe Webhook] Subscription updated for customer ${customerId}: Plan ${isPro ? "PRO" : "FREE"}`);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        await client.subscription.updateMany({
          where: { customerId },
          data: {
            plan: "FREE",
            updatedAt: new Date(),
          },
        });
        console.log(`✅ [Stripe Webhook] Subscription canceled for customer ${customerId}. Reverted to FREE plan.`);
        break;
      }

      default:
        console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({
      received: true,
      eventId: event.id,
      type: event.type,
      status: "SUCCESS",
    });
  } catch (error: any) {
    console.error("❌ [Stripe Webhook Processing Error]:", error);
    return NextResponse.json(
      { error: "Webhook handler failed", details: error.message },
      { status: 500 }
    );
  }
}
