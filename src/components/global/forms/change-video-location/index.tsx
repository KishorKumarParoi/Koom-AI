import { Button } from "@/components/ui/button";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const {
    register,
    isPending,
    onFormSubmit,
    folders,
    workspaces,
    isFetching,
    isFolders,
    errors,
  } = useMoveVideos(videoId, currentWorkSpace ?? "");

  const folder = folders.find((f) => f.id === currentFolder);
  const workspace = workspaces.find((w) => w.id === currentWorkSpace);

  return (
    <form className="flex flex-col gap-y-5" onSubmit={onFormSubmit}>
      <div className="border rounded-xl p-5 bg-background">
        <h2 className="text-xs mb-2 text-muted-foreground font-semibold">
          Current Workspace
        </h2>
        <p className="text-muted-foreground mb-4">
          {workspace ? `${workspace.name} Workspace` : "—"}
        </p>
        <h2 className="text-xs text-muted-foreground font-semibold">
          Current Folder
        </h2>
        <p className="text-muted-foreground">
          {folder ? folder.name : "This video has no folder"}
        </p>
      </div>

      <Separator orientation="horizontal" />

      <div className="flex flex-col gap-y-5 p-5 border rounded-xl bg-background">
        <h2 className="text-xs text-muted-foreground font-semibold mb-2">To</h2>
        {/* Workspace Select */}
        <label className="flex flex-col gap-y-2">
          <span className="text-xs text-muted-foreground">Workspace</span>
          <Select
            defaultValue={currentWorkSpace}
            onValueChange={(value) => {
              // Register workspace_id manually if using shadcn Select
              register("workspace_id").onChange({ target: { value } });
            }}
          >
            <SelectTrigger className="rounded-xl text-base bg-card text-foreground">
              <SelectValue placeholder="Select workspace" />
            </SelectTrigger>
            <SelectContent className="bg-black">
              {workspaces.map((ws) => (
                <SelectItem key={ws.id} value={ws.id}>
                  {ws.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors?.workspace_id &&
            typeof errors.workspace_id === "object" &&
            "message" in errors.workspace_id && (
              <span className="text-xs text-red-500">
                {errors.workspace_id.message as string}
              </span>
            )}
        </label>

        {/* Folder Select or Loader */}
        {isFetching ? (
          <Loader state className="w-full h-[40px] rounded-xl" />
        ) : (
          <label className="flex flex-col gap-y-2">
            <span className="text-xs text-muted-foreground">
              Folders in this workspace
            </span>
            {isFolders && isFolders.length > 0 ? (
              <Select
                defaultValue={currentFolder}
                onValueChange={(value) => {
                  register("folder_id").onChange({ target: { value } });
                }}
              >
                <SelectTrigger className="rounded-xl text-base bg-card text-foreground">
                  <SelectValue placeholder="Select folder" />
                </SelectTrigger>
                <SelectContent className="bg-black">
                  <AnimatePresence>
                    {isFolders.map((folder, idx) => (
                      <motion.div
                        key={folder.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ delay: idx * 0.05, duration: 0.25 }}
                      >
                        <SelectItem value={folder.id}>{folder.name}</SelectItem>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </SelectContent>
              </Select>
            ) : (
              <p className="text-muted-foreground text-sm italic">
                This workspace has no folders
              </p>
            )}
            {errors?.folder_id &&
              typeof errors.folder_id === "object" &&
              "message" in errors.folder_id && (
                <span className="text-xs text-red-500">
                  {errors.folder_id.message as string}
                </span>
              )}
          </label>
        )}
      </div>
      <Button className="w-full mt-2" type="submit" disabled={isPending}>
        <Loader state={isPending} color="#fff">
          Transfer
        </Loader>
      </Button>
    </form>
  );
};

export default ChangeVideoLocation;
