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
      <main className="mt-15 min-h-screen w-full md:mt-20">{children}</main>
    </>
  );
};

export default Layout;
