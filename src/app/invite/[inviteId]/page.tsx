import { acceptInvite } from "@/actions/user";
import { redirect } from "next/navigation";

type Props = {
  params: {
    inviteId: string;
  };
};
const Invite = async ({ params: { inviteId } }: Props) => {
  console.log("inviteId@invite", inviteId);
  const invite = await acceptInvite(inviteId);

  if (invite.status === 400) return redirect("/redirect/sign-in");
  if (invite.status === 401) {
    return (
      <div className="h-screen container flex flex-col gapy-2 justify-center items-center">
        <h2 className="text-6xl font-bold text-white">Not Authorized</h2>
        <p>You are not authorized to accept this invite</p>
      </div>
    );
  }

  if (invite.status === 200) return redirect("/auth/callback");

  return <div>Invite</div>;
};

export default Invite;
