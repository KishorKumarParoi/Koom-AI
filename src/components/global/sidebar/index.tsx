"use client";

import { getWorkSpaces } from "@/actions/workspace";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import useQueryData from "@/hooks/useQueryData";
import { WorkSpaceProps } from "@/types/index.type";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Modal from "../modal";
import Search from "../search";

type Props = {
  activeWorkSpaceId: string;
};

const Sidebar = ({ activeWorkSpaceId }: Props) => {
  const router = useRouter();

  // Fetch workspaces for the current user using a custom hook
  const { data, isFetched } = useQueryData(["user-workspaces"], getWorkSpaces);

  // Safely extract the workspace array from the fetched data
  const { data: workSpacesData } = data as WorkSpaceProps;
  const workspaceMembers = workSpacesData.workSpaces.members || [];
  const workspaceArray = workSpacesData.workSpaces.workspace || [];
  console.log(workSpacesData);
  console.log(workspaceArray); // Debug: log the workspace array
  console.log(workspaceMembers);
  console.log(activeWorkSpaceId);
  // Handler for when a different workspace is selected
  const onChangeActiveWorkSpace = (value: string) => {
    router.push(`/dashboard/${value}`); // Navigate to the selected workspace dashboard
  };

  return (
    <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden">
      {/* Logo and workspace selector section */}
      <div className="bg-[#111111] p-4 gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0">
        {/* App logo */}
        <Image
          src={"/logo.png"}
          height={100}
          width={100}
          className="ml-6"
          alt="logo"
        />
        {/* Workspace dropdown selector */}
        <Select
          defaultValue={activeWorkSpaceId}
          onValueChange={onChangeActiveWorkSpace}
        >
          <SelectTrigger className="mt-4 px-4 text-neutral-400 bg-transparent text-base">
            <SelectValue placeholder="Select a workspace"></SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-[#111111] backdrop-blur-xl">
            <SelectGroup>
              <SelectLabel>WorkSpaces</SelectLabel>
              <Separator />
              {/* Render workspace options if available, else show fallback */}
              {isFetched &&
              Array.isArray(workspaceArray) &&
              workspaceArray.length > 0 ? (
                workspaceArray.map((ws) => (
                  <SelectItem key={ws.id} value={ws.id}>
                    {ws.name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="Empty WorkSpace" disabled>
                  No workspace found
                </SelectItem>
              )}

              {workspaceMembers.length > 0 &&
                workspaceMembers.map(
                  (workspace) =>
                    workspace.WorkSpace && (
                      <SelectItem
                        value={workspace.WorkSpace.id}
                        key={workspace.WorkSpace.id}
                      >
                        {workspace.WorkSpace.name}
                      </SelectItem>
                    )
                )}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Modal
          trigger={
            <span className="text-sm cursor-pointer flex items-center justify-center bg-neutral-800/90 hover:bg-neutral-800/90 w-full rounded-sm p-[5px] gap-2">
              <PlusCircle size={15} />
              <span className="text-neutral-400 font-semibold text-xs">
                Invite to Workspace
              </span>
            </span>
          }
          title="Invite to Workspace"
          description="Invite others to your workspace"
          className="mt-2"
        >
          <Search workSpaceId={activeWorkSpaceId} />
        </Modal>
      </div>
    </div>
  );
};

export default Sidebar;
