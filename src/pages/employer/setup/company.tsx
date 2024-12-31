import Layout, { EmployerMain, EmployerHeader } from '@/components/layout';
import EmployerSetupCompanyContainer from '@/containers/employerSetupCompanyContainer';

export default function EmployerSetupCompanyPage() {
  return <EmployerSetupCompanyContainer />;
}

EmployerSetupCompanyPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <EmployerHeader />
      <EmployerMain>{page}</EmployerMain>
    </Layout>
  );
};

EmployerSetupCompanyPage.authentication = true;
EmployerSetupCompanyPage.allowedRoles = ['EMPLOYER'];
