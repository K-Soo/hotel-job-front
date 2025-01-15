import Layout, { Header, Footer, Main, DesktopNavigation, MobileNavigation } from '@/components/layout';
import RecruitDetailContainer from '@/containers/recruitDetailContainer';

export default function RecruitDetailPage() {
  return (
    <>
      <RecruitDetailContainer />
    </>
  );
}

RecruitDetailPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <Header>
        <DesktopNavigation />
        <MobileNavigation />
      </Header>
      <Main>{page}</Main>
      <Footer />
    </Layout>
  );
};
