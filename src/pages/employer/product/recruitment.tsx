import Layout, { EmployerMain, EmployerHeader, EmployerFooter } from '@/components/layout';
import EmployerProductRecruitmentContainer from '@/containers/employerProductRecruitmentContainer';
import { ErrorBoundary, ErrorComponent } from '@/error';

export default function EmployerProductRecruitmentPage() {
  return (
    <ErrorBoundary fallback={<ErrorComponent visibleBackButton={false} fontSize="16px" />}>
      <EmployerProductRecruitmentContainer />
    </ErrorBoundary>
  );
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
