import { completeSubscription } from "@/actions/user";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

const getStripe = () =>
  new Stripe(
    process.env.STRIPE_SECRET_KEY ||
    process.env.STRIPE_CLIENT_SECRET ||
    "dummy_stripe_key"
  );

type Props = {
  searchParams: Promise<{
    session_id?: string;
    cancel?: boolean;
  }>;
};

export default async function PaymentPage(props: Props) {
  const { session_id, cancel } = await props.searchParams;

  // 1. Return from successful Stripe Checkout
  if (session_id) {
    const customer = await completeSubscription(session_id);
    if (customer.status === 200) {
      return redirect("/dashboard");
    }
  }

  // 2. Return from cancelled Stripe Checkout
  if (cancel) {
    return redirect("/pricing?cancelled=true");
  }

  // 3. User initiated checkout flow: verify authentication
  const user = await currentUser();
  if (!user) {
    return redirect("/auth/sign-in?redirect_url=/payment");
  }

  // 4. Generate Stripe Checkout Session and direct to Stripe
  const stripe = getStripe();
  const priceId = process.env.STRIPE_SUBSCRIPTION_PRICE_ID;
  const hostUrl =
    process.env.NEXT_PUBLIC_HOST_URL?.replace(/\/$/, "") || "https://koom-ai.vercel.app";

  try {
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

    if (session.url) {
      return redirect(session.url);
    }
  } catch (err: any) {
    console.error("[Stripe Session Error]:", err);
    return (
      <div className="flex flex-col justify-center items-center h-screen w-full bg-black text-white px-4">
        <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 text-center max-w-md">
          <h4 className="text-2xl font-bold mb-2">Stripe Checkout Initialization</h4>
          <p className="text-neutral-400 text-sm mb-4">
            {err?.message || "Could not connect with Stripe checkout session."}
          </p>
          <a
            href="/pricing"
            className="inline-block px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition"
          >
            Back to Pricing
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full bg-black text-white px-4">
      <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 text-center max-w-md">
        <h4 className="text-2xl font-bold mb-2">Redirecting to Stripe</h4>
        <p className="text-neutral-400 text-sm">Transferring to secure 256-bit encrypted checkout...</p>
      </div>
    </div>
  );
}
