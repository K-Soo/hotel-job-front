import React from 'react';
import useFetchQuery from '@/hooks/useFetchQuery';
import queryKeys from '@/constants/queryKeys';
import useAuth from '@/hooks/useAuth';
import { Get } from '@/apis';
import UserApplicationHistory from '@/components/userApplicationHistory';
import HistoryCard from '@/components/userApplicationHistory/HistoryCard';
import HistoryStatus from '@/components/userApplicationHistory/HistoryStatus';
import UserTemplate from '@/components/common/user/UserTemplate';
import UserTitle from '@/components/common/user/UserTitle';

export default function UserApplicationHistoryContainer() {
  const { isAuthenticated, authAtomState } = useAuth();

  const { data, isLoading, isSuccess } = useFetchQuery({
    queryKey: [queryKeys.USER_APPLICATION_HISTORY, { nickname: authAtomState.nickname }],
    queryFn: Get.getApplicationHistory,
    options: {
      enabled: isAuthenticated,
      staleTime: 1000 * 60 * 3,
      gcTime: 1000 * 60 * 5,
    },
  });

  console.log('지원내역 리스트 API : ', data?.result);

  return (
    <UserApplicationHistory>
      <UserTemplate>
        <UserTitle title="지원현황" />
        <HistoryStatus />
        {isLoading && <div>로딩중...</div>}
        {isSuccess && data && (
          <>
            {data.result.map((item) => (
              <HistoryCard key={item.id} item={item} />
            ))}
          </>
        )}
      </UserTemplate>
    </UserApplicationHistory>
  );
}
