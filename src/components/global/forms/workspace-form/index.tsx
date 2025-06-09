import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "@/hooks/useCreateWorkspace";
import { FormGenerator } from "../../form-generator";
import Loader from "../../loader";

const WorkspaceForm = () => {
  const { errors, isPending, onFormSubmit, register } = useCreateWorkspace();
  return (
    <form onSubmit={onFormSubmit} className="flex flex-col gap-y-3">
      <FormGenerator
        register={register}
        name="name"
        placeholder={"Workspace Name"}
        label="Name"
        inputType="input"
        type="text"
        errors={errors}
      />
      <Button
        className="text-sm w-full mt-2"
        type="submit"
        disabled={isPending}
      >
        <Loader state={isPending}>Create Workspace</Loader>
      </Button>
    </form>
  );
};

export default WorkspaceForm;
