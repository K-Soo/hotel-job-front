import Layout, { Main, Header, DesktopNavigation, MobileNavigation, Footer } from '@/components/layout';
import SupportNoticeContainer from '@/containers/supportNoticeContainer';

export default function SupportNoticePage() {
  return <SupportNoticeContainer />;
}

SupportNoticePage.getLayout = (page: React.ReactElement) => {
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
