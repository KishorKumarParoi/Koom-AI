"use client";
import { getWorkSpaceFolders } from "@/actions/workspace";
import { useMutationDataState } from "@/hooks/useMutationData";
import useQueryData from "@/hooks/useQueryData";
import { cn } from "@/lib/utils";
import { FoldersProps } from "@/types/index.type";
import { ArrowRight, FolderIcon } from "lucide-react";
import Folder from "./folders";

type Props = {
  workSpaceId: string;
};

const Folders = (props: Props) => {
  const workSpaceId = props.workSpaceId;
  console.log("@Folders, workSpaceId: ", workSpaceId);

  // get folders
  const { data, isFetched } = useQueryData(["workspace-folders"], () => {
    return getWorkSpaceFolders(workSpaceId);
  });

  const { latestVariables } = useMutationDataState(["create-folder"]);
  const { status, data: folders = [] } = data as FoldersProps;

  console.log("LatestVariables@Folders: ", latestVariables);

  // if (isFetched && folders) {
  //   // TODO: Redux store
  // }

  // TODO: Add Redux Stuff

  // optimistic variable
  // TODO: add the classnames for the folder based on success response

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
        {status !== 200 ? (
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

            {Array.isArray(folders) &&
              folders.map((folder) => (
                <Folder
                  name={folder.name}
                  id={folder.id}
                  count={folder._count.videos}
                  key={folder.id}
                />
              ))}
          </>
        )}
      </section>
    </div>
  );
};

export default Folders;
