import React from 'react';
import Layout, { EmployerMain, EmployerHeader, EmployerFooter } from '@/components/layout';
import EmployerBusinessContainer from '@/containers/employerBusinessContainer';
import { ErrorBoundary, ErrorComponent } from '@/error';
import { NextSeo } from 'next-seo';

export default function EmployerBusinessPage() {
  return (
    <>
      <NextSeo title="업체 정보" nofollow={true} noindex={true} />
      <ErrorBoundary fallback={<ErrorComponent />}>
        <EmployerBusinessContainer />
      </ErrorBoundary>
    </>
  );
}

EmployerBusinessPage.authentication = true;
EmployerBusinessPage.allowedRoles = ['EMPLOYER'];

EmployerBusinessPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <EmployerHeader />
      <EmployerMain>{page}</EmployerMain>
      <EmployerFooter />
    </Layout>
  );
};
