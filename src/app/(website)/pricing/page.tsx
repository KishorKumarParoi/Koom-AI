import { Button } from "@/components/ui/button";
import { Check, Sparkles, Zap, Shield, HelpCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Pricing Plans — KoomAI",
  description: "Simple, transparent pricing for creators, teams, and high-scale enterprises. Start free today.",
};

const pricingTiers = [
  {
    name: "Free Starter",
    price: "$0",
    frequency: "forever free",
    description: "Essential async screen recording and sharing for individuals and quick updates.",
    badge: null,
    highlighted: false,
    cta: "Get Started Free",
    ctaLink: "/auth/sign-up",
    features: [
      "Up to 25 videos (5-min recording limit)",
      "720p HD Video Resolution",
      "Sub-120ms WebRTC Instant Sharing",
      "Chrome Extension & Desktop Studio Access",
      "Basic Workspace Collaboration",
      "Community Support",
    ],
  },
  {
    name: "Pro Creator",
    price: "$29",
    frequency: "per user / month",
    description: "Unlimited 4K recording, automated Whisper AI speech-to-text, and team workspaces.",
    badge: "Most Popular",
    highlighted: true,
    cta: "Upgrade to Pro",
    ctaLink: "/payment",
    features: [
      "Unlimited videos with no recording limits",
      "Crystal Clear 4K 60 FPS Video & Audio",
      "Automated OpenAI Whisper Speech Transcription",
      "AI Executive Summaries & Action Items",
      "AWS CloudFront Global CDN Acceleration",
      "Custom Branding & Video Call-to-Actions",
      "Advanced Video Analytics & Viewer Telemetry",
      "Priority 24/7 Support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    frequency: "tailored SLA & volume",
    description: "Dedicated cloud infrastructure, custom AI fine-tuning, and enterprise-grade compliance.",
    badge: "Scale",
    highlighted: false,
    cta: "Contact Enterprise",
    ctaLink: "/contact",
    features: [
      "Dedicated Private VPC & Multi-Region Clusters",
      "SSO & SAML 2.0 (Okta, Azure AD, Google Workspace)",
      "SOC 2 Type II, HIPAA & GDPR Compliance",
      "Custom Fine-Tuned Whisper AI Models",
      "Unlimited Workspace Members & Shared Folders",
      "Granular RBAC, Audit Logging & KMS Encryption",
      "Dedicated Technical Account Manager",
      "99.99% Uptime SLA Guarantee",
    ],
  },
];

const faqs = [
  {
    q: "Can I use KoomAI for free without entering credit card details?",
    a: "Yes! The Free Starter plan gives you immediate access to screen and camera recording, sub-120ms WebRTC sharing, and our browser extension without any payment details required.",
  },
  {
    q: "How does the OpenAI Whisper AI transcription work?",
    a: "Once your video recording completes, our real-time media ingestion pipeline automatically processes the audio track and generates accurate, speaker-attributed transcripts and executive summaries in seconds.",
  },
  {
    q: "Can I record using both the Desktop Studio and Chrome Extension?",
    a: "All KoomAI plans include access to both our Electron 30 Desktop Studio (featuring hardware acceleration) and our Manifest V3 Chrome Extension.",
  },
  {
    q: "Can I cancel or switch my plan at any time?",
    a: "You can easily upgrade, downgrade, or cancel your subscription at any time directly through your billing portal in the KoomAI Dashboard.",
  },
];

export default function PricingPage() {
  return (
    <div className="py-12 md:py-20 px-4 max-w-7xl mx-auto flex flex-col items-center">
      {/* Header */}
      <div className="text-center max-w-3xl mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs sm:text-sm font-semibold mb-6 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>Transparent &amp; Predictable Pricing</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
          Choose the plan that{" "}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
            accelerates your team
          </span>
        </h1>
        <p className="mt-5 text-base sm:text-lg text-neutral-300 leading-relaxed">
          From independent creators to global engineering teams, KoomAI provides high-throughput, low-latency async video intelligence at scale.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
        {pricingTiers.map((tier) => (
          <div
            key={tier.name}
            className={`relative flex flex-col justify-between p-8 rounded-3xl backdrop-blur-md transition-all duration-300 ${
              tier.highlighted
                ? "bg-gradient-to-b from-purple-950/40 via-neutral-900/80 to-neutral-950 border-2 border-purple-500 shadow-2xl shadow-purple-900/30 scale-100 lg:-translate-y-2"
                : "bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700"
            }`}
          >
            {tier.badge && (
              <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold tracking-wide uppercase shadow-md">
                {tier.badge}
              </div>
            )}

            <div>
              <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
              <p className="text-neutral-400 text-sm mb-6 min-h-[40px]">{tier.description}</p>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-extrabold text-white">{tier.price}</span>
                <span className="text-neutral-400 text-sm font-medium">/{tier.frequency}</span>
              </div>

              <div className="w-full h-px bg-neutral-800 my-6" />

              <div className="space-y-3.5 mb-8">
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Included Features</p>
                {tier.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-neutral-300">
                    <div className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link href={tier.ctaLink} className="w-full mt-auto">
              <Button
                className={`w-full h-12 text-base font-semibold rounded-xl transition-all duration-200 ${
                  tier.highlighted
                    ? "bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-500/30"
                    : "bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700"
                }`}
              >
                {tier.cta}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        ))}
      </div>

      {/* Enterprise Security Banner */}
      <div className="mt-20 w-full p-8 rounded-3xl bg-neutral-900/40 border border-neutral-800 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white">Bank-Grade Encryption &amp; Security</h4>
            <p className="text-sm text-neutral-400">All media assets encrypted at rest via AWS KMS (AES-256) and TLS 1.3 in transit.</p>
          </div>
        </div>
        <Link href="/contact">
          <Button variant="outline" className="border-neutral-700 hover:bg-neutral-800 text-neutral-200 shrink-0">
            Request Security Whitepaper
          </Button>
        </Link>
      </div>

      {/* FAQs */}
      <div className="mt-24 w-full max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
          <p className="mt-3 text-neutral-400 text-sm">Everything you need to know about billing, recording limits, and AI credits.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/80">
              <h4 className="font-semibold text-white mb-2.5 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-purple-400 shrink-0 mt-1" />
                <span>{faq.q}</span>
              </h4>
              <p className="text-sm text-neutral-400 leading-relaxed pl-6">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
