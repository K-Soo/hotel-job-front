import React from 'react';
import HistoryStatus from '@/components/userApplicationHistory/HistoryStatus';
import SkeletonUI from '@/components/common/SkeletonUI';
import useFetchQuery from '@/hooks/useFetchQuery';
import queryKeys from '@/constants/queryKeys';
import useAuth from '@/hooks/useAuth';
import { Get, Patch } from '@/apis';
import { keepPreviousData } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export default function HistoryStatusContainer() {
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
    router.replace({ pathname: router.pathname, query: Object.fromEntries(urlParams) }, undefined, { scroll: false });
  };

  return <HistoryStatus isLoading={isLoading} data={data?.result} handleClickReviewStatus={handleClickReviewStatus} />;
}
