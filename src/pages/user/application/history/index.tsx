import Layout, { Main, Header, DesktopNavigation, MobileNavigation } from '@/components/layout';
import UserApplicationHistoryContainer from '@/containers/userApplicationHistoryContainer';

export default function UserApplicationHistoryPage() {
  return <UserApplicationHistoryContainer />;
}

UserApplicationHistoryPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <Header>
        <DesktopNavigation />
        <MobileNavigation title="지원현황" hamburgerIcon homeIcon />
      </Header>
      <Main>{page}</Main>
    </Layout>
  );
};

UserApplicationHistoryPage.authentication = true;
UserApplicationHistoryPage.allowedRoles = ['JOB_SEEKER'];
