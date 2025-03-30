import BottomNavigation from '@/components/layout/BottomNavigation';
import Layout, { Main, Header, DesktopNavigation, MobileNavigation } from '@/components/layout';
import UserResumeContainer from '@/containers/userResumeContainer';
export default function UserResumePage() {
  return <UserResumeContainer />;
}

UserResumePage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <Header>
        <DesktopNavigation />
        <MobileNavigation title="이력서 목록" hamburgerIcon />
      </Header>
      <Main>{page}</Main>
      <BottomNavigation />
    </Layout>
  );
};

UserResumePage.authentication = true;
UserResumePage.allowedRoles = ['JOB_SEEKER'];
