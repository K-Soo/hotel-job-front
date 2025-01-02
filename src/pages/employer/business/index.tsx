import Layout, { EmployerMain, EmployerHeader, EmployerFooter } from '@/components/layout';
import EmployerBusinessContainer from '@/containers/employerBusinessContainer';

export default function EmployerBusinessPage() {
  return <EmployerBusinessContainer />;
}

EmployerBusinessPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <EmployerHeader />
      <EmployerMain>{page}</EmployerMain>
      <EmployerFooter />
    </Layout>
  );
};
