import Layout, { Main, Header, DesktopNavigation, MobileNavigation } from '@/components/layout';
import UserResumeRegisterContainer from '@/containers/userResumeRegisterContainer';
export default function UserResumeRegisterPage() {
  return <UserResumeRegisterContainer />;
}

UserResumeRegisterPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <Header>
        <DesktopNavigation />
        <MobileNavigation title="이력서 등록" />
      </Header>
      <Main>{page}</Main>
    </Layout>
  );
};

UserResumeRegisterPage.authentication = true;
UserResumeRegisterPage.allowedRoles = ['JOB_SEEKER'];
