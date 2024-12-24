import Layout, { Main, Header, DesktopNavigation, MobileNavigation, Footer } from '@/components/layout';
import UserProfileContainer from '@/containers/userProfileContainer';

export default function UserProfilePage() {
  return <UserProfileContainer />;
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
