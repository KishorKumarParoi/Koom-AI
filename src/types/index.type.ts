export type WorkSpaceProps = {
  data: {
    workSpaces: {
      subscription: {
        plan: "FREE" | "PRO";
      } | null;
      workspace: {
        id: string;
        name: string;
        type: "PUBLIC" | "PERSONAL";
      }[];
      members: {
        WorkSpace: {
          id: string;
          name: string;
          type: "PUBLIC" | "PERSONAL";
        };
      }[];
    };
  };
};

export type NotificationProps = {
  status: number;
  data: {
    _count: {
      notification: number;
    };
  };
};

export type FoldersProps = {
  status: number;
  message: string;
  data: {
    folders: ({
      _count: {
        videos: number;
      };
    } & {
      id: string;
      name: string;
      createdAt: Date;
      workSpaceId: string | null;
    })[];
  };
};

export type FolderProps = {
  status: string;
  message: string;
  data: {
    name: string;
    _count: {
      videos: number;
    };
  };
};

export type PlanProps = {
  status: number;
  message: string;
  data: {
    workSpaces: {
      subscription: {
        plan: "FREE" | "PRO";
      } | null;
      workspace: {
        id: string;
        name: string;
        type: "PUBLIC" | "PERSONAL";
      }[];
      members: {
        WorkSpace: {
          id: string;
          name: string;
          type: "PUBLIC" | "PERSONAL";
        };
      }[];
    };
  };
};

export type VideosProps = {
  status: number;
  message: string;
  data: {
    videos: {
      User: {
        firstname: string | null;
        lastname: string | null;
        image: string | null;
      } | null;
      id: string;
      Folder: {
        id: string;
        name: string;
      } | null;
      processing: boolean;
      createdAt: Date;
      title: string | null;
      source: string;
      workSpaceId: string;
    }[];
  };
};

export type VideoCardProps = {
  User: {
    firstname: string | null;
    lastname: string | null;
    image: string | null;
  } | null;
  id: string;
  Folder: {
    id: string;
    name: string;
  } | null;
  processing: boolean;
  createdAt: Date;
  title: string | null;
  source: string;
  workSpaceId: string;
};

export type VideoProps = {
  status: number;
  message: string;
  author: boolean;
  data:
    | {
        User: {
          firstname: string | null;
          lastname: string | null;
          clerkid: string;
          image: string | null;
          subscription: {
            plan: "PRO" | "FREE";
          };
          trial: boolean;
        } | null;
        id: string;
        Folder: {
          id: string;
          name: string;
        } | null;
        processing: boolean;
        createdAt: Date;
        title: string | null;
        description: string | null;
        source: string | undefined;
        views: true;
        summary: true;
      }
    | undefined;
};

export type CommentRepliesProps = {
  id: string;
  comment: string;
  createdAt: Date;
  commentId: string | null;
  userId: string | null;
  videoId: string | null;
  User: {
    id: string;
    email: string;
    firstname: string | null;
    lastname: string | null;
    createdAt: Date;
    clerkId: string;
    iamge: string | null;
    trial: boolean;
    firstView: boolean;
  } | null;
};

export type VideoCommentProps = {
  data: {
    User: {
      id: string;
      firstname: string | null;
      lastname: string | null;
      email: string;
      createdAt: Date;
      clerkId: string;
      image: string | null;
      trial: boolean;
      firstView: boolean;
    } | null;
    reply: CommentRepliesProps[];
    id: string;
    comment: string;
    createdAt: Date;
    commentId: string | null;
    userId: string | null;
    videoId: string | null;
  }[];
};
