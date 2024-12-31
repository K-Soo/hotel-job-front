import Layout, { EmployerMain, EmployerHeader } from '@/components/layout';

export default function EmployerCandidatePage() {
  return <>index</>;
}

EmployerCandidatePage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <EmployerHeader />
      <EmployerMain>{page}</EmployerMain>
    </Layout>
  );
};

EmployerCandidatePage.authentication = true;
EmployerCandidatePage.allowedRoles = ['EMPLOYER'];
