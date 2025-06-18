import { getVideoComments } from "@/actions/user";
import { TabsContent } from "@/components/ui/tabs";
import useQueryData from "@/hooks/useQueryData";
import { VideoCommentProps } from "@/types/index.type";
import { useEffect, useState } from "react";
import CommentCard from "../comment-card";
import CommentForm from "../forms/comment-form";
import Loader from "../loader";

type Props = {
  author: string;
  videoId: string;
};

const Activity = ({ author, videoId }: Props) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { isFetching, isFetched, data } = useQueryData(["video-comments"], () =>
    getVideoComments(videoId)
  );

  if (!mounted) return null; // Prevents hydration mismatch

  if (isFetching) {
    return (
      <Loader
        className="flex justify-center items-center mt-4"
        state
        color="#000"
      />
    );
  }

  const { data: comments } = data as VideoCommentProps;

  return (
    <TabsContent
      value="Activity"
      className="p-5 bg-[#1D1D1D] rounded-xl flex flex-col gap-y-10"
    >
      <CommentForm author={author} videoId={videoId} />
      {isFetched && Array.isArray(comments) && comments.length > 0 ? (
        comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment.comment}
            author={{
              image: comment.User?.image ?? "",
              firstname: comment.User?.firstname ?? "",
              lastname: comment.User?.lastname ?? "",
            }}
            videoId={videoId}
            reply={comment.reply}
            commentId={comment.id}
          />
        ))
      ) : (
        <div className="text-muted-foreground text-center">
          No comments yet.
        </div>
      )}
    </TabsContent>
  );
};

export default Activity;
