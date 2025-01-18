import Layout, { Main } from '@/components/layout';
import OauthContainer from '@/containers/oauthContainer';

export default function KaKaoCallbackPage() {
  return <OauthContainer oauth="kakao" />;
}

KaKaoCallbackPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <Main>{page}</Main>
    </Layout>
  );
};
