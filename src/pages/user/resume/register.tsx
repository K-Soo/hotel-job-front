import React from 'react';
import Layout, { Main, Header, DesktopNavigation, MobileNavigation } from '@/components/layout';
import UserResumeRegisterContainer from '@/containers/userResumeRegisterContainer';
import useAuth from '@/hooks/useAuth';
import LoadingOverlay from '@/components/common/LoadingOverlay';
import SkeletonUI from '@/components/common/SkeletonUI';

export default function UserResumeRegisterPage() {
  const { authAtomState } = useAuth();

  React.useEffect(() => {
    if (authAtomState.certificationStatus !== 'VERIFIED') {
      // alert('이력서 등록을 위해서는 본인인증이 필요합니다.');
      // window.location.href = '/user/resume';
    }
  }, []);

  return <UserResumeRegisterContainer />;

  if (authAtomState.certificationStatus !== 'VERIFIED') {
    return <SkeletonUI.Recruitment />;
  }

  if (authAtomState.certificationStatus === 'VERIFIED') {
    return <UserResumeRegisterContainer />;
  }
}

UserResumeRegisterPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <Header>
        <DesktopNavigation />
        <MobileNavigation title="이력서 등록" />
      </Header>
      <Main>{page}</Main>
    </Layout>
  );
};

UserResumeRegisterPage.authentication = true;
UserResumeRegisterPage.allowedRoles = ['JOB_SEEKER'];
