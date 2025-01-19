import Layout, { Main, Header, DesktopNavigation, MobileNavigation, Footer } from '@/components/layout';
import UserApplicationHistoryContainer from '@/containers/userApplicationHistoryContainer';

export default function UserApplicationHistoryPage() {
  return <UserApplicationHistoryContainer />;
}

UserApplicationHistoryPage.getLayout = (page: React.ReactElement) => {
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

UserApplicationHistoryPage.authentication = true;
UserApplicationHistoryPage.allowedRoles = ['JOB_SEEKER'];
