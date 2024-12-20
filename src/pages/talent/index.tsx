import Layout, { Header, Footer, Main, DesktopNavigation, MobileNavigation } from '@/components/layout';
import TalentContainer from '@/containers/talentContainer';
import BottomNavigation from '@/components/common/BottomNavigation';

export default function TalentPage() {
  return <TalentContainer />;
}

TalentPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <Header>
        <DesktopNavigation />
        <MobileNavigation />
      </Header>
      <Main>{page}</Main>
      <Footer />
      <BottomNavigation />
    </Layout>
  );
};
