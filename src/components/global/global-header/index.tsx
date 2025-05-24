"use client";

import { WorkSpace } from "@/generated/prisma";
import { usePathname } from "next/navigation";

type Props = {
  workspace: WorkSpace;
};

const GlobalHeader = (props: Props) => {
  const workSpace = props.workspace;

  // Pathname
  const pathname = usePathname().split(`/dashboard/${workSpace.id}`)[1];
  console.log("Pathname: ", pathname);

  return (
    <article className="flex flex-col gap-2 items-start w-full">
      <span className="text-[#707070] text-xs text-left w-full">
        {workSpace.type.toLocaleUpperCase()}
      </span>
      <h1
        className="text-4xl font-bold text-left w-full"
        style={{ textAlign: "left" }}
      >
        {pathname && !pathname.includes("folder")
          ? pathname.charAt(0).toUpperCase() + pathname.slice(1).toLowerCase()
          : "My Library"}
      </h1>
    </article>
  );
};

export default GlobalHeader;
