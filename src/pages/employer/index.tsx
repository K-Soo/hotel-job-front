import Layout, { EmployerMain, EmployerHeader } from '@/components/layout';
import EmployerContainer from '@/containers/employerContainer';

export default function EmployerPage() {
  return <EmployerContainer />;
}

EmployerPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <EmployerHeader />
      <EmployerMain>{page}</EmployerMain>
    </Layout>
  );
};
