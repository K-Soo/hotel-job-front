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
import UserResumeListContainer from '@/containers/userResumeContainer/UserResumeListContainer';
import { ErrorBoundary, ErrorComponent } from '@/error';
import { errorCode } from '@/error';
import { GetResumeListResponse } from '@/types/API';

const DynamicNoSSRCertificationModal = dynamic(() => import('@/components/common/CertificationModal'), { ssr: false });

export default function UserResumeContainer() {
  const [certificationModalAtomState, setCertificationModalAtomState] = useRecoilState(certificationModalAtom);
  const router = useRouter();
  const { setAlertWithConfirmAtom } = useAlertWithConfirm();
  const { addToast } = useToast();
  const { authAtomState } = useAuth();
  const queryClient = useQueryClient();

  const handleClickCreateResumeButton = async () => {
    if (authAtomState.certificationStatus !== 'VERIFIED') {
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
      const queryData = queryClient.getQueryData<GetResumeListResponse>([queryKeys.RESUME_LIST, { nickname: authAtomState.nickname }]);

      if (queryData && queryData.result.length >= 5) {
        return addToast({ message: '이력서 생성은 최대 5개까지 가능합니다.', type: 'warning' });
      }

      const response = await Post.createResume();
      console.log('이력서 생성 API : ', response);
      if (response.result.status !== 'success') {
        throw new Error();
      }

      router.push(`/user/resume/${response.result.id}`);

      queryClient.invalidateQueries({ queryKey: [queryKeys.RESUME_LIST], refetchType: 'all' });
    } catch (error: any) {
      const responseErrorCode = error.response?.data?.error?.code;
      console.log('responseErrorCode: ', responseErrorCode);
      if (responseErrorCode === errorCode.CREATION_LIMIT_EXCEEDED) {
        return addToast({ message: '이력서 생성은 최대 5개까지 가능합니다.', type: 'warning' });
      }
      if (responseErrorCode === errorCode.CERTIFICATION_UNAUTHORIZED) {
        return addToast({ message: '본인인증 후 이용가능합니다.', type: 'error' });
      }
      addToast({ message: '이력서 생성에 실패했습니다.', type: 'error' });
    }
  };

  return (
    <>
      {certificationModalAtomState.isOpen && <DynamicNoSSRCertificationModal />}
      <UserResume>
        <UserTemplate>
          <UserTitle title="내 이력서" />
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', margin: '0 0 15px 0' }}>
            <CreateResumeButton margin="0 0 0 0" type="new" handleClickCreateResumeButton={handleClickCreateResumeButton} />
            {/* <CreateResumeButton type="file" handleClickCreateResumeButton={handleClickCreateResumeButton} /> */}
          </div>

          <ErrorBoundary fallback={<ErrorComponent visibleBackButton={false} message="이력서를 불러오지못했습니다." />}>
            <UserResumeListContainer />
          </ErrorBoundary>
        </UserTemplate>
      </UserResume>
    </>
  );
}
