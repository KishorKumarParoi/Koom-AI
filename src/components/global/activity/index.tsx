import { TabsContent } from "@/components/ui/tabs";
import CommentCard from "../comment-card";
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
      <CommentCard
        comment={""}
        author={{
          image: "",
          firstname: "",
          lastname: "",
        }}
        videoId={""}
        reply={[]}
      />
    </TabsContent>
  );
};

export default Activity;
