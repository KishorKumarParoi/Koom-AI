import LandingPageNavbar from "./_components/navbar";

const HomeLayout = () => {
  return (
    <div className="flex flex-col py-10 px-10 xl:px-0 container mx-auto 2xl:max-w-[1400px]">
      <LandingPageNavbar />
    </div>
  );
};

export default HomeLayout;
