import Layout, { Main, Header, DesktopNavigation, MobileNavigation } from '@/components/layout';
import UserApplicationHistoryDetailContainer from '@/containers/userApplicationHistoryDetailContainer';

export default function UserApplicationHistoryDetailPage() {
  return <UserApplicationHistoryDetailContainer />;
}

UserApplicationHistoryDetailPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <Header>
        <DesktopNavigation />
        <MobileNavigation title="지원 상세내용" hamburgerIcon homeIcon />
      </Header>
      <Main>{page}</Main>
    </Layout>
  );
};

UserApplicationHistoryDetailPage.authentication = true;
UserApplicationHistoryDetailPage.allowedRoles = ['JOB_SEEKER'];
