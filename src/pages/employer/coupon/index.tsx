import Layout, { EmployerMain, EmployerHeader, EmployerFooter } from '@/components/layout';
import EmployerCouponContainer from '@/containers/employerCouponContainer';
import { NextSeo } from 'next-seo';

export default function EmployerCouponPage() {
  return (
    <>
      <NextSeo title="쿠폰" nofollow={true} noindex={true} />
      <EmployerCouponContainer />;
    </>
  );
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
