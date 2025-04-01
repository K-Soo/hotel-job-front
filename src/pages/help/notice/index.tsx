import Layout, { Header, Footer, Main, DesktopNavigation, MobileNavigation, ScrollToTopButton } from '@/components/layout';
import BottomNavigation from '@/components/layout/BottomNavigation';
import HelpNotice from '@/components/helpNotice';
import { NextSeo } from 'next-seo';

// TODO - admin.hotel-job-connect.com 인프라 확장 후 어드민 페이지에서 API 연결, 초기엔 프론트 하드코딩으로 대처
export default function HelpNoticePage() {
  return (
    <>
      <NextSeo title="공지사항" canonical="https://www.hotel-job-connect.com/help/notice" />
      <HelpNotice />
    </>
  );
}

HelpNoticePage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <Header>
        <DesktopNavigation />
        <MobileNavigation logoIcon notificationIcon signUpIcon />
      </Header>
      <Main>{page}</Main>
      <ScrollToTopButton />
      <Footer />
      <BottomNavigation />
    </Layout>
  );
};
