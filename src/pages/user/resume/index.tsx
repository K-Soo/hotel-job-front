import BottomNavigation from '@/components/layout/BottomNavigation';
import Layout, { Main, Header, DesktopNavigation, MobileNavigation, Footer } from '@/components/layout';
import UserResumeContainer from '@/containers/userResumeContainer';
export default function UserResumePage() {
  return <UserResumeContainer />;
}

UserResumePage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <Header>
        <DesktopNavigation />
        <MobileNavigation title="내 이력서" />
      </Header>
      <Main>{page}</Main>
      <Footer />
      <BottomNavigation />
    </Layout>
  );
};

UserResumePage.authentication = true;
UserResumePage.allowedRoles = ['JOB_SEEKER'];
