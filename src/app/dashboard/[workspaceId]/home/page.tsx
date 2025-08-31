import { getWixContent } from "@/actions/workspace";

const Home = async () => {
  const video = await getWixContent();
  console.log("Video@WIx: ", video);

  return <div>Home</div>;
};

export default Home;
