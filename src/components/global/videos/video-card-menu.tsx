import { Move } from "lucide-react";
import ChangeVideoLocation from "../forms/change-video-location";
import Modal from "../modal";

type Props = {
  videoId: string;
  currentWorkSpace?: string;
  currentFolder?: string;
  currentFolderName?: string;
};

const VideoCardMenu = ({
  videoId,
  currentFolder,
  currentFolderName,
  currentWorkSpace,
}: Props) => {
  return (
    <Modal
      className="flex items-center cursor-pointer gap-x-2 "
      title="Move to new Workspace/Folder"
      description="This action can't be undone. This will permannently delete your account and remove your data from our servers"
      trigger={<Move size={20} fill="#a4a4a4" className="text-[#a4a4a4]" />}
    >
      Video Card Menu
      <ChangeVideoLocation
        currentFolder={currentFolder}
        currentWorkSpace={currentWorkSpace}
        videoId={videoId}
        currentFolderName={currentFolderName}
      />
    </Modal>
  );
};

export default VideoCardMenu;
