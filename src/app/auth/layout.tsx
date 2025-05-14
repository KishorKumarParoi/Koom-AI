const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto 2xl:max-w-[1400px] h-screen flex justify-center items-center">
      {children}
    </div>
  );
};

export default AuthLayout;
