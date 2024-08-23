import Layout, { Header, Footer, Main } from "@/components/layout";
import RecruitContainer from "@/containers/recruitContainer";

export default function RecruitPage() {
  return <RecruitContainer />;
}

RecruitPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <Header />
      <Main>{page}</Main>
      <Footer />
    </Layout>
  );
};
