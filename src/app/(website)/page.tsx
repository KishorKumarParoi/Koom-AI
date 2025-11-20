import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Monitor, Sparkles, Video, Zap } from "lucide-react";
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
        <Link href="/auth/sign-in">
          <Button className="h-12 px-8 text-base font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl shadow-lg shadow-purple-500/25 flex items-center gap-2">
            Get Started Free
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="outline" className="h-12 px-8 text-base font-medium border-neutral-700 bg-neutral-900/60 hover:bg-neutral-800 text-neutral-200 rounded-xl backdrop-blur-sm">
            Open Dashboard
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
    </div>
  );
}
