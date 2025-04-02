import Layout, { Main, Header, AccountNavigation, ScrollToTopButton } from '@/components/layout';
import { NextSeo } from 'next-seo';
import RecoverAccountContainer from '@/containers/recoverAccountContainer';

// 현재 브라우저 새창에서 열리는데 웹뷰일떄 딥링크, iframe , postMMessage를 고민해보자
export default function RecoverAccountPage() {
  return (
    <>
      <NextSeo title="아이디 찾기" nofollow={true} noindex={true} />
      <RecoverAccountContainer />
    </>
  );
}

RecoverAccountPage.getLayout = (page: React.ReactElement) => {
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
