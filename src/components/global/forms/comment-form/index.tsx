"use client";
import { Button } from "@/components/ui/button";
import { useVideoComment } from "@/hooks/useVideo";
import { Send } from "lucide-react";
import { FormGenerator } from "../../form-generator";
import Loader from "../../loader";
type Props = {
  videoId: string;
  commentId?: string;
  author: string;
  close?: () => void;
};
const CommentForm = ({ author, videoId, commentId, close }: Props) => {
  const { errors, isPending, onFormSubmit, register } = useVideoComment(
    videoId,
    commentId ?? ""
  );
  return (
    <form className="relative w-full" onSubmit={onFormSubmit}>
      {/* {close && (
        <X
          onClick={close}
          size={18}
          className="absolute right-3 top-3 text-white/50 cursor-pointer hover:text-white/80"
        />
      )} */}
      <FormGenerator
        register={register}
        errors={errors}
        placeholder={`Respond to ${author}..`}
        name="comment"
        inputType="input"
        lines={8}
        type="text"
      />

      <Button
        className="p-0 cursor-pointer bg-transparent absolute right-3 top-0 hover:bg-transparent"
        type="submit"
      >
        <Loader state={isPending}>
          <Send
            className="text-white/50 cursor-pointer hover:text-white/80"
            size={18}
          />
        </Loader>
      </Button>
    </form>
  );
};

export default CommentForm;
