import React from 'react';
import Layout, { Main, Header, DesktopNavigation, MobileNavigation } from '@/components/layout';
import useAuth from '@/hooks/useAuth';
import LoadingOverlay from '@/components/common/LoadingOverlay';
import SkeletonUI from '@/components/common/SkeletonUI';
import UserResumeEditContainer from '@/containers/userResumeEditContainer';
import { ErrorBoundary, ErrorComponent } from '@/error';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function ResumeDetailEditPage() {
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
      <UserResumeEditContainer />
    </ErrorBoundary>
  );

  if (authAtomState.certificationStatus !== 'VERIFIED') {
  }

  if (authAtomState.certificationStatus === 'VERIFIED') {
  }
}

ResumeDetailEditPage.getLayout = (page: React.ReactElement) => {
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

ResumeDetailEditPage.authentication = true;
ResumeDetailEditPage.allowedRoles = ['JOB_SEEKER'];
