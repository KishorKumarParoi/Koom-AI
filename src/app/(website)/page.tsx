const Home = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="absolute inset-0 text-black -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
      Kishor
      {children}
    </div>
  );
};

export default Home;
