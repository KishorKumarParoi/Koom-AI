"use client";

import { getWorkSpaces } from "@/actions/workspace";
import { Button } from "@/components/ui/button";
import useQueryData from "@/hooks/useQueryData";
import { PlanProps } from "@/types/index.type";
import { FolderPlusIcon, Lock } from "lucide-react";
import WorkspaceForm from "../forms/workspace-form";
import Modal from "../modal";

const CreateWorkSpace = () => {
  const { data } = useQueryData(["user-workspaces"], getWorkSpaces);

  console.log("createWorkSpace@ data:", data);

  const { data: plan } = data as PlanProps;

  if (plan.workSpaces.subscription?.plan === "FREE") {
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Modal
          title="Upgrade to Pro"
          description="Upgrade to pro for create workspace"
          trigger={
            <Button className="bg-[#1D1D1D] text-[#c9c1c1] hover:text-black hover:bg-[#d2cbcb] flex items-center cursor-pointer gap-2 py-6 px-4 rounded-2xl ">
              <Lock className="w-5 h-5" />
              Create Workspace
            </Button>
          }
        >
          <span className="text-[#fff] bg-[#7c3aed] px-3 py-1 rounded-lg font-semibold shadow-md">
            Upgrade to pro
          </span>
        </Modal>
      </div>
    );
  }

  if (plan.workSpaces.subscription?.plan === "PRO") {
    return (
      <Modal
        title="Create a Workspace"
        description="Workspace helps you collaborate with your team members. You are assigned a deafault personal workspace where you can share videos in private with yourself"
        trigger={
          <Button className="bg-[#1D1D1D] text-[#c9c1c1] hover:text-black hover:bg-[#d2cbcb] flex items-center cursor-pointer gap-2 py-6 px-4 rounded-2xl ">
            <FolderPlusIcon />
            Create Workspace
          </Button>
        }
      >
        <WorkspaceForm />
      </Modal>
    );
  }

  return <div>Unknown plan type.</div>;
};

export default CreateWorkSpace;
