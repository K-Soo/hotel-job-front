import Layout, { EmployerMain, EmployerHeader, EmployerFooter } from '@/components/layout';

export default function EmployerRecruitmentDetailPage() {
  return <>index</>;
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
