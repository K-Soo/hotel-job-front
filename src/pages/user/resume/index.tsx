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
        <MobileNavigation />
      </Header>
      <Main>{page}</Main>
    </Layout>
  );
};

UserResumePage.authentication = true;
