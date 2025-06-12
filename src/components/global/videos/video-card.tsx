import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserButton } from "@clerk/nextjs";
import { Dot, Share2 } from "lucide-react";
import Link from "next/link";
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
  console.log("props: ", props);

  const daysAgo =
    Math.floor(new Date().getTime() - props.createdAt.getTime()) /
    (24 * 60 * 60 * 1000);

  return (
    <Loader
      state={false}
      className="flex justify-center items-center border-[1px] border-[#252525] rounded-xl "
    >
      <div className="overflow-hidden cursor-pointer bg-[#171717] relative border-[1px] border-[#252525] flex flex-col rounded-xl ">
        <div className="absolute top-3 right-3 z-50 flex flex-col gap-y-3">
          <VideoCardMenu
            videoId={props.id}
            currentFolder={props.Folder?.id}
            currentFolderName={props.Folder?.name}
            currentWorkSpace={props.workSpaceId}
          />
          <CopyLink
            className="p-0 h-5 bg-hover:bg-transparent bg-[#a7a7a7] cursor-pointer"
            videoId={props.id}
          />
        </div>
        <Link
          href={`/dashboard/${props.workSpaceId}/video/${props.id}`}
          className=" hover:bg-[#252525] transition duration-150 flex flex-col justify-between h-full"
        >
          <video
            controls={false}
            preload="metadata"
            className="w-full aspect-video opacity-50 z-20"
          >
            <source
              src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${props.source}#t=1`}
            />
          </video>
          <div className="px-5 py-3 flex flex-col gap-7-2 z-20 ">
            <h2 className="text-sm font-semibold text-[#BDBDBD]">
              {props.title}
            </h2>
            <div className="flex gap-x-2 items-center">
              <Avatar className="mt-2 w-8 h-8">
                <AvatarImage src={props.User?.image as string} />
                <AvatarFallback>
                  <UserButton />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="capitalize text-[#BDBDBD]  text-xs">
                  {props.User?.firstname} {props.User?.lastname}
                </p>
                <p className="text-[#6d6d6d] text-xs flex items-center">
                  <Dot />
                  {Math.floor(daysAgo) === 0
                    ? "Today"
                    : `${Math.floor(daysAgo)}d ago`}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <span className="flex gap-x-1 items-center">
                <Share2 fill="#9D9D9D" className="text-[#9D9D9D" size={12} />
                <p className="text-xs text-[#9D9D9D] capitalize">
                  {props.User?.firstname}&apos;s Workspace
                </p>
              </span>
            </div>
          </div>
        </Link>
      </div>
    </Loader>
  );
};

export default VideoCard;
