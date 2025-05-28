"use client";

import { createFolder } from "@/actions/workspace";
import { useMutationData } from "./useMutationData";

export const useCreateFolder = (workSpaceId: string) => {
  const { mutate } = useMutationData(
    ["create-folder"],
    () => createFolder(workSpaceId),
    "workspace-folders"
  );

  const onCreateNewFolder = () => {
    mutate({ name: "Untitled", id: "Optimistic--id" });
  };

  return { onCreateNewFolder };
};
