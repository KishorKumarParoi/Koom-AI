import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

const getStripe = () =>
  new Stripe(
    process.env.STRIPE_SECRET_KEY ||
    process.env.STRIPE_CLIENT_SECRET ||
    "dummy_stripe_key"
  );

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ status: 401, error: "Unauthorized" }, { status: 401 });
    }

    const priceId = process.env.STRIPE_SUBSCRIPTION_PRICE_ID;
    const stripe = getStripe();
    const hostUrl =
      process.env.NEXT_PUBLIC_HOST_URL?.replace(/\/$/, "") || "https://koom-ai.vercel.app";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${hostUrl}/payment?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${hostUrl}/pricing?cancel=true`,
      customer_email: user.emailAddresses[0]?.emailAddress,
    });

    if (session && session.url) {
      return NextResponse.json({
        status: 200,
        session_url: session.url,
        customer_id: session.customer,
      });
    }

    return NextResponse.json({ status: 400, error: "Unable to create Stripe checkout session" }, { status: 400 });
  } catch (error: any) {
    console.error("[Stripe API Error]:", error);
    return NextResponse.json(
      { status: 500, error: error?.message || "Internal Stripe Error" },
      { status: 500 }
    );
  }
}
