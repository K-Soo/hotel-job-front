import Layout, { EmployerMain, EmployerHeader, EmployerFooter } from '@/components/layout';
import EmployerContainer from '@/containers/employerContainer';
import { GetServerSideProps, InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import { Post } from '@/apis';

export default function EmployerPage() {
  return <EmployerContainer />;
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

  // try {
  //   const responseAccessToken = await Post.requestAccessToken({}, requestHeader);
  //   if (!responseAccessToken) throw new Error();

  //   const responseUserInfo = await Post.authMe({}, requestHeader);
  //   if (!responseUserInfo) throw new Error();
  //   if (responseUserInfo.result.role === 'EMPLOYER') {
  //     return {
  //       props: {},
  //     };
  //     // TODO: 초기인증
  //     // return {
  //     //   redirect: {
  //     //     destination: path.EMPLOYER_SETUP_COMPANY,
  //     //     permanent: false,
  //     //   },
  //     // };
  //   }
  // } catch (error) {
  //   console.error('error: ', error);
  //   return {
  //     notFound: true,
  //   };
  // }

  return {
    props: {},
  };
};
