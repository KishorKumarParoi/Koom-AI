import client from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await req.json();
    const { id } = await params;

    if (!id || !body?.filename) {
      return NextResponse.json({ status: 400, message: "Missing id or filename" }, { status: 400 });
    }

    // Find or create workspace for user
    let userRecord = await client.user.findUnique({
      where: { id },
      include: {
        workspace: {
          orderBy: { createdAt: "asc" },
        },
        subscription: true,
      },
    });

    if (!userRecord) {
      console.warn(`[KoomAI Processing] User with id ${id} not found in DB. Returning nominal status.`);
      return NextResponse.json({ status: 200, plan: "FREE" });
    }

    let targetWorkspaceId = userRecord.workspace[0]?.id;

    if (!targetWorkspaceId) {
      // Auto-provision personal workspace
      const newWs = await client.workSpace.create({
        data: {
          name: `${userRecord.firstname || "My"}'s Workspace`,
          type: "PERSONAL",
          userId: id,
        },
      });
      targetWorkspaceId = newWs.id;
    }

    const startProcessingVideo = await client.workSpace.update({
      where: {
        id: targetWorkspaceId,
      },
      data: {
        videos: {
          create: {
            source: body.filename,
            userId: id,
          },
        },
      },
      select: {
        User: {
          select: {
            subscription: {
              select: {
                plan: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({
      status: 200,
      plan: startProcessingVideo?.User?.subscription?.plan || "FREE",
    });
  } catch (error) {
    console.error("🔴 Error in processing video webhook:", error);
    return NextResponse.json({ status: 500, error: String(error) }, { status: 500 });
  }
}
