"use server";

import client from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        status: 403,
        message: "User not authenticated",
      };
    }

    const userExist = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      include: {
        workspace: {
          where: {
            User: {
              clerkid: user.id,
            },
          },
        },
      },
    });

    if (userExist) {
      return {
        status: 200,
        user: userExist,
        message: "User already exists",
      };
    }

    //model User {
    //   id           String         @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
    //   email        String         @unique
    //   firstname    String?
    //   lastname     String?
    //   clerkid      String         @unique
    //   image        String?
    //   createdAt    DateTime       @default(now())
    //   updatedAt    DateTime       @updatedAt
    //   trial        Boolean        @default(false)
    //   studio       Media?
    //   workspace    WorkSpace[]
    //   videos       Video[]
    //   subscription Subscription?
    //   members      Member[]
    //   notification Notification[]
    //   sender       Invite[]       @relation("sender")
    //   receiver     Invite[]       @relation("receiver")
    // }

    // create new user
    const newUser = await client.user.create({
      data: {
        clerkid: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstname: user.firstName,
        lastname: user.lastName,
        image: user.imageUrl,
        studio: {
          create: {},
        },
        subscription: {
          create: {},
        },
        workspace: {
          create: {
            name: `${user.firstName}'s WorkSpace`,
            type: "PERSONAL",
          },
        },
      },
      include: {
        workspace: {
          where: {
            User: {
              clerkid: user.id,
            },
          },
        },
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });
    if (newUser) {
      return {
        status: 201,
        user: newUser,
        message: "User created successfully",
      };
    }

    return { status: 400, message: "Can't create new User" };
  } catch (error) {
    return {
      status: 500,
      message: `Error: ${error}`,
    };
  }
};
