import Layout, { Main, Header, MobileNavigation } from '@/components/layout';
import SignInContainer from '@/containers/signInContainer';

export default function SignInPage() {
  return <SignInContainer />;
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
