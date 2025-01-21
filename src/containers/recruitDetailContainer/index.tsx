import React from 'react';
import RecruitDetail from '@/components/recruitDetail';
import { Get, Post } from '@/apis';
import useFetchQuery from '@/hooks/useFetchQuery';
import queryKeys from '@/constants/queryKeys';
import { useRouter } from 'next/router';
import RecruitDetailSideMenu from '@/components/recruitDetail/RecruitDetailSideMenu';
import useToast from '@/hooks/useToast';
import useAuth from '@/hooks/useAuth';
import RecruitDetailApplyResumeForm from '@/components/recruitDetail/RecruitDetailApplyResumeForm';
import Button from '@/components/common/style/Button';
import { useQueryClient } from '@tanstack/react-query';

export default function RecruitDetailContainer() {
  const [isOpenApplyForm, setIsOpenApplyForm] = React.useState(false);
  const [selectedResume, setSelectedResume] = React.useState<string | null>(null);
  const [applyStatus, setApplyStatus] = React.useState<'available' | 'duplicate' | 'idle'>('idle');

  const { isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { slug } = router.query;

  const { data, isLoading, isSuccess } = useFetchQuery({
    queryKey: [queryKeys.RECRUIT_DETAIL, { slug }],
    queryFn: Get.recruitDetail,
    options: {
      enabled: !!slug,
      staleTime: 10 * 60 * 1000,
      gcTime: 15 * 60 * 1000,
    },
    requestQuery: {
      id: slug as string,
    },
  });

  const {
    data: applyCheckData,
    isLoading: isApplyCheckLoading,
    isError: isApplyCheckError,
  } = useFetchQuery({
    queryKey: [queryKeys.APPLICATION_APPLY_CHECK, { slug }],
    queryFn: Get.applicationApplyCheck,
    options: {
      enabled: !!slug,
      staleTime: 10 * 60 * 1000,
      gcTime: 15 * 60 * 1000,
    },
    requestQuery: {
      id: slug as string,
    },
  });

  React.useEffect(() => {
    if (applyCheckData) {
      if (applyCheckData.result.status === 'available') {
        setApplyStatus('available');
      }
      if (applyCheckData.result.status === 'duplicate') {
        setApplyStatus('duplicate');
      }
    }
  }, [applyCheckData]);

  const handleClickApply = React.useCallback(() => {
    if (!isAuthenticated) {
      return addToast({ message: '로그인 후 이용해주세요.', type: 'info' });
    }
    setIsOpenApplyForm((prev) => !prev);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  // API - 이력서 제출
  const fetchSubmitApply = React.useCallback(async () => {
    try {
      const response = await Post.applyResume({
        recruitId: slug as string,
        resumeId: selectedResume as string,
      });
      console.log('이력서 제출 API : ', response);
      await queryClient.invalidateQueries({ queryKey: [queryKeys.APPLICATION_APPLY_CHECK], refetchType: 'all' });
      await queryClient.invalidateQueries({ queryKey: [queryKeys.RESUME_LIST], refetchType: 'all' });
      await queryClient.invalidateQueries({ queryKey: [queryKeys.USER_APPLICATION_HISTORY], refetchType: 'all' });
      addToast({ message: '지원이 완료되었습니다.', type: 'success' });
      setApplyStatus('duplicate');
    } catch (error) {
      addToast({ message: '이력서 제출에 실패했습니다.', type: 'error' });
    } finally {
      setIsOpenApplyForm(false);
      setSelectedResume(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedResume]);

  console.log('채용공고 상세 API : ', data);

  // TODO - Loading
  if (isLoading) {
    return <div>isLoading</div>;
  }

  if (isSuccess && data) {
    return (
      <RecruitDetail data={data.result}>
        <RecruitDetailSideMenu managerName={data.result.managerName} managerNumber={data.result.managerNumber}>
          {!isOpenApplyForm && !isApplyCheckError && (
            <Button
              label={applyStatus === 'available' ? '지원하기' : '지원완료'}
              variant="primary"
              height="50px"
              borderRadius="10px"
              onClick={handleClickApply}
              fontSize="18px"
              disabled={applyStatus === 'duplicate'}
              isLoading={isApplyCheckLoading}
            />
          )}

          {isApplyCheckError && <Button label="지원불가" variant="secondary" height="50px" borderRadius="10px" fontSize="18px" disabled />}

          {isOpenApplyForm && (
            <RecruitDetailApplyResumeForm
              selectedResume={selectedResume}
              setSelectedResume={setSelectedResume}
              setIsOpenApplyForm={setIsOpenApplyForm}
              fetchSubmitApply={fetchSubmitApply}
            />
          )}
        </RecruitDetailSideMenu>
      </RecruitDetail>
    );
  }
}
