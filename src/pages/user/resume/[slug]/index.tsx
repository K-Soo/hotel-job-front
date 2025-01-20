import React from 'react';
import Layout, { Main, Header, DesktopNavigation, MobileNavigation, Footer } from '@/components/layout';
import UserResumeDetailContainer from '@/containers/userResumeDetailContainer';
import { ErrorBoundary, ErrorComponent } from '@/error';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import axios from 'axios';

export default function UserResumeDetailPage() {
  const router = useRouter();
  const { authAtomState } = useAuth();

  React.useEffect(() => {
    if (authAtomState.certificationStatus !== 'VERIFIED') {
      // alert('이력서 등록을 위해서는 본인인증이 필요합니다.');
      // window.location.href = '/user/resume';
    }
  }, []);

  return (
    <ErrorBoundary
      onError={(error) => {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            router.replace('/404');
          }
        }
      }}
      fallback={<ErrorComponent />}
    >
      <UserResumeDetailContainer />
    </ErrorBoundary>
  );

  if (authAtomState.certificationStatus !== 'VERIFIED') {
  }

  if (authAtomState.certificationStatus === 'VERIFIED') {
  }
}

UserResumeDetailPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <Header>
        <DesktopNavigation />
        <MobileNavigation />
      </Header>
      <Main>{page}</Main>
      <Footer />
    </Layout>
  );
};

UserResumeDetailPage.authentication = true;
UserResumeDetailPage.allowedRoles = ['JOB_SEEKER'];
