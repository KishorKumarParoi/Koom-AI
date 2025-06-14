import { getUserProfile } from "@/actions/user";
import { getPreviewVideo } from "@/actions/workspace";
import VideoPreview from "@/components/global/videos/preview";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type Props = {
  params: {
    videoId: string;
  };
};

const VideoPage = async (props: Props) => {
  const { params } = props;
  const { videoId } = await params;
  const query = new QueryClient();

  await query.prefetchQuery({
    queryKey: ["preview-video"],
    queryFn: () => getPreviewVideo(videoId),
  });

  await query.prefetchQuery({
    queryKey: ["user-profile"],
    queryFn: () => getUserProfile,
  });

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <VideoPreview videoId={videoId} />
    </HydrationBoundary>
  );
};

export default VideoPage;
