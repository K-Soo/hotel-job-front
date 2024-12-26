import SignUpContainer from '@/containers/signUpContainer';
import Layout, { Header, Footer, Main, DesktopNavigation, MobileNavigation } from '@/components/layout';

export default function SignUpPage() {
  return <SignUpContainer />;
}

SignUpPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <Main padding="0">{page}</Main>
    </Layout>
  );
};
