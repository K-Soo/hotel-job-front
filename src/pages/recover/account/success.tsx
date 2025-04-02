import Layout, { Main, Header, AccountNavigation, ScrollToTopButton } from '@/components/layout';
import { NextSeo } from 'next-seo';
import RecoverAccountSuccessContainer from '@/containers/recoverAccountSuccessContainer';

export default function RecoverAccountSuccessPage() {
  return (
    <>
      <NextSeo title="아이디 찾기" nofollow={true} noindex={true} />
      <RecoverAccountSuccessContainer />
    </>
  );
}

RecoverAccountSuccessPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <Header position="static" borderBottom={false}>
        <AccountNavigation />
      </Header>
      <Main maxWidth="auto" padding="0">
        {page}
      </Main>
      <ScrollToTopButton />
    </Layout>
  );
};
