import { createCommentAndReply, getUserProfile } from "@/actions/user";
import { createCommentSchema } from "@/components/global/forms/comment-form/schema";
import { useMutationData } from "./useMutationData";
import useQueryData from "./useQueryData";
import useZodForm from "./useZodForm";

export const useVideoComment = (videoId: string, commentId: string) => {
  const { data } = useQueryData(["user-profile"], getUserProfile);

  const { status, data: user } = data as {
    status: number;
    data: {
      id: string;
      image: string;
    };
  };

  console.log("status@ useVideoComment", status);

  const { isPending, mutate } = useMutationData(
    ["new-comment"],
    (data: { comment: string }) => {
      return createCommentAndReply(user.id, data.comment, videoId, commentId);
    },
    "video-comments",
    () => reset()
  );

  const { register, onFormSubmit, errors, reset } = useZodForm(
    createCommentSchema,
    mutate
  );

  return { register, onFormSubmit, errors, isPending, reset };
};
