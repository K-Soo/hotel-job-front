import Layout, { Main, Header, DesktopNavigation, MobileNavigation } from '@/components/layout';

export default function SupportNoticePage() {
  return <>notice</>;
}

SupportNoticePage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <Header>
        <DesktopNavigation />
        <MobileNavigation />
      </Header>
      <Main>{page}</Main>
    </Layout>
  );
};
