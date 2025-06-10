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

const PreviewPage = async (props: Props) => {
  const { params } = props;
  const query = new QueryClient();

  await query.prefetchQuery({
    queryKey: ["preview-data"],
    queryFn: () => getPreviewVideo(params.videoId),
  });

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <VideoPreview videoId={params.videoId} />
    </HydrationBoundary>
  );
};

export default PreviewPage;
