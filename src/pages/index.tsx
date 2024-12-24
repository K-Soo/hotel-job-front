import Layout, { Header, Footer, Main, DesktopNavigation, MobileNavigation } from '@/components/layout';
import HomeContainer from '@/containers/homeContainer';
import BottomNavigation from '@/components/common/BottomNavigation';

export default function HomePage() {
  return <HomeContainer />;
}

HomePage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <Header>
        <DesktopNavigation />
        <MobileNavigation logoIcon />
      </Header>
      <Main>{page}</Main>
      <Footer />
      <BottomNavigation />
    </Layout>
  );
};
