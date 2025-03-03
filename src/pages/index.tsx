import Layout, { Header, Footer, Main, DesktopNavigation, MobileNavigation } from '@/components/layout';
import HomeContainer from '@/containers/homeContainer';
import BottomNavigation from '@/components/layout/BottomNavigation';
import A2HS from '@/components/common/A2HS';
import useResponsive from '@/hooks/useResponsive';

export default function HomePage() {
  const { isMobile } = useResponsive();

  return (
    <>
      {isMobile && <A2HS />}
      <HomeContainer />
      {/* <div>
        <p>{JSON.stringify(notificationPermissionStatus)}</p>
        <p>{JSON.stringify(token)}</p>
      </div> */}
    </>
  );
}

HomePage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <Header>
        <DesktopNavigation />
        <MobileNavigation logoIcon notificationIcon />
      </Header>
      <Main>{page}</Main>
      <Footer />
      <BottomNavigation />
    </Layout>
  );
};
