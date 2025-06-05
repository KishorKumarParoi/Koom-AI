import { getWorkSpaceFolders, moveVideoLocation } from "@/actions/workspace";
import { moveVideoSchema } from "@/components/global/forms/change-video-location/schema";
import { useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import { useMutationData } from "./useMutationData";
import useZodForm from "./useZodForm";

export const useMoveVideos = (videoId: string, currentWorkspace: string) => {
  // get state redux store
  const { folders } = useAppSelector((state) => state.folders);
  const { workspaces } = useAppSelector((state) => state.workspaces);

  // fetching states
  const [isFetching, setIsFetching] = useState(false);

  // state folders
  const [isFolders, setIsFolders] = useState<
    | ({
        _count: {
          videos: number;
        };
      } & {
        id: string;
        name: string;
        createdAt: Date;
        workSpaceId: string | null;
      })[]
    | undefined
  >(undefined);

  // use mutation data optimistic
  const { mutate, isPending } = useMutationData(
    ["change-video-location"],
    (data: { folder_id: string; workspace_id: string }) => {
      return moveVideoLocation(videoId, data.workspace_id, data.folder_id);
    }
  );

  // useZodForm
  const { errors, onFormSubmit, watch, register } = useZodForm(
    moveVideoSchema,
    mutate,
    {
      folder_id: null,
      workspace_id: currentWorkspace,
    }
  );

  // fetch folders with useEffect
  const fetchFolders = async (workspace: string) => {
    setIsFetching(true);
    const folders = await getWorkSpaceFolders(workspace);
    setIsFetching(false);
    setIsFolders(folders.data.folders ?? undefined);
  };

  // useEffect
  useEffect(() => {
    fetchFolders(currentWorkspace);
  }, [currentWorkspace]);

  useEffect(() => {
    const workspace = watch(async (value) => {
      if (value.workspace_id) fetchFolders(value.workspace_id);
    });

    return () => workspace.unsubscribe();
  }, [watch]);

  return {
    onFormSubmit,
    errors,
    register,
    isPending,
    folders,
    workspaces,
    isFetching,
    isFolders,
  };
};
