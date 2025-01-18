import Layout, { Main } from '@/components/layout';
import OauthContainer from '@/containers/oauthContainer';

export default function GoogleCallbackPage() {
  return <OauthContainer oauth="google" />;
}

GoogleCallbackPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <Main>{page}</Main>
    </Layout>
  );
};
