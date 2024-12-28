import Layout, { EmployerMain, EmployerHeader } from '@/components/layout';
import EmployerProductCheckoutContainer from '@/containers/employerProductCheckoutContainer';

export default function EmployerProductCheckoutPage() {
  return <EmployerProductCheckoutContainer />;
}

EmployerProductCheckoutPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <EmployerHeader />
      <EmployerMain>{page}</EmployerMain>
    </Layout>
  );
};
