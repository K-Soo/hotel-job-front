import React from 'react';
import Layout, { Main, Header, DesktopNavigation, MobileNavigation, Footer } from '@/components/layout';
import UserResumeDetailContainer from '@/containers/userResumeDetailContainer';
import { ErrorBoundary, ErrorComponent } from '@/error';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import axios from 'axios';
import path from '@/constants/path';
import { ResumeProvider } from '@/context/ResumeProvider';
import LoadingSpinner from '@/components/common/LoadingSpinner';
export default function UserResumeDetailPage() {
  const router = useRouter();
  const { authAtomState } = useAuth();

  React.useEffect(() => {
    if (authAtomState.certificationStatus !== 'VERIFIED') {
      alert('이력서 등록을 위해서는 본인인증이 필요합니다.');
      window.location.href = '/user/resume';
      return;
    }
  }, [authAtomState.certificationStatus]);

  // XXX - loading 처리?
  if (authAtomState.certificationStatus !== 'VERIFIED') {
    return <LoadingSpinner />;
  }

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
      <ResumeProvider>
        <UserResumeDetailContainer />
      </ResumeProvider>
    </ErrorBoundary>
  );
}

UserResumeDetailPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <Header>
        <DesktopNavigation />
        <MobileNavigation hamburgerIcon backIcon backUrl={path.USER_RESUME} />
      </Header>
      <Main>{page}</Main>
    </Layout>
  );
};

UserResumeDetailPage.authentication = true;
UserResumeDetailPage.allowedRoles = ['JOB_SEEKER'];
