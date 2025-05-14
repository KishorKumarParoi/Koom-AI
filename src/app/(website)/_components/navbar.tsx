import { Button } from "@/components/ui/button";
import { Menu, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const LandingPageNavbar = () => {
  return (
    <nav className="flex w-full justify-between items-center">
      <div className="text-3xl font-semibold flex items-center gap-x-3">
        <Menu className="w-8 h-8" />
        <Image alt="KoomAi LOGO" src="/logo.png" width={120} height={50} />
      </div>
      <div className="hidden lg:flex justify-center items-center gap-x-10 ">
        <Link
          href={"/"}
          className="bg-[#7320DD] py-2 px-5 font-semibold text-lg rounded-full hover:bg-[#7320DD]/80"
        >
          Home
        </Link>
        <Link href={"/pricing"} className="bg-primary">
          Pricing
        </Link>
        <Link href={"/contact"}>Contact</Link>
      </div>
      <Link href={"/auth/sign-in"}>
        <Button className="text-base flex gap-x-2 bg-white cursor-pointer text-black hover:bg-slate-200">
          <User fill="#000" />
          Login
        </Button>
      </Link>
    </nav>
  );
};

export default LandingPageNavbar;
