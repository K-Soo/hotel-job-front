import React from 'react';
import UserProfile from '@/components/userProfile';
import useFetchQuery from '@/hooks/useFetchQuery';
import { Get, Delete, Auth } from '@/apis';
import queryKeys from '@/constants/queryKeys';
import { keepPreviousData } from '@tanstack/react-query';
import useAuth from '@/hooks/useAuth';
import useAlertWithConfirm from '@/hooks/useAlertWithConfirm';

export default function UserProfileContainer() {
  const { authAtomState } = useAuth();
  const { setAlertWithConfirmAtom } = useAlertWithConfirm();

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

  const fetchDeactivate = async () => {
    try {
      const response = await Delete.deactivateApplicantUser();
      console.log('계정 삭제 요청 API : ', response);
      if (response.result.status !== 'success') {
        throw new Error();
      }
      alert('회원탈퇴가 완료되었습니다.');
      Auth.signOut();
      window.location.href = '/sign-in';
    } catch (error) {
      console.log('error: ', error);
      alert('회원탈퇴에 실패했습니다. 문제가 지속될 경우 고객센터로 문의해주세요.');
    } finally {
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

  return <UserProfile isLoading={isLoading} isSuccess={isSuccess} data={data?.result} handleClickWithdrawal={handleClickWithdrawal} />;
}
