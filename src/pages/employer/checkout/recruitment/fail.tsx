import Layout, { EmployerMain, EmployerHeader, EmployerFooter } from '@/components/layout';
import EmployerCheckoutRecruitmentFailContainer from '@/containers/employerCheckoutRecruitmentFailContainer';

export default function EmployerCheckoutRecruitmentFailPage() {
  return <EmployerCheckoutRecruitmentFailContainer />;
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
