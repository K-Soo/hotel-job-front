import Layout, { Main, Header, DesktopNavigation, MobileNavigation, Footer } from '@/components/layout';
import UserProfileContainer from '@/containers/userProfileContainer';
import { ErrorBoundary, ErrorComponent } from '@/error';

export default function UserProfilePage() {
  return (
    <ErrorBoundary fallback={<ErrorComponent />}>
      <UserProfileContainer />
    </ErrorBoundary>
  );
}

UserProfilePage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <Header>
        <DesktopNavigation />
        <MobileNavigation title="회원정보" />
      </Header>
      <Main>{page}</Main>
      <Footer />
    </Layout>
  );
};

UserProfilePage.authentication = true;
UserProfilePage.allowedRoles = ['JOB_SEEKER'];
