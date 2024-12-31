import Layout, { EmployerMain, EmployerHeader } from '@/components/layout';
import EmployerRecruitmentContainer from '@/containers/employerRecruitmentContainer';
export default function EmployerRecruitmentPage() {
  return <EmployerRecruitmentContainer />;
}

EmployerRecruitmentPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <EmployerHeader />
      <EmployerMain>{page}</EmployerMain>
    </Layout>
  );
};
