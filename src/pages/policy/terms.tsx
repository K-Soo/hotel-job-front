import Layout, { Header, Footer, Main, DesktopNavigation, MobileNavigation } from '@/components/layout';
import PolicyTermsContainer from '@/containers/policyTermsContainer';

//서비스 이용약관
export default function PolicyTermsPage() {
  return <PolicyTermsContainer />;
}

PolicyTermsPage.getLayout = (page: React.ReactElement) => {
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
