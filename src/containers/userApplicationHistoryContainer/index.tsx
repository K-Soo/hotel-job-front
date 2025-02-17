import React from 'react';
import useFetchQuery from '@/hooks/useFetchQuery';
import queryKeys from '@/constants/queryKeys';
import useAuth from '@/hooks/useAuth';
import { Get, Patch } from '@/apis';
import UserApplicationHistory from '@/components/userApplicationHistory';
import HistoryStatus from '@/components/userApplicationHistory/HistoryStatus';
import ApplicationHistoryTable from '@/components/userApplicationHistory/applicationHistoryTable';
import ApplicationDetailForm from '@/components/userApplicationHistory/ApplicationDetailForm';
import UserTemplate from '@/components/common/user/UserTemplate';
import UserTitle from '@/components/common/user/UserTitle';
import { ErrorComponent } from '@/error';
import SkeletonUI from '@/components/common/SkeletonUI';
import dynamic from 'next/dynamic';
import Modal from '@/components/common/modal';
import { ApplicationHistory } from '@/types';
import Button from '@/components/common/style/Button';
import useResponsive from '@/hooks/useResponsive';
import useAlertWithConfirm from '@/hooks/useAlertWithConfirm';
import useLoading from '@/hooks/useLoading';
import useToast from '@/hooks/useToast';
import { useQueryClient } from '@tanstack/react-query';
import EmptyComponent from '@/components/common/EmptyComponent';

const DynamicNoSSRModal = dynamic(() => import('@/components/common/modal'), { ssr: false });

export default function UserApplicationHistoryContainer() {
  const { isAuthenticated, authAtomState } = useAuth();
  const [selectedApplicant, setSelectedApplicant] = React.useState<ApplicationHistory | null>(null);

  const { isTablet } = useResponsive();
  const { setAlertWithConfirmAtom } = useAlertWithConfirm();
  const { setLoadingAtomStatue } = useLoading();
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading, isSuccess, isError } = useFetchQuery({
    queryKey: [queryKeys.USER_APPLICATION_HISTORY, { nickname: authAtomState.nickname }],
    queryFn: Get.getApplicationHistory,
    options: {
      enabled: isAuthenticated,
      staleTime: 1000 * 60 * 3,
      gcTime: 1000 * 60 * 5,
    },
  });

  console.log('지원내역 리스트 API : ', data?.result);

  const handleCloseModal = React.useCallback(() => setSelectedApplicant(null), []);

  const handleClickApplicant = React.useCallback((applicant: ApplicationHistory) => setSelectedApplicant(applicant), []);

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
      {selectedApplicant && (
        <DynamicNoSSRModal handleCloseModal={() => handleCloseModal()}>
          <Modal.Header title="지원내역" handleCloseModal={() => handleCloseModal()} />
          <Modal.Content>
            <ApplicationDetailForm selectedApplicant={selectedApplicant} />
          </Modal.Content>
          <Modal.Footer>
            <Button
              label={selectedApplicant.cancelAt === null ? '지원취소' : '지원취소 완료'}
              variant="primary"
              fontSize="18px"
              onClick={() => handleClickCancelApplication(selectedApplicant.id)}
              borderRadius="30px"
              disabled={selectedApplicant.cancelAt !== null}
            />
          </Modal.Footer>
        </DynamicNoSSRModal>
      )}

      <UserApplicationHistory>
        <UserTemplate>
          <UserTitle title="지원현황" />

          <HistoryStatus />

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
                  <EmptyComponent message="아직 지원한 채용 공고가 없어요.\n마음에 드는 공고를 찾아 지원해보세요!" isVisibleImage={false} />
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
