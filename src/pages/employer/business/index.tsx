import Layout, { EmployerMain, EmployerHeader } from '@/components/layout';
import EmployerBusinessContainer from '@/containers/employerBusinessContainer';

export default function EmployerBusinessPage() {
  return <EmployerBusinessContainer />;
}

EmployerBusinessPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <EmployerHeader />
      <EmployerMain>{page}</EmployerMain>
    </Layout>
  );
};
