import React from 'react';
import ResumeCard from '@/components/userResume/ResumeCard';
import useToast from '@/hooks/useToast';
import useAuth from '@/hooks/useAuth';
import useAlertWithConfirm from '@/hooks/useAlertWithConfirm';
import useFetchQuery from '@/hooks/useFetchQuery';
import queryKeys from '@/constants/queryKeys';
import { Get, Delete } from '@/apis';
import { useQueryClient } from '@tanstack/react-query';
import { ResumeListItem } from '@/types';
import useLoading from '@/hooks/useLoading';
import Modal from '@/components/common/modal';
import useModal from '@/hooks/useModal';

export default function UserResumeListContainer() {
  const { setAlertWithConfirmAtom } = useAlertWithConfirm();
  const { setLoadingAtomStatue } = useLoading();
  const { addToast } = useToast();
  const { authAtomState } = useAuth();
  const { modalAtomState } = useModal();
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

  if (isLoading) {
    return <div>loading</div>;
  }

  if (isSuccess && data) {
    return (
      <>
        {modalAtomState.isOpen && (
          <Modal>
            <Modal.Header title="입사 지원내역" />
            <Modal.Content>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem asperiores, quasi reiciendis, laboriosam mollitia sequi
                quas officiis nisi quisquam recusandae porro doloremque consequatur. Eaque dicta commodi explicabo libero asperiores
                aperiam!
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem asperiores, quasi reiciendis, laboriosam mollitia sequi
                quas officiis nisi quisquam recusandae porro doloremque consequatur. Eaque dicta commodi explicabo libero asperiores
                aperiam!
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem asperiores, quasi reiciendis, laboriosam mollitia sequi
                quas officiis nisi quisquam recusandae porro doloremque consequatur. Eaque dicta commodi explicabo libero asperiores
                aperiam!
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem asperiores, quasi reiciendis, laboriosam mollitia sequi
                quas officiis nisi quisquam recusandae porro doloremque consequatur. Eaque dicta commodi explicabo libero asperiores
                aperiam!
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem asperiores, quasi reiciendis, laboriosam mollitia sequi
                quas officiis nisi quisquam recusandae porro doloremque consequatur. Eaque dicta commodi explicabo libero asperiores
                aperiam!
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem asperiores, quasi reiciendis, laboriosam mollitia sequi
                quas officiis nisi quisquam recusandae porro doloremque consequatur. Eaque dicta commodi explicabo libero asperiores
                aperiam!
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem asperiores, quasi reiciendis, laboriosam mollitia sequi
                quas officiis nisi quisquam recusandae porro doloremque consequatur. Eaque dicta commodi explicabo libero asperiores
                aperiam!
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem asperiores, quasi reiciendis, laboriosam mollitia sequi
                quas officiis nisi quisquam recusandae porro doloremque consequatur. Eaque dicta commodi explicabo libero asperiores
                aperiam!
              </p>
            </Modal.Content>
            <Modal.Footer>
              <h1>Modal Header</h1>
            </Modal.Footer>
          </Modal>
        )}
        {data.result.map((item) => (
          <ResumeCard key={item.id} item={item} handleClickRemoveResume={handleClickRemoveResume} />
        ))}
      </>
    );
  }
}
