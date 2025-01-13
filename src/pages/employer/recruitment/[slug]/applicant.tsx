import Layout, { EmployerMain, EmployerHeader, EmployerFooter } from '@/components/layout';
import { ErrorBoundary, ErrorComponent } from '@/error';

export default function EmployerRecruitmentApplicantPage() {
  return <>applicant</>;
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
