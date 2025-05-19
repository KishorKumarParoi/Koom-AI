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
