import Layout, { Main, Header, MobileNavigation } from '@/components/layout';
import SignInContainer from '@/containers/signInContainer';
import { NextSeo } from 'next-seo';

export default function SignInPage() {
  return (
    <>
      <NextSeo title="로그인" />
      <SignInContainer />;
    </>
  );
}

SignInPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <Header>
        <MobileNavigation homeIcon />
      </Header>
      <Main>{page}</Main>
    </Layout>
  );
};
