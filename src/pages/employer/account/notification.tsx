import Layout, { EmployerMain, EmployerHeader, EmployerFooter } from '@/components/layout';
import EmployerAccountNotificationContainer from '@/containers/employerAccountNotificationContainer';

export default function EmployerAccountNotificationPage() {
  return <EmployerAccountNotificationContainer />;
}

EmployerAccountNotificationPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <EmployerHeader />
      <EmployerMain>{page}</EmployerMain>
      <EmployerFooter />
    </Layout>
  );
};
