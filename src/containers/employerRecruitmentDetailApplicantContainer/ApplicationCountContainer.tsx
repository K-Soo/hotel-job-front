import React from 'react';
import queryKeys from '@/constants/queryKeys';
import { keepPreviousData } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import useFetchQuery from '@/hooks/useFetchQuery';
import { Get } from '@/apis';
import ApplicationCount from '@/components/EmployerRecruitmentDetailApplicant/ApplicationCount';
import SkeletonUI from '@/components/common/SkeletonUI';

export default function ApplicationCountContainer() {
  const router = useRouter();
  const { slug } = router.query;

  const { data, isLoading, isSuccess } = useFetchQuery({
    queryKey: [queryKeys.RECRUITMENT_APPLICANT_COUNT, { slug }].filter(Boolean),
    queryFn: Get.getRecruitmentDetailApplicationCount,
    options: {
      enabled: !!slug,
      throwOnError: true,
      staleTime: 60 * 1000 * 1,
      gcTime: 60 * 1000 * 2,
      placeholderData: keepPreviousData,
    },
    requestQuery: {
      recruitmentId: slug as string,
    },
  });

  if (isLoading) return <SkeletonUI.Line style={{ height: '120px', marginBottom: '30px' }} />;

  console.log('지원자 열람 카운트 API : ', data);

  if (isSuccess && data) {
    return <ApplicationCount data={data.result} />;
  }
}
