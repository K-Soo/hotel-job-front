import Layout, { Header, Footer, Main } from "@/components/layout";

export default function AccountPage() {
  return <>index</>;
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
