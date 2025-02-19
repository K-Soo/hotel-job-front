import React from 'react';
import HistoryStatus from '@/components/userApplicationHistory/HistoryStatus';
import useFetchQuery from '@/hooks/useFetchQuery';
import queryKeys from '@/constants/queryKeys';
import useAuth from '@/hooks/useAuth';
import { Get } from '@/apis';
import { keepPreviousData } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import UserApplicationHistory from '@/components/user/UserApplicationHistory';

export default function UserApplicationHistoryContainer() {
  const { authAtomState } = useAuth();
  const router = useRouter();

  const { data, isLoading } = useFetchQuery({
    queryKey: [queryKeys.USER_APPLICATION_HISTORY_COUNT, { nickname: authAtomState.nickname }],
    queryFn: Get.getApplicationHistoryStatus,
    options: {
      throwOnError: true,
      staleTime: 1000 * 60 * 3,
      gcTime: 1000 * 60 * 5,
      placeholderData: keepPreviousData,
    },
  });

  console.log('지원상태 계수 API : ', data);

  const handleClickReviewStatus = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.currentTarget;
    const urlParams = new URLSearchParams(router.query as Record<string, string>);

    if (name === 'total') {
      urlParams.delete('status');
    } else {
      urlParams.set('status', name);
    }
    router.push({ pathname: '/user/application/history', query: Object.fromEntries(urlParams) }, undefined, { scroll: false });
  };

  return <UserApplicationHistory isLoading={isLoading} data={data?.result} handleClickReviewStatus={handleClickReviewStatus} />;
}
