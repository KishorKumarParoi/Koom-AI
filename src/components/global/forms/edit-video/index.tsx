import { useEditVideo } from "@/hooks/useEditVideo";

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
    <form onSubmit={onFormSubmit} className="flex flex-col gap-y-5"></form>
  );
};

export default EditVideoForm;
