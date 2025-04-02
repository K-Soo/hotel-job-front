import Layout, { EmployerMain, EmployerHeader, Header, AccountNavigation } from '@/components/layout';
import LandingEmployerContainer from '@/containers/landingEmployerContainer';
import { NextSeo } from 'next-seo';

export default function LandingEmployerPage() {
  return (
    <>
      <NextSeo title="파트너" />
      <LandingEmployerContainer />
    </>
  );
}

LandingEmployerPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <Header borderBottom={false} position="static">
        <AccountNavigation />
      </Header>
      {/* <EmployerHeader borderBottom={false} /> */}
      <EmployerMain>{page}</EmployerMain>
    </Layout>
  );
};
