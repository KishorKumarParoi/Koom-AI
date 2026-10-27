"use client";
import { sendEmailForFirstView } from "@/actions/user";
import { getPreviewVideo } from "@/actions/workspace";
import useQueryData from "@/hooks/useQueryData";
import { truncateString } from "@/lib/utils";
import { VideoProps } from "@/types/index.type";
import { Download } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import Activity from "../../activity";
import AiTools from "../../ai-tools";
import KoomAgentCockpit from "../../koom-agent";
import Loader from "../../loader";
import TabMenu from "../../tabs";
import VideoTranscript from "../../transcript";
import CopyLink from "../copy-link";
import EditVideo from "../edit-video";
import RichLink from "./rich-link";


type Props = {
  videoId: string;
};

const VideoPreview = ({ videoId }: Props) => {
  // WIP: Setup Notiify first view
  // wip: set activity flag

  const router = useRouter();
  const { data } = useQueryData(["preview-video"], () =>
    getPreviewVideo(videoId)
  );

  const notifyFirstView = useCallback(async () => {
    await sendEmailForFirstView(videoId);
  }, [videoId]);

  useEffect(() => {
    if (data) {
      const { data: video } = data as VideoProps;
      if (typeof video?.views === "number" && video.views === 0) {
        notifyFirstView();
      }
      return () => {
        notifyFirstView();
      };
    }
  }, [data, notifyFirstView]);

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
                ? video?.createdAt
                  ? `Today ${new Date(video.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}`
                  : "Today"
                : daysAgo !== undefined
                ? `${Math.floor(daysAgo)}d ago`
                : undefined}
            </p>
          </span>
        </div>
        {video?.source ? (
          <video
            preload="metadata"
            className="w-full aspect-video rounded-2xl shadow-2xl bg-black border border-neutral-800"
            controls
            playsInline
          >
            <source
              src={
                video.source.startsWith("http://") || video.source.startsWith("https://")
                  ? video.source
                  : process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL
                  ? `${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${video.source}`
                  : `https://koom-ai-express.onrender.com/uploads/${video.source}`
              }
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        ) : (
          <video
            preload="metadata"
            className="w-full aspect-video rounded-2xl shadow-2xl bg-black border border-neutral-800"
            controls
            playsInline
          >
            <source
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        )}
        <div className="flex flex-col text-2xl gap-y-4">
          <div className=" flex gap-x-5 items-start justify-between">
            <h2 className="text-white font-semibold">Description </h2>
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
          <p className="text-[#9D9D9D] text-lg text-medium">
            {video?.description}
          </p>
        </div>
      </div>
      <div className="lg:col-span-1 flex flex-col gap-y-16">
        <div className="flex justify-end gap-x-3">
          <CopyLink
            variant={"outline"}
            className="rounded-full bg-slate-600 px-10 text-black cursor-pointer hover:bg-slate-800"
            videoId={videoId}
          />
          <RichLink
            description={truncateString(video?.description as string, 150)}
            id={videoId}
            source={video?.source}
            title={video?.title as string}
          />
          <Download className="text-[#dbcece] mt-1" />
        </div>
        <div>
          <TabMenu
            defaultValue="KoomAgent ⚡"
            triggers={["KoomAgent ⚡", "AI Tools", "Transcript", "Activity"]}
          >
            <>
              <KoomAgentCockpit
                videoId={videoId}
                videoTitle={video?.title || "Screen Recording"}
                videoDescription={video?.description || ""}
                transcript={
                  typeof video?.summary === "string" ? video.summary : ""
                }
                authorName={`${video?.User?.firstname || ""} ${video?.User?.lastname || ""}`}
              />
              <AiTools
                plan={video?.User?.subscription.plan ?? "FREE"}
                trial={video?.User?.trial ?? false}
                videoId={videoId}
              />
              <VideoTranscript
                transcript={
                  typeof video?.summary === "string" ? video.summary : ""
                }
              />
              <Activity
                author={video?.User?.firstname as string}
                videoId={videoId}
              />
            </>
          </TabMenu>
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;
