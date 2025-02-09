import Layout, { EmployerMain, EmployerHeader, EmployerFooter } from '@/components/layout';
import EmployerPointContainer from '@/containers/employerPointContainer';

export default function EmployerPointPage() {
  return <EmployerPointContainer />;
}

EmployerPointPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <EmployerHeader />
      <EmployerMain>{page}</EmployerMain>
      <EmployerFooter />
    </Layout>
  );
};

EmployerPointPage.authentication = true;
EmployerPointPage.allowedRoles = ['EMPLOYER'];
