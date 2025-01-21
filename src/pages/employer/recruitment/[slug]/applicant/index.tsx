import Layout, { EmployerMain, EmployerHeader, EmployerFooter } from '@/components/layout';
import EmployerRecruitmentDetailApplicantContainer from '@/containers/employerRecruitmentDetailApplicantContainer';

export default function EmployerRecruitmentApplicantPage() {
  return <EmployerRecruitmentDetailApplicantContainer />;
}

EmployerRecruitmentApplicantPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <EmployerHeader />
      <EmployerMain>{page}</EmployerMain>
      <EmployerFooter />
    </Layout>
  );
};

EmployerRecruitmentApplicantPage.authentication = true;
EmployerRecruitmentApplicantPage.allowedRoles = ['EMPLOYER'];
