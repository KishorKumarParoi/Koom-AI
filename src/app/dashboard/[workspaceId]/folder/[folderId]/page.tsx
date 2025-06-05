import { getAllUserVideos, getFolderInfo } from "@/actions/workspace";
import FolderInfo from "@/components/global/folders/folder-info";
import Videos from "@/components/global/videos";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type Props = {
  params: {
    folderId: string;
    workSpaceId: string;
  };
};

// http://localhost:3000/dashboard/12933df9-51f4-42ad-80d6-add40c882485/folder/edf85d1f-c724-41c5-9c35-f7634ae662a4

const FolderIdPage = async (props: Props) => {
  const { folderId, workSpaceId } = await props.params;
  const query = new QueryClient();
  await query.prefetchQuery({
    queryKey: ["folder-videos"],
    queryFn: () => getAllUserVideos(workSpaceId),
  });

  await query.prefetchQuery({
    queryKey: ["folder-info"],
    queryFn: () => getFolderInfo(folderId),
  });

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <FolderInfo folderId={folderId} />
      <Videos
        folderId={folderId}
        workSpaceId={workSpaceId}
        videosKey={"folder-videos"}
      />
    </HydrationBoundary>
  );
};

export default FolderIdPage;
