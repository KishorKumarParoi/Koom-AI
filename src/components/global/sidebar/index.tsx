"use client";

import { getUserNotifications } from "@/actions/user";
import { getWorkSpaces } from "@/actions/workspace";
import { Button } from "@/components/ui/button";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MENU_ITEMS } from "@/constants";
import useQueryData from "@/hooks/useQueryData";
import { NotificationProps, WorkSpaceProps } from "@/types/index.type";
import { Menu, PlusCircle } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import GlobalCard from "../global-card";
import Loader from "../loader";
import Modal from "../modal";
import Search from "../search";
import SideBarItem from "./sidebar-item";
import WorkSpacePlaceholder from "./work-space-placeholder";

type Props = {
  activeWorkSpaceId: string;
};

const Sidebar = ({ activeWorkSpaceId }: Props) => {
  const router = useRouter();
  const pathName = usePathname();

  const { data: notifications } = useQueryData(
    ["user-notifications"],
    getUserNotifications
  );

  const { data: count } = notifications as NotificationProps;

  // Fetch workspaces for the current user using a custom hook
  const { data, isFetched } = useQueryData(["user-workspaces"], getWorkSpaces);

  const menuItems = MENU_ITEMS(activeWorkSpaceId);

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

  const currentWorkSpace = workSpacesData.workSpaces.workspace.find(
    (ws) => ws.id === activeWorkSpaceId
  );

  // TODO: Add the Upgrade Button

  const SidebarSection = (
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
        {currentWorkSpace?.type === "PUBLIC" &&
          workSpacesData.workSpaces.subscription?.plan === "PRO" && (
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
          )}

        <p className="w-full text-[#9D9D9D] font-bold mt-4">Menu</p>
        <nav className="w-full">
          <ul>
            {menuItems.map((item) => (
              <div key={item.title}>
                <SideBarItem
                  icon={item.icon}
                  title={item.title}
                  href={item.href}
                  selected={pathName === item.href}
                  notifications={
                    (item.title === "Notifications" &&
                      count._count &&
                      count._count.notification) ||
                    0
                  }
                />
              </div>
            ))}
          </ul>
        </nav>
        <Separator className="w-4/5" />

        <p className=" w-full text-[#9D9D9D] font-bold mt-4 ">Workspaces</p>

        {workSpacesData.workSpaces.workspace.length === 1 &&
          workSpacesData.workSpaces.members.length === 0 && (
            <div className="w-full mt-[8px]">
              <p className=" text-[#3c3c3c]  font-medium text-sm">
                {workSpacesData.workSpaces.subscription?.plan === "FREE"
                  ? "Upgrade to create workspaces"
                  : "No Workspace"}
              </p>
            </div>
          )}

        <nav className="w-full">
          <ul className=" h-[150px] overflow-auto overflow-x-hidden fade-layer mt-2">
            {workSpacesData.workSpaces.workspace.length > 0 &&
              workSpacesData.workSpaces.workspace.map((item) => (
                <SideBarItem
                  title={item.name}
                  href={`/dashboard/${item.id}`}
                  selected={pathName === `/dashboard/${item.id}`}
                  notifications={0}
                  key={item.name + item.id}
                  icon={
                    <WorkSpacePlaceholder>
                      {item.name.charAt(0)}
                    </WorkSpacePlaceholder>
                  }
                />
              ))}

            {workSpacesData.workSpaces.members.length > 0 &&
              workSpacesData.workSpaces.members.map((item) => (
                <SideBarItem
                  title={item.WorkSpace.name}
                  href={`/dashboard/${item.WorkSpace.id}`}
                  selected={pathName === `/dashboard/${item.WorkSpace.id}`}
                  notifications={0}
                  key={item.WorkSpace.name + item.WorkSpace.id}
                  icon={
                    <WorkSpacePlaceholder>
                      {item.WorkSpace.name.charAt(0)}
                    </WorkSpacePlaceholder>
                  }
                />
              ))}
          </ul>
        </nav>

        <Separator className="w-4/5" />
        {workSpacesData.workSpaces?.subscription?.plan === "FREE" && (
          <GlobalCard
            title="Upgrade to Pro"
            description="Unlock AI features like transcription, AI Summary, and more"
            footer={
              <Button
                variant={"default"}
                className="text-sm flex items-center justify-center mx-auto cursor-pointer w-2/3"
              >
                <Loader state={false}>Upgrade</Loader>
              </Button>
            }
          ></GlobalCard>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {/* INFOBAR */}
      {/* Sheet mobile and Desktop */}
      <div className="md:hidden fixed my-4">
        <Sheet>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
          <SheetTrigger asChild className="ml-2 cursor-pointer">
            <Button className="mt-[2px] bg-white text-black">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"} className="p-0 w-fit h-full">
            {SidebarSection}
          </SheetContent>
        </Sheet>
      </div>
      <div className="md:block hidden h-full">{SidebarSection}</div>
    </div>
  );
};

export default Sidebar;
