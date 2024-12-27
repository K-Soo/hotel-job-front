import Layout, { EmployerMain, EmployerHeader } from '@/components/layout';

export default function EmployerAccountPage() {
  return <>index</>;
}

EmployerAccountPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <EmployerHeader />
      <EmployerMain>{page}</EmployerMain>
    </Layout>
  );
};
