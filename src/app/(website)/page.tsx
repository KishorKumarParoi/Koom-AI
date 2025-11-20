import { Button } from "@/components/ui/button";
import { ArrowRight, Check, CheckCircle2, Cpu, Globe2, HelpCircle, Mail, MapPin, Monitor, ShieldCheck, Sparkles, Video, Zap } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-12 md:mt-20 px-4">
      {/* Hero Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium mb-8 backdrop-blur-md">
        <Sparkles className="w-4 h-4 text-purple-400" />
        <span>KoomAI 2.0 — Next-Gen Loom Alternative</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl text-white">
        Async Video Messaging Powered by{" "}
        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
          Real-Time AI
        </span>
      </h1>

      <p className="mt-6 text-lg sm:text-xl text-neutral-300 max-w-2xl leading-relaxed">
        Record your screen and camera, share instantaneously with sub-120ms WebRTC streaming, and generate automated AI speech-to-text transcripts with Whisper.
      </p>

      {/* CTAs */}
      <div className="mt-10 flex flex-wrap gap-4 justify-center">
        <Link href="/studio">
          <Button className="h-12 px-8 text-base font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl shadow-lg shadow-purple-500/25 flex items-center gap-2">
            <Video className="w-4 h-4" />
            Launch In-Browser Studio
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
        <Link href="/demo">
          <Button variant="outline" className="h-12 px-8 text-base font-medium border-purple-500/40 bg-purple-500/10 hover:bg-purple-500/20 text-purple-200 rounded-xl backdrop-blur-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            Try Interactive Showcase
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="outline" className="h-12 px-7 text-base font-medium border-neutral-700 bg-neutral-900/60 hover:bg-neutral-800 text-neutral-300 rounded-xl backdrop-blur-sm">
            Dashboard
          </Button>
        </Link>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-5xl w-full text-left">
        <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm hover:border-purple-500/50 transition duration-300">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
            <Video className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Sub-120ms WebRTC Engine</h3>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Glass-to-glass ultra low latency with hardware-accelerated 60 FPS video and adaptive bitrate streaming.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm hover:border-pink-500/50 transition duration-300">
          <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 mb-4">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">OpenAI Whisper AI Insights</h3>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Automated speech transcription, intelligent video titles, and executive bullet-point summaries.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm hover:border-indigo-500/50 transition duration-300">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
            <Monitor className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Cross-Platform Ecosystem</h3>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Seamlessly record via Electron Desktop Studio, Chrome Manifest V3 Extension, or Web Cockpit.
          </p>
        </div>
      </div>

      {/* SECTION: About Preview */}
      <section id="about" className="mt-28 max-w-5xl w-full text-left">
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900/40 border border-neutral-800 backdrop-blur-md">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-semibold mb-4">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>Architecture &amp; Mission</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-white">Engineered for High-Scale Teams</h2>
              <p className="text-neutral-400 text-sm mt-2 max-w-2xl">
                Unlike legacy platforms that buffer for minutes, KoomAI streams directly through distributed WebRTC and AWS S3 concurrent chunking for instant playback.
              </p>
            </div>
            <Link href="/about" className="shrink-0">
              <Button variant="outline" className="border-neutral-700 hover:bg-neutral-800 text-neutral-200">
                Explore Full Architecture <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-neutral-800">
            <div>
              <p className="text-3xl font-extrabold text-purple-400">&lt;120ms</p>
              <p className="text-xs text-neutral-400 mt-1">Glass-to-glass media latency</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-pink-400">99.4%</p>
              <p className="text-xs text-neutral-400 mt-1">AI Whisper speech accuracy</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-indigo-400">4-Pillar</p>
              <p className="text-xs text-neutral-400 mt-1">Unified multi-platform mesh</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Pricing Preview */}
      <section id="pricing" className="mt-28 max-w-5xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Flexible Plans</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Start Free, Scale as You Grow</h2>
          <p className="text-neutral-400 text-sm mt-2">Zero credit card required to get started.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {/* Free Tier */}
          <div className="p-8 rounded-3xl bg-neutral-900/50 border border-neutral-800 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Free Starter</h3>
              <p className="text-sm text-neutral-400 mb-6">For personal recording and quick updates.</p>
              <div className="text-4xl font-extrabold text-white mb-6">$0</div>
              <ul className="space-y-3 text-sm text-neutral-300 mb-8">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Up to 25 videos (5 min limit)</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> 720p HD Video Resolution</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Desktop &amp; Chrome Extension</li>
              </ul>
            </div>
            <Link href="/auth/sign-up">
              <Button variant="outline" className="w-full border-neutral-700 hover:bg-neutral-800 text-white">
                Get Started Free
              </Button>
            </Link>
          </div>

          {/* Pro Tier */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-purple-950/40 via-neutral-900 to-neutral-950 border-2 border-purple-500 shadow-xl shadow-purple-900/20 flex flex-col justify-between relative">
            <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold uppercase">
              Most Popular
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Pro Creator</h3>
              <p className="text-sm text-neutral-400 mb-6">Unlimited 4K video with OpenAI Whisper AI.</p>
              <div className="text-4xl font-extrabold text-white mb-6">$29 <span className="text-sm font-normal text-neutral-400">/ month</span></div>
              <ul className="space-y-3 text-sm text-neutral-300 mb-8">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Unlimited videos &amp; duration</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> 4K 60 FPS recording</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Automated Whisper AI Speech Transcripts</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Global AWS CloudFront CDN</li>
              </ul>
            </div>
            <Link href="/pricing">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold">
                View Full Pricing Details <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION: Contact Preview */}
      <section id="contact" className="mt-28 mb-12 max-w-5xl w-full text-left">
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900/50 border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Have Questions or Need an Enterprise Demo?</h2>
            <p className="text-neutral-400 text-sm mt-2 max-w-xl">
              Talk directly with our solutions architects about custom VPC hosting, SSO compliance, or fine-tuned AI speech models.
            </p>
            <div className="flex items-center gap-6 mt-6 text-sm text-neutral-300">
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-400" /> support@koomai.io
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-pink-400" /> San Francisco &amp; Global
              </span>
            </div>
          </div>
          <Link href="/contact" className="shrink-0">
            <Button className="h-12 px-8 bg-white hover:bg-neutral-200 text-black font-semibold rounded-xl">
              Contact Sales &amp; Engineering
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
