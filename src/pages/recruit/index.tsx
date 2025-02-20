import Layout, { Header, Footer, Main, DesktopNavigation, MobileNavigation } from '@/components/layout';
import RecruitContainer from '@/containers/recruitContainer';
import BottomNavigation from '@/components/layout/BottomNavigation';

export default function RecruitPage() {
  return <RecruitContainer />;
}

RecruitPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <Header>
        <DesktopNavigation />
        <MobileNavigation title="채용" />
      </Header>
      <Main>{page}</Main>
      <Footer />
      <BottomNavigation />
    </Layout>
  );
};
