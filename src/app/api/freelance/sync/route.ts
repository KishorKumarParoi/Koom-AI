import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    timestamp: new Date().toISOString(),
    status: "synchronized",
    platforms: {
      upwork: {
        connected: true,
        profileTitle: "Principal AI Systems Architect • 15 Production Architectures",
        activeProposals: 4,
        directInvites: 3,
        escrowBalance: "$4,500.00",
        jobSuccessScore: "100%",
        topRatedPlus: true,
      },
      linkedin: {
        connected: true,
        headline: "Principal AI Systems Architect • Founder @ KoomAI • RUET CSE",
        recruiterInquiriesThisWeek: 8,
        profileViews30d: 1420,
        pendingConnectionRequests: 15,
      },
      fiverr_pro: {
        connected: true,
        sellerLevel: "Top Rated Seller",
        activeOrders: 2,
        pendingEarnings: "$3,200.00",
        averageRating: 5.0,
      },
      toptal: {
        connected: true,
        status: "Active Top 3% Talent",
        interviewRequests: 2,
        hourlyRate: "$150/hr",
      },
    },
    aggregatedMetrics: {
      totalActivePipeline: "$12,200.00",
      weeklyInboundLeadVelocity: "+42%",
      actionRequired: "Review 1 direct enterprise invite on Upwork for WebRTC/LangGraph",
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { platform = "upwork", action = "draft_proposal", jobUrl = "" } = body;

    return NextResponse.json({
      success: true,
      platform,
      action,
      jobUrl,
      draftedPitch: `Hi there,

I reviewed your requirements and formulated an immediate architectural proposal. At KoomAI, I engineered our sub-120ms WebRTC streaming engine and 20-agent LangGraph parallel mesh ($24K MRR). 

I recorded a 2-minute personalized video walkthrough deconstructing your technical architecture and outlining the exact implementation steps:
https://koom.kishor.tech/preview/demo-walkthrough

Key deliverables I will provide:
1. Production microservices with strict p99 < 35ms latency targets.
2. Complete Playwright E2E test specs and zero-downtime CI/CD deployment.
3. Daily Loom/Koom async video updates with full transparency.

Looking forward to discussing.
Best regards,
Kishor Kumar Paroi (Principal AI Systems Architect)`,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
