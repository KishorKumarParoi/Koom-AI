import { getPreviewVideo } from "@/actions/workspace";
import useQueryData from "@/hooks/useQueryData";
import { useRouter } from "next/router";

type Props = {
  videoId: string;
};

const VideoPreview = ({ videoId }: Props) => {
  const router = useRouter();
  const { data } = useQueryData(["preview-video"], () =>
    getPreviewVideo(videoId)
  );
  return <div>VideoPreview</div>;
};

export default VideoPreview;
