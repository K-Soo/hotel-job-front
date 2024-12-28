import Layout, { EmployerMain, EmployerHeader } from '@/components/layout';

export default function SetupCompanyPage() {
  return <>company</>;
}

SetupCompanyPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <EmployerHeader />
      <EmployerMain>{page}</EmployerMain>
    </Layout>
  );
};

SetupCompanyPage.authentication = true;
SetupCompanyPage.allowedRoles = ['EMPLOYER'];
