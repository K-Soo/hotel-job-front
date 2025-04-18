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
import Modal from '@/components/common/modal';
import dynamic from 'next/dynamic';
import useResponsive from '@/hooks/useResponsive';
import RecruitDetailBottomNavigation from '@/components/recruitDetail/RecruitDetailBottomNavigation';
import useFetchApplyCheck from '@/hooks/useFetchApplyCheck';
import SkeletonUI from '@/components/common/SkeletonUI';
import useAlertWithConfirm from '@/hooks/useAlertWithConfirm';
import useRedirect from '@/hooks/useRedirect';

const DynamicNoSSRModal = dynamic(() => import('@/components/common/modal'), { ssr: false });

export default function RecruitDetailContainer() {
  const [isOpenApplyForm, setIsOpenApplyForm] = React.useState(false);
  const [selectedResume, setSelectedResume] = React.useState<string | null>(null);
  const [applyStatus, setApplyStatus] = React.useState<'available' | 'duplicate' | 'idle'>('idle');
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  const { isTablet } = useResponsive();
  const { isAuthenticated, role } = useAuth();
  const { addToast } = useToast();
  const queryClient = useQueryClient();
  const { setAlertWithConfirmAtom } = useAlertWithConfirm();

  const router = useRouter();
  const { slug } = router.query;
  const { redirectToSignin } = useRedirect();

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

  // API - 지원여부 체크
  const { applyCheckData, isApplyCheckLoading, isApplyCheckError } = useFetchApplyCheck({ recruitmentId: data?.result?.id });

  React.useEffect(() => {
    if (!applyCheckData) {
      return;
    }

    if (applyCheckData.result.status === 'available') {
      setApplyStatus('available');
    }
    if (applyCheckData.result.status === 'duplicate') {
      setApplyStatus('duplicate');
    }
    // TODO - unavailable 상태 추가
    if (applyCheckData.result.status === 'unavailable') {
      setApplyStatus('duplicate');
    }
  }, [applyCheckData]);

  const handleSigninThenApply = React.useCallback(() => {
    setAlertWithConfirmAtom((prev) => ({
      ...prev,
      type: 'CONFIRM',
      title: 'TITLE_22',
      subTitle: 'DESC_15',
      confirmLabel: '이동하기',
      cancelLabel: '취소',
      onClickConfirm: () => redirectToSignin(),
    }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickApply = React.useCallback(() => {
    if (!isAuthenticated) {
      return handleSigninThenApply();
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
      await queryClient.invalidateQueries({ queryKey: [queryKeys.USER_APPLICATION_HISTORY_COUNT], refetchType: 'all' });
      addToast({ message: '지원이 완료되었습니다.', type: 'success' });
      setApplyStatus('duplicate');
    } catch (error) {
      addToast({ message: '이력서 제출에 실패했습니다.', type: 'error' });
    } finally {
      setIsOpenApplyForm(false);
      setIsOpenModal(false);
      setSelectedResume(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addToast, selectedResume, slug]);

  console.log('채용공고 상세 API : ', data);

  if (isLoading) {
    return <SkeletonUI.RecruitmentDetail />;
  }

  if (isSuccess && data) {
    return (
      <>
        {isTablet && isOpenModal && (
          <DynamicNoSSRModal handleCloseModal={() => setIsOpenModal(false)}>
            <Modal.Header title="지원하기" handleCloseModal={() => setIsOpenModal(false)} />

            <Modal.Content>
              <RecruitDetailApplyResumeForm
                selectedResume={selectedResume}
                setSelectedResume={setSelectedResume}
                setIsOpenApplyForm={setIsOpenApplyForm}
                fetchSubmitApply={fetchSubmitApply}
              />
            </Modal.Content>

            <Modal.Footer>
              {role === 'JOB_SEEKER' && (
                <Button
                  label={applyStatus === 'available' ? '제출하기' : '지원완료'}
                  variant="primary"
                  borderRadius="10px"
                  fontSize="16px"
                  onClick={fetchSubmitApply}
                  disabled={!selectedResume}
                />
              )}
            </Modal.Footer>
          </DynamicNoSSRModal>
        )}

        <RecruitDetail data={data.result}>
          <RecruitDetailSideMenu
            managerName={data.result.managerName}
            managerNumber={data.result.managerNumber}
            recruitmentStatus={data.result.recruitmentStatus}
            handleClickApply={handleClickApply}
            handleSigninThenApply={handleSigninThenApply}
            isOpenApplyForm={isOpenApplyForm}
            isApplyCheckError={isApplyCheckError}
            applyStatus={applyStatus}
            isApplyCheckLoading={isApplyCheckLoading}
            selectedResume={selectedResume}
            setSelectedResume={setSelectedResume}
            setIsOpenApplyForm={setIsOpenApplyForm}
            fetchSubmitApply={fetchSubmitApply}
          />
        </RecruitDetail>

        {/* MOBILE BOTTOM */}
        <RecruitDetailBottomNavigation
          applyStatus={applyStatus}
          recruitmentStatus={data.result.recruitmentStatus}
          setIsOpenModal={setIsOpenModal}
          handleSigninThenApply={handleSigninThenApply}
        />
      </>
    );
  }
}
