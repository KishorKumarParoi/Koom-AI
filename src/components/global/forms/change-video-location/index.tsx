import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useMoveVideos } from "@/hooks/useFolders";
import Loader from "../../loader";

type Props = {
  videoId: string;
  currentFolder?: string;
  currentWorkSpace?: string;
  currentFolderName?: string;
};

const ChangeVideoLocation = ({
  videoId,
  currentFolder,
  currentWorkSpace,
  currentFolderName,
}: Props) => {
  // wire up the use move folder
  const {
    register,
    isPending,
    onFormSubmit,
    folders,
    workspaces,
    isFetching,
    isFolders,
  } = useMoveVideos(videoId, currentWorkSpace ?? "");

  const folder = folders.find((f) => f.id === currentFolder);
  const workspace = workspaces.find((w) => w.id === currentWorkSpace);

  console.log("workspace@change-video-location: ", workspace);
  console.log("folder@change-video-location: ", folder);
  console.log("isFolders: ", isFolders);

  return (
    <form className="flex flex-col gap-y-5" onSubmit={onFormSubmit}>
      <div className="border-[1px] rounded-xl p-5">
        <h2 className="text-xs mb-5 text-[#a4a4a4]">Current Workspace</h2>
        {workspace && (
          <p className="text-[#a4a4a4]">{workspace.name} Workspace</p>
        )}
        <h2 className="text-[#a4a4a4] text-xs mt-4">Current Folder</h2>
        {folder ? <p>{folder.name}</p> : "This video has no folder"}
      </div>

      <Separator orientation="horizontal" />

      <div className="flex flex-col gap-y-5 p-5 border-[1px] rounded-xl">
        <h2 className="text-xs text-[#a4a4a4]">To</h2>
        <label className="flex-col gap-y-2 flex">
          <p className="text-xs">Workspace</p>
          <select
            className="rounded-xl text-base bg-transparent"
            {...register("workspace_id")}
          >
            {workspaces.map((ws) => (
              <option key={ws.id} className="text-[#a4a4a4]" value={ws.id}>
                {ws.name}
              </option>
            ))}
            <option className="text-[#a4a4a4]" value={"kkp"}>
              kkp
            </option>
          </select>
        </label>

        {isFetching ? (
          <>
            <Loader
              state
              className="w-full h-[40px] rounded-xl flex justify-center align-center"
            />
          </>
        ) : (
          <label className="flex flex-col gap-y-2">
            <p className="text-xs">Folders in this workspace</p>

            {isFolders && isFolders.length > 0 ? (
              <select
                {...register("folder_id")}
                className="rounded-xl bg-transparent text-base"
              >
                {isFolders.map((folder, key) =>
                  key === 0 ? (
                    <option
                      className="text-[#a4a4a4]"
                      key={folder.id}
                      value={folder.id}
                    >
                      {folder.name}
                    </option>
                  ) : (
                    <option
                      className="text-[#a4a4a4]"
                      key={folder.id}
                      value={folder.id}
                    >
                      {folder.name}
                    </option>
                  )
                )}
              </select>
            ) : (
              <p className="text-[#a4a4a4] text-sm">
                This workspace has no folders
              </p>
            )}
          </label>
        )}
      </div>
      <Button className="cursor-pointer">
        <Loader state={isPending} color="#000">
          Transfer
        </Loader>
      </Button>
    </form>
  );
};

export default ChangeVideoLocation;
