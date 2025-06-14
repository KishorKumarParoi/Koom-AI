import { TabsContent } from "@/components/ui/tabs";
import CommentForm from "../forms/comment-form";
type Props = {
  author: string;
  videoId: string;
};

const Activity = ({ author, videoId }: Props) => {
  return (
    <TabsContent
      value="Activity"
      className="p-5 bg-[#1D1D1D] rounded-xl flex flex-col gap-y-10"
    >
      <CommentForm author={author} videoId={videoId} />
    </TabsContent>
  );
};

export default Activity;
