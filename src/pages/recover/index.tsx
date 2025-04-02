import Layout, { Main, Header, AccountNavigation, ScrollToTopButton } from '@/components/layout';
import { NextSeo } from 'next-seo';
import Recover from '@/components/recover';

export default function RecoverPage() {
  return (
    <>
      <NextSeo title="아이디 · 비밀번호 찾기" nofollow={true} noindex={true} />
      <Recover />
    </>
  );
}

RecoverPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <Header position="static" borderBottom={false}>
        <AccountNavigation />
      </Header>
      <Main>{page}</Main>
      <ScrollToTopButton />
    </Layout>
  );
};
