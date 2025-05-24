import { getUserNotifications, onAuthenticateUser } from "@/actions/user";
import {
  getAllUserVideos,
  getWorkSpaceFolders,
  getWorkSpaces,
  verifyAccessToWorkspace,
} from "@/actions/workspace";
import GlobalHeader from "@/components/global/global-header";
import Sidebar from "@/components/global/sidebar";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";

type Props = {
  params: {
    workSpaceId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
  children: React.ReactNode;
};

const DashboardLayout = async (props: Props) => {
  const { params, searchParams, children } = props;
  const { workSpaceId } = await params;

  console.log("WorkSpaceId@before: ", workSpaceId);
  console.log("Search Params: ", searchParams);
  const auth = await onAuthenticateUser();
  console.log("Dashboard Auth Layout: ", auth);

  if (!auth.user?.workspace) redirect("/auth/sign-in");
  if (!auth.user?.workspace.length) redirect("/auth/sign-in");

  // Check if the user has the right to access the workspace
  const hasAccess = await verifyAccessToWorkspace(workSpaceId);
  const firstWorkspaceId = auth.user?.workspace[0]?.id;

  console.log("HasAccess file", hasAccess);

  console.log("WorkspaceId: ", workSpaceId);
  console.log("firstWorkSpaceId: ", firstWorkspaceId);

  // if the hasAccess status is not 200, redirect to the first workspace
  if (hasAccess.status !== 200) {
    // Prevent redirect loop by checking if the current workspace is the same as the first one
    if (workSpaceId === firstWorkspaceId) {
      // No accessible workspace, redirect to sign-in or error page
      redirect("/auth/sign-in");
    } else {
      redirect(`/`);
    }
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
    <HydrationBoundary state={dehydrate(query)}>
      <div className="flex h-screen w-screen">
        <div className="shadow-3xl md:border-r h-full">
          <Sidebar activeWorkSpaceId={workSpaceId} />
        </div>
        <div
          className="w-full
        pt-28 p-6 overflow-y-scroll overflow-x-hidden "
        >
          <GlobalHeader workspace={hasAccess.data.workSpace} />
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default DashboardLayout;
