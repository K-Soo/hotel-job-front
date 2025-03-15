import Layout, { EmployerMain, EmployerHeader, EmployerFooter } from '@/components/layout';
import EmployerProductRecruitmentContainer from '@/containers/employerProductRecruitmentContainer';
import { ErrorBoundary, ErrorComponent } from '@/error';
import { NextSeo } from 'next-seo';

export default function EmployerProductRecruitmentPage() {
  return (
    <>
      <NextSeo title="채용상품" nofollow={true} noindex={true} />
      <ErrorBoundary fallback={<ErrorComponent visibleBackButton={false} fontSize="16px" />}>
        <EmployerProductRecruitmentContainer />
      </ErrorBoundary>
    </>
  );
}

EmployerProductRecruitmentPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <EmployerHeader />
      <EmployerMain>{page}</EmployerMain>
      <EmployerFooter />
    </Layout>
  );
};

EmployerProductRecruitmentPage.authentication = true;
EmployerProductRecruitmentPage.allowedRoles = ['EMPLOYER'];
