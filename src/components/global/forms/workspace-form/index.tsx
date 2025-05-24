import { useCreateWorkspace } from "@/hooks/useCreateWorkspace";
type Props = {};

const WorkspaceForm = (props: Props) => {
  const { errors, isPending, onFormSubmit, register } = useCreateWorkspace();
  return (
    <form onSubmit={onFormSubmit} className="flex flex-col gap-y-3">
      Kishor
    </form>
  );
};

export default WorkspaceForm;
