"use client";

import { Button } from "@/components/ui/button";
import {
  Bookmark,
  Check,
  CheckCircle2,
  Clock,
  Code2,
  Copy,
  Eye,
  FileText,
  Heart,
  MessageSquare,
  Play,
  RotateCcw,
  Share2,
  Sparkles,
  User,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

const DEMO_TRANSCRIPTS = [
  {
    time: 0,
    timestamp: "00:00",
    speaker: "Kishor Kumar Paroi (Founder)",
    text: "Welcome to KoomAI, the high-performance async video messaging platform designed for global engineering teams.",
  },
  {
    time: 12,
    timestamp: "00:12",
    speaker: "Kishor Kumar Paroi (Founder)",
    text: "Unlike traditional platforms that introduce seconds of buffering, KoomAI leverages a custom real-time WebRTC media pipeline delivering sub-120ms glass-to-glass latency.",
  },
  {
    time: 25,
    timestamp: "00:25",
    speaker: "Kishor Kumar Paroi (Founder)",
    text: "Our cross-platform ecosystem spans an Electron desktop client utilizing hardware-accelerated NVENC and Apple VideoToolbox encoding, curtailing idle CPU by 45%.",
  },
  {
    time: 38,
    timestamp: "00:38",
    speaker: "Kishor Kumar Paroi (Founder)",
    text: "Our Manifest V3 Chrome extension uses offscreen documents for synchronized tab and mic audio mixing, streaming concurrent video chunks to our Express backend.",
  },
  {
    time: 52,
    timestamp: "00:52",
    speaker: "Kishor Kumar Paroi (Founder)",
    text: "On the monetization front, we integrated Stripe billing with idempotent webhooks and multi-tenant workspaces, achieving $24K MRR in enterprise pilot adoption.",
  },
];

const CHAPTERS = [
  { time: 0, title: "1. Overview & Glass-to-Glass Latency", duration: "00:00 - 00:12" },
  { time: 12, title: "2. WebRTC & Adaptive Bitrate (SVC)", duration: "00:12 - 00:25" },
  { time: 25, title: "3. Electron Desktop & Hardware NVENC", duration: "00:25 - 00:38" },
  { time: 38, title: "4. Chrome Extension V3 Web Audio Mixer", duration: "00:38 - 00:52" },
  { time: 52, title: "5. Stripe Monetization & Workspaces", duration: "00:52 - 01:15" },
];

export default function DemoPage() {
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"transcript" | "summary" | "chapters" | "comments">("transcript");
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const [likes, setLikes] = useState(148);
  const [hasLiked, setHasLiked] = useState(false);
  const [views, setViews] = useState(1280);

  const [comments, setComments] = useState([
    {
      id: "1",
      author: "Alex Morgan",
      role: "Staff Engineer @ Stripe",
      time: "2h ago",
      text: "The glass-to-glass latency is genuinely impressive. Having synchronized Whisper transcripts with clickable scrubbing saves so much time during code reviews.",
    },
    {
      id: "2",
      author: "David Chen",
      role: "VP of Engineering",
      time: "5h ago",
      text: "We switched our remote team to KoomAI. The 60fps NVENC capture and instant AWS S3 upload cut our daily meeting fatigue significantly.",
    },
  ]);
  const [newComment, setNewComment] = useState("");

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleSeek = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyEmbed = () => {
    const embedHtml = `<iframe src="${window.location.href}" width="640" height="360" frameborder="0" allowfullscreen></iframe>`;
    navigator.clipboard.writeText(embedHtml);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2000);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      {
        id: Date.now().toString(),
        author: "Engineering Reviewer",
        role: "Guest Reviewer",
        time: "Just now",
        text: newComment.trim(),
      },
      ...comments,
    ]);
    setNewComment("");
  };

  const toggleLike = () => {
    if (hasLiked) {
      setLikes(likes - 1);
      setHasLiked(false);
    } else {
      setLikes(likes + 1);
      setHasLiked(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-neutral-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Showcase &amp; Interactive AI Player</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            KoomAI Architecture &amp; System Walkthrough
          </h1>
          <p className="text-neutral-400 text-sm mt-1">
            Recorded via KoomAI Desktop Client with hardware NVENC 60 FPS encoding and Whisper-1 AI speech recognition.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <Button
            onClick={toggleLike}
            variant="outline"
            className={`border-neutral-800 rounded-xl h-10 px-4 text-xs font-semibold ${
              hasLiked ? "text-pink-400 border-pink-500/30 bg-pink-500/10" : "text-neutral-300 hover:bg-neutral-800"
            }`}
          >
            <Heart className={`w-3.5 h-3.5 mr-1.5 ${hasLiked ? "fill-pink-400" : ""}`} />
            {likes}
          </Button>

          <Button
            onClick={handleCopyLink}
            variant="outline"
            className="border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 rounded-xl h-10 px-4 text-xs font-semibold"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 mr-1.5" />}
            {copiedLink ? "Link Copied" : "Copy Link"}
          </Button>

          <Button
            onClick={handleCopyEmbed}
            variant="outline"
            className="border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 rounded-xl h-10 px-4 text-xs font-semibold"
          >
            {copiedEmbed ? <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-400" /> : <Code2 className="w-3.5 h-3.5 mr-1.5" />}
            {copiedEmbed ? "Embed Copied" : "Embed"}
          </Button>

          <Link href="/studio">
            <Button className="h-10 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl text-xs">
              Record Your Own
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Cinema Video Player & Metadata */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="relative aspect-video rounded-3xl bg-neutral-950 border border-neutral-800 overflow-hidden shadow-2xl">
            <video
              ref={videoRef}
              controls
              playsInline
              className="w-full h-full object-cover"
              poster="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"
            >
              <source
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                type="video/mp4"
              />
              Your browser does not support HTML5 video.
            </video>

            {/* Resolution Badge */}
            <div className="absolute top-4 right-4 bg-neutral-900/90 border border-neutral-700/60 text-purple-300 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md">
              1080p 60 FPS
            </div>
          </div>

          {/* Player Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-md">
            <div className="flex items-center gap-4 text-xs text-neutral-400">
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-purple-400" />
                {views} Views
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-pink-400" />
                Duration: 01:15
              </span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">
                S3 Accelerated
              </span>
            </div>

            {/* Playback Speed Selectors */}
            <div className="flex items-center gap-1.5 bg-neutral-950/80 p-1 rounded-xl border border-neutral-800">
              <span className="text-xs text-neutral-500 px-2 font-medium">Speed:</span>
              {[0.75, 1, 1.25, 1.5, 2].map((s) => (
                <button
                  key={s}
                  onClick={() => handleSpeedChange(s)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    playbackSpeed === s
                      ? "bg-purple-600 text-white shadow-sm"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>

          {/* Author & System Specs */}
          <div className="p-6 rounded-3xl bg-neutral-900/40 border border-neutral-800 backdrop-blur-md">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                  KP
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Kishor Kumar Paroi</h3>
                  <p className="text-xs text-neutral-400">
                    Founder &amp; Principal AI Systems Architect • B.Sc. CSE @ RUET
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                  Verified Production Pipeline
                </span>
              </div>
            </div>

            <p className="mt-4 text-sm text-neutral-300 leading-relaxed">
              Demonstration of KoomAI&apos;s real-time media ingestion pipeline: WebRTC sub-120ms glass-to-glass latency, adaptive bitrate temporal scaling (SVC), zero-copy NVENC/VideoToolbox acceleration, and end-to-end Stripe billing automation.
            </p>
          </div>
        </div>

        {/* Right Column: AI Intelligence & Synchronized Transcript */}
        <div className="flex flex-col gap-6">
          <div className="p-6 rounded-3xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-md flex flex-col h-full">
            {/* Tabs Header */}
            <div className="flex items-center gap-1 p-1 bg-neutral-950/80 rounded-2xl border border-neutral-800 mb-5">
              <button
                onClick={() => setActiveTab("transcript")}
                className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
                  activeTab === "transcript"
                    ? "bg-purple-600 text-white shadow"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                Transcript
              </button>
              <button
                onClick={() => setActiveTab("summary")}
                className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
                  activeTab === "summary"
                    ? "bg-purple-600 text-white shadow"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                AI Summary
              </button>
              <button
                onClick={() => setActiveTab("chapters")}
                className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
                  activeTab === "chapters"
                    ? "bg-purple-600 text-white shadow"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                Chapters
              </button>
              <button
                onClick={() => setActiveTab("comments")}
                className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
                  activeTab === "comments"
                    ? "bg-purple-600 text-white shadow"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                Comments
              </button>
            </div>

            {/* TAB CONTENT: Transcript */}
            {activeTab === "transcript" && (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                <div className="flex items-center justify-between text-xs text-neutral-400 pb-2 border-b border-neutral-800">
                  <span>💡 Click any timestamp to jump to that moment</span>
                  <span className="text-purple-400 font-semibold">OpenAI Whisper-1</span>
                </div>

                {DEMO_TRANSCRIPTS.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSeek(item.time)}
                    className="p-3.5 rounded-2xl bg-neutral-900/60 hover:bg-neutral-800/80 border border-neutral-800/80 hover:border-purple-500/40 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-xs font-bold text-neutral-300 group-hover:text-purple-300">
                        {item.speaker}
                      </span>
                      <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        {item.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: AI Summary */}
            {activeTab === "summary" && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20">
                  <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Executive Takeaways
                  </h4>
                  <p className="text-xs text-neutral-200 leading-relaxed">
                    Automated meeting brief generated by GPT-4 from Whisper speech transcription.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex gap-2.5 items-start">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      <strong>WebRTC Low-Latency:</strong> Achieved glass-to-glass latency under 120ms with zero stutter and 60 FPS delivery.
                    </p>
                  </div>

                  <div className="flex gap-2.5 items-start">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      <strong>Cross-Platform Parity:</strong> Desktop client leverages native OS IPC and hardware NVENC; Chrome extension uses offscreen audio mixing.
                    </p>
                  </div>

                  <div className="flex gap-2.5 items-start">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      <strong>Enterprise Monetization:</strong> Integrated Stripe webhooks with idempotency guards and programmatic subscription tiers ($24K MRR).
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Chapters */}
            {activeTab === "chapters" && (
              <div className="space-y-2.5">
                {CHAPTERS.map((c, i) => (
                  <div
                    key={i}
                    onClick={() => handleSeek(c.time)}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-neutral-900/60 hover:bg-neutral-800/80 border border-neutral-800 cursor-pointer transition-all group"
                  >
                    <span className="text-xs font-semibold text-neutral-200 group-hover:text-purple-300">
                      {c.title}
                    </span>
                    <span className="text-xs font-mono text-neutral-500">
                      {c.duration}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: Comments */}
            {activeTab === "comments" && (
              <div className="space-y-4">
                <form onSubmit={handleAddComment} className="flex gap-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Leave a timecoded note..."
                    className="flex-1 px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500"
                  />
                  <Button type="submit" size="sm" className="bg-purple-600 hover:bg-purple-500 text-xs px-3 rounded-xl">
                    Post
                  </Button>
                </form>

                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                  {comments.map((cm) => (
                    <div key={cm.id} className="p-3.5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div>
                          <span className="text-xs font-bold text-white">{cm.author}</span>
                          <span className="text-[10px] text-neutral-500 ml-1.5">• {cm.role}</span>
                        </div>
                        <span className="text-[10px] text-neutral-500">{cm.time}</span>
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed mt-1">
                        {cm.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
