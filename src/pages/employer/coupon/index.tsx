import Layout, { EmployerMain, EmployerHeader, EmployerFooter } from '@/components/layout';

export default function EmployerCouponPage() {
  return <>index</>;
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
