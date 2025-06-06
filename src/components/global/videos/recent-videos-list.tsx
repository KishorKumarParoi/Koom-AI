"use client";

import { getAllVideos } from "@/actions/workspace";
import useQueryData from "@/hooks/useQueryData";
import { cn } from "@/lib/utils";
import { Video } from "lucide-react";
import VideoCard from "./video-card";

type Props = {
  workSpaceId: string;
  videosKey: string;
};

export type VideosProps = {
  status: number;
  message: string;
  data: {
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
  }[];
};

const RecentVideosList = ({ workSpaceId, videosKey }: Props) => {
  const { data: videosData } = useQueryData([videosKey], () =>
    getAllVideos(workSpaceId)
  );

  console.log("videosData: ", videosData);

  const { status: videosStatus, data: videos } = videosData as VideosProps;
  console.log("Videos: ", videos);

  //   http://localhost:3000/dashboard/12933df9-51f4-42ad-80d6-add40c882485

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
          videos.map((video) => <VideoCard key={video.id} {...video} />)
        ) : (
          <p className="text-[#BdBdBd]">No videos in workspace</p>
        )}
      </section>
    </div>
  );
};

export default RecentVideosList;
