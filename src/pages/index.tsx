import Layout, { Header, Footer, Main, DesktopNavigation, MobileNavigation } from '@/components/layout';
import HomeContainer from '@/containers/homeContainer';
import BottomNavigation from '@/components/layout/BottomNavigation';
import environment from '@/environment';
import Maintenance from '@/components/common/Maintenance';

export default function HomePage() {
  if (environment.isProd) {
    return <Maintenance />;
  }

  return <HomeContainer />;
}

HomePage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      {!environment.isProd && (
        <>
          <Header>
            <DesktopNavigation />
            <MobileNavigation logoIcon />
          </Header>
        </>
      )}
      <Main>{page}</Main>
      <Footer />
      <BottomNavigation />
    </Layout>
  );
};
