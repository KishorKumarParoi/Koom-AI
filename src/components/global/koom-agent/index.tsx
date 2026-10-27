"use client";

import React, { useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Bot,
  Sparkles,
  GitPullRequest,
  CheckSquare,
  Code2,
  FileText,
  Zap,
  Send,
  Copy,
  Check,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

type Props = {
  videoId: string;
  videoTitle: string;
  videoDescription?: string;
  transcript?: string;
  authorName?: string;
};

type Message = {
  role: "user" | "agent";
  content: string;
  timestamp?: string;
};

const KoomAgentCockpit: React.FC<Props> = ({
  videoId,
  videoTitle,
  videoDescription = "",
  transcript = "",
  authorName = "Author",
}) => {
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [actionOutput, setActionOutput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [userQuery, setUserQuery] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "agent",
      content: `👋 Hey! I am **KoomAgent**, your autonomous video intelligence copilot. I have indexed this video and its Whisper transcript. Ask me anything, or click any of the 1-click action buttons below to turn this recording into software artifacts!`,
    },
  ]);

  const triggerAction = async (actionType: string) => {
    setActiveAction(actionType);
    setLoading(true);
    setActionOutput("");

    try {
      const res = await fetch("/api/agent/video-copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          videoId,
          action: actionType,
          videoTitle,
          videoDescription,
          transcript,
          authorName,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setActionOutput(data.result);
        toast.success(`KoomAgent generated ${actionType.replace("_", " ").toUpperCase()}`);
      } else {
        toast.error("Failed to generate action deliverable");
      }
    } catch {
      toast.error("Unable to reach KoomAgent API");
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim() || loading) return;

    const query = userQuery.trim();
    setUserQuery("");
    const newMessages: Message[] = [...messages, { role: "user", content: query }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/agent/video-copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          videoId,
          action: "chat",
          userQuery: query,
          videoTitle,
          videoDescription,
          transcript,
          authorName,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessages([
          ...newMessages,
          {
            role: "agent",
            content: data.result,
          },
        ]);
      } else {
        setMessages([
          ...newMessages,
          {
            role: "agent",
            content: "Sorry, I encountered an issue analyzing that question. Please try again.",
          },
        ]);
      }
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "agent",
          content: "Network error contacting KoomAgent service.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <TabsContent
      value="KoomAgent ⚡"
      className="p-5 bg-gradient-to-br from-[#1c1427] via-[#14121e] to-[#0f0e17] border border-purple-500/20 rounded-2xl flex flex-col gap-y-6 shadow-2xl backdrop-blur-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white tracking-tight">KoomAgent</h2>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Copilot
              </span>
            </div>
            <p className="text-xs text-neutral-400">Autonomous Action Engine for Async Video</p>
          </div>
        </div>
        <div className="text-xs text-purple-300/80 font-mono hidden sm:block">
          sub-120ms WebRTC &bull; Whisper AI
        </div>
      </div>

      {/* 1-Click Action Pill Buttons */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            Instant Action Generators
          </span>
          {activeAction && (
            <button
              onClick={() => {
                setActiveAction(null);
                setActionOutput("");
              }}
              className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer transition"
            >
              <RefreshCw className="w-3 h-3" />
              Reset View
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => triggerAction("github_pr")}
            disabled={loading}
            className={`h-9 text-xs justify-start gap-2 border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 text-purple-200 transition ${
              activeAction === "github_pr" ? "ring-2 ring-purple-500 bg-purple-500/20" : ""
            }`}
          >
            <GitPullRequest className="w-3.5 h-3.5 text-purple-400" />
            GitHub PR / Issue
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => triggerAction("jira_ticket")}
            disabled={loading}
            className={`h-9 text-xs justify-start gap-2 border-pink-500/30 bg-pink-500/10 hover:bg-pink-500/20 text-pink-200 transition ${
              activeAction === "jira_ticket" ? "ring-2 ring-pink-500 bg-pink-500/20" : ""
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5 text-pink-400" />
            Jira / Linear Ticket
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => triggerAction("playwright_test")}
            disabled={loading}
            className={`h-9 text-xs justify-start gap-2 border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-200 transition ${
              activeAction === "playwright_test" ? "ring-2 ring-cyan-500 bg-cyan-500/20" : ""
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            Playwright E2E Test
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => triggerAction("confluence_sop")}
            disabled={loading}
            className={`h-9 text-xs justify-start gap-2 border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-200 transition ${
              activeAction === "confluence_sop" ? "ring-2 ring-indigo-500 bg-indigo-500/20" : ""
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            Confluence SOP
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => triggerAction("action_items")}
            disabled={loading}
            className={`h-9 text-xs justify-start gap-2 border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-200 transition col-span-2 sm:col-span-1 ${
              activeAction === "action_items" ? "ring-2 ring-amber-500 bg-amber-500/20" : ""
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Action Items Brief
          </Button>
        </div>
      </div>

      {/* Generated Action Output Container */}
      {actionOutput && (
        <div className="flex flex-col gap-2 bg-black/60 border border-purple-500/30 rounded-xl p-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <span className="text-xs font-semibold text-purple-300 flex items-center gap-1.5 uppercase">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              Generated Deliverable ({activeAction?.replace("_", " ")})
            </span>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => copyToClipboard(actionOutput)}
              className="h-7 px-2 text-xs text-neutral-300 hover:text-white hover:bg-purple-500/20 gap-1.5 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy Markdown
                </>
              )}
            </Button>
          </div>
          <pre className="text-xs text-neutral-200 font-mono whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto p-2 bg-neutral-950/70 rounded-lg border border-neutral-900">
            {actionOutput}
          </pre>
        </div>
      )}

      {/* Interactive Chat Stream */}
      <div className="flex flex-col gap-3">
        <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
          <Bot className="w-3.5 h-3.5 text-purple-400" />
          Interactive Video Q&A
        </span>

        <div className="flex flex-col gap-2.5 max-h-64 overflow-y-auto pr-1">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl text-xs leading-relaxed max-w-[95%] ${
                m.role === "user"
                  ? "bg-purple-600/30 text-purple-100 border border-purple-500/30 self-end ml-4"
                  : "bg-neutral-900/80 text-neutral-200 border border-neutral-800 self-start mr-4"
              }`}
            >
              {m.content}
            </div>
          ))}
          {loading && !actionOutput && (
            <div className="p-3 rounded-xl text-xs bg-neutral-900/80 text-purple-300 border border-neutral-800 self-start animate-pulse flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              KoomAgent is synthesizing response from video transcript...
            </div>
          )}
        </div>

        {/* Input Field */}
        <form onSubmit={handleSendMessage} className="flex gap-2 items-center mt-1">
          <input
            type="text"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            placeholder="Ask KoomAgent anything about this video (e.g. 'What was the error at 01:20?')..."
            className="flex-1 bg-black/50 border border-purple-500/30 focus:border-purple-400 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none transition shadow-inner"
          />
          <Button
            type="submit"
            disabled={loading || !userQuery.trim()}
            className="h-9 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl shadow-md shadow-purple-500/20 text-xs font-medium flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            Ask
          </Button>
        </form>
      </div>
    </TabsContent>
  );
};

export default KoomAgentCockpit;
