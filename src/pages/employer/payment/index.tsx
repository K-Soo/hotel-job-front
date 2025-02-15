import Layout, { EmployerMain, EmployerHeader, EmployerFooter } from '@/components/layout';
import EmployerPaymentContainer from '@/containers/employerPaymentContainer';

export default function EmployerPaymentPage() {
  return <EmployerPaymentContainer />;
}

EmployerPaymentPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <EmployerHeader />
      <EmployerMain>{page}</EmployerMain>
      <EmployerFooter />
    </Layout>
  );
};

EmployerPaymentPage.authentication = true;
EmployerPaymentPage.allowedRoles = ['EMPLOYER'];
