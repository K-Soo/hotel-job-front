import Layout, { Main, Header, DesktopNavigation, MobileNavigation, Footer } from '@/components/layout';

export default function AccountResumePage() {
  return <></>;
}

AccountResumePage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <Header>
        <DesktopNavigation />
        <MobileNavigation />
      </Header>
      <Main>{page}</Main>
      <Footer />
    </Layout>
  );
};

AccountResumePage.authentication = true;
