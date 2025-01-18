import React from 'react';
import UserProfile from '@/components/userProfile';
import ProfileTitle from '@/components/userProfile/ProfileTitle';
import UserTitle from '@/components/common/user/UserTitle';
import UserTemplate from '@/components/common/user/UserTemplate';
import useFetchQuery from '@/hooks/useFetchQuery';
import { Get } from '@/apis';
import queryKeys from '@/constants/queryKeys';
import { keepPreviousData } from '@tanstack/react-query';
import useAuth from '@/hooks/useAuth';

export default function UserProfileContainer() {
  const { authAtomState } = useAuth();

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

  return <UserProfile isLoading={isLoading} isSuccess={isSuccess} data={data?.result} />;
}
