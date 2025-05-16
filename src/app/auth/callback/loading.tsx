import Spinner from "@/components/global/loader/spinner";

const AuthLoadingPage = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Spinner />
    </div>
  );
};

export default AuthLoadingPage;
