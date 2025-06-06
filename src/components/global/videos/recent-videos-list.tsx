"use client";

import { getAllVideos } from "@/actions/workspace";
import useQueryData from "@/hooks/useQueryData";

type Props = {
  folderId: string;
  workSpaceId: string;
  videosKey: string;
};

const RecentVideosList = ({ folderId, workSpaceId, videosKey }: Props) => {
  const { data: videosData } = useQueryData([videosKey], () =>
    getAllVideos(folderId, workSpaceId)
  );

  console.log("videosData: ", videosData);

  //   const { status: videosStatus, data: videos } = videosData as VideosProps;
  //   console.log("Videos: ", videos);

  return (
    <div className="flex flex-col gap-4 mt-4">
      {" "}
      kkp
      {/* <div className="flex items-center justify-between">
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
          videos.videos.map((video) => <VideoCard key={video.id} {...video} />)
        ) : (
          <p className="text-[#BdBdBd]">No videos in workspace</p>
        )}
      </section> */}
    </div>
  );
};

export default RecentVideosList;
