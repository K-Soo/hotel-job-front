import Layout, { Header, Footer, Main, DesktopNavigation, MobileNavigation } from '@/components/layout';
import TalentContainer from '@/containers/talentContainer';
import BottomNavigation from '@/components/layout/BottomNavigation';

export default function TalentPage() {
  return <TalentContainer />;
}

TalentPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <Header>
        <DesktopNavigation />
        <MobileNavigation title="인재풀" />
      </Header>
      <Main>{page}</Main>
      <Footer />
      <BottomNavigation />
    </Layout>
  );
};
