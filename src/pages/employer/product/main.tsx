import Layout, { EmployerMain, EmployerHeader, EmployerFooter } from '@/components/layout';

export default function EmployerProductMainPage() {
  return <>main</>;
}

EmployerProductMainPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <EmployerHeader />
      <EmployerMain>{page}</EmployerMain>
      <EmployerFooter />
    </Layout>
  );
};

EmployerProductMainPage.authentication = true;
EmployerProductMainPage.allowedRoles = ['EMPLOYER'];
