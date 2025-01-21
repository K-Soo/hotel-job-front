import React from 'react';
import UserResume from '@/components/userResume';
import UserTemplate from '@/components/common/user/UserTemplate';
import UserTitle from '@/components/common/user/UserTitle';
import CreateResumeButton from '@/components/userResume/CreateResumeButton';
import useToast from '@/hooks/useToast';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import useAlertWithConfirm from '@/hooks/useAlertWithConfirm';
import { certificationModalAtom } from '@/recoil/certification';
import { useRecoilState } from 'recoil';
import dynamic from 'next/dynamic';
import { Post } from '@/apis';
import queryKeys from '@/constants/queryKeys';
import { useQueryClient } from '@tanstack/react-query';
import { ResumeListItem } from '@/types';
import environment from '@/environment';
import UserResumeListContainer from '@/containers/userResumeContainer/UserResumeListContainer';
import { ErrorBoundary, ErrorComponent } from '@/error';

const DynamicNoSSRCertificationModal = dynamic(() => import('@/components/common/CertificationModal'), { ssr: false });

export default function UserResumeContainer() {
  const [certificationModalAtomState, setCertificationModalAtomState] = useRecoilState(certificationModalAtom);
  const router = useRouter();
  const { setAlertWithConfirmAtom } = useAlertWithConfirm();
  const { addToast } = useToast();
  const { authAtomState } = useAuth();
  const queryClient = useQueryClient();

  const handleClickCreateResumeButton = async () => {
    if (environment.isProd && authAtomState.certificationStatus !== 'VERIFIED') {
      return setAlertWithConfirmAtom((prev) => ({
        ...prev,
        type: 'CONFIRM',
        title: 'TITLE_1',
        subTitle: 'DESC_6',
        onClickConfirm: () => setCertificationModalAtomState({ isOpen: true }),
        confirmLabel: '인증하기',
        cancelLabel: '취소',
      }));
    }

    try {
      const response = await Post.createResume();
      console.log('이력서 생성 API : ', response);
      if (response.result.status !== 'success') {
        throw new Error();
      }
      router.push(`/user/resume/${response.result.id}`);
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: [queryKeys.RESUME_LIST], refetchType: 'all' });
      }, 1000);
    } catch (error) {
      addToast({ message: '이력서 생성에 실패했습니다.', type: 'error' });
    }
  };

  return (
    <>
      {certificationModalAtomState.isOpen && <DynamicNoSSRCertificationModal />}
      <UserResume>
        <UserTemplate>
          <UserTitle title="내 이력서" />
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <CreateResumeButton margin="0 15px 0 0" type="new" handleClickCreateResumeButton={handleClickCreateResumeButton} />
            <CreateResumeButton type="file" handleClickCreateResumeButton={handleClickCreateResumeButton} />
          </div>

          <ErrorBoundary fallback={<ErrorComponent visibleBackButton={false} message="이력서를 불러오지못했습니다." />}>
            <UserResumeListContainer />
          </ErrorBoundary>
        </UserTemplate>
      </UserResume>
    </>
  );
}
