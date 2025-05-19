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

  const { data, isFetched } = useQueryData(["user-workspaces"], getWorkSpaces);
  const { data: workSpacesData } = data as WorkSpaceProps;
  const workspaceArray = workSpacesData.workSpaces.workspace || [];
  console.log(workspaceArray);

  const onChangeActiveWorkSpace = (value: string) => {
    router.push(`/dashboard/${value}`);
  };

  return (
    <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden">
      <div className="bg-[#111111] p-4 gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0">
        <Image
          src={"/logo.png"}
          height={100}
          width={100}
          className="ml-6"
          alt="logo"
        />
        <Select
          defaultValue={activeWorkSpaceId}
          onValueChange={onChangeActiveWorkSpace}
        >
          <SelectTrigger className="mt-4 text-neutral-400 bg-transparent">
            <SelectValue placeholder="Select a workspace"></SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-[#111111] backdrop-blur-xl">
            <SelectGroup>
              <SelectLabel>WorkSpaces</SelectLabel>
              <Separator />
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
