"use client";
import { getAllUserVideos } from "@/actions/workspace";
import useQueryData from "@/hooks/useQueryData";
import { cn } from "@/lib/utils";
import { VideosProps } from "@/types/index.type";
import { Video } from "lucide-react";
import VideoCard from "./video-card";

type Props = {
  folderId: string;
  videosKey: string;
  workSpaceId: string;
};

// WIP videos logic

const Videos = ({ folderId, videosKey, workSpaceId }: Props) => {
  const { data: videosData } = useQueryData([videosKey], () =>
    getAllUserVideos(folderId)
  );
  const { status: videosStatus, data: videos } = videosData as VideosProps;
  console.log("Videos: ", videos);

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Video />
          <h2 className="text-[#BdBdBd] text-xl">Videos</h2>
        </div>
      </div>
      <section
        className={cn(
          videosStatus !== 200
            ? "p-5"
            : "grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
        )}
      >
        {videosStatus === 200 ? (
          videos.videos.map((video) => (
            <VideoCard key={video.id} {...video} workSpaceId={workSpaceId} />
          ))
        ) : (
          <p className="text-[#BdBdBd]">No videos in workspace</p>
        )}
      </section>
    </div>
  );
};

export default Videos;
