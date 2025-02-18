import React from 'react';
import useFetchQuery from '@/hooks/useFetchQuery';
import queryKeys from '@/constants/queryKeys';
import useAuth from '@/hooks/useAuth';
import { Get, Patch } from '@/apis';
import UserApplicationHistory from '@/components/userApplicationHistory';
import ApplicationHistoryTable from '@/components/userApplicationHistory/applicationHistoryTable';
import ApplicationDetailForm from '@/components/userApplicationHistory/ApplicationDetailForm';
import AnnouncementForm from '@/components/userApplicationHistory/AnnouncementForm';
import UserTemplate from '@/components/common/user/UserTemplate';
import UserTitle from '@/components/common/user/UserTitle';
import { ErrorComponent } from '@/error';
import SkeletonUI from '@/components/common/SkeletonUI';
import dynamic from 'next/dynamic';
import Modal from '@/components/common/modal';
import { ApplicantReviewStageStatusKey, ApplicationHistory } from '@/types';
import Button from '@/components/common/style/Button';
import useResponsive from '@/hooks/useResponsive';
import useAlertWithConfirm from '@/hooks/useAlertWithConfirm';
import useLoading from '@/hooks/useLoading';
import useToast from '@/hooks/useToast';
import { useQueryClient } from '@tanstack/react-query';
import EmptyComponent from '@/components/common/EmptyComponent';
import HistoryStatusContainer from '@/containers/userApplicationHistoryContainer/HistoryStatusContainer';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { ErrorBoundary } from '@/error';
import path from '@/constants/path';
import { keepPreviousData } from '@tanstack/react-query';

const DynamicNoSSRModal = dynamic(() => import('@/components/common/modal'), { ssr: false });

interface Query extends ParsedUrlQuery {
  status?: Lowercase<ApplicantReviewStageStatusKey>;
}

export default function UserApplicationHistoryContainer() {
  const { isAuthenticated, authAtomState } = useAuth();
  const [selectedApplication, setSelectedApplication] = React.useState<ApplicationHistory | null>(null);
  const [stepIndex, setStepIndex] = React.useState(0);

  const router = useRouter();
  const { status } = router.query as Query;

  const { isTablet } = useResponsive();
  const { setAlertWithConfirmAtom } = useAlertWithConfirm();
  const { setLoadingAtomStatue } = useLoading();
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading, isSuccess, isError } = useFetchQuery({
    queryKey: [queryKeys.USER_APPLICATION_HISTORY, { nickname: authAtomState.nickname, status: status }].filter(Boolean),
    queryFn: Get.getApplicationHistory,
    options: {
      enabled: isAuthenticated,
      staleTime: 1000 * 60 * 3,
      gcTime: 1000 * 60 * 5,
      placeholderData: keepPreviousData,
    },
    requestQuery: {
      status: status ? (status.toUpperCase() as ApplicantReviewStageStatusKey) : undefined,
    },
  });

  console.log('지원내역 리스트 API : ', data?.result);

  const handleCloseModal = React.useCallback(() => {
    setSelectedApplication(null);
    setStepIndex(0);
  }, []);

  const handleClickApplicant = React.useCallback((applicant: ApplicationHistory) => setSelectedApplication(applicant), []);

  // API - 지원취소
  const fetchApplicationCancel = async (selectedApplicantId: number) => {
    setLoadingAtomStatue({ isLoading: true });
    try {
      const response = await Patch.cancelApplication({ applicationId: selectedApplicantId });
      console.log('지원취소 API: ', response);
      if (response.result.status !== 'success') {
        throw new Error();
      }
      await queryClient.invalidateQueries({ queryKey: [queryKeys.USER_APPLICATION_HISTORY], refetchType: 'all' });
      await queryClient.invalidateQueries({ queryKey: [queryKeys.APPLICATION_APPLY_CHECK], refetchType: 'all' });
      addToast({ type: 'success', message: '지원이 취소되었습니다.' });
    } catch (error) {
      console.log('error: ', error);
      addToast({ type: 'error', message: '지원취소를 할 수 없습니다.' });
    } finally {
      setLoadingAtomStatue({ isLoading: false });
      handleCloseModal();
    }
  };

  const handleClickCancelApplication = (selectedApplicantId: number) => {
    setAlertWithConfirmAtom((prev) => ({
      ...prev,
      type: 'CONFIRM',
      confirmLabel: '지원취소',
      cancelLabel: '취소',
      confirmVariant: 'delete',
      title: 'TITLE_12',
      onClickConfirm: () => fetchApplicationCancel(selectedApplicantId),
    }));
  };

  if (isError) {
    return (
      <UserApplicationHistory>
        <UserTemplate>
          <UserTitle title="지원현황" />
          <ErrorComponent visibleBackButton={false} />
        </UserTemplate>
      </UserApplicationHistory>
    );
  }

  return (
    <>
      {selectedApplication && (
        <DynamicNoSSRModal handleCloseModal={() => handleCloseModal()}>
          <Modal.Header
            title={stepIndex === 0 ? '지원내역' : '상세정보'}
            handleCloseModal={() => handleCloseModal()}
            setInitialStepIndex={() => setStepIndex(0)}
            stepIndex={stepIndex}
            isStepForm={true}
          />
          <Modal.Content>
            {stepIndex === 0 && <ApplicationDetailForm selectedApplication={selectedApplication} />}
            {stepIndex === 1 && <AnnouncementForm selectedApplication={selectedApplication} />}
          </Modal.Content>
          <Modal.Footer>
            <Button
              label={selectedApplication.cancelAt === null ? '지원취소' : '지원취소 완료'}
              variant="secondary"
              fontSize="16px"
              onClick={() => handleClickCancelApplication(selectedApplication.id)}
              borderRadius="30px"
              disabled={selectedApplication.cancelAt !== null}
            />
            {selectedApplication.announcementRecipients.length !== 0 && (
              <Button
                margin="0 0 0 15px"
                label="상세정보"
                variant="primary"
                fontSize="16px"
                onClick={() => setStepIndex(1)}
                borderRadius="30px"
                // disabled={selectedApplication.cancelAt !== null}
              />
            )}
          </Modal.Footer>
        </DynamicNoSSRModal>
      )}

      <UserApplicationHistory>
        <UserTemplate>
          <UserTitle title="지원현황" />

          <ErrorBoundary fallback={null}>
            <HistoryStatusContainer />
          </ErrorBoundary>

          <ApplicationHistoryTable>
            {!isTablet && <ApplicationHistoryTable.Header />}
            {isLoading && (
              <>
                <SkeletonUI.Line style={{ height: '40px', margin: '5px 0' }} />
                <SkeletonUI.Line style={{ height: '40px', margin: '5px 0' }} />
                <SkeletonUI.Line style={{ height: '40px', margin: '5px 0' }} />
              </>
            )}
            {isSuccess && data && (
              <>
                {data.result.length === 0 && (
                  <EmptyComponent
                    message={
                      status ? '해당 조건의 결과가 없습니다.' : '아직 지원한 채용 공고가 없어요.\n마음에 드는 공고를 찾아 지원해보세요!'
                    }
                    isVisibleImage={false}
                  />
                )}
                {data.result.length !== 0 && (
                  <ApplicationHistoryTable.Body data={data.result} handleClickApplicant={handleClickApplicant} />
                )}
              </>
            )}
          </ApplicationHistoryTable>
        </UserTemplate>
      </UserApplicationHistory>
    </>
  );
}
