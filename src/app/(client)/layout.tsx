import Header from '@/components/layouts/header';

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      <main className="mx-auto mt-15 min-h-screen w-full max-w-7xl md:mt-20">{children}</main>
    </>
  );
};

export default Layout;
