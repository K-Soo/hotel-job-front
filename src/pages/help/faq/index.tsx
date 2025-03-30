import Layout, { Header, Footer, Main, DesktopNavigation, MobileNavigation, ScrollToTop } from '@/components/layout';
import BottomNavigation from '@/components/layout/BottomNavigation';
import HelpFaq from '@/components/helpFaq';
import { NextSeo } from 'next-seo';

// TODO - admin.hotel-job-connect.com 인프라 확장 후 어드민 페이지에서 API 연결, 초기엔 프론트 하드코딩으로 대처
export default function HelpFaqPage() {
  return (
    <>
      <NextSeo title="자주 묻는 질문" canonical="https://www.hotel-job-connect.com/help/faq " />
      <HelpFaq />
    </>
  );
}

HelpFaqPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <Header>
        <DesktopNavigation />
        <MobileNavigation logoIcon notificationIcon signUpIcon />
      </Header>
      <Main>{page}</Main>
      <ScrollToTop />
      <Footer />
      <BottomNavigation />
    </Layout>
  );
};
