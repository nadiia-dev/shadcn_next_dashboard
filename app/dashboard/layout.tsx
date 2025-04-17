const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="md:grid md:grid-cols-[250px_1fr] h-screen">
      <div className="bg-muted overflow-auto">sidebar</div>

      <div className="overflow-auto py-2 px-4">
        <h1 className="pb-4">Welcome back, Tom!</h1>
        {children}
      </div>
    </div>
  );
};

export default Layout;
