import React from 'react';
import CompanyInfo from '@/components/employer/CompanyInfo';
import useFetchQuery from '@/hooks/useFetchQuery';
import queryKeys from '@/constants/queryKeys';
import { Get } from '@/apis';
import useAuth from '@/hooks/useAuth';
import SkeletonUI from '@/components/common/SkeletonUI';
import EmptyCompany from '@/components/employer/EmptyCompany';
import { CertificationStatus } from '@/types';

interface CompanyInfoContainerProps {
  certificationStatus: CertificationStatus | undefined;
}

export default function CompanyInfoContainer({ certificationStatus }: CompanyInfoContainerProps) {
  const { authAtomState } = useAuth();

  const { data, isLoading, isError } = useFetchQuery({
    queryKey: [queryKeys.MY_COMPANY, { nickname: authAtomState.nickname }],
    queryFn: Get.employerCompany,
    options: {
      throwOnError: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    },
  });

  if (isLoading) {
    return <SkeletonUI.Line style={{ height: '180px', flexBasis: '400px', borderRadius: '10px' }} />;
  }

  if (isError) {
    return <EmptyCompany />;
  }

  return <CompanyInfo data={data?.result} certificationStatus={certificationStatus} />;
}
