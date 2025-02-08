import Layout, { EmployerMain, EmployerHeader, EmployerFooter } from '@/components/layout';
import EmployerCheckoutRecruitmentContainer from '@/containers/employerCheckoutRecruitmentContainer';
import dynamic from 'next/dynamic';

const DynamicNoSSREmployerCheckoutRecruitmentContainer = dynamic(() => import('@/containers/employerCheckoutRecruitmentContainer'), {
  ssr: false,
});

export default function EmployerCheckoutRecruitmentPage() {
  return <DynamicNoSSREmployerCheckoutRecruitmentContainer />;
}

EmployerCheckoutRecruitmentPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <EmployerHeader />
      <EmployerMain>{page}</EmployerMain>
      <EmployerFooter />
    </Layout>
  );
};

EmployerCheckoutRecruitmentPage.authentication = true;
EmployerCheckoutRecruitmentPage.allowedRoles = ['EMPLOYER'];
