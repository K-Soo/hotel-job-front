import Layout, { EmployerMain, EmployerHeader, EmployerFooter } from '@/components/layout';
import EmployerCheckoutRecruitmentFailContainer from '@/containers/employerCheckoutRecruitmentFailContainer';
import { NextSeo } from 'next-seo';

export default function EmployerCheckoutRecruitmentFailPage() {
  return (
    <>
      <NextSeo title="결제 실패" nofollow={true} noindex={true} />
      <EmployerCheckoutRecruitmentFailContainer />;
    </>
  );
}

EmployerCheckoutRecruitmentFailPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <EmployerHeader />
      <EmployerMain>{page}</EmployerMain>
      <EmployerFooter />
    </Layout>
  );
};
