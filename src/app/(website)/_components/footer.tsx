import { Activity, Clock, Github, ShieldCheck, Sparkles, Video } from "lucide-react";
import Link from "next/link";
import React from "react";
import VisitorCounter from "@/components/global/visitor-counter";

export default function WebsiteFooter() {
  return (
    <footer className="w-full border-t border-neutral-800/80 mt-20 pt-12 pb-10 text-neutral-400">
      {/* Telemetry & Visitor Status Banner */}
      <div className="mb-10 p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Activity className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-semibold text-neutral-200 flex items-center gap-2">
              <span>Platform Telemetry &amp; Real-Time Traffic</span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                ACTIVE
              </span>
            </div>
            <p className="text-[11px] text-neutral-400">
              Live edge visitor counter with sub-50ms sync and continuous release updates.
            </p>
          </div>
        </div>

        {/* Live Visitor & Update Badge */}
        <VisitorCounter />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white">
              <Video className="w-4 h-4" />
            </div>
            <span className="text-xl font-extrabold text-white tracking-tight">KoomAI</span>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            High-performance asynchronous video collaboration with sub-120ms WebRTC streaming and autonomous Whisper AI transcription.
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>All systems operational (99.99% uptime)</span>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Product</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/pricing" className="hover:text-purple-400 transition">
                Pricing &amp; Plans
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-purple-400 transition">
                Architecture &amp; Mission
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-purple-400 transition">
                Web Cockpit
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/KishorKumarParoi/Koom-ai-desktop"
                target="_blank"
                rel="noreferrer"
                className="hover:text-purple-400 transition"
              >
                Desktop Studio (Electron)
              </a>
            </li>
            <li>
              <a
                href="https://github.com/KishorKumarParoi/Koom-AI-Chrome-Extension"
                target="_blank"
                rel="noreferrer"
                className="hover:text-purple-400 transition"
              >
                Chrome Extension (MV3)
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Ecosystem &amp; Portfolio</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://macos-portofolio.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-purple-400 transition flex items-center gap-1.5"
              >
                <span>macOS Portfolio (Live Desktop)</span>
                <span className="text-[10px] text-emerald-400 font-mono">↗</span>
              </a>
            </li>
            <li>
              <a
                href="https://re-invent-rust.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 transition flex items-center gap-1.5"
              >
                <span>Reinvent 3D (Live Portfolio)</span>
                <span className="text-[10px] text-cyan-400 font-mono">↗</span>
              </a>
            </li>
            <li>
              <Link href="/about" className="hover:text-purple-400 transition">
                About Architecture
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-purple-400 transition">
                Contact Engineering
              </Link>
            </li>
            <li>
              <a href="/api/health" target="_blank" className="hover:text-purple-400 transition font-mono text-xs">
                Health Check (/api/health)
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Get Started</h4>
          <p className="text-xs text-neutral-400 mb-4">
            Try KoomAI today and experience real-time AI video sharing.
          </p>
          <Link
            href="/auth/sign-up"
            className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-md shadow-purple-500/20 transition"
          >
            Create Free Account
          </Link>
        </div>
      </div>

      <div className="pt-6 border-t border-neutral-800/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <p>© {new Date().getFullYear()} KoomAI Inc. Engineered for Principal Performance.</p>
          <span className="hidden sm:inline text-neutral-700">|</span>
          <p className="text-neutral-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-pink-400" />
            <span>Updated: <strong className="text-neutral-200">October 2026</strong> (v2.4.0-prod)</span>
          </p>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-neutral-200 transition">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-neutral-200 transition">
            Terms of Service
          </Link>
          <a
            href="https://github.com/KishorKumarParoi/Koom-AI"
            target="_blank"
            rel="noreferrer"
            className="hover:text-neutral-200 transition flex items-center gap-1"
          >
            <Github className="w-3.5 h-3.5" />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
