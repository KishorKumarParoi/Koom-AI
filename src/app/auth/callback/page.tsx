import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";

const AuthCallBackPage = async () => {
  // Authentication check
  const auth = await onAuthenticateUser();
  console.log("Auth: ", auth);

  if (auth.status === 200 || auth.status === 201) {
    console.log("Hello I am here");
    return redirect(`/dashboard/${auth.user?.workspace[0].id}`);
  }

  if (auth.status === 400 || auth.status === 404 || auth.status === 500) {
    return redirect("/");
  }
  return <div>AuthCallBackPage</div>;
};

export default AuthCallBackPage;
