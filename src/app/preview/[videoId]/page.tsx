import { getVideoComments } from "@/actions/user";
import { getPreviewVideo } from "@/actions/workspace";
import VideoPreview from "@/components/global/videos/preview";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import type { Metadata } from "next";

type Props = {
  params: Promise<{
    videoId: string;
  }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { videoId } = await props.params;
  try {
    const videoData = await getPreviewVideo(videoId);
    const title = videoData?.data?.title || "Screen Recording";
    const description =
      videoData?.data?.description ||
      "Watch this AI-powered screen recording with sub-120ms WebRTC streaming and instant Whisper transcripts on KoomAI.";
    return {
      title: `${title} • KoomAI Video`,
      description,
      openGraph: {
        title: `${title} • KoomAI Video`,
        description,
        url: `https://koom.kishor.tech/preview/${videoId}`,
        siteName: "KoomAI",
        images: [
          {
            url: "/og-image.png",
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        type: "video.other",
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} • KoomAI`,
        description,
        images: ["/og-image.png"],
        creator: "@Mr_paroi",
      },
    };
  } catch {
    return {
      title: "Watch Screen Recording • KoomAI",
      description: "Watch this AI-powered screen recording with sub-120ms WebRTC streaming on KoomAI.",
    };
  }
}


const PreviewPage = async (props: Props) => {
  const { params } = props;
  const { videoId } = await params;
  const query = new QueryClient();

  await query.prefetchQuery({
    queryKey: ["preview-video"],
    queryFn: () => getPreviewVideo(videoId),
  });

  await query.prefetchQuery({
    queryKey: ["video-comments"],
    queryFn: () => getVideoComments(videoId),
  });

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <VideoPreview videoId={videoId} />
    </HydrationBoundary>
  );
};

export default PreviewPage;
