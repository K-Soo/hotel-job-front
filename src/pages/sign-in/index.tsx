import Layout, { Main, Header, DesktopNavigation, MobileNavigation } from '@/components/layout';
import SignInContainer from '@/containers/signInContainer';

export default function SignInPage() {
  return <SignInContainer />;
}

SignInPage.getLayout = (page: React.ReactElement) => {
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
