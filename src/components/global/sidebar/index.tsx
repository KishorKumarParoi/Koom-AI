import Image from "next/image";

type Props = {
  activeWorkSpaceId: string;
};

const Sidebar = ({ activeWorkSpaceId }: Props) => {
  return (
    <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden">
      <div className="bg-[#111111] p-4 gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0">
        <Image src={"/logo.png"} height={100} width={56} alt="logo" />
        Sidebar : {activeWorkSpaceId}
      </div>
    </div>
  );
};

export default Sidebar;
