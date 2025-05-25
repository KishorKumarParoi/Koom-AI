import CreateFolders from "@/components/global/create-folders";
import CreateWorkSpace from "@/components/global/create-workspace";
import Folders from "@/components/global/folders";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {
  params: {
    workSpaceId: string;
  };
};

const WorkSpaceIdPage = (props: Props) => {
  const workSpaceId = props.params.workSpaceId;
  console.log("dashboard/[workspaceid]/page.tsx -> workSpaceId: ", workSpaceId);

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
      </Tabs>
    </div>
  );
};

export default WorkSpaceIdPage;
