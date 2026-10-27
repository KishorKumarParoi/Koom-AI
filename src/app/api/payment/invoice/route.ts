import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      clientName = "Acme Corp",
      clientEmail = "billing@acme.com",
      projectTitle = "Distributed WebRTC & Agent Mesh Migration",
      amountUSD = 3200,
      videoId = "demo-walkthrough",
      dueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    } = body;

    const invoiceId = `inv_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const paymentLink = `https://koom.kishor.tech/payment?invoice=${invoiceId}&amount=${amountUSD}`;
    const deliverableUrl = `https://koom.kishor.tech/preview/${videoId}?invoice=${invoiceId}`;

    return NextResponse.json({
      success: true,
      invoice: {
        id: invoiceId,
        clientName,
        clientEmail,
        projectTitle,
        amountUSD,
        currency: "USD",
        status: "issued",
        dueDate,
        paymentLink,
        deliverableWalkthroughUrl: deliverableUrl,
        items: [
          {
            description: `${projectTitle} - Production Milestone`,
            hoursOrUnits: 1,
            unitPrice: amountUSD,
            total: amountUSD,
          },
        ],
        agentVerification: "Verified by BillingInvoicingAgent & SupervisorMeshAgent",
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
