import React from 'react';
import ResumeCard from '@/components/userResume/ResumeCard';
import ResumeHistoryItem from '@/components/userResume/ResumeHistoryItem';
import useToast from '@/hooks/useToast';
import useAuth from '@/hooks/useAuth';
import useAlertWithConfirm from '@/hooks/useAlertWithConfirm';
import useFetchQuery from '@/hooks/useFetchQuery';
import queryKeys from '@/constants/queryKeys';
import { Get, Delete } from '@/apis';
import { useQueryClient } from '@tanstack/react-query';
import { ResumeListItem, ResumeLstItemApplications } from '@/types';
import useLoading from '@/hooks/useLoading';
import Modal from '@/components/common/modal';
import useModal from '@/hooks/useModal';
import EmptyComponent from '@/components/common/EmptyComponent';
import SkeletonUI from '@/components/common/SkeletonUI';

export default function UserResumeListContainer() {
  const [selectedResume, setSelectedSelectedResume] = React.useState<ResumeLstItemApplications[] | []>([]);
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  const { setAlertWithConfirmAtom } = useAlertWithConfirm();
  const { setLoadingAtomStatue } = useLoading();
  const { addToast } = useToast();
  const { authAtomState } = useAuth();
  const { modalAtomState, setModalAtomState } = useModal();
  const queryClient = useQueryClient();

  const { data, isLoading, isSuccess } = useFetchQuery({
    queryKey: [queryKeys.RESUME_LIST, { nickname: authAtomState.nickname }],
    queryFn: Get.getResumeList,
    options: {
      throwOnError: true,
      staleTime: 10 * 60 * 1000,
      gcTime: 15 * 60 * 1000,
    },
  });

  console.log('이력서 리스트 API : ', data);

  React.useEffect(() => {
    if (!modalAtomState.isOpen) {
      setSelectedSelectedResume([]);
    }
  }, [modalAtomState.isOpen]);

  const handleCloseModal = () => setIsOpenModal(false);

  //handler - 입사지원 내역
  const handleClickSelectedApplications = React.useCallback((applications: ResumeLstItemApplications[]) => {
    setSelectedSelectedResume(applications);
    setIsOpenModal(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // 이력서 삭제
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

  const isEmptyResume = !isLoading && isSuccess && data && data.result.length === 0;

  if (isLoading) {
    return <SkeletonUI.ResumeListItems />;
  }

  if (isEmptyResume) {
    return <EmptyComponent message="첫번째 이력서를 작성해보세요! 😀" />;
  }

  if (isSuccess && data) {
    return (
      <>
        {isOpenModal && (
          <Modal handleCloseModal={handleCloseModal}>
            <Modal.Header title="입사 지원내역" handleCloseModal={handleCloseModal} />
            <Modal.Content>
              {selectedResume.length === 0 && <EmptyComponent message="지원내역이 없습니다." />}
              {selectedResume.map((item) => {
                if (item.recruitment) {
                  return <ResumeHistoryItem key={item.id} item={item} />;
                }
              })}
            </Modal.Content>
          </Modal>
        )}

        {data.result.map((item) => (
          <ResumeCard
            key={item.id}
            item={item}
            handleClickRemoveResume={handleClickRemoveResume}
            handleClickSelectedApplications={handleClickSelectedApplications}
          />
        ))}
      </>
    );
  }
}
