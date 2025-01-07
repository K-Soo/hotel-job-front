import React from 'react';
import Layout, { EmployerMain, EmployerHeader, EmployerFooter } from '@/components/layout';
import EmployerBusinessContainer from '@/containers/employerBusinessContainer';
import { ErrorBoundary, ErrorComponent } from '@/error';

export default function EmployerBusinessPage() {
  return (
    <ErrorBoundary fallback={<ErrorComponent />}>
      <EmployerBusinessContainer />
    </ErrorBoundary>
  );
}

EmployerBusinessPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <EmployerHeader />
      <EmployerMain>{page}</EmployerMain>
      <EmployerFooter />
    </Layout>
  );
};
