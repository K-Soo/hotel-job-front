import Layout, { EmployerMain, EmployerHeader, EmployerFooter } from '@/components/layout';
import { ErrorBoundary, ErrorComponent } from '@/error';
import EmployerRecruitmentApplicantContainer from '@/containers/employerRecruitmentApplicantContainer';

export default function EmployerRecruitmentApplicantPage() {
  return <EmployerRecruitmentApplicantContainer />;
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
