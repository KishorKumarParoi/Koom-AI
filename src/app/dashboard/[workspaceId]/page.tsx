import { getAllVideos } from "@/actions/workspace";
import CreateFolders from "@/components/global/create-folders";
import CreateWorkSpace from "@/components/global/create-workspace";
import Folders from "@/components/global/folders";
import RecentVideosList from "@/components/global/videos/recent-videos-list";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QueryClient } from "@tanstack/react-query";

type Props = {
  params: {
    workSpaceId: string;
  };
};

const WorkSpaceIdPage = async (props: Props) => {
  const { params } = props;
  const workSpaceId = await params.workSpaceId;
  console.log("dashboard/[workSpaceId]/page.tsx -> workSpaceId: ", workSpaceId);

  const query = new QueryClient();
  await query.prefetchQuery({
    queryKey: ["recent-videos"],
    queryFn: () => getAllVideos(workSpaceId),
  });

  return (
    <div>
      <Tabs defaultValue="videos" className="mt-6">
        <div className="flex w-full justify-between items-center">
          <TabsList className="bg-transparent gap-2 pl-0 ">
            <TabsTrigger
              className="p-[13px] px-6 rounded-full cursor-pointer data-[state=active]:bg-[#252525] "
              value="videos"
            >
              Videos
            </TabsTrigger>
            <TabsTrigger value="archive" className="cursor-pointer">
              Archive
            </TabsTrigger>
          </TabsList>
          <div className="flex gap-x-3">
            <CreateWorkSpace />
            <CreateFolders workSpaceId={workSpaceId} />
          </div>
        </div>
        <section className="py-9">
          <TabsContent value="videos">
            <Folders workSpaceId={workSpaceId} />
          </TabsContent>
        </section>

        <Separator className="bg-white" />

        <section className="py-9">
          <h1 className="text-4xl text-[#a4a4a4]">Recent Videos </h1>
          <RecentVideosList
            folderId={workSpaceId}
            workSpaceId={workSpaceId}
            videosKey="recent-videos"
          />
        </section>
      </Tabs>
    </div>
  );
};

export default WorkSpaceIdPage;
