import Layout, { EmployerMain, EmployerHeader, EmployerFooter } from '@/components/layout';
import EmployerAccountContainer from '@/containers/employerAccountContainer';
export default function EmployerAccountPage() {
  return <EmployerAccountContainer />;
}

EmployerAccountPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <EmployerHeader />
      <EmployerMain>{page}</EmployerMain>
      <EmployerFooter />
    </Layout>
  );
};

EmployerAccountPage.authentication = true;
EmployerAccountPage.allowedRoles = ['EMPLOYER'];
