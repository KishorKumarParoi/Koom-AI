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
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  activeWorkSpaceId: string;
};

const Sidebar = ({ activeWorkSpaceId }: Props) => {
  const router = useRouter();

  // Fetch workspaces for the current user using a custom hook
  const { data, isFetched } = useQueryData(["user-workspaces"], getWorkSpaces);

  // Safely extract the workspace array from the fetched data
  const { data: workSpacesData } = data as WorkSpaceProps;
  const workspaceArray = workSpacesData.workSpaces.workspace || [];
  console.log(workspaceArray); // Debug: log the workspace array

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
          <SelectTrigger className="mt-4 text-neutral-400 bg-transparent text-base">
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
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Sidebar;
