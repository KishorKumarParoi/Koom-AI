"use client";
import { getWorkSpaceFolders } from "@/actions/workspace";
import { useMutationDataState } from "@/hooks/useMutationData";
import useQueryData from "@/hooks/useQueryData";
import { cn } from "@/lib/utils";
import { FOLDERS } from "@/redux/slices/folders";
import { FoldersProps } from "@/types/index.type";
import { ArrowRight, FolderIcon } from "lucide-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Folder from "./folders";

type Props = {
  workSpaceId: string;
};

const Folders = (props: Props) => {
  const dispatch = useDispatch();
  const workSpaceId = props.workSpaceId;
  console.log("@Folders, workSpaceId: ", workSpaceId);

  // get folders
  const { isFetched, data: foldersData } = useQueryData(
    ["workspace-folders"],
    () => {
      return getWorkSpaceFolders(workSpaceId);
    }
  );

  console.log("Data: ", foldersData);

  const { latestVariables } = useMutationDataState(["create-folder"]);
  const { status, data: folders } = foldersData as FoldersProps;

  console.log("LatestVariables@Folders: ", latestVariables);

  // add redux store
  useEffect(() => {
    if (isFetched && folders) {
      dispatch(
        FOLDERS({
          folders: folders.folders,
        })
      );
    }
  }, [isFetched, folders, dispatch]);

  // Add Redux Stuff

  // optimistic variable
  // add the classnames for the folder based on success response

  const allFolders = folders.folders;
  console.log("All Folders: ", allFolders);
  console.log(typeof allFolders);

  return (
    <div className="flex flex-col gap-4" suppressHydrationWarning>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <FolderIcon />
          <h2 className="text-[#BDBDBD] text-xl ">Folders</h2>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <p className=" text-[#BDBDBD] ">See all</p>
          <ArrowRight color="#707070" />
        </div>
      </div>
      <section
        className={cn(
          status !== 200 && "justify-center",
          "flex items-center gap-4 overflow-x-auto w-full"
        )}
      >
        {status !== 200 && status !== 201 ? (
          <p className="text-neutral-300"> No Folders in Workspace </p>
        ) : (
          <>
            {latestVariables && latestVariables.status === "pending" && (
              <Folder
                id={latestVariables.variables.id}
                name={latestVariables.variables.name}
                optimistic
              />
            )}

            {Array.isArray(allFolders) &&
              allFolders.map((folder) => (
                <Folder
                  key={folder.id}
                  id={folder.id}
                  name={folder.name}
                  count={folder._count.videos}
                />
              ))}
          </>
        )}
      </section>
    </div>
  );
};

export default Folders;
