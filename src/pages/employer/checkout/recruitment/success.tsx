import Layout, { EmployerMain, EmployerHeader, EmployerFooter } from '@/components/layout';
import EmployerCheckoutRecruitmentSuccessContainer from '@/containers/employerCheckoutRecruitmentSuccessContainer';
export default function EmployerCheckoutRecruitmentSuccessPage() {
  return <EmployerCheckoutRecruitmentSuccessContainer />;
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
