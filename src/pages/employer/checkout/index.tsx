import Layout, { EmployerMain, EmployerHeader, EmployerFooter } from '@/components/layout';
import EmployerCheckoutContainer from '@/containers/employerCheckoutContainer';

export default function EmployerCheckoutPage() {
  return <EmployerCheckoutContainer />;
}

EmployerCheckoutPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <EmployerHeader />
      <EmployerMain>{page}</EmployerMain>
      <EmployerFooter />
    </Layout>
  );
};

EmployerCheckoutPage.authentication = true;
EmployerCheckoutPage.allowedRoles = ['EMPLOYER'];
