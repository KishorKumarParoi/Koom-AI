"use server";

import client from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { validate as isUuid } from "uuid";

export const verifyAccessToWorkspace = async (workSpaceId: string) => {
  try {
    const user = await currentUser();
    console.log("User@verifyAccess: ", user);

    console.log("workSpaceId@workspace.ts:", workSpaceId);

    if (!user) {
      return {
        status: 403,
        message: "User not authenticated",
        data: { workSpace: null },
      };
    }

    const isUserInWorkSpace = await client.workSpace.findFirst({
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
              some: {
                User: {
                  clerkid: user.id,
                },
              },
            },
          },
        ],
      },
    });

    if (!isUserInWorkSpace) {
      return {
        status: 403,
        message: "User does not have access to the workspace",
        data: { workSpace: null },
      };
    }

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
        status: 403,
        message: "User not authenticated",
        data: { videos: null },
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
        description: true,
        views: true,
        summary: true,
        Folder: {
          select: {
            id: true,
            name: true,
          },
        },
        User: {
          select: {
            firstname: true,
            lastname: true,
            image: true,
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

export const createWorkspace = async (name: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        status: 403,
        message: "Can't get User",
        data: null,
      };
    }

    const authorized = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    if (authorized?.subscription?.plan === "PRO") {
      const workspace = await client.user.update({
        where: {
          clerkid: user.id,
        },
        data: {
          workspace: {
            create: {
              name,
              type: "PUBLIC",
            },
          },
        },
      });

      if (workspace) {
        return {
          status: 201,
          message: "New Workspace Created",
          data: workspace,
        };
      }
    }

    return {
      status: 404,
      message: "Can't create Workspace",
      data: null,
    };
  } catch (error) {
    return {
      status: 500,
      message: `Internal server error, unable to create workspaces: ${error}`,
      data: { workSpaces: null },
    };
  }
};

export const renameFolders = async (folderId: string, name: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        status: 403,
        message: "Can't get authenticated user for renaming folders",
        data: null,
      };
    }

    const folder = await client.folder.update({
      where: {
        id: folderId,
      },
      data: {
        name,
      },
    });

    if (folder) {
      return {
        status: 200,
        message: "Folder renamed Successfully!",
        data: folder,
      };
    }

    return {
      status: 404,
      message: "Folder doesn't Exist!",
      data: null,
    };
  } catch (error) {
    return {
      status: 500,
      message: `Internal server error, unable to rename Folders: ${error}`,
      data: { workSpaces: null },
    };
  }
};

export const createFolder = async (workSpaceId: string) => {
  try {
    const isNewFolder = await client.workSpace.update({
      where: {
        id: workSpaceId,
      },
      data: {
        folders: {
          create: {
            name: "Untitled",
          },
        },
      },
    });

    if (isNewFolder) {
      return {
        status: 200,
        message: "New Folder created Successfully!",
      };
    }

    return {
      status: 404,
      message: "New Folder can't be created!",
    };
  } catch (error) {
    return {
      status: 500,
      message: `Internal server error, unable to create Folder: ${error}`,
    };
  }
};

export const getFolderInfo = async (folderId: string) => {
  try {
    const folder = await client.folder.findUnique({
      where: {
        id: folderId,
      },
      select: {
        name: true,
        _count: {
          select: {
            videos: true,
          },
        },
      },
    });

    if (folder) {
      return {
        status: 200,
        data: folder,
        message: "Folder information fetched Successfully!",
      };
    }
    return {
      status: 404,
      message: "New Folder can't be created!",
      data: null,
    };
  } catch (error) {
    return {
      status: 500,
      message: `Internal server error, unable to get Folder info: ${error}`,
    };
  }
};

export const moveVideoLocation = async (
  videoId: string,
  workSpaceId: string,
  folderId: string
) => {
  try {
    const location = await client.video.update({
      where: {
        id: videoId,
      },
      data: {
        folderId: folderId || null,
        workSpaceId,
      },
    });

    if (location) {
      return {
        status: 200,
        data: location,
        message: "Folder location changed Successfully!",
      };
    }

    return {
      status: 404,
      message: "workspace/folder not found!",
      data: null,
    };
  } catch (error) {
    return {
      status: 500,
      data: null,
      message: `Internal server error, unable to move folder location: ${error}`,
    };
  }
};

export const getAllVideos = async (workSpaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        status: 403,
        message: "Can't get authenticated user for fetching all videos",
        data: null,
      };
    }

    if (!isUuid(workSpaceId)) {
      return {
        status: 400,
        message: "Invalid workspace ID Format",
        data: { videos: null },
      };
    }

    const videos = await client.video.findMany({
      where: {
        workSpaceId,
      },
      select: {
        User: {
          select: {
            firstname: true,
            lastname: true,
            image: true,
          },
        },
        id: true,
        Folder: {
          select: {
            id: true,
            name: true,
          },
        },
        processing: true,
        title: true,
        description: true,
        views: true,
        summary: true,
        createdAt: true,
        source: true,
        workSpaceId: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (videos && videos.length > 0) {
      return {
        status: 200,
        data: videos,
        message: "Fetched All Videos Successfully!",
      };
    }

    return {
      status: 404,
      message: "videos not found!",
      data: null,
    };
  } catch (error) {
    return {
      status: 500,
      data: null,
      message: `Internal server error, unable to get all videos list: ${error}`,
    };
  }
};

export const getPreviewVideo = async (videoId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        status: 403,
        message: "Can't get authenticated user for fetching video",
        data: null,
      };
    }

    const video = await client.video.findUnique({
      where: {
        id: videoId,
      },
      select: {
        title: true,
        createdAt: true,
        source: true,
        description: true,
        processing: true,
        views: true,
        summary: true,
        User: {
          select: {
            firstname: true,
            lastname: true,
            image: true,
            clerkid: true,
            trial: true,
            subscription: {
              select: {
                plan: true,
              },
            },
          },
        },
      },
    });

    if (video) {
      return {
        status: 200,
        data: video,
        author: user.id === video.User?.clerkid ? true : false,
        message: "Fetched Video Successfully!",
      };
    }

    return {
      status: 404,
      message: "video not found!",
      author: null,
      data: null,
    };
  } catch (error) {
    return {
      status: 500,
      data: null,
      message: `Internal server error, unable video: ${error}`,
    };
  }
};

export const getPaymentInfo = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        status: 403,
        message: "Can't get authenticated user for payment info",
        data: null,
      };
    }

    const payment = await client.user.findUnique({
      where: {
        clerkid: user?.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    if (payment) {
      return {
        status: 200,
        data: payment,
        message: "Fetched Payment Info Successfully!",
      };
    }

    return {
      status: 404,
      message: "Payment not found!",
      data: null,
    };
  } catch (error) {
    return {
      status: 500,
      data: null,
      message: `Internal server error, unable to get payment info: ${error}`,
    };
  }
};


