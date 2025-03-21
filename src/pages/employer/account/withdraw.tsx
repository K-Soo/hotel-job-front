import Layout, { EmployerMain, EmployerHeader, EmployerFooter } from '@/components/layout';
import { NextSeo } from 'next-seo';
import EmployerAccountWithdrawContainer from '@/containers/employerAccountWithdrawContainer';

export default function EmployerAccountWithdrawPage() {
  return (
    <>
      <NextSeo title="회원탈퇴" nofollow={true} noindex={true} />
      <EmployerAccountWithdrawContainer />
    </>
  );
}

EmployerAccountWithdrawPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <EmployerHeader />
      <EmployerMain>{page}</EmployerMain>
      <EmployerFooter />
    </Layout>
  );
};

EmployerAccountWithdrawPage.authentication = true;
EmployerAccountWithdrawPage.allowedRoles = ['EMPLOYER'];
