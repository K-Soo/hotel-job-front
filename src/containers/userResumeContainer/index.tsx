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
import { Get, Delete } from '@/apis';
import { useQueryClient } from '@tanstack/react-query';
import { ResumeListItem } from '@/types';
import useLoading from '@/hooks/useLoading';

const DynamicNoSSRCertificationModal = dynamic(() => import('@/components/common/CertificationModal'), { ssr: false });

export default function UserResumeContainer() {
  const [certificationModalAtomState, setCertificationModalAtomState] = useRecoilState(certificationModalAtom);
  const router = useRouter();
  const { setAlertWithConfirmAtom } = useAlertWithConfirm();
  const { setLoadingAtomStatue } = useLoading();
  const { addToast } = useToast();
  const { authAtomState } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, isSuccess } = useFetchQuery({
    queryKey: [queryKeys.RESUME_LIST, { nickname: authAtomState.nickname }],
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

  //API - 이력서 삭제
  const fetchRemoveResume = async (resumeId: string) => {
    setLoadingAtomStatue({ isLoading: true });
    try {
      const response = await Delete.deleteResume({ resumeId });
      console.log('이력서 삭제 API : ', response);
      if (response.result.status !== 'success') {
        throw new Error();
      }
      await queryClient.invalidateQueries({ queryKey: [queryKeys.RESUME_LIST], refetchType: 'all' });
      addToast({ message: '이력서가 삭제되었습니다.', type: 'success' });
    } catch (error) {
      console.log('error: ', error);
    } finally {
      setLoadingAtomStatue({ isLoading: false });
    }
  };

  const handleClickRemoveResume = (resumeListItem: ResumeListItem) => {
    if (resumeListItem.isDefault) {
      return addToast({ message: '기본 이력서는 삭제할 수 없습니다.', type: 'error' });
    }
    setAlertWithConfirmAtom((prev) => ({
      ...prev,
      type: 'CONFIRM',
      confirmVariant: 'delete',
      title: 'TITLE_6',
      subTitle: resumeListItem.applicationsCount === 0 ? undefined : 'DESC_1',
      onClickConfirm: () => fetchRemoveResume(resumeListItem.id),
      confirmLabel: '삭제',
      cancelLabel: '취소',
    }));
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
                <ResumeCard key={item.id} item={item} handleClickRemoveResume={handleClickRemoveResume} />
              ))}
            </>
          )}
        </UserTemplate>
      </UserResume>
    </>
  );
}
