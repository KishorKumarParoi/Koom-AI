import React from "react";
import LandingPageNavbar from "./_components/navbar";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col py-6 px-6 xl:px-0 container mx-auto 2xl:max-w-[1400px] min-h-screen">
      <LandingPageNavbar />
      <main className="flex-1 w-full">{children}</main>
    </div>
  );
};

export default HomeLayout;
