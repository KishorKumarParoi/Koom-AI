import { TabsContent } from "@/components/ui/tabs";
type Props = {
  transcript: string;
};
const VideoTranscript = ({ transcript }: Props) => {
  return (
    <TabsContent
      value="Transcript"
      className="p-5 bg-[#1D1D1D] rounded-xl flex flex-col gap-y-10"
    >
      <p>{transcript}</p>
    </TabsContent>
  );
};

export default VideoTranscript;
