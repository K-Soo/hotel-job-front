import Layout, { Main, Header, DesktopNavigation, MobileNavigation, Footer } from '@/components/layout';

export default function UserProfilePage() {
  return <>profile</>;
}

UserProfilePage.getLayout = (page: React.ReactElement) => {
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

UserProfilePage.authentication = true;
