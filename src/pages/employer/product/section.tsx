import Layout, { EmployerMain, EmployerHeader } from '@/components/layout';
import EmployerProductSectionContainer from '@/containers/employerProductSectionContainer';

export default function EmployerProductSectionPage() {
  return <EmployerProductSectionContainer />;
}

EmployerProductSectionPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <EmployerHeader />
      <EmployerMain>{page}</EmployerMain>
    </Layout>
  );
};

EmployerProductSectionPage.authentication = true;
EmployerProductSectionPage.allowedRoles = ['EMPLOYER'];
