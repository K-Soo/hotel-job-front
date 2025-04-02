import Layout, { Main, Header, AccountNavigation, ScrollToTopButton } from '@/components/layout';
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
      <Header position="static" borderBottom={false}>
        <AccountNavigation />
      </Header>
      <Main maxWidth="100%" padding="0">
        {page}
      </Main>
      <ScrollToTopButton />
    </Layout>
  );
};
