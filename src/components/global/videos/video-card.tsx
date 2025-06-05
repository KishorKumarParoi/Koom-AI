import Loader from "../loader";
import CopyLink from "./copy-link";
import VideoCardMenu from "./video-card-menu";

type Props = {
  User: {
    firstname: string | null;
    lastname: string | null;
    image: string | null;
  } | null;
  id: string;
  Folder: {
    id: string;
    name: string;
  } | null;
  processing: boolean;
  createdAt: Date;
  title: string | null;
  source: string;
  workSpaceId: string;
};

const VideoCard = (props: Props) => {
  // wip: wire up date
  const daysAgo =
    Math.floor(new Date().getTime() - props.createdAt.getTime()) /
    (24 * 60 * 60 * 1000);

  return (
    <Loader
      state={false}
      className="flex justify-center items-center border-[1px] border-[#252525] rounded-xl "
    >
      {/* overflow-hidden */}
      <div className="cursor-pointer bg-[#171717] relative border-[1px] border-[#252525] flex flex-col rounded-xl ">
        <div className="absolute top-3 right-3 z-50 flex flex-col gap-y-3">
          <VideoCardMenu
            videoId={props.id}
            currentFolder={props.Folder?.id}
            currentFolderName={props.Folder?.name}
            currentWorkSpace={props.workSpaceId}
          />
          <CopyLink
            className="p-0 h-5 bg-hover:bg-transparent cursor-pointer"
            videoId={props.id}
          />
        </div>
      </div>
    </Loader>
  );
};

export default VideoCard;
