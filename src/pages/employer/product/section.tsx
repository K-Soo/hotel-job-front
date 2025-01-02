import Layout, { EmployerMain, EmployerHeader, EmployerFooter } from '@/components/layout';
import EmployerProductSectionContainer from '@/containers/employerProductSectionContainer';
import React from 'react';
export default function EmployerProductSectionPage() {
  return <EmployerProductSectionContainer />;
}

EmployerProductSectionPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <EmployerHeader />
      <EmployerMain>{page}</EmployerMain>
      <EmployerFooter />
    </Layout>
  );
};

EmployerProductSectionPage.authentication = true;
EmployerProductSectionPage.allowedRoles = ['EMPLOYER'];
