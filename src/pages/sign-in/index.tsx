import Layout, { Header, Footer, Main } from "@/components/layout";
import SignInContainer from "@/containers/signInContainer";

export default function SignInPage() {
  return <SignInContainer />;
}

SignInPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <Main>{page}</Main>
    </Layout>
  );
};
