import { getAllUserVideos, getFolderInfo } from "@/actions/workspace";
import { QueryClient } from "@tanstack/react-query";

type Props = {
  params: {
    folderId: string;
    workSpaceId: string;
  };
};

const FolderIdPage = async (props: Props) => {
  const { params } = props;
  const folderId = params.folderId;
  const workSpaceId = params.workSpaceId;

  const query = new QueryClient();
  await query.prefetchQuery({
    queryKey: ["folder-videos"],
    queryFn: () => getAllUserVideos(workSpaceId),
  });

  await query.prefetchQuery({
    queryKey: ["folder-info"],
    queryFn: () => getFolderInfo(folderId),
  });

  return <div>FolderIdPage</div>;
};

export default FolderIdPage;
