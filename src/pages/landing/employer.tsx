import Layout, { EmployerMain, EmployerHeader } from '@/components/layout';
import LandingEmployerContainer from '@/containers/landingEmployerContainer';

export default function LandingEmployerPage() {
  return <LandingEmployerContainer />;
}

LandingEmployerPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <EmployerHeader borderBottom={false} />
      <EmployerMain>{page}</EmployerMain>
    </Layout>
  );
};
