import Layout, { EmployerMain, EmployerHeader, EmployerFooter } from '@/components/layout';
import EmployerRecruitmentRegisterContainer from '@/containers/employerRecruitmentRegisterContainer';
import { ErrorBoundary, ErrorComponent } from '@/error';
export default function EmployerRecruitmentRegisterPage() {
  return (
    <ErrorBoundary fallback={<ErrorComponent />}>
      <EmployerRecruitmentRegisterContainer />;
    </ErrorBoundary>
  );
}

EmployerRecruitmentRegisterPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <EmployerHeader />
      <EmployerMain>{page}</EmployerMain>
      <EmployerFooter />
    </Layout>
  );
};

EmployerRecruitmentRegisterPage.authentication = true;
EmployerRecruitmentRegisterPage.allowedRoles = ['EMPLOYER'];
