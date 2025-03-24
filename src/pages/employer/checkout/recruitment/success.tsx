import Layout, { EmployerMain, EmployerHeader, EmployerFooter } from '@/components/layout';
import EmployerCheckoutRecruitmentSuccessContainer from '@/containers/employerCheckoutRecruitmentSuccessContainer';
import { NextSeo } from 'next-seo';

export default function EmployerCheckoutRecruitmentSuccessPage() {
  return (
    <>
      <NextSeo title="결제 완료" nofollow={true} noindex={true} />
      <EmployerCheckoutRecruitmentSuccessContainer />;
    </>
  );
}

EmployerCheckoutRecruitmentSuccessPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <EmployerHeader />
      <EmployerMain>{page}</EmployerMain>
      <EmployerFooter />
    </Layout>
  );
};
