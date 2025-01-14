import Layout, { EmployerMain, EmployerHeader, EmployerFooter } from '@/components/layout';
import { ErrorBoundary, ErrorComponent } from '@/error';

export default function EmployerRecruitmentApplicantDetailPage() {
  return <>index</>;
}

EmployerRecruitmentApplicantDetailPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <EmployerHeader />
      <EmployerMain>{page}</EmployerMain>
      <EmployerFooter />
    </Layout>
  );
};

EmployerRecruitmentApplicantDetailPage.authentication = true;
EmployerRecruitmentApplicantDetailPage.allowedRoles = ['EMPLOYER'];
