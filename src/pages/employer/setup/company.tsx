import React from 'react';
import Layout, { EmployerMain, EmployerHeader, EmployerFooter } from '@/components/layout';
import EmployerSetupCompanyContainer from '@/containers/employerSetupCompanyContainer';
import path from '@/constants/path';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { Auth } from '@/apis';

export default function EmployerSetupCompanyPage() {
  return <EmployerSetupCompanyContainer />;
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const cookieString = context.req ? context.req.headers?.cookie : undefined;

  const requestHeader = {
    headers: { Cookie: cookieString },
    withCredentials: true,
  };

  try {
    const responseAccessToken = await Auth.requestAccessToken({}, requestHeader);
    if (!responseAccessToken) throw new Error();

    const responseUserInfo = await Auth.me({}, requestHeader);
    if (!responseUserInfo) throw new Error();

    if (responseUserInfo.result.role !== 'EMPLOYER') {
      return {
        redirect: {
          destination: path.HOME,
          permanent: false,
        },
      };
    }

    if (responseUserInfo.result.companyVerificationStatus === 'VERIFIED') {
      return {
        redirect: {
          destination: path.EMPLOYER,
          permanent: false,
        },
      };
    }
  } catch (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
};

EmployerSetupCompanyPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <EmployerHeader />
      <EmployerMain>{page}</EmployerMain>
      <EmployerFooter />
    </Layout>
  );
};

EmployerSetupCompanyPage.authentication = true;
EmployerSetupCompanyPage.allowedRoles = ['EMPLOYER'];
