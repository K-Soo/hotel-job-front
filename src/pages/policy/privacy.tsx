import Layout, { Header, Footer, Main, DesktopNavigation, MobileNavigation } from '@/components/layout';
import PolicyPrivacyContainer from '@/containers/policyPrivacyContainer';

//개인정보 처리방침
export default function PolicyPrivacyPage() {
  return <PolicyPrivacyContainer />;
}

PolicyPrivacyPage.getLayout = (page: React.ReactElement) => {
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
