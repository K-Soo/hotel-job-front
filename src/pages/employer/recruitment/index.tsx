import Layout, { EmployerMain, EmployerHeader, EmployerFooter } from '@/components/layout';
import EmployerRecruitmentContainer from '@/containers/employerRecruitmentContainer';
export default function EmployerRecruitmentPage() {
  return <EmployerRecruitmentContainer />;
}

EmployerRecruitmentPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <EmployerHeader />
      <EmployerMain>{page}</EmployerMain>
      <EmployerFooter />
    </Layout>
  );
};

EmployerRecruitmentPage.authentication = true;
EmployerRecruitmentPage.allowedRoles = ['EMPLOYER'];
