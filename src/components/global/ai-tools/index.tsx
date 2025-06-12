import { TabsContent } from "@/components/ui/tabs";
import { Bot, File, Pencil, StarsIcon } from "lucide-react";

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
        {/* {plan === "FREE" ? (
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
         
         <div className="flex items-center justify-between gap-4">
          <Button className="mt-2 text-sm">
            <Loader state={false} color="#000">
              Try Now
            </Loader>
          </Button>
          <Button
            className="mt-2 text-sm bg-slate-800 cursor-pointer"
            variant={"secondary"}
          >
            <Loader
              state={false}
              // state={isPending}
              color="#000"
            >
              Pay Now
            </Loader>
          </Button>

          <Button className="mt-2 text-sm">
            <Loader state={false} color="#000">
              Generate Now
            </Loader>
          </Button>
        </div>
         

        <div className="flex justify-between">
          <div
            className="flex flex-col
            items-center text-center text-[#BDbDbD] gap-y-2 text-sm"
          >
            <Video width={36} height={36} />
            Generate Video Summary
          </div>
          <div
            className="flex flex-col
            items-center text-center text-[#BDbDbD] gap-y-2 text-sm"
          >
            <File width={36} height={36} />
            Create and Read Video <br /> Transcripts
          </div>
          <div
            className="flex flex-col
            items-center text-center text-[#BDbDbD] gap-y-2 text-sm"
          >
            <Download width={36} height={36} />
            Download Video <br /> File
          </div>
        </div>
         */}

        {/* <div className="border-[1px] rounded-xl p-4 gap-4 flex flex-col bg-[#1b0f1b7f]">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#9308dd] via-[#3d50df] to-[#21c9cf] bg-clip-text text-transparent">
              Koom AI
            </h2>
            <StarsIcon color="#a22fe0" fill="#a22fe0" />
          </div>
          <div className="flex gap-2 items-start">
            <div className="p-2 rounded-full border-[#2D2D2D] border-[2px] bg-[#2b2b2b]">
              <Pencil color="#a22fe0" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-md">Summary</h3>
              <p className="text-muted-foreground text-sm">
                Generate a description for your video using AI.
              </p>
            </div>
          </div>
          <div className="flex gap-2 items-start">
            <div className="p-2 rounded-full border-[#2D2D2D] border-[2px] bg-[#2b2b2b]">
              <File color="#a22fe0" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-md">Description</h3>
              <p className="text-muted-foreground text-sm">
                Save description of your video using AI.
              </p>
            </div>
          </div>
          <div className="flex gap-2 items-start">
            <div className="p-2 rounded-full border-[#2d2d2d] border-[2px] bg-[#2b2b2b]">
              <Bot color="#a22fe0" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-md">AI Agent</h3>
              <p className="text-muted-foreground text-sm">
                Viewers can ask questions on your video and our ai agent will
                respond.
              </p>
            </div>
          </div>
        </div> */}

        <div className="border border-[#2d2d2d] rounded-2xl p-6 gap-6 flex flex-col bg-gradient-to-br from-[#1b0f1bcc] via-[#23234a99] to-[#1b0f1b66] backdrop-blur-md shadow-xl">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#a22fe0] via-[#5f6ee0] to-[#2fdbe0] bg-clip-text text-transparent drop-shadow-lg">
              Koom AI
            </h2>
            <StarsIcon className="drop-shadow" color="#a22fe0" fill="#a22fe0" />
          </div>
          <div className="flex gap-3 items-start">
            <div className="p-3 rounded-full border-2 border-[#a22fe0] bg-gradient-to-br from-[#2b2b2b] via-[#3d50df22] to-[#a22fe022] shadow">
              <Pencil color="#a22fe0" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-base font-semibold text-[#e0e0e0]">
                Summary
              </h3>
              <p className="text-[#bdbdbd] text-sm">
                Generate a description for your video using AI.
              </p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <div className="p-3 rounded-full border-2 border-[#5f6ee0] bg-gradient-to-br from-[#2b2b2b] via-[#5f6ee022] to-[#2fdbe022] shadow">
              <File color="#5f6ee0" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-base font-semibold text-[#e0e0e0]">
                Description
              </h3>
              <p className="text-[#bdbdbd] text-sm">
                Save description of your video using AI.
              </p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <div className="p-3 rounded-full border-2 border-[#2fdbe0] bg-gradient-to-br from-[#2b2b2b] via-[#2fdbe022] to-[#a22fe022] shadow">
              <Bot color="#2fdbe0" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-base font-semibold text-[#e0e0e0]">
                AI Agent
              </h3>
              <p className="text-[#bdbdbd] text-sm">
                Viewers can ask questions on your video and our AI agent will
                respond.
              </p>
            </div>
          </div>
        </div>
      </div>
    </TabsContent>
  );
};

export default AiTools;
