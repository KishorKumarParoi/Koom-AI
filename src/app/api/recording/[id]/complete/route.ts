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
          processing: false,
        },
      });
      return NextResponse.json({ status: 200, message: "Marked video ready" });
    }

    return NextResponse.json({ status: 200, message: "Video record acknowledged" });
  } catch (error) {
    console.error("Error in complete webhook:", error);
    return NextResponse.json({ status: 500, error: String(error) }, { status: 500 });
  }
}
