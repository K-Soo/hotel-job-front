import Layout, { EmployerMain, EmployerHeader, EmployerFooter } from '@/components/layout';
import EmployerSetupCompanyContainer from '@/containers/employerSetupCompanyContainer';

export default function EmployerSetupCompanyPage() {
  return <EmployerSetupCompanyContainer />;
}

EmployerSetupCompanyPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <EmployerHeader />
      <EmployerMain>{page}</EmployerMain>
      <EmployerFooter />
    </Layout>
  );
};

EmployerSetupCompanyPage.authentication = true;
EmployerSetupCompanyPage.allowedRoles = ['EMPLOYER'];
