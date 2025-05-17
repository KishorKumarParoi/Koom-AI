import { getUserNotifications, onAuthenticateUser } from "@/actions/user";
import {
  getAllUserVideos,
  getWorkSpaceFolders,
  getWorkSpaces,
  verifyAccessToWorkspace,
} from "@/actions/workspace";
import { QueryClient } from "@tanstack/react-query";
import { redirect } from "next/navigation";

type Props = {
  params: {
    workSpaceId: string;
  };
  children: React.ReactNode;
};

const DashboardLayout = async ({
  params: { workSpaceId },
  children,
}: Props) => {
  const auth = await onAuthenticateUser();
  if (!auth.user?.workspace) redirect("/auth/sign-in");
  if (!auth.user?.workspace.length) redirect("/auth/sign-in");

  // Check if the user has the right to access the workspace
  const hasAccess = await verifyAccessToWorkspace(workSpaceId);

  // if the hasAccess status is not 200, redirect to the first workspace
  if (hasAccess.status !== 200) {
    redirect(`/dashboard/${auth.user?.workspace[0].id}`);
  }

  // if the user has no access to the workspace, return null
  if (!hasAccess.data?.workSpace) {
    return null;
  }

  const query = new QueryClient();
  await query.prefetchQuery({
    queryKey: ["workspace-folders"],
    queryFn: () => getWorkSpaceFolders(workSpaceId),
  });

  await query.prefetchQuery({
    queryKey: ["user-videos"],
    queryFn: () => getAllUserVideos(workSpaceId),
  });

  await query.prefetchQuery({
    queryKey: ["user-workspaces"],
    queryFn: () => getWorkSpaces(),
  });

  await query.prefetchQuery({
    queryKey: ["user-notifications"],
    queryFn: () => getUserNotifications(),
  });

  return (
    <div>
      DashboardLayout
      {children}
    </div>
  );
};

export default DashboardLayout;
