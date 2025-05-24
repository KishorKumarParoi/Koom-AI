import { Tabs } from "@/components/ui/tabs";

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
      <Tabs>Kishor</Tabs>
    </div>
  );
};

export default WorkSpaceIdPage;
