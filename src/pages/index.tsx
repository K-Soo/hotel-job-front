import React from 'react';
import Layout, { Header, Footer, Main, DesktopNavigation, MobileNavigation, ScrollToTopButton } from '@/components/layout';
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
    </>
  );
}

HomePage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <Header>
        <DesktopNavigation />
        <MobileNavigation logoIcon notificationIcon signUpIcon />
      </Header>
      <Main maxWidth="100%" padding="0 0 30px 0">
        {page}
      </Main>
      <ScrollToTopButton />
      <Footer />
      <BottomNavigation />
    </Layout>
  );
};
