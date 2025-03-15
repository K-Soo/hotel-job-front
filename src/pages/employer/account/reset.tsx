import Layout, { EmployerMain, EmployerHeader, EmployerFooter } from '@/components/layout';
import EmployerAccountResetContainer from '@/containers/employerAccountResetContainer';
import { NextSeo } from 'next-seo';

export default function EmployerAccountResetPage() {
  return (
    <>
      <NextSeo title="비밀번호 변경" nofollow={true} noindex={true} />
      <EmployerAccountResetContainer />;
    </>
  );
}

EmployerAccountResetPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <EmployerHeader />
      <EmployerMain>{page}</EmployerMain>
      <EmployerFooter />
    </Layout>
  );
};

EmployerAccountResetPage.authentication = true;
EmployerAccountResetPage.allowedRoles = ['EMPLOYER'];
