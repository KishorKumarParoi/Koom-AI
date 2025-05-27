import { Button } from "@/components/ui/button";
import { Folder } from "lucide-react";

type Props = {
  workSpaceId: string;
};

const CreateFolders = (props: Props) => {
  // TODO: WIP for optimistic ui update and watching folders
  const {} = useCreateFolders();

  // const workSpaceId = props.workSpaceId;
  // console.log("@createFolders, workSpaceId: ", workSpaceId);

  return (
    <Button className="bg-[#1D1D1D] text-[#707070] flex items-center gap-2 py-6 px-4 rounded-2xl ">
      <Folder />
      Create a folder
    </Button>
  );
};

export default CreateFolders;
