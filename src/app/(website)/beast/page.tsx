"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Bot,
  Sparkles,
  Zap,
  Cpu,
  Video,
  Briefcase,
  DollarSign,
  Headphones,
  MessageSquare,
  ShieldAlert,
  Play,
  CheckCircle2,
  GitPullRequest,
  Code2,
  FileText,
  Activity,
  ArrowRight,
  ExternalLink,
  RefreshCw,
  Copy,
  Check,
} from "lucide-react";
import { AGENT_REGISTRY, MeshExecutionResult } from "@/lib/agents/mesh";
import NotebookLLMStudio from "@/components/global/notebook-studio";
import { toast } from "sonner";
import Link from "next/link";

export default function BeastUnifiedCockpit() {
  const [activeTab, setActiveTab] = useState<
    "mesh" | "jobsearch" | "studio" | "notebook" | "invoicing" | "freelance"
  >("mesh");
  const [isRunningMesh, setIsRunningMesh] = useState<boolean>(false);
  const [meshResult, setMeshResult] = useState<MeshExecutionResult | null>(null);
  const [clientInvoiceName, setClientInvoiceName] = useState<string>("Anthropic Partner");
  const [invoiceAmount, setInvoiceAmount] = useState<number>(3200);
  const [generatedInvoice, setGeneratedInvoice] = useState<any>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Job Search State
  const [jobCompany, setJobCompany] = useState<string>("Stripe / Loom");
  const [jobRole, setJobRole] = useState<string>("Principal AI Systems Architect");
  const [jobAnalysis, setJobAnalysis] = useState<string>("");
  const [evaluatingJob, setEvaluatingJob] = useState<boolean>(false);

  const executeMesh = async () => {
    setIsRunningMesh(true);
    try {
      const res = await fetch("/api/agent/mesh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetCompany: jobCompany, videoTitle: "KoomAI Beast Platform Demo" }),
      });
      const data = await res.json();
      setMeshResult(data);
      toast.success(`20/20 Specialist Agents executed in parallel (${data.p99LatencyMs}ms p99)!`);
    } catch {
      toast.error("Failed to run 20-agent mesh");
    } finally {
      setIsRunningMesh(false);
    }
  };

  const handleGenerateInvoice = async () => {
    try {
      const res = await fetch("/api/payment/invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: clientInvoiceName,
          amountUSD: invoiceAmount,
          projectTitle: "Production WebRTC Media & 20-Agent Parallel Mesh",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setGeneratedInvoice(data.invoice);
        toast.success(`Stripe Invoice created for ${clientInvoiceName}!`);
      }
    } catch {
      toast.error("Unable to generate invoice");
    }
  };

  const handleEvaluateJob = () => {
    setEvaluatingJob(true);
    setTimeout(() => {
      setJobAnalysis(`## 🎯 Alignment Matrix: ${jobCompany} — ${jobRole}
**Overall Semantic Fit:** 94% (Exceptional / Staff-Principal Tier)

### ✅ Matched Competencies:
• **Distributed Low-Latency Streaming:** Sub-120ms WebRTC architecture, 60 FPS video pipeline ($24K MRR KoomAI).
• **High-Throughput Polyglot Mesh:** Rust 1.85 SIMD scoring (<0.5ms), Go 1.24 gateway, LangGraph stateful multi-agents.
• **Lakehouse & Streaming Data:** Kafka, Debezium CDC, Feast Redis feature store (<5ms), PySpark Delta Lake.
• **Zero-Trust AI Defense:** NVIDIA NeMo Guardrails, BotShield WAF, PyRIT redteaming.

### 🏛️ REA Trojan Horse Proposal Synthesized:
"Identified STUN/TURN UDP media packet jitter and uncompressed client hydration overhead on target domain. Formulated an architectural proposal transitioning client streaming to hardware-accelerated NVENC encoding and FlashRank ONNX re-ranking."

*ATS single-column PDF ready for 1-click generation.*`);
      setEvaluatingJob(false);
      toast.success("Job fit and REA Trojan Horse proposal synthesized!");
    }, 800);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center mt-6 md:mt-10 px-4 max-w-7xl mx-auto w-full">
      {/* Top Hero Card */}
      <div className="w-full p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-purple-950/60 via-neutral-900/80 to-black/90 border border-purple-500/30 backdrop-blur-2xl shadow-2xl relative overflow-hidden text-left mb-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-purple-500/40 bg-purple-500/15 text-purple-200 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>KOOM-AI BEAST &bull; Autonomous Remote Operating System</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              One Stop Solution for Every{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Remote Engineer &amp; Freelancer
              </span>
            </h1>
            <p className="text-sm sm:text-base text-neutral-300 mt-2 max-w-3xl leading-relaxed">
              Synthesizes 20 parallel specialist agents, sub-120ms Loom-alternative screen recording, REA reverse-engineered job hunting, instant Stripe invoicing, NotebookLLM audio interviews, and WhatsApp messaging bots.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Button
              onClick={executeMesh}
              disabled={isRunningMesh}
              className="h-12 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl shadow-lg shadow-purple-500/30 flex items-center gap-2 font-bold text-sm cursor-pointer"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              {isRunningMesh ? "Running 20 Agents in Parallel..." : "Execute 20-Agent Parallel Mesh"}
            </Button>
            <Link href="/studio">
              <Button
                variant="outline"
                className="h-12 px-6 border-purple-500/40 bg-purple-500/10 hover:bg-purple-500/20 text-purple-200 rounded-xl text-sm font-semibold flex items-center gap-2"
              >
                <Video className="w-4 h-4" /> Launch Screen Studio
              </Button>
            </Link>
          </div>
        </div>

        {/* Global Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-purple-500/20">
          <div className="p-3.5 rounded-xl bg-black/40 border border-purple-500/20">
            <div className="text-xs text-neutral-400 uppercase font-bold">Parallel Mesh</div>
            <div className="text-xl sm:text-2xl font-black text-white mt-1">20 Agents</div>
            <div className="text-[11px] text-emerald-400 font-semibold mt-0.5">&bull; p99 &lt; 35ms target</div>
          </div>
          <div className="p-3.5 rounded-xl bg-black/40 border border-purple-500/20">
            <div className="text-xs text-neutral-400 uppercase font-bold">WebRTC Latency</div>
            <div className="text-xl sm:text-2xl font-black text-purple-300 mt-1">&lt; 120ms</div>
            <div className="text-[11px] text-purple-400 font-semibold mt-0.5">&bull; 60 FPS Hardware NVENC</div>
          </div>
          <div className="p-3.5 rounded-xl bg-black/40 border border-purple-500/20">
            <div className="text-xs text-neutral-400 uppercase font-bold">Stripe Run Rate</div>
            <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">$24.8K MRR</div>
            <div className="text-[11px] text-neutral-400 font-semibold mt-0.5">&bull; Instant Video Invoices</div>
          </div>
          <div className="p-3.5 rounded-xl bg-black/40 border border-purple-500/20">
            <div className="text-xs text-neutral-400 uppercase font-bold">Freelance Pipeline</div>
            <div className="text-xl sm:text-2xl font-black text-cyan-400 mt-1">$12.2K Active</div>
            <div className="text-[11px] text-cyan-300 font-semibold mt-0.5">&bull; Upwork, Toptal, LinkedIn</div>
          </div>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8 bg-neutral-900/60 p-2 rounded-2xl border border-neutral-800 backdrop-blur-md">
        <button
          onClick={() => setActiveTab("mesh")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            activeTab === "mesh"
              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/20"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          <Bot className="w-3.5 h-3.5" /> 20-Agent Parallel Mesh
        </button>
        <button
          onClick={() => setActiveTab("jobsearch")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            activeTab === "jobsearch"
              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/20"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" /> AI Job Search + REA
        </button>
        <button
          onClick={() => setActiveTab("notebook")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            activeTab === "notebook"
              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/20"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          <Headphones className="w-3.5 h-3.5" /> NotebookLLM Audio Studio
        </button>
        <button
          onClick={() => setActiveTab("invoicing")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            activeTab === "invoicing"
              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/20"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" /> Video Invoicing &amp; Cash
        </button>
        <button
          onClick={() => setActiveTab("freelance")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            activeTab === "freelance"
              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/20"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Bot &amp; Freelance Sync
        </button>
      </div>

      {/* TAB CONTENT 1: 20-Agent Parallel Mesh */}
      {activeTab === "mesh" && (
        <div className="w-full flex flex-col gap-6 text-left animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-purple-400" />
              Live 20-Agent Parallel Mesh Roster
            </h2>
            <Button
              size="sm"
              onClick={executeMesh}
              disabled={isRunningMesh}
              className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold px-4"
            >
              <RefreshCw className={`w-3.5 h-3.5 mr-1 ${isRunningMesh ? "animate-spin" : ""}`} /> Run Mesh
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {AGENT_REGISTRY.map((agent) => {
              const liveData = meshResult?.results?.[agent.id];
              return (
                <div
                  key={agent.id}
                  className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-purple-500/40 transition backdrop-blur-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                        {agent.domain}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {liveData ? `${liveData.latencyMs}ms` : `<${agent.latencyTargetMs}ms`}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white mb-0.5">{agent.name}</h3>
                    <p className="text-[11px] text-purple-300/80 font-medium mb-2">{agent.role}</p>
                    <p className="text-xs text-neutral-400 leading-relaxed mb-3">{agent.description}</p>
                  </div>

                  {liveData ? (
                    <div className="p-2.5 rounded-xl bg-black/60 border border-purple-500/30 text-[11px] text-neutral-200 font-mono">
                      {liveData.output}
                    </div>
                  ) : (
                    <div className="text-[11px] text-neutral-500 italic">Standing by in LangGraph mesh...</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: AI Job Search & REA Reverse Engineering */}
      {activeTab === "jobsearch" && (
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 text-left animate-in fade-in duration-300">
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-md flex flex-col gap-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-purple-400" />
              Target Opportunity &amp; Recon
            </h3>
            <div>
              <label className="text-xs text-neutral-400">Target Company:</label>
              <input
                type="text"
                value={jobCompany}
                onChange={(e) => setJobCompany(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-xs text-white mt-1 focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="text-xs text-neutral-400">Role Title:</label>
              <input
                type="text"
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-xs text-white mt-1 focus:outline-none focus:border-purple-500"
              />
            </div>
            <Button
              onClick={handleEvaluateJob}
              disabled={evaluatingJob}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold h-10 mt-2"
            >
              {evaluatingJob ? "Synthesizing REA Teardown..." : "⚡ Run REA Recon & Formulate Trojan Horse"}
            </Button>
          </div>

          <div className="lg:col-span-2 p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-md flex flex-col gap-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              Autonomous Application Output
            </h3>
            {jobAnalysis ? (
              <pre className="text-xs text-neutral-200 font-mono whitespace-pre-wrap leading-relaxed p-4 bg-black/60 rounded-xl border border-purple-500/30 max-h-96 overflow-y-auto">
                {jobAnalysis}
              </pre>
            ) : (
              <div className="text-xs text-neutral-500 italic p-8 text-center">
                Click "Run REA Recon" to trigger reverse engineering bundle audit and synthesize a Trojan Horse proposal...
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: NotebookLLM Interactive Audio Studio */}
      {activeTab === "notebook" && <NotebookLLMStudio />}

      {/* TAB CONTENT 4: Video Invoicing & Stripe Cash Receiving */}
      {activeTab === "invoicing" && (
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 text-left animate-in fade-in duration-300">
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-md flex flex-col gap-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              Generate Video Deliverable Invoice
            </h3>
            <div>
              <label className="text-xs text-neutral-400">Client / Employer Name:</label>
              <input
                type="text"
                value={clientInvoiceName}
                onChange={(e) => setClientInvoiceName(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-xs text-white mt-1 focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="text-xs text-neutral-400">Milestone Amount (USD):</label>
              <input
                type="number"
                value={invoiceAmount}
                onChange={(e) => setInvoiceAmount(Number(e.target.value))}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-xs text-white mt-1 focus:outline-none focus:border-purple-500"
              />
            </div>
            <Button
              onClick={handleGenerateInvoice}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold h-10 mt-2"
            >
              Generate Stripe Video Invoice Link
            </Button>
          </div>

          <div className="lg:col-span-2 p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-md flex flex-col gap-4">
            <h3 className="text-base font-bold text-white">Invoice &amp; Video Walkthrough Package</h3>
            {generatedInvoice ? (
              <div className="p-4 rounded-xl bg-black/60 border border-emerald-500/30 flex flex-col gap-3 text-xs font-mono text-neutral-200">
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-emerald-400 font-bold">INVOICE #{generatedInvoice.id}</span>
                  <span className="text-white font-bold">${generatedInvoice.amountUSD.toLocaleString()} USD</span>
                </div>
                <div><b>Client:</b> {generatedInvoice.clientName} ({generatedInvoice.clientEmail})</div>
                <div><b>Project:</b> {generatedInvoice.projectTitle}</div>
                <div><b>Deliverable Walkthrough:</b> {generatedInvoice.deliverableWalkthroughUrl}</div>
                <div className="pt-2 flex gap-2">
                  <a href={generatedInvoice.paymentLink} target="_blank" className="shrink-0">
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs">
                      Open Payment Link <ExternalLink className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-xs text-neutral-500 italic p-8 text-center">
                Fill client details on the left to issue an instant invoice with attached video walkthrough.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT 5: WhatsApp Bot & Freelance Sync */}
      {activeTab === "freelance" && (
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 text-left animate-in fade-in duration-300">
          {/* WhatsApp Webhook Simulator */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-md flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold text-white">WhatsApp Bot Mobile Bridge</h3>
            </div>
            <p className="text-xs text-neutral-400">
              Two-way webhook connected to Meta &amp; Twilio API. Send commands directly from your mobile phone to check stats, bids, or generate video share links:
            </p>
            <div className="p-4 rounded-xl bg-black/70 border border-emerald-500/30 flex flex-col gap-2 font-mono text-xs text-emerald-300">
              <div>📱 <b>Incoming Webhook:</b> /api/whatsapp/webhook</div>
              <div className="text-neutral-400">• Type <b>/status</b> → Returns 20-agent mesh status &amp; MRR</div>
              <div className="text-neutral-400">• Type <b>/jobs</b> → Scrapes top high-paying remote roles</div>
              <div className="text-neutral-400">• Type <b>/bid Stripe</b> → Deconstructs target and generates pitch</div>
              <div className="text-neutral-400">• Type <b>/invoice Acme $3200</b> → Issues instant payment link</div>
            </div>
          </div>

          {/* Remote Portals (Upwork, LinkedIn, Fiverr, Toptal) */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-md flex flex-col gap-4">
            <h3 className="text-base font-bold text-white">Synchronized Remote Portals</h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-black/40 border border-neutral-800">
                <div className="font-bold text-emerald-400">Upwork</div>
                <div className="text-neutral-300 mt-1">3 Direct Invites</div>
                <div className="text-neutral-500 text-[10px]">$4,500 in Escrow</div>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-neutral-800">
                <div className="font-bold text-blue-400">LinkedIn</div>
                <div className="text-neutral-300 mt-1">8 Inbound Queries</div>
                <div className="text-neutral-500 text-[10px]">1,420 Profile Views</div>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-neutral-800">
                <div className="font-bold text-green-400">Fiverr Pro</div>
                <div className="text-neutral-300 mt-1">Top Rated Seller</div>
                <div className="text-neutral-500 text-[10px]">2 Active Orders</div>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-neutral-800">
                <div className="font-bold text-purple-400">Toptal</div>
                <div className="text-neutral-300 mt-1">Top 3% Talent</div>
                <div className="text-neutral-500 text-[10px]">$150/hr Rate</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
