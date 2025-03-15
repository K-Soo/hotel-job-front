import Layout, { EmployerMain, EmployerHeader, EmployerFooter } from '@/components/layout';
import EmployerAccountContainer from '@/containers/employerAccountContainer';
import { ErrorBoundary, ErrorComponent } from '@/error';
import { NextSeo } from 'next-seo';

export default function EmployerAccountPage() {
  return (
    <>
      <NextSeo title="계정정보" nofollow={true} noindex={true} />
      <ErrorBoundary fallback={<ErrorComponent />}>
        <EmployerAccountContainer />
      </ErrorBoundary>
    </>
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
