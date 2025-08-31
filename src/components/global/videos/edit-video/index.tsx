import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import EditVideoForm from "../../forms/edit-video";
import Modal from "../../modal";

type Props = {
  videoId: string;
  title: string;
  description: string;
};

const EditVideo = (props: Props) => {
  const { videoId, title, description } = props;

  return (
    <Modal
      title="Edit video details"
      description="You can update your video details here"
      trigger={
        <Button className="cursor-pointer">
          <Edit className="text-[#6c6c6c] size-6 " />
        </Button>
      }
    >
      <EditVideoForm
        videoId={videoId}
        title={title}
        description={description}
      />
    </Modal>
  );
};

export default EditVideo;
