import Layout, { Main, Header, DesktopNavigation, MobileNavigation } from '@/components/layout';
import AccountResumeRegisterContainer from '@/containers/accountResumeRegisterContainer';

//이력서 생성
export default function AccountResumeRegisterPage() {
  return <AccountResumeRegisterContainer />;
}

AccountResumeRegisterPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <Header>
        <DesktopNavigation />
        <MobileNavigation />
      </Header>
      <Main>{page}</Main>
    </Layout>
  );
};

AccountResumeRegisterPage.authentication = true;
