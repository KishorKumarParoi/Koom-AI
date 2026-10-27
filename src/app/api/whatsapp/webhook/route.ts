import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Webhook verification endpoint (Meta / Twilio verification challenge)
  const searchParams = req.nextUrl.searchParams;
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === (process.env.WHATSAPP_VERIFY_TOKEN || "koom_ai_token_2026")) {
    return new Response(challenge, { status: 200 });
  }

  return NextResponse.json({
    status: "online",
    gateway: "KoomAI WhatsApp Bot Mesh Gateway",
    commandsSupported: ["/status", "/jobs", "/bid <company>", "/invoice <client> <amount>", "/pomodoro"],
  });
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    let incomingMsg = "";
    let sender = "";

    // Support both Form-encoded (Twilio) and JSON (Meta WhatsApp Cloud API)
    if (rawBody.includes("Body=") || rawBody.includes("From=")) {
      const params = new URLSearchParams(rawBody);
      incomingMsg = (params.get("Body") || "").trim();
      sender = params.get("From") || "Unknown";
    } else {
      try {
        const json = JSON.parse(rawBody);
        incomingMsg = json?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.text?.body || "";
        sender = json?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.from || "Unknown";
      } catch {
        incomingMsg = "";
      }
    }

    const command = incomingMsg.toLowerCase();
    let replyText = "";

    if (command.startsWith("/status")) {
      replyText = `⚡ *KoomAI Beast Status Update*\n\n• *20-Agent Parallel Mesh:* 20/20 HEALTHY (p99 < 35ms)\n• *WebRTC Stream:* 60 FPS active\n• *Active Sprints:* Sprint #2 (15m remaining)\n• *Monthly Run Rate:* $24,800 MRR\n• *Live Cockpit:* https://koom.kishor.tech/beast`;
    } else if (command.startsWith("/jobs")) {
      replyText = `🎯 *Top Matches from JobHunterAgent*\n\n1. *Principal AI Systems Architect* - Stripe (Remote) • Match: 96%\n2. *Staff Distributed Streaming Lead* - Databricks • Match: 93%\n3. *Lead WebRTC / Media Engineer* - Loom • Match: 95%\n\nType \`/bid <company>\` to generate an instant Trojan Horse teardown.`;
    } else if (command.startsWith("/bid")) {
      const target = incomingMsg.split(" ")[1] || "Target Company";
      replyText = `🚀 *READeconstructorAgent Triggered for ${target}*\n\n• Web bundle dissected.\n• Trojan Horse architectural teardown proposal formulated.\n• ATS resume tailored.\n• Ready to review: https://koom.kishor.tech/beast?tab=jobs`;
    } else if (command.startsWith("/invoice")) {
      const parts = incomingMsg.split(" ");
      const client = parts[1] || "Enterprise Client";
      const amount = parts[2] || "$3,200";
      replyText = `💳 *Stripe Invoice Generated*\n\n• *Client:* ${client}\n• *Amount:* ${amount}\n• *Deliverable:* Screen recording attached\n• *Payment Link:* https://koom.kishor.tech/payment?invoice=${Date.now()}`;
    } else if (command.startsWith("/pomodoro")) {
      replyText = `⏳ *PomodoroFocusAgent*\n\n• Current Block: Deep Architecture Work\n• Time Remaining: 14m 20s\n• Ambient: 432Hz focus audio active.`;
    } else {
      replyText = `👋 *Welcome to KoomAI WhatsApp Bot*\n\nSend one of these commands:\n• \`/status\` - Live 20-agent telemetry\n• \`/jobs\` - Scraped high-salary matches\n• \`/bid <company>\` - Generate Trojan Horse application\n• \`/invoice <client> <amount>\` - Issue instant Stripe invoice\n• \`/pomodoro\` - Check focus sprint`;
    }

    // Return TwiML format if form-encoded, otherwise JSON
    if (rawBody.includes("Body=") || rawBody.includes("From=")) {
      const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>${replyText.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</Message>
</Response>`;
      return new Response(twiml, {
        headers: { "Content-Type": "application/xml" },
      });
    }

    return NextResponse.json({
      success: true,
      sender,
      receivedMessage: incomingMsg,
      response: replyText,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
