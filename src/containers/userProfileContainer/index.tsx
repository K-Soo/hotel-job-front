import React from 'react';
import UserProfile from '@/components/userProfile';
import useFetchQuery from '@/hooks/useFetchQuery';
import { Get, Delete } from '@/apis';
import queryKeys from '@/constants/queryKeys';
import { keepPreviousData } from '@tanstack/react-query';
import useAuth from '@/hooks/useAuth';
import useAlertWithConfirm from '@/hooks/useAlertWithConfirm';
import dynamic from 'next/dynamic';
import Modal from '@/components/common/modal';
import ChangeNicknameForm from '@/components/common/ChangeNicknameForm';
import useLoading from '@/hooks/useLoading';
import useSignout from '@/hooks/useSignout';

const DynamicNoSSRModal = dynamic(() => import('@/components/common/modal'), { ssr: false });

export default function UserProfileContainer() {
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  const { authAtomState } = useAuth();
  const { setAlertWithConfirmAtom } = useAlertWithConfirm();
  const { setLoadingAtomStatue } = useLoading();
  const { handleClickSignout } = useSignout();

  const { data, isLoading, isSuccess } = useFetchQuery({
    queryKey: [queryKeys.USER_PROFILE, { nickname: authAtomState.nickname }],
    queryFn: Get.getApplicantProfile,
    options: {
      throwOnError: true,
      staleTime: 60 * 1000 * 5,
      gcTime: 60 * 1000 * 10,
      placeholderData: keepPreviousData,
    },
  });

  console.info('프로필 정보 API : ', data);

  // API - 계정삭제 요청
  const fetchDeactivate = async () => {
    setLoadingAtomStatue({ isLoading: true });
    try {
      const response = await Delete.deactivateApplicantUser();
      console.log('계정 삭제 요청 API : ', response);
      if (response.result.status !== 'success') {
        throw new Error();
      }
      alert('회원탈퇴가 완료되었습니다. 이용해주셔서 감사합니다.');
      handleClickSignout();
    } catch (error) {
      console.log('error: ', error);
      alert('회원탈퇴에 실패했습니다. 문제가 지속될 경우 고객센터로 문의해주세요.');
    } finally {
      setLoadingAtomStatue({ isLoading: false });
    }
  };

  const handleClickWithdrawal = () => {
    setAlertWithConfirmAtom((prev) => ({
      ...prev,
      type: 'CONFIRM',
      title: 'TITLE_7',
      subTitle: 'DESC_8',
      cancelLabel: '취소',
      confirmLabel: '회원탈퇴',
      confirmVariant: 'delete',
      onClickConfirm: () => fetchDeactivate(),
    }));
  };
  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  return (
    <>
      {isOpenModal && (
        <DynamicNoSSRModal handleCloseModal={() => handleCloseModal()}>
          <Modal.Header title="닉네임 변경" handleCloseModal={() => handleCloseModal()} />
          <Modal.Content>
            <ChangeNicknameForm handleCloseModal={() => handleCloseModal()} />
          </Modal.Content>
        </DynamicNoSSRModal>
      )}

      <UserProfile
        isLoading={isLoading}
        isSuccess={isSuccess}
        data={data?.result}
        handleClickWithdrawal={handleClickWithdrawal}
        setIsOpenModal={setIsOpenModal}
      />
    </>
  );
}
