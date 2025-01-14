import Layout, { EmployerMain, EmployerHeader, EmployerFooter } from '@/components/layout';
import EmployerRecruitmentDetailContainer from '@/containers/employerRecruitmentDetailContainer';
import { ErrorBoundary, ErrorComponent } from '@/error';

export default function EmployerRecruitmentDetailPage() {
  return (
    <ErrorBoundary fallback={<ErrorComponent />}>
      <EmployerRecruitmentDetailContainer />
    </ErrorBoundary>
  );
}

EmployerRecruitmentDetailPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <EmployerHeader />
      <EmployerMain>{page}</EmployerMain>
      <EmployerFooter />
    </Layout>
  );
};

EmployerRecruitmentDetailPage.authentication = true;
EmployerRecruitmentDetailPage.allowedRoles = ['EMPLOYER'];
