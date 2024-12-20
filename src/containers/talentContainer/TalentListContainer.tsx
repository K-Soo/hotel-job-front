import React from 'react';
import TalentList from '@/components/talent/TalentList';
import useFetchQuery from '@/hooks/useFetchQuery';
import { Get } from '@/apis';
import queryKeys from '@/constants/queryKeys';

export default function TalentListContainer() {
  const {} = useFetchQuery({
    queryKey: [queryKeys.TALENT_LIST],
    queryFn: Get.getTalentList,
    options: {
      enabled: true,
      // throwOnError: true,
      // staleTime: 1000 * 60 * 5,
      // gcTime: 1000 * 60 * 10,
      staleTime: 0,
      gcTime: 0,
    },
    requestQuery: {
      page: '1',
      limit: '2',
    },
  });

  return <TalentList />;
}
