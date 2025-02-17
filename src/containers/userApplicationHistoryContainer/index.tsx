import React from 'react';
import useFetchQuery from '@/hooks/useFetchQuery';
import queryKeys from '@/constants/queryKeys';
import useAuth from '@/hooks/useAuth';
import { Get } from '@/apis';
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

const DynamicNoSSRModal = dynamic(() => import('@/components/common/modal'), { ssr: false });

export default function UserApplicationHistoryContainer() {
  const { isAuthenticated, authAtomState } = useAuth();
  const [selectedApplicant, setSelectedApplicant] = React.useState<ApplicationHistory | null>(null);

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

  const handleCloseModal = () => setSelectedApplicant(null);

  const handleClickApplicant = (applicant: ApplicationHistory) => setSelectedApplicant(applicant);

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
            <Button label="지원취소" variant="primary" fontSize="16px" />
          </Modal.Footer>
        </DynamicNoSSRModal>
      )}

      <UserApplicationHistory>
        <UserTemplate>
          <UserTitle title="지원현황" />

          <HistoryStatus />

          <ApplicationHistoryTable>
            <ApplicationHistoryTable.Header />
            {isLoading && (
              <>
                <SkeletonUI.Line style={{ height: '40px', margin: '5px 0' }} />
                <SkeletonUI.Line style={{ height: '40px', margin: '5px 0' }} />
                <SkeletonUI.Line style={{ height: '40px', margin: '5px 0' }} />
              </>
            )}
            {isSuccess && data && <ApplicationHistoryTable.Body data={data.result} handleClickApplicant={handleClickApplicant} />}
          </ApplicationHistoryTable>
        </UserTemplate>
      </UserApplicationHistory>
    </>
  );
}
