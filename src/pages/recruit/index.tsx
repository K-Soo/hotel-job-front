import Layout, { Header, Footer, Main, DesktopNavigation, MobileNavigation } from '@/components/layout';
import RecruitContainer from '@/containers/recruitContainer';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { NextSeo } from 'next-seo';
export default function RecruitPage() {
  return (
    <>
      <NextSeo title="채용정보" />
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
      <Main>{page}</Main>
      <Footer />
      <BottomNavigation />
    </Layout>
  );
};
