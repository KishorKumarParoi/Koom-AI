import { VideoCardProps } from "@/types/index.type";
import ChangeVideoLocation from "../forms/change-video-location";
import Loader from "../loader";

type Props = {
  workSpaceId: string;
  video: VideoCardProps;
};

const VideoCard = (props: Props) => {
  // wip: wire up date
  return (
    <Loader state={false}>
      {/* <div className="overflow-hidden cursor-pointer bg-[#171717] relative border-[1px] border-[#252525] flex flex-col rounded-xl ">
        <div className="absolute top-3 right-3 z-50 flex flex-col gap-y-3">
          <VideoCardMenu
            videoId={props.video.id}
            currentFolder={props.video.Folder?.id}
            currentFolderName={props.video.Folder?.name}
            currentWorkSpace={props.workSpaceId}
          />
        </div>
      </div> */}
      <ChangeVideoLocation
      // currentFolder={currentFolder}
      // currentWorkSpace={currentWorkSpace}
      // videoId={videoId}
      // currentFolderName={currentFolderName}
      />
    </Loader>
  );
};

export default VideoCard;
