import React from 'react';
import Employer from '@/components/employer';
import RecentlyRecruitment from '@/components/employer/RecentlyRecruitment';
import { Get } from '@/apis';
import useFetchQuery from '@/hooks/useFetchQuery';
import queryKeys from '@/constants/queryKeys';

export default function EmployerContainer() {
  const { data, isLoading, isSuccess } = useFetchQuery({
    queryKey: [queryKeys.EMPLOYER_ACCOUNT],
    queryFn: Get.employerAccountInfo,
    options: {
      throwOnError: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    },
  });

  console.log('계정정보 API : ', data);

  return (
    <Employer isLoading={isLoading} data={data?.result}>
      <RecentlyRecruitment />
    </Employer>
  );
}
