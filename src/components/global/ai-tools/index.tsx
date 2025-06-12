import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import Loader from "../loader";

type Props = {
  plan: "PRO" | "FREE";
  trial: boolean;
  videoId: string;
};

const AiTools = ({ plan, trial, videoId }: Props) => {
  return (
    <TabsContent
      value="AI Tools"
      className="p-5 bg-[#1D1D1D] rounded-xl flex flex-col gap-y-10"
    >
      <div className="flex items-center">
        <div className="w-8/12">
          <h2 className="text-3xl font-bold"></h2>
          <p className="text-[#BDBDBD]">
            Taking your video to the next <br /> step with the power of AI!
          </p>
        </div>

        {plan === "FREE" ? (
          !trial ? (
            <Button className="w-4/12 mt-2 text-sm cursor-pointer">
              <Loader
                state={false}
                // state={isPending}
                color="#000"
              >
                Try Now
              </Loader>
            </Button>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </div>
    </TabsContent>
  );
};

export default AiTools;
