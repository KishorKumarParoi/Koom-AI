import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import { toast } from "sonner";

type Props = {
  videoId: string;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null;
};

const CopyLink = ({ videoId, className, variant }: Props) => {
  const onCopyClipboard = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_HOST_URL}/preview/${videoId}`
    );

    return toast("Copied", {
      description: "Link successfuly copied",
    });
  };

  return (
    <Button variant={variant} onClick={onCopyClipboard} className={className}>
      <Link size={20} className="text-[#100202]" />
    </Button>
  );
};

export default CopyLink;
