import Layout, { EmployerMain, EmployerHeader } from '@/components/layout';
import EmployerAccountContainer from '@/containers/employerAccountContainer';
export default function EmployerAccountPage() {
  return <EmployerAccountContainer />;
}

EmployerAccountPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <EmployerHeader />
      <EmployerMain>{page}</EmployerMain>
    </Layout>
  );
};

EmployerAccountPage.authentication = true;
EmployerAccountPage.allowedRoles = ['EMPLOYER'];
