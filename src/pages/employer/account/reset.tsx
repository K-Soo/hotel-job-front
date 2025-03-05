import Layout, { EmployerMain, EmployerHeader, EmployerFooter } from '@/components/layout';
import EmployerAccountResetContainer from '@/containers/employerAccountResetContainer';

export default function EmployerAccountResetPage() {
  return <EmployerAccountResetContainer />;
}

EmployerAccountResetPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <EmployerHeader />
      <EmployerMain>{page}</EmployerMain>
      <EmployerFooter />
    </Layout>
  );
};

EmployerAccountResetPage.authentication = true;
EmployerAccountResetPage.allowedRoles = ['EMPLOYER'];
