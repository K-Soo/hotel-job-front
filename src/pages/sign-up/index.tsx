import SignUpContainer from '@/containers/signUpContainer';
import Layout, { Main } from '@/components/layout';

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
