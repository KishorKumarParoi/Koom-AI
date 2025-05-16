import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";

type Props = {
  params: {
    workspaceId: string;
  };
  children: React.ReactNode;
};

const DashboardLayout = async ({
  params: { workspaceId },
  children,
}: Props) => {
  const auth = await onAuthenticateUser();
  if (!auth.user?.workspace) redirect("/auth/sign-in");

  return (
    <div>
      DashboardLayout
      {children}
    </div>
  );
};

export default DashboardLayout;
