import Layout, { Header, Footer, Main } from "@/components/layout";
import RecruitDetailContainer from "@/containers/recruitDetailContainer";

export default function RecruitDetailPage() {
  return <RecruitDetailContainer />;
}

RecruitDetailPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <Header />
      <Main>{page}</Main>
      <Footer />
    </Layout>
  );
};
