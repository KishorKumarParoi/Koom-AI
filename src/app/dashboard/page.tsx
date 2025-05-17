import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  // Authentication check
  const auth = await onAuthenticateUser();
  console.log("Dashboard->auth: ", auth);

  if (auth.status === 200 || auth.status === 201) {
    return redirect(`/dashboard/${auth.user?.workspace[0].id}`);
  }

  if (auth.status === 400 || auth.status === 404 || auth.status === 500) {
    return redirect("/");
  }
  return <div>DashboardPage</div>;
};

export default DashboardPage;
