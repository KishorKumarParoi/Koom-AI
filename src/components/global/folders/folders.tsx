"use client";
import { renameFolders } from "@/actions/workspace";
import { Input } from "@/components/ui/input";
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

  const [onRename, setonRename] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const folderCardRef = useRef<HTMLDivElement | null>(null);

  const Rename = () => setonRename(true);
  const Renamed = () => setonRename(false);

  const handleFolderClick = () => {
    if (onRename) return;
    router.push(`${pathname}/folder/${id}`);
  };

  const handleNameDoubleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();
    Rename();
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

  const updateFolderName = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log("event@updatefoldername func: ", e.target);

    if (inputRef.current && folderCardRef.current) {
      if (inputRef.current.value) {
        console.log("Running...");
        mutate({
          name: inputRef.current.value,
        });
      } else {
        Renamed();
      }
    }
  };

  return (
    <div
      ref={folderCardRef}
      onClick={handleFolderClick}
      className={cn(
        optimistic && "opacity-60",
        "flex hover:bg-neutral-800 cursor-pointer transition duration-150 items-center gap-2 justify-between min-w-[250px] py-6 px-4 rounded-lg border-[1px]"
      )}
    >
      <Loader state={false}>
        <div className="flex flex-col gap-[1px]">
          {onRename ? (
            <Input
              onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                updateFolderName(e)
              }
              autoFocus
              placeholder={name}
              className="border-none text-base w-full outline-none text-neutral-300 bg-transparent px-2"
              ref={inputRef}
            />
          ) : (
            <p
              onClick={(e) => e.stopPropagation()}
              className="text-neutral-300"
              onDoubleClick={handleNameDoubleClick}
            >
              {name}
            </p>
          )}

          <span className="text-sm text-neutral-500">{count || 0} videos</span>
        </div>
      </Loader>
      <FolderIcon />
    </div>
  );
};

export default Folder;
