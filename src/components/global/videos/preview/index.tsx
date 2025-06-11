"use client";
import { getPreviewVideo } from "@/actions/workspace";
import useQueryData from "@/hooks/useQueryData";
import { VideoProps } from "@/types/index.type";
import { useRouter } from "next/navigation";
import Loader from "../../loader";
import EditVideo from "../edit-video";

type Props = {
  videoId: string;
};

const VideoPreview = ({ videoId }: Props) => {
  // WIP: Setup Notiify first view
  const router = useRouter();
  const { data } = useQueryData(["preview-video"], () =>
    getPreviewVideo(videoId)
  );

  if (!data)
    return (
      <Loader
        state
        color="#000"
        className="flex justify-center items-center text-center"
      >
        Loading....
      </Loader>
    );

  const { data: video, status, author } = data as VideoProps;

  console.log("data@Video Preview: ", video);
  console.log(status, author);

  if (status !== 200) router.push("/");

  const daysAgo =
    video && video.createdAt
      ? Math.floor(
          (new Date().getTime() - new Date(video.createdAt).getTime()) /
            (24 * 60 * 60 * 1000)
        )
      : undefined;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 p-10 lg:px-20 lg:py-10 overflow-y-auto gap-5">
      <div className="flex flex-col lg:col-span-2 gap-y-10">
        <div>
          <div className=" flex gap-x-5 items-start justify-between">
            <h2 className="text-white text-4xl font-bold">{video?.title} </h2>
            {author ? (
              <EditVideo
                videoId={videoId}
                title={video?.title as string}
                description={video?.description as string}
              />
            ) : (
              <></>
            )}
          </div>
          <span className="flex gap-x-3 mt-2">
            <p className="text-[#9D9D9D] capitalize">
              {video?.User?.firstname} {video?.User?.lastname}
            </p>
            <p className="text-[707070]">
              {daysAgo !== undefined && Math.floor(daysAgo) === 0
                ? "Today"
                : daysAgo !== undefined
                ? `${Math.floor(daysAgo)}d ago`
                : undefined}
            </p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;
