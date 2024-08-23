import Layout, { Header, Footer, Main } from "@/components/layout";
import TalentContainer from "@/containers/talentContainer";
export default function TalentPage() {
  return <TalentContainer />;
}

TalentPage.getLayout = (page: React.ReactElement) => {
  console.log("page: ", page);
  return (
    <Layout>
      <Header />
      <Main>{page}</Main>
      <Footer />
    </Layout>
  );
};
