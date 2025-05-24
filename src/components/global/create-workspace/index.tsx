"use client";

import { getWorkSpaces } from "@/actions/workspace";
import { Button } from "@/components/ui/button";
import useQueryData from "@/hooks/useQueryData";
import { FolderPlusIcon } from "lucide-react";
import WorkspaceForm from "../forms/workspace-form";
import Modal from "../modal";

const CreateWorkSpace = () => {
  const { data } = useQueryData(["user-workspaces"], getWorkSpaces);
  const { data: plan } = data as {
    status: number;
    data: {
      subscription: {
        plan: "FREE" | "PRO";
      } | null;
    };
  };

  if (plan?.subscription?.plan === "FREE") {
    return <></>;
  }

  if (plan?.subscription?.plan === "PRO") {
    return (
      <Modal
        title="Create a Workspace"
        description="Workspace helps you collaborate with your team members. You are assigned a deafault personal workspace where you can share videos in private with yourself"
        trigger={
          <Button className="bg-[#1D1D1D] text-[#c9c1c1] hover:text-black flex items-center cursor-pointer gap-2 py-6 px-4 rounded-2xl ">
            <FolderPlusIcon />
            Create a Workspace
          </Button>
        }
      >
        <WorkspaceForm />
      </Modal>
    );
  }
};

export default CreateWorkSpace;
