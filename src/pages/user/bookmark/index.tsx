import Layout, { Main, Header, DesktopNavigation, MobileNavigation, Footer } from '@/components/layout';

export default function UserBookmarkPage() {
  return <>index</>;
}

UserBookmarkPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <Header>
        <DesktopNavigation />
        <MobileNavigation title="내 이력서" />
      </Header>
      <Main>{page}</Main>
      <Footer />
    </Layout>
  );
};

UserBookmarkPage.authentication = true;
UserBookmarkPage.allowedRoles = ['JOB_SEEKER'];
