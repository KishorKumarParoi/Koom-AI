import { NextRequest, NextResponse } from "next/server";
import { AGENT_REGISTRY, run20AgentParallelMesh } from "@/lib/agents/mesh";

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    meshVersion: "4.0.0",
    totalAgents: AGENT_REGISTRY.length,
    agents: AGENT_REGISTRY,
    architecture: "LangGraph Cyclic State Mesh + FastMCP Tool Protocol + Rust SIMD",
    p99LatencyTarget: "<35ms",
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const result = await run20AgentParallelMesh(body);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to execute 20-agent parallel mesh",
      },
      { status: 500 }
    );
  }
}
