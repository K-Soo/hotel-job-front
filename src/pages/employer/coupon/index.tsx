import Layout, { EmployerMain, EmployerHeader, EmployerFooter } from '@/components/layout';
import EmployerCouponContainer from '@/containers/employerCouponContainer';

export default function EmployerCouponPage() {
  return <EmployerCouponContainer />;
}

EmployerCouponPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <EmployerHeader />
      <EmployerMain>{page}</EmployerMain>
      <EmployerFooter />
    </Layout>
  );
};

EmployerCouponPage.authentication = true;
EmployerCouponPage.allowedRoles = ['EMPLOYER'];
