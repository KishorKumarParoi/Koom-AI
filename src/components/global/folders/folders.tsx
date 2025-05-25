"use client";
import { renameFolders } from "@/actions/workspace";
import { useMutationData } from "@/hooks/useMutationData";
import { cn } from "@/lib/utils";
import { FolderIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Loader from "../loader";

type Props = {
  name: string;
  id: string;
  optimistic?: boolean;
  count?: number;
};

const Folder = (props: Props) => {
  const { name, id, optimistic, count } = props;
  const pathname = usePathname();
  const router = useRouter();

  const [onName, setOnName] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const folderCardRef = useRef<HTMLDivElement | null>(null);

  const Rename = () => setOnName(true);
  const Renamed = () => setOnName(false);

  const handleFolderClick = () => {
    router.push(`${pathname}/folder/${id}`);
  };

  const handleNameDoubleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();
    // TODO: Rename Functionality
  };

  // TODO: Add Loading state
  // TODO: Optimistic UI Updates

  const { mutate, isPending } = useMutationData(
    ["rename-folders"],
    (data: { name: string }) => renameFolders(id, name),
    "workspace-folders",
    Renamed
  );

  return (
    <div
      onClick={handleFolderClick}
      className={cn(
        "flex hover:bg-neutral-800 cursor-pointer transition duration-150 items-center gap-2 justify-between min-w-[250px] py-6 px-4 rounded-lg border-[1px]"
      )}
    >
      <Loader state={false}>
        <div className="flex flex-col gap-[1px]">
          <p className="text-neutral-300" onDoubleClick={handleNameDoubleClick}>
            {name}
          </p>
          <span className="text-sm text-neutral-500">{count || 0} videos</span>
        </div>
      </Loader>
      <FolderIcon />
    </div>
  );
};

export default Folder;
