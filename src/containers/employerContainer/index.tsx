import React from 'react';
import Employer from '@/components/employer';
import { Get } from '@/apis';
import useFetchQuery from '@/hooks/useFetchQuery';
import queryKeys from '@/constants/queryKeys';
import { ErrorComponent } from '@/error';

export default function EmployerContainer() {
  const { data, isLoading, isError } = useFetchQuery({
    queryKey: [queryKeys.EMPLOYER_ACCOUNT],
    queryFn: Get.employerAccountInfo,
    options: {
      throwOnError: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    },
  });

  console.log('계정정보 API : ', data);

  if (isError) {
    return <ErrorComponent visibleBackButton={false} />;
  }

  return <Employer isLoading={isLoading} data={data?.result} />;
}
