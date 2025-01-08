import Layout, { EmployerMain, EmployerHeader, EmployerFooter } from '@/components/layout';
import EmployerAccountContainer from '@/containers/employerAccountContainer';
import { ErrorBoundary, ErrorComponent } from '@/error';

export default function EmployerAccountPage() {
  return (
    <ErrorBoundary fallback={<ErrorComponent />}>
      <EmployerAccountContainer />
    </ErrorBoundary>
  );
}

EmployerAccountPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <EmployerHeader />
      <EmployerMain>{page}</EmployerMain>
      <EmployerFooter />
    </Layout>
  );
};

EmployerAccountPage.authentication = true;
EmployerAccountPage.allowedRoles = ['EMPLOYER'];
