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
      {children}
    </>
  );
};

export default Layout;
