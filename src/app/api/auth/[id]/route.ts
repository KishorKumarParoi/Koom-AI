import client from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    console.log("Endpoints hit ✅");
    const userProfile = await client.user.findUnique({
      where: {
        clerkid: id,
      },
      include: {
        studio: true,
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    if (userProfile)
      return NextResponse.json({ status: 200, user: userProfile });

    // if there is no user found, create one
    const clerkUserInstance = await (await clerkClient()).users.getUser(id);
    const createUser = await client.user.create({
      data: {
        clerkid: id,
        email: clerkUserInstance.emailAddresses[0].emailAddress,
        firstname: clerkUserInstance.firstName,
        lastname: clerkUserInstance.lastName,
        studio: {
          create: {},
        },
        workspace: {
          create: {
            name: `${clerkUserInstance.firstName || "User"}'s Workspace`,
            type: "PERSONAL",
          },
        },
        subscription: {
          create: {},
        },
      },
      include: {
        subscription: {
          select: {
            plan: true,
          },
        },
        studio: true,
        workspace: {
          select: {
            name: true,
            type: true,
          },
        },
      },
    });

    if (createUser) return NextResponse.json({ status: 201, user: createUser });
  } catch (error) {
    console.log("error: ", error);
    return NextResponse.json({ status: 500, error: String(error) }, { status: 500 });
  }
}
