import Layout, { EmployerMain, EmployerHeader, EmployerFooter } from '@/components/layout';
import EmployerProductRecruitmentContainer from '@/containers/employerProductRecruitmentContainer';

export default function EmployerProductRecruitmentPage() {
  return <EmployerProductRecruitmentContainer />;
}

EmployerProductRecruitmentPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <EmployerHeader />
      <EmployerMain>{page}</EmployerMain>
      <EmployerFooter />
    </Layout>
  );
};

EmployerProductRecruitmentPage.authentication = true;
EmployerProductRecruitmentPage.allowedRoles = ['EMPLOYER'];
