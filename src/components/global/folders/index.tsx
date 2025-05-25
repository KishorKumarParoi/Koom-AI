import { cn } from "@/lib/utils";
import { ArrowRight, FolderIcon } from "lucide-react";
import Folder from "./folders";

type Props = {
  workSpaceId: string;
};
const Folders = (props: Props) => {
  const workSpaceId = props.workSpaceId;
  console.log("@Folders, workSpaceId: ", workSpaceId);

  // get folders
  // optimistic variable

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <FolderIcon />
          <h2 className="text-[#BDBDBD] text-xl ">Folders</h2>
        </div>
        <div className="flex items-center gap-2">
          <p className=" text-[#BDBDBD]">See all</p>
          <ArrowRight color="#707070" />
        </div>
      </div>
      <section className={cn("flex items-center gap-4 overflow-x-auto w-full")}>
        <Folder name="Folder Title" />
        <Folder name="Folder Title" />
        <Folder name="Folder Title" />
        <Folder name="Folder Title" />
        <Folder name="Folder Title" />
      </section>
    </div>
  );
};

export default Folders;
