"use client";

import { Button } from "@/components/ui/button";
import { Mail, MapPin, MessageSquare, Send, Sparkles, CheckCircle2, ShieldCheck, Clock, Github } from "lucide-react";
import React, { useState } from "react";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    inquiryType: "sales",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate instantaneous async dispatch
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="py-12 md:py-20 px-4 max-w-7xl mx-auto flex flex-col items-center">
      {/* Header */}
      <div className="text-center max-w-3xl mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs sm:text-sm font-semibold mb-6 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>Connect with Engineering &amp; Sales</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
          Let&apos;s build the future of{" "}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
            async collaboration
          </span>
        </h1>
        <p className="mt-5 text-base sm:text-lg text-neutral-300 leading-relaxed">
          Have questions about our sub-120ms WebRTC pipeline, Whisper AI transcription, or Enterprise multi-tenant VPC deployments? We are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 w-full max-w-6xl">
        {/* Contact Information & Status */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="p-8 rounded-3xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm space-y-6">
            <h2 className="text-2xl font-bold text-white mb-2">Get in Touch</h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Our engineering and product teams respond to all technical and enterprise inquiries within 4 business hours.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Direct Email</p>
                  <a href="mailto:support@koomai.io" className="text-sm font-medium text-white hover:text-purple-400 transition">
                    support@koomai.io
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Global Headquarters</p>
                  <p className="text-sm text-neutral-300">San Francisco, CA &amp; Distributed Worldwide</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Open Source &amp; Docs</p>
                  <a
                    href="https://github.com/KishorKumarParoi/Koom-AI"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-white hover:text-purple-400 transition"
                  >
                    github.com/KishorKumarParoi/Koom-AI
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Live System Health Badge */}
          <div className="p-6 rounded-3xl bg-neutral-900/40 border border-neutral-800 backdrop-blur-sm flex items-center gap-4">
            <div className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
            </div>
            <div>
              <p className="text-sm font-bold text-white flex items-center gap-1.5">
                All Systems Operational
              </p>
              <p className="text-xs text-neutral-400">WebRTC Clusters, Whisper Ingestion &amp; Database: 99.99% Uptime</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-md">
          {submitted ? (
            <div className="text-center py-12 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Message Dispatched Successfully</h3>
              <p className="text-neutral-300 text-sm max-w-md mb-8">
                Thank you for contacting KoomAI. An engineer or account specialist will review your inquiry and follow up within 4 hours.
              </p>
              <Button
                onClick={() => {
                  setSubmitted(false);
                  setFormState({ name: "", email: "", inquiryType: "sales", subject: "", message: "" });
                }}
                className="bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl"
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">Your Name</label>
                  <input
                    required
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Alex Morgan"
                    className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-purple-500 transition text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">Work Email</label>
                  <input
                    required
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-purple-500 transition text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">Inquiry Type</label>
                  <select
                    value={formState.inquiryType}
                    onChange={(e) => setFormState({ ...formState, inquiryType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-purple-500 transition text-sm cursor-pointer"
                  >
                    <option value="sales">Enterprise &amp; Sales Pricing</option>
                    <option value="technical">Technical Support &amp; WebRTC</option>
                    <option value="partnership">API &amp; Partnership Integration</option>
                    <option value="billing">Billing &amp; Subscription Inquiries</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">Subject</label>
                  <input
                    required
                    type="text"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    placeholder="Enterprise VPC Demo Request"
                    className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-purple-500 transition text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Tell us about your team size, video recording requirements, or technical questions..."
                  className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-purple-500 transition text-sm resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl shadow-lg shadow-purple-500/25 transition flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Transmitting...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry</span>
                  </>
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
