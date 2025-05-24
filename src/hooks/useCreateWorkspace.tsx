import { createWorkspace } from "@/actions/workspace";
import { useMutationData } from "./useMutationData";
import { useZodForm } from "./useZodForm";

export const useCreateWorkspace = async () => {
  const {} = useMutationData(
    ["create-workspace"],
    (data: { name: string }) => createWorkspace(data.name),
    "user-workspaces"
  );

  const {} = useZodForm();
};
