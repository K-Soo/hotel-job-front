import Layout, { Main } from '@/components/layout';
import SignInContainer from '@/containers/signInContainer';
import { NextSeo } from 'next-seo';

export default function SignInPage() {
  return (
    <>
      <NextSeo title="로그인" nofollow={true} noindex={true} />
      <SignInContainer />
    </>
  );
}

SignInPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <Main>{page}</Main>
    </Layout>
  );
};
