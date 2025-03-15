import Layout, { EmployerMain, EmployerHeader } from '@/components/layout';
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
      <EmployerHeader borderBottom={false} />
      <EmployerMain>{page}</EmployerMain>
    </Layout>
  );
};
