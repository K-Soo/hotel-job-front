import Layout, { Header, Footer, Main, DesktopNavigation, MobileNavigation } from '@/components/layout';
import RecruitContainer from '@/containers/recruitContainer';
import BottomNavigation from '@/components/common/BottomNavigation';

export default function RecruitPage() {
  return <RecruitContainer />;
}

RecruitPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <Header>
        <DesktopNavigation />
        <MobileNavigation />
      </Header>
      <Main>{page}</Main>
      <Footer />
      <BottomNavigation />
    </Layout>
  );
};
