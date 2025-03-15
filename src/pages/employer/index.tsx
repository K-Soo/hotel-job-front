import Layout, { EmployerMain, EmployerHeader, EmployerFooter } from '@/components/layout';
import EmployerContainer from '@/containers/employerContainer';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { Auth } from '@/apis';
import path from '@/constants/path';
import { NextSeo } from 'next-seo';

export default function EmployerPage() {
  return (
    <>
      <NextSeo title="대시보드" nofollow={true} noindex={true} />
      <EmployerContainer />
    </>
  );
}

EmployerPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <EmployerHeader />
      <EmployerMain>{page}</EmployerMain>
      <EmployerFooter />
    </Layout>
  );
};

EmployerPage.authentication = true;
EmployerPage.allowedRoles = ['EMPLOYER'];

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const cookieString = context.req ? context.req.headers?.cookie : undefined;

  const requestHeader = {
    headers: {
      Cookie: cookieString,
    },
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
          destination: path.SIGN_IN,
          permanent: false,
        },
      };
    }

    if (responseUserInfo.result.companyVerificationStatus === 'NOT_REQUESTED') {
      return {
        redirect: {
          destination: path.EMPLOYER_SETUP_COMPANY,
          permanent: false,
        },
      };
    }
  } catch (error) {
    console.log('error: ', error);
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
};
