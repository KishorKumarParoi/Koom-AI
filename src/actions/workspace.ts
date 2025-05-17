"use server";

import client from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const verifyAccessToWorkspace = async (workSpaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        status: 403,
        message: "User not authenticated",
      };
    }

    const isUserInWorkSpace = await client.workSpace.findUnique({
      where: {
        id: workSpaceId,
        OR: [
          {
            User: {
              clerkid: user.id,
            },
          },
          {
            members: {
              every: {
                User: {
                  clerkid: user.id,
                },
              },
            },
          },
        ],
      },
    });

    return {
      status: 200,
      message: "User has access to the workspace",
      data: { workSpace: isUserInWorkSpace },
    };
  } catch (error) {
    return {
      status: 500,
      message: `Internal server error, unable to verify user: ${error}`,
      data: { workSpace: null },
    };
  }
};

export const getWorkSpaceFolders = async (workSpaceId: string) => {
  try {
    const isFoldersInWorkSpace = await client.folder.findMany({
      where: {
        workSpaceId: workSpaceId,
      },
      include: {
        videos: true,
        _count: {
          select: {
            videos: true,
          },
        },
      },
    });

    if (isFoldersInWorkSpace && isFoldersInWorkSpace.length > 0) {
      return {
        status: 200,
        message: "Folders found in workspace",
        data: { folders: isFoldersInWorkSpace },
      };
    }

    return {
      status: 404,
      message: "No folders found in workspace",
      data: { folders: null },
    };
  } catch (error) {
    return {
      status: 500,
      message: `Internal server error, unable to get workspace folders: ${error}`,
      data: { folders: null },
    };
  }
};

export const getAllUserVideos = async (workSpaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        status: 404,
        message: "User not authenticated",
      };
    }

    const videos = await client.video.findMany({
      where: {
        OR: [{ workSpaceId }, { folderId: workSpaceId }],
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        source: true,
        processing: true,
        Folder: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (videos && videos.length > 0) {
      return {
        status: 200,
        message: "Videos found in workspace",
        data: { videos },
      };
    }
    return {
      status: 404,
      message: "No videos found in workspace",
      data: { videos: null },
    };
  } catch (error) {
    return {
      status: 500,
      message: `Internal server error, unable to get user videos: ${error}`,
      data: { videos: null },
    };
  }
};

export const getWorkSpaces = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        status: 403,
        message: "User not authenticated",
      };
    }

    const workSpaces = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
        workspace: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
        members: {
          select: {
            WorkSpace: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
        },
      },
    });

    if (workSpaces) {
      return {
        status: 200,
        message: "Workspaces found",
        data: { workSpaces },
      };
    }
    return {
      status: 404,
      message: "No workspaces found",
      data: { workSpaces: null },
    };
  } catch (error) {
    return {
      status: 500,
      message: `Internal server error, unable to get user workspaces: ${error}`,
      data: { workSpaces: null },
    };
  }
};

