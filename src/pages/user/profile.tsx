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
        <MobileNavigation title="프로필" />
      </Header>
      <Main>{page}</Main>
      <Footer />
    </Layout>
  );
};

UserProfilePage.authentication = true;
UserProfilePage.allowedRoles = ['JOB_SEEKER'];
