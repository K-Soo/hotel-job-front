import Layout, { EmployerMain, EmployerHeader } from '@/components/layout';
import EmployerRecruitmentRegisterContainer from '@/containers/employerRecruitmentRegisterContainer';

export default function EmployerRecruitmentRegisterPage() {
  return <EmployerRecruitmentRegisterContainer />;
}

EmployerRecruitmentRegisterPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <EmployerHeader />
      <EmployerMain>{page}</EmployerMain>
    </Layout>
  );
};

EmployerRecruitmentRegisterPage.authentication = true;
EmployerRecruitmentRegisterPage.allowedRoles = ['EMPLOYER'];
