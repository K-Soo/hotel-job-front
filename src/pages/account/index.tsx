import Layout, { Header, Footer, Main } from "@/components/layout";
import AccountContainer from "@/containers/accountContainer";
export default function AccountPage() {
  return <AccountContainer />;
}

AccountPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <Header />
      <Main>{page}</Main>
      <Footer />
    </Layout>
  );
};

AccountPage.authentication = true;
