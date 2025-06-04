"use client";
import { getAllUserVideos } from "@/actions/workspace";
import useQueryData from "@/hooks/useQueryData";
import { cn } from "@/lib/utils";
import { VideoCardProps, VideosProps } from "@/types/index.type";
import { Video } from "lucide-react";
import VideoCard from "./video-card";

type Props = {
  folderId: string;
  videosKey: string;
  workSpaceId: string;
};

// WIP videos logic

const video: VideoCardProps = {
  User: {
    firstname: "Kishor",
    lastname: "Paroi",
    image: "https://example.com/avatar1.png",
  },
  id: "video-1",
  Folder: {
    id: "folder-1",
    name: "Demo Folder",
  },
  processing: false,
  createdAt: new Date("2025-06-01T10:00:00Z"),
  title: "First Video",
  source: "https://example.com/video1.mp4",
  workSpaceId: "workspace-1",
};

const Videos = (props: Props) => {
  const { folderId, videosKey, workSpaceId } = props;
  const { data: videosData } = useQueryData([videosKey], () =>
    getAllUserVideos(folderId)
  );
  const { status: videosStatus, data: videos } = videosData as VideosProps;

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
        {/* {videosStatus === 200 ? (
          videos.videos.map((video) => <VideoCard />)
        ) : (
          <p className="text-[#BdBdBd]">No videos in workspace</p>
        )} */}
        <VideoCard workSpaceId={workSpaceId} video={video} />
      </section>
    </div>
  );
};

export default Videos;
