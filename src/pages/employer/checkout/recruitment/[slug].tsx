import Layout, { EmployerMain, EmployerHeader, EmployerFooter } from '@/components/layout';
import EmployerCheckoutRecruitmentContainer from '@/containers/employerCheckoutRecruitmentContainer';
import dynamic from 'next/dynamic';

export default function EmployerCheckoutRecruitmentPage() {
  return <EmployerCheckoutRecruitmentContainer />;
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
