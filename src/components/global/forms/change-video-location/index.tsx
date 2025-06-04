import { Separator } from "@/components/ui/separator";

type Props = {
  videoId: string;
  currentFolder?: string;
  currentWorkSpace?: string;
  currentFolderName?: string;
};

const ChangeVideoLocation = ({
  videoId,
  currentFolder,
  currentWorkSpace,
  currentFolderName,
}) => {
  // wire up the use move folder
  return (
    <form className="flex flex-col gap-y-5">
      <div className="border-[1px] rounded-xl p-5">
        <h2 className="text-xs mb-5 text-[#a4a4a4]">Current</h2>
        <p className="text-[#a4a4a4]">Workspace</p>
        <p className="text-[#a4a4a4] text-sm">Kepi.ai videos list</p>
      </div>

      <Separator orientation="horizontal" />

      <div className="flex flex-col gap-y-5 p-5 border-[1px] rounded-xl">
        <h2 className="text-xs text-[#a4a4a4]">To</h2>
        <label className="flex-col gap-y-2 flex">
          <p className="text-xs">Workspace</p>
          <select className="rounded-xl text-base bg-transparent">
            <option className="text-[#a4a4a4]" value={"something"}>
              workspace
            </option>
            <option className="text-[#a4a4a4]" value={"kkp"}>
              kkp
            </option>
          </select>
        </label>
      </div>
    </form>
  );
};

export default ChangeVideoLocation;
