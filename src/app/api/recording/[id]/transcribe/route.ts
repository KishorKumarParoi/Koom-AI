import client from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { id } = await params;

    if (!id || !body?.filename) {
      return NextResponse.json({ status: 400, message: "Missing id or filename" }, { status: 400 });
    }

    let parsedContent: { title?: string; summary?: string } = {};
    if (typeof body.content === "string") {
      try {
        parsedContent = JSON.parse(body.content);
      } catch {
        parsedContent = { title: "Screen Recording", summary: body.content };
      }
    } else if (body.content && typeof body.content === "object") {
      parsedContent = body.content;
    }

    const title = parsedContent.title || "Screen Recording";
    const description = parsedContent.summary || "Recorded via KoomAI";
    const summaryText = body.transcript || description;

    // Check if video exists first
    const existingVideo = await client.video.findFirst({
      where: {
        userId: id,
        source: body.filename,
      },
    });

    if (existingVideo) {
      await client.video.update({
        where: { id: existingVideo.id },
        data: {
          title,
          description,
          summary: summaryText,
        },
      });
      console.log(`[KoomAI Transcribe] 🟢 Updated transcription for ${body.filename}`);
    } else {
      console.warn(`[KoomAI Transcribe] 🟡 Video ${body.filename} not found for user ${id}`);
    }

    return NextResponse.json({ status: 200, message: "Transcription processed" });
  } catch (error) {
    console.error("🔴 Transcription error in route:", error);
    return NextResponse.json({ status: 500, error: String(error) }, { status: 500 });
  }
}
