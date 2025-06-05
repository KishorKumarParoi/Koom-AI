"use client";

import { getFolderInfo } from "@/actions/workspace";
import useQueryData from "@/hooks/useQueryData";
import { FolderProps } from "@/types/index.type";

type Props = {
  folderId: string;
};

const FolderInfo = (props: Props) => {
  const folderId = props.folderId;
  const { data } = useQueryData(["folder-info"], () => getFolderInfo(folderId));

  console.log("data@FolderInfo: ", data);

  const { data: folder } = data as FolderProps;

  return (
    <div className="flex items-center">
      <h1 className="text-[#BDBDBD] text-6xl block">{folder.name}</h1>
    </div>
  );
};

export default FolderInfo;
