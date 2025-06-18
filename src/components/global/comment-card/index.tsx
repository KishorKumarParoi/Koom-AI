import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CommentRepliesProps } from "@/types/index.type";

type Props = {
  comment: string;
  author: { image: string; firstname: string; lastname: string };
  videoId: string;
  commentId?: string;
  reply: CommentRepliesProps[];
  isReply?: boolean;
};
const CommentCard = ({
  comment,
  author,
  videoId,
  commentId,
  reply,
  isReply,
}: Props) => {
  //   const [onReply, setOnReply] = useState < boolean > false;

  return (
    <Card
      className={cn(
        isReply
          ? "bg-[#1D1D1D] pl-10 border-none"
          : "border-[1px] bg-[#1D1D1D] p-5"
      )}
    >
      <div className="flex gap-x-2 items-center">
        <Avatar>
          <AvatarImage src={author.image} alt="author" />
        </Avatar>
        <p className="capitalize text-sm text-[#BDBDBD]">
          {author.firstname} {author.lastname}
        </p>
      </div>
      <div>
        <p className="text-[#BDBDBD">{comment}</p>
        <p className="text-[#BDBDBD">{videoId}</p>
        <p className="text-[#BDBDBD">{commentId}</p>
        <p className="text-[#BDBDBD">
          {reply.map((rep) => (
            <div key={rep.id}>{rep.comment}</div>
          ))}
        </p>
      </div>
    </Card>
  );
};

export default CommentCard;
