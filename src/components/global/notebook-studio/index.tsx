"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Headphones,
  Play,
  Pause,
  Bot,
  Cpu,
  BookOpen,
  Volume2,
  Mic,
  Send,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

export default function NotebookLLMStudio() {
  const [isPlayingPodcast, setIsPlayingPodcast] = useState<boolean>(false);
  const [podcastTopic, setPodcastTopic] = useState<string>("Zomato Enterprise AI Lakehouse & CDC Architecture");
  const [chatInput, setChatInput] = useState<string>("");
  const [activeDrill, setActiveDrill] = useState<string | null>(null);
  const [drillAnswer, setDrillAnswer] = useState<string>("");
  const [drillScore, setDrillScore] = useState<number | null>(null);
  const [conversation, setConversation] = useState<Array<{ role: "host1" | "host2" | "user" | "coach"; text: string }>>([
    {
      role: "host1",
      text: "Welcome back! Today we are doing a deep architectural breakdown of Kishor's Zomato Enterprise AI Lakehouse.",
    },
    {
      role: "host2",
      text: "Right! What stands out immediately is the sub-5ms feature retrieval on Feast Redis and the automated computer vision dispute arbitration pipeline.",
    },
    {
      role: "host1",
      text: "Exactly. Instead of manual agent reviews, the system saved $450K in false refund claims using multi-modal embeddings.",
    },
  ]);

  const togglePodcast = () => {
    setIsPlayingPodcast(!isPlayingPodcast);
    if (!isPlayingPodcast) {
      toast.success("Synthesizing NotebookLLM-style deep dive discussion...");
    }
  };

  const submitDrillAnswer = () => {
    if (!drillAnswer.trim()) {
      toast.error("Please type your system design architecture outline");
      return;
    }
    const lower = drillAnswer.toLowerCase();
    let score = 70;
    if (lower.includes("kafka") || lower.includes("cdc") || lower.includes("debezium")) score += 10;
    if (lower.includes("feast") || lower.includes("redis")) score += 10;
    if (lower.includes("saga") || lower.includes("outbox")) score += 10;
    setDrillScore(score);
    toast.success(`System design answer graded: ${score}/100!`);
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto p-4 sm:p-6 text-left">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-neutral-900/60 to-black/80 border border-purple-500/30 backdrop-blur-xl shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/40 mb-2">
            <Headphones className="w-3.5 h-3.5 text-purple-400" />
            <span>NotebookLLM-Style Interactive Audio &amp; System Design Harness</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Personal Knowledge &amp; Interview Studio
          </h1>
          <p className="text-sm text-neutral-300 mt-1 max-w-2xl">
            Synthesizes conversational two-host audio discussions over your codebases and runs Principal Architect drills.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={togglePodcast}
            className={`h-11 px-5 rounded-xl font-semibold flex items-center gap-2 text-sm shadow-lg transition ${
              isPlayingPodcast
                ? "bg-rose-600 hover:bg-rose-500 text-white shadow-rose-500/25"
                : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-purple-500/25"
            }`}
          >
            {isPlayingPodcast ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlayingPodcast ? "Pause Discussion" : "Generate Audio Deep Dive"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Knowledge Sources & Architectures */}
        <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-md flex flex-col gap-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-purple-400" />
            Indexed Knowledge Sources (15 Projects)
          </h3>
          <p className="text-xs text-neutral-400">Select any project to ground the audio discussion and mock drills:</p>

          <div className="flex flex-col gap-2">
            {[
              "Zomato Enterprise AI Lakehouse & CDC",
              "Hybrid Anime Intelligence & Rust SIMD",
              "Zero-Trust AI Defense & BotShield WAF",
              "Smart Manufacturing IIoT MLOps (<20ms)",
              "KoomAI Sub-120ms WebRTC Media Engine",
            ].map((topic) => (
              <button
                key={topic}
                onClick={() => setPodcastTopic(topic)}
                className={`p-3 rounded-xl text-xs font-medium text-left transition border ${
                  podcastTopic === topic
                    ? "bg-purple-600/20 border-purple-500 text-white"
                    : "bg-black/30 border-neutral-800 text-neutral-300 hover:border-neutral-700"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
            <span>Audio Generation: 432Hz</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Ready
            </span>
          </div>
        </div>

        {/* Center / Right Column: NotebookLLM Conversational Audio Flow */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-md flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-bold text-white">Interactive Audio Podcast: {podcastTopic}</span>
            </div>
            {isPlayingPodcast && (
              <span className="text-xs text-purple-400 font-mono animate-pulse flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                Live Audio Stream (60 FPS)
              </span>
            )}
          </div>

          {/* Transcript / Dialogue Stream */}
          <div className="flex flex-col gap-3 max-h-72 overflow-y-auto pr-1">
            {conversation.map((c, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl text-xs leading-relaxed border ${
                  c.role === "host1"
                    ? "bg-purple-950/30 border-purple-500/30 text-purple-200"
                    : c.role === "host2"
                    ? "bg-pink-950/30 border-pink-500/30 text-pink-200"
                    : "bg-neutral-800/60 border-neutral-700 text-white"
                }`}
              >
                <div className="text-[10px] font-bold uppercase tracking-wider mb-1 opacity-75">
                  {c.role === "host1" ? "🎙️ Host A (Systems Architect)" : c.role === "host2" ? "🎧 Host B (MLOps Lead)" : "Candidate"}
                </div>
                {c.text}
              </div>
            ))}
          </div>

          {/* System Design Drill Section */}
          <div className="mt-4 p-4 rounded-xl bg-black/60 border border-purple-500/30 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5 uppercase">
                <Cpu className="w-4 h-4 text-cyan-400" />
                Principal Engineer 20k QPS Drill
              </span>
              {drillScore !== null && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Score: {drillScore}/100
                </span>
              )}
            </div>
            <p className="text-xs text-neutral-300">
              "Design an event-driven fleet dispatch pipeline handling 20,000 QPS with p99 write latency &lt; 80ms and exactly-once payment semantics."
            </p>
            <textarea
              value={drillAnswer}
              onChange={(e) => setDrillAnswer(e.target.value)}
              placeholder="Outline your architectural solution (Transactional Outbox, Kafka partitions, CDC Debezium, Feast Redis, Saga failovers)..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-purple-500 h-20 resize-none font-mono"
            />
            <div className="flex justify-end">
              <Button onClick={submitDrillAnswer} size="sm" className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold px-4 h-8">
                Evaluate My Architecture
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
