import React from 'react';
import UserResume from '@/components/userResume';
import UserTemplate from '@/components/common/user/UserTemplate';
import UserTitle from '@/components/common/user/UserTitle';
import CreateResumeButton from '@/components/userResume/CreateResumeButton';
import ResumeCard from '@/components/userResume/ResumeCard';
import useToast from '@/hooks/useToast';
import useAuth from '@/hooks/useAuth';
import path from '@/constants/path';
import { useRouter } from 'next/router';
import useAlertWithConfirm from '@/hooks/useAlertWithConfirm';
import { certificationModalAtom } from '@/recoil/certification';
import { useRecoilState } from 'recoil';
import dynamic from 'next/dynamic';
import { Post } from '@/apis';
import useFetchQuery from '@/hooks/useFetchQuery';
import queryKeys from '@/constants/queryKeys';
import { Get } from '@/apis';
import { useQueryClient } from '@tanstack/react-query';

const DynamicNoSSRCertificationModal = dynamic(() => import('@/components/common/CertificationModal'), { ssr: false });

export default function UserResumeContainer() {
  const [certificationModalAtomState, setCertificationModalAtomState] = useRecoilState(certificationModalAtom);
  const router = useRouter();
  const { setAlertWithConfirmAtom } = useAlertWithConfirm();
  const { addToast } = useToast();
  const { authAtomState } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, isSuccess } = useFetchQuery({
    queryKey: [queryKeys.RESUME_LIST],
    queryFn: Get.getResumeList,
    options: {
      staleTime: 10 * 60 * 1000,
      gcTime: 15 * 60 * 1000,
    },
  });

  console.log('이력서 리스트 API : ', data);

  const handleClickCreateResumeButton = async () => {
    // if (authAtomState.certificationStatus !== 'VERIFIED') {
    //   return setAlertWithConfirmAtom((prev) => ({
    //     ...prev,
    //     type: 'CONFIRM',
    //     title: 'TITLE_1',
    //     subTitle: 'DESC_6',
    //     onClickConfirm: () => setCertificationModalAtomState({ isOpen: true }),
    //     confirmLabel: '인증하기',
    //     cancelLabel: '취소',
    //   }));
    // }
    // router.push(path.USER_RESUME_REGISTER);
    try {
      const response = await Post.createResume();
      console.log('이력서 생성 API : ', response);
      if (response.result.status !== 'success') {
        throw new Error();
      }

      router.push(`/user/resume/${response.result.id}`);
      await queryClient.invalidateQueries({ queryKey: [queryKeys.RESUME_LIST], refetchType: 'all' });
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
          {isLoading && <div>loading</div>}
          {isError && <div>error</div>}
          {isSuccess && data && (
            <>
              {data.result.map((item) => (
                <ResumeCard key={item.id} item={item} />
              ))}
            </>
          )}
        </UserTemplate>
      </UserResume>
    </>
  );
}
