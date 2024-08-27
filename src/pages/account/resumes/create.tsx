import Layout, { Header, Footer, Main } from "@/components/layout";
import AccountResumesCreateContainer from "@/containers/accountResumesCreateContainer";

//이력서 생성
export default function AccountResumesCreatePage() {
  return <AccountResumesCreateContainer />;
}

AccountResumesCreatePage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <Header />
      <Main>{page}</Main>
    </Layout>
  );
};

AccountResumesCreatePage.authentication = true;
