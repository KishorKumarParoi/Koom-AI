import { acceptInvite } from "@/actions/user";
import { redirect } from "next/navigation";

type Props = {
  params: {
    inviteId: string;
  };
};

const Invite = async ({ params: { inviteId } }: Props) => {
  const invite = await acceptInvite(inviteId);

  if (invite.status === 400) return redirect("/redirect/sign-in");

  if (invite.status === 401) {
    // Check for the specific message from your acceptInvite function
    if (invite.message === "Already Present in this workspace") {
      return (
        <div className="h-screen container flex flex-col gap-y-2 justify-center items-center">
          <h2 className="text-6xl font-bold text-white">Already Joined</h2>
          <p>
            You have already accepted this invite and are a member of the
            workspace.
          </p>
        </div>
      );
    }
    // Fallback for other unauthorized cases
    return (
      <div className="h-screen container flex flex-col gap-y-2 justify-center items-center">
        <h2 className="text-6xl font-bold text-white">Not Authorized</h2>
        <p>You are not authorized to accept this invite</p>
      </div>
    );
  }

  if (invite.status === 200) return redirect("/auth/callback");

  return <div>Invite</div>;
};

export default Invite;
