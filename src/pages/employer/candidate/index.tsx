import Layout, { EmployerMain, EmployerHeader, EmployerFooter } from '@/components/layout';

export default function EmployerCandidatePage() {
  return <>index</>;
}

EmployerCandidatePage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <EmployerHeader />
      <EmployerMain>{page}</EmployerMain>
      <EmployerFooter />
    </Layout>
  );
};

EmployerCandidatePage.authentication = true;
EmployerCandidatePage.allowedRoles = ['EMPLOYER'];
