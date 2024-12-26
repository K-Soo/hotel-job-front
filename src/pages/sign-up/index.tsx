import SignUpContainer from '@/containers/signUpContainer';
import Layout, { Header, Footer, Main, DesktopNavigation, MobileNavigation } from '@/components/layout';
import HomeContainer from '@/containers/homeContainer';
import BottomNavigation from '@/components/common/BottomNavigation';

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
