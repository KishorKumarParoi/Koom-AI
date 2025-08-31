import { useEditVideo } from "@/hooks/useEditVideo";
import { FormGenerator } from "../../form-generator";

type Props = {
  videoId: string;
  title: string;
  description: string;
};

const EditVideoForm = ({ description, title, videoId }: Props) => {
  const { errors, isPending, onFormSubmit, register } = useEditVideo(
    videoId,
    title,
    description
  );

  return (
    <form onSubmit={onFormSubmit} className="flex flex-col gap-y-5">
      <FormGenerator
        register={register}
        errors={errors}
        name="title"
        inputType="input"
        type="text"
        placeholder={"Video Title..."}
        label="Title"
        className="text-white"
      />
      <FormGenerator
        register={register}
        label="Description"
        errors={errors}
        name="description"
        inputType="textarea"
        type="text"
        lines={5}
        placeholder={"Video Description..."}
      />
      <button
        type="submit"
        disabled={isPending}
        className="bg-[#7c3aed] text-white font-bold py-2 px-6 cursor-pointer rounded-lg hover:bg-[#5b23c3] transition"
      >
        {isPending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

export default EditVideoForm;
