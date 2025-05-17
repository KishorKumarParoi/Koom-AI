"use server";

import client from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser();
    console.log("user: ", user);

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

    console.log("New User: ", newUser);

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

export const getUserNotifications = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return {
        status: 403,
        message: "User not authenticated",
      };
    }

    const notifications = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        notification: true,
        _count: {
          select: {
            notification: true,
          },
        },
      },
    });

    if (notifications && notifications.notification.length > 0) {
      return {
        status: 200,
        message: "User Notifications found!",
        data: { notifications },
      };
    }

    return {
      status: 404,
      message: "Can't find any notifications",
      data: { data: [] },
    };
  } catch (error) {
    return {
      status: 500,
      message: `Internal server error, unable to get user notifications: ${error}`,
      data: { data: [] },
    };
  }
};
