import Spinner from "@/components/global/loader/spinner";

const AuthLoadingPage = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Spinner size={100} />
    </div>
  );
};

export default AuthLoadingPage;
