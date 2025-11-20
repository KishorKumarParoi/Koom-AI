import { Button } from "@/components/ui/button";
import { Cpu, Globe2, Layers, ShieldCheck, Sparkles, Terminal, Users2, Video, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About KoomAI — Next-Gen Async Video Collaboration",
  description: "Learn about KoomAI's mission, principal architecture, and sub-120ms real-time media ingestion engine.",
};

const pillars = [
  {
    icon: Video,
    title: "Sub-120ms Media Latency",
    description:
      "Engineered from the ground up on WebRTC SVC (Scalable Video Coding) and WebSockets to deliver instantaneous, stutter-free screen and webcam streaming.",
  },
  {
    icon: Cpu,
    title: "Deep AI Whisper Intelligence",
    description:
      "Integrated directly with OpenAI Whisper speech models to autonomously transcribe video audio tracks into structured notes, action items, and search indices.",
  },
  {
    icon: Layers,
    title: "Unified 4-Platform Ecosystem",
    description:
      "One account syncs across our Next.js 15 Web Cockpit, Electron 30 Desktop Studio, Chrome Manifest V3 Extension, and Express real-time media cluster.",
  },
  {
    icon: ShieldCheck,
    title: "Zero-Trust Data Protection",
    description:
      "End-to-end encryption in transit (TLS 1.3) and at rest (AWS KMS AES-256) with strict multi-tenant Neon PostgreSQL isolation and Clerk identity controls.",
  },
];

const techStack = [
  { category: "Web Frontend & API", tech: "Next.js 15 (App Router), React 19, Tailwind CSS 4, Radix UI" },
  { category: "Media Ingestion Engine", tech: "Express.js, Bun runtime, WebSockets, Socket.IO, WebRTC" },
  { category: "Desktop Studio", tech: "Electron 30, TypeScript, Vite, Hardware Accelerated Capture" },
  { category: "Browser Extension", tech: "Google Chrome Manifest V3, WebRTC Offscreen Canvas API" },
  { category: "Database & Storage", tech: "Neon Serverless PostgreSQL, Prisma ORM, AWS S3, CloudFront CDN" },
  { category: "AI & Transcription", tech: "OpenAI Whisper v3, Deepgram fallback, Vector Semantic Search" },
];

export default function AboutPage() {
  return (
    <div className="py-12 md:py-20 px-4 max-w-7xl mx-auto flex flex-col items-center">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs sm:text-sm font-semibold mb-6 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>Our Vision &amp; Architecture</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
          Reinventing Async Video for the{" "}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
            AI-First Era
          </span>
        </h1>
        <p className="mt-6 text-base sm:text-lg text-neutral-300 leading-relaxed">
          KoomAI was built to replace slow, fragmented screen recording workflows with an ultra-responsive, principal-grade video intelligence platform.
        </p>
      </div>

      {/* Mission & Problem Statement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-20">
        <div className="p-8 rounded-3xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-purple-400" />
            The Problem with Legacy Video Tools
          </h2>
          <p className="text-neutral-300 text-sm leading-relaxed mb-4">
            Traditional screen recording tools suffer from multi-minute upload delays, heavy desktop resource consumption, clunky browser plugins, and disjointed transcription pipelines that cost teams hours each week.
          </p>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Engineers and product teams needed instant, glass-to-glass sharing, automatic code-aware speech transcription, and multi-platform recording flexibility without vendor lock-in.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-pink-400" />
            The KoomAI Solution
          </h2>
          <p className="text-neutral-300 text-sm leading-relaxed mb-4">
            KoomAI decouples ingestion, real-time streaming, and deep AI inference across dedicated microservices. Videos stream through WebSockets and S3 concurrently while recording, achieving zero-wait video readiness.
          </p>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Combined with OpenAI Whisper transcription and AI summaries, your team consumes 10-minute video walkthroughs in 30 seconds of actionable text.
          </p>
        </div>
      </div>

      {/* Core Architectural Pillars */}
      <div className="w-full mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white">Built with Principal Engineering Rigor</h2>
          <p className="mt-3 text-neutral-400 text-sm">Designed for high-concurrency, low-latency enterprise video distribution.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 hover:border-purple-500/40 transition duration-300">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{pillar.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{pillar.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Engineering Specs Table */}
      <div className="w-full max-w-4xl p-8 rounded-3xl bg-neutral-900/40 border border-neutral-800 mb-20">
        <h3 className="text-xl font-bold text-white mb-6">Production Technology Stack</h3>
        <div className="divide-y divide-neutral-800">
          {techStack.map((item, idx) => (
            <div key={idx} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-sm font-semibold text-purple-300">{item.category}</span>
              <span className="text-sm text-neutral-400 font-mono text-left sm:text-right">{item.tech}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">Experience KoomAI in Action</h2>
        <p className="text-neutral-400 text-sm mb-6 max-w-md mx-auto">
          Start recording high-definition videos with sub-120ms WebRTC streaming and instant AI transcripts today.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/auth/sign-up">
            <Button className="h-11 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl">
              Get Started Free <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
          <Link href="/pricing">
            <Button variant="outline" className="h-11 px-6 border-neutral-700 text-neutral-300 hover:bg-neutral-800 rounded-xl">
              View Pricing
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
