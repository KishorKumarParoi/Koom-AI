"use server";

import client from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser();
    console.log("user@user.ts: ", user);

    if (!user) {
      return {
        status: 403,
        message: "User not authenticated",
      };
    }

    const userByClerkId = await client.user.findUnique({
      where: { clerkid: user.id },
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
    if (userByClerkId) {
      return {
        status: 200,
        user: userByClerkId,
        message: "User already exists",
      };
    }

    const userByEmail = await client.user.findUnique({
      where: { email: user.emailAddresses[0].emailAddress },
    });

    if (userByEmail) {
      return {
        status: 409,
        message: "A user with this email already exists.",
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

export const searchUsers = async (query: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        status: 404,
        message: "Can't find any user",
        data: { data: [] },
      };
    }

    const users = await client.user.findMany({
      where: {
        OR: [
          {
            firstname: {
              contains: query,
            },
          },
          {
            email: {
              contains: query,
            },
          },
          {
            lastname: {
              contains: query,
            },
          },
        ],
        NOT: [
          {
            clerkid: user.id,
          },
        ],
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        image: true,
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    if (users && users.length > 0) {
      return {
        status: 200,
        data: users,
        message: "Users found successfully!",
      };
    }

    return {
      status: 404,
      data: undefined,
      message: "Can't find any user",
    };
  } catch (error) {
    return {
      status: 500,
      message: `Internal server error, unable to get user: ${error}`,
      data: undefined,
    };
  }
};

export const getFirstView = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        status: 403,
        message: "Can't get authenticated user for payment info",
        data: null,
      };
    }

    const userData = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        firstView: true,
      },
    });

    if (userData) {
      return {
        status: 200,
        data: userData.firstView,
        message: "Fetched First View info Successfully!",
      };
    }

    return {
      status: 404,
      message: "First View not found!",
      data: null,
    };
  } catch (error) {
    return {
      status: 500,
      data: null,
      message: `Internal server error, unable to get first view info: ${error}`,
    };
  }
};

export const enableFirstView = async (state: boolean) => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        status: 403,
        message: "Can't get authenticated user for enabling first view",
        data: null,
      };
    }

    const userData = await client.user.update({
      where: {
        clerkid: user.id,
      },
      data: {
        firstView: state,
      },
    });

    if (userData) {
      return {
        status: 200,
        message: "First View info updated Successfully!",
      };
    }

    return {
      status: 404,
      message: "First View info not updated!",
    };
  } catch (error) {
    return {
      status: 500,
      message: `Internal server error, unable to get first view info: ${error}`,
    };
  }
};
