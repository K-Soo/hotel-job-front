import BottomNavigation from '@/components/layout/BottomNavigation';
import Layout, { Main, Header, DesktopNavigation, MobileNavigation, Footer } from '@/components/layout';
import UserResumeHistoryContainer from '@/containers/userResumeHistoryContainer';

export default function UserResumeHistoryPage() {
  return <UserResumeHistoryContainer />;
}

UserResumeHistoryPage.getLayout = (page: React.ReactElement) => {
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

UserResumeHistoryPage.authentication = true;
UserResumeHistoryPage.allowedRoles = ['JOB_SEEKER'];
