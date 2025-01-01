import Layout, { EmployerMain, EmployerHeader } from '@/components/layout';
import EmployerAccountPolicyContainer from '@/containers/employerAccountPolicyContainer';

export default function EmployerAccountPolicyPage() {
  return <EmployerAccountPolicyContainer />;
}

EmployerAccountPolicyPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <EmployerHeader />
      <EmployerMain>{page}</EmployerMain>
    </Layout>
  );
};

EmployerAccountPolicyPage.authentication = true;
EmployerAccountPolicyPage.allowedRoles = ['EMPLOYER'];
