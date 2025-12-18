import client from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const startTime = Date.now();
  let dbStatus = "DISCONNECTED";

  try {
    await client.$queryRaw`SELECT 1`;
    dbStatus = "CONNECTED";
  } catch (err) {
    dbStatus = `UNREACHABLE (${err instanceof Error ? err.message : String(err)})`;
  }

  const isHealthy = dbStatus === "CONNECTED";

  return NextResponse.json({
    status: isHealthy ? "HEALTHY" : "DEGRADED",
    service: "koom-ai-web",
    framework: "Next.js 15 (App Router)",
    timestamp: new Date().toISOString(),
    latency_ms: Date.now() - startTime,
    database: dbStatus,
    clerk_auth: Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY),
    stripe_billing: Boolean(process.env.STRIPE_SECRET_KEY),
    endpoints: {
      dashboard: "/dashboard",
      api_recording_processing: "/api/recording/:id/processing",
      api_recording_transcribe: "/api/recording/:id/transcribe",
      api_recording_complete: "/api/recording/:id/complete",
    },
  });
}
