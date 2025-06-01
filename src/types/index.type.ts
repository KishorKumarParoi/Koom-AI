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
