import Layout, { Header, Footer, Main, DesktopNavigation, MobileNavigation, ScrollToTop } from '@/components/layout';
import RecruitContainer from '@/containers/recruitContainer';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { NextSeo } from 'next-seo';
export default function RecruitPage() {
  return (
    <>
      <NextSeo title="채용정보" canonical="https://www.hotel-job-connect.com/recruit" />
      <RecruitContainer />
    </>
  );
}

RecruitPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <Header>
        <DesktopNavigation />
        <MobileNavigation title="채용" notificationIcon />
      </Header>
      <Main padding="30px 0 0 0">{page}</Main>
      <Footer marginTop="0" />
      <ScrollToTop />
      <BottomNavigation />
    </Layout>
  );
};
