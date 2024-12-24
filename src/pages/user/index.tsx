import Layout, { Main, Header, DesktopNavigation, MobileNavigation, Footer } from '@/components/layout';
import UserContainer from '@/containers/userContainer';
import BottomNavigation from '@/components/common/BottomNavigation';

export default function UserPage() {
  return <UserContainer />;
}

UserPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <Header>
        <DesktopNavigation />
        <MobileNavigation title="MY" />
      </Header>
      <Main>{page}</Main>
      <BottomNavigation />
    </Layout>
  );
};

UserPage.authentication = true;
