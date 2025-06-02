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
      createdAt: string;
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
      processing: boolean;
      Folder: {
        id: string;
        name: string;
      } | null;
      createdAt: Date;
      title: string | null;
      souce: string;
    }[];
  };
};
