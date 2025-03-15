import SignUpContainer from '@/containers/signUpContainer';
import Layout, { Main } from '@/components/layout';
import { NextSeo } from 'next-seo';

export default function SignUpPage() {
  return (
    <>
      <NextSeo title="회원가입" nofollow={true} noindex={true} />
      <SignUpContainer />
    </>
  );
}

SignUpPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <Main padding="0">{page}</Main>
    </Layout>
  );
};
