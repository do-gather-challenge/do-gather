import Header from '@/components/layouts/header';

const Layout = ({
  children,
  auth
}: Readonly<{
  children: React.ReactNode;
  auth: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      {auth}
      <main className="mx-auto mt-15 min-h-[calc(100vh-3.75rem)] w-full max-w-7xl md:mt-20 md:min-h-[calc(100vh-5rem)]">
        {children}
      </main>
    </>
  );
};

export default Layout;
