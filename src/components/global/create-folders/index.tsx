"use client";
import { Button } from "@/components/ui/button";
import { useCreateFolder } from "@/hooks/useCreateFolder";
import { Folder } from "lucide-react";

type Props = {
  workSpaceId: string;
};

const CreateFolders = (props: Props) => {
  const workSpaceId = props.workSpaceId;
  console.log("@createFolders, workSpaceId: ", workSpaceId);

  // TODO: WIP for optimistic ui update and watching folders
  const { onCreateNewFolder } = useCreateFolder(workSpaceId);

  return (
    <Button
      onClick={onCreateNewFolder}
      className="bg-[#1D1D1D] text-[#dfd2d2] flex items-center gap-2 py-6 px-4 rounded-2xl hover:bg-[#cfc6c6] hover:text-black cursor-pointer"
    >
      <Folder />
      Create a folder
    </Button>
  );
};

export default CreateFolders;
